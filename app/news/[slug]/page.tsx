export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import sanitizeHtml from "sanitize-html";
import {
  getNewsBySlug,
  getRelatedNews,
  trackView,
  getViewCount,
} from "@/lib/supabase";
import { TAG_COLORS, PROSE_CLASSES } from "@/types/news";
import LandingLayout from "@/components/news/LandingLayout";
import YoutubeEmbed from "@/components/news/YoutubeEmbed";
import ExercisePlayground from "@/components/news/ExercisePlayground";
import type { ExerciseConfig } from "@/components/news/ExercisePlayground";
import type { Metadata } from "next";
import ScrollProgress from "@/components/news/ScrollProgress";
import BackToTop from "@/components/news/BackToTop";
import ShareButton from "@/components/news/ShareButton";
import { EyeIconDark } from "@/components/icons";

type Props = { params: Promise<{ slug: string }> };

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const news = await getNewsBySlug(slug);
  if (!news) notFound();

  const [related, viewCount] = (await Promise.all([
    getRelatedNews(news.category, news.id),
    getViewCount(news.id),
    trackView(news.id),
  ])) as [Awaited<ReturnType<typeof getRelatedNews>>, number, void];

  return (
    <LandingLayout activeCategory={news.category}>
      <ScrollProgress />
      <BackToTop />
      <article className="min-h-screen bg-bg text-ink">
        {/* ── Hero зураг ── */}
        <div className="relative w-full h-[280px] md:h-[430px] overflow-hidden">
          {news.image_url ? (
            <Image
              src={news.image_url}
              alt={news.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#150808] to-[#200c0a]">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgba(230,51,41,0.2),transparent_55%)]" />
            </div>
          )}

          {/* Давхар gradient:
              - Дээд хэсэг: текст уншигдах хар дэвсгэр
              - Доод хэсэг: var(--bg) өнгөрүү шилжилт */}
          <div
            className="absolute bottom-0 left-0 right-0 h-full"
            style={{
              background:
                "linear-gradient(to top, var(--bg) 0%, color-mix(in srgb, var(--bg) 60%, black) 14%, rgba(0,0,0,0.70) 34%, rgba(0,0,0,0.2) 78%, transparent 100%)",
            }}
          />

          {/* <div className="corner-br" /> */}

          {/* Mobile: буцах товч — зүүн дээр */}
          <Link
            href="/news"
            className="md:hidden absolute top-4 left-4 z-10 flex items-center gap-1.5 px-2 py-1 bg-white/5 border border-border rounded-full backdrop-blur-md text-[9px] tracking-[0.12em] uppercase font-ttnormspro text-white/70 hover:text-white transition-colors"
          >
            <span> ← </span> Буцах
          </Link>

          {/* Ангилал */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 md:block hidden">
            <span className="text-[14px] tracking-[0.16em] uppercase text-accent font-bebas border-t-2 border-accent">
              {news.category}
            </span>
          </div>

          {/* Гарчиг — хар давхаргын дунд байрлана */}
          <div className="absolute bottom-8 md:bottom-20 left-0 right-0 px-4 md:px-10">
            <div className="max-w-[760px]">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-4 h-[1.5px] bg-accent" />
                <span className="text-[8px] tracking-[0.22em] uppercase text-accent font-mono">
                  {news.tags?.[0]}
                </span>
              </div>
              <div
                className="font-ttNormsPro text-[28px] md:text-[52px] leading-[1.1] font-semibold"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, rgb(255,155,60) 0%, rgb(170,15,8) 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                <span>{news.title}</span>
              </div>

              {/* Metadata: огноо · зохиогч · үзэлт */}
              <div className="flex items-center gap-2 mt-4 flex-wrap">
                {news.created_at && (
                  <span className="text-[10px] font-mono font-semibold tracking-[0.1em] text-ink/50">
                    {formatDate(news.created_at)}
                  </span>
                )}
                {news.author && (
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-[1px] bg-accent/50" />
                    <span className="text-[11px] font-mono font-semibold tracking-[0.1em] text-ink/50">
                      Published by {news.author}
                    </span>
                    {news.author_role && (
                      <span className="text-[9px] font-semibold tracking-[0.08em] text-ink/50 font-SpaceGrotesk">
                        ({news.author_role})
                      </span>
                    )}
                  </div>
                )}
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-[1px] bg-accent/50" />
                  <span className="text-[11px] font-mono font-semibold tracking-[0.1em] text-ink/50 flex items-center gap-1">
                    <EyeIconDark className="w-3 h-3" />
                    {viewCount}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Агуулга — hero-г давж эхэлнэ ── */}
        <div className="max-w-[840px] mx-auto px-4 md:px-6 -mt-6 md:-mt-14 pt-10 md:pt-20 relative z-10">
          {/* Tag-ууд */}
          {news.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-5">
              {(Array.isArray(news.tags) ? news.tags : []).map(
                (tag: string, i: number) => {
                  const c = TAG_COLORS[i % 5];
                  return (
                    <span
                      key={tag}
                      className="text-[8px] tracking-[0.12em] uppercase px-2 py-[3px] rounded-full border font-SpaceGrotesk"
                      style={{
                        color: c.color,
                        backgroundColor: c.bg,
                        borderColor: c.border,
                      }}
                    >
                      {tag}
                    </span>
                  );
                },
              )}
            </div>
          )}

          {/* Lead */}
          {news.lead && (
            <p className="text-[15px] md:text-[17px] text-muted leading-[1.8] font-ttnormspro border-l-2 border-accent pl-4 mb-8">
              {news.lead}
            </p>
          )}

          {/* YouTube бичлэг */}
          {news.video_url && <YoutubeEmbed url={news.video_url} />}

          {/* Контент */}
          <div
            className={PROSE_CLASSES}
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(news.content, {
                allowedTags: sanitizeHtml.defaults.allowedTags.concat([
                  "img",
                  "iframe",
                  "h1",
                  "h2",
                  "details",
                  "summary",
                ]),
                allowedAttributes: {
                  ...sanitizeHtml.defaults.allowedAttributes,
                  "*": ["class", "style", "id"],
                  iframe: [
                    "src",
                    "allowfullscreen",
                    "frameborder",
                    "width",
                    "height",
                  ],
                  img: ["src", "alt", "width", "height", "loading"],
                },
              }),
            }}
          />

          {/* Интерактив туршилт */}
          {news.exercise_config &&
            (() => {
              try {
                const config: ExerciseConfig = JSON.parse(
                  news.exercise_config!,
                );
                return <ExercisePlayground config={config} />;
              } catch {
                return null;
              }
            })()}

          {/* Буцах + хуваалцах */}
          <div className="flex items-center justify-end md:justify-between pt-6 mt-8 border-t border-border">
            <Link
              href="/news"
              className="hidden md:inline text-[9px] tracking-[0.14em] rounded-full uppercase font-ttNormsPro text-muted border border-border px-3 py-1.5 hover:text-ink hover:border-muted transition-colors"
            >
              ← Буцах
            </Link>
            <div className="flex items-center">
              <ShareButton title={news.title} slug={news.slug} />
            </div>
          </div>

          {/* Холбоотой мэдээ */}
          {related.length > 0 && (
            <div className="mt-10 py-6 border-t border-border">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2.5 h-[1.5px] bg-accent" />
                <span className="text-[8px] tracking-[0.2em] uppercase text-muted font-mono">
                  Холбоотой мэдээ
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {related.map((r) => (
                  <Link
                    key={r.id}
                    href={`/news/${r.slug}`}
                    className="group flex flex-col rounded rounded-xl border border-border hover:border-accent/40 transition-colors duration-300 overflow-hidden"
                  >
                    {/* Зураг */}
                    <div className="relative w-full h-[140px] overflow-hidden bg-surface flex-shrink-0">
                      {r.image_url ? (
                        <Image
                          src={r.image_url}
                          alt={r.title}
                          fill
                          className="object-cover opacity-90 group-hover:scale-105 transition-all duration-500"
                          sizes="400px"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-[#150808] to-[#200c0a]">
                          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(230,51,41,0.15),transparent_70%)]" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />
                      {/* Gradient top border */}
                      <div
                        className="absolute inset-x-0 top-0 h-[1px]"
                        style={{
                          background:
                            "linear-gradient(90deg, transparent 0%, #fe2726 50%, transparent 100%)",
                        }}
                      />
                    </div>

                    {/* Текст */}
                    <div className="p-4 flex flex-col gap-2 flex-1 bg-surface group-hover:bg-faint transition-colors duration-300">
                      <span className="text-[9px] tracking-[0.12em] uppercase text-muted font-ttNormsPro font-semibold">
                        {r.category}
                      </span>
                      <p className="text-[13px] text-ink leading-[1.5] line-clamp-3 group-hover:text-accent transition-colors duration-300 font-ttnormspro">
                        {r.title}
                      </p>
                      <span className="mt-auto pt-2 text-[8px] tracking-[0.14em] uppercase text-accent font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Дэлгэрэнгүй →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </LandingLayout>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const news = await getNewsBySlug(slug);
  if (!news) return { title: "Мэдээ олдсонгүй" };

  const title = `${news.title} | Криптологи`;
  const description = news.lead ?? undefined;
  const image = news.image_url ?? undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://ciphernews.mn/news/${slug}`,
      siteName: "Криптологи",
      ...(image && {
        images: [{ url: image, width: 1200, height: 630, alt: news.title }],
      }),
      type: "article",
      publishedTime: news.created_at ?? undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image && { images: [image] }),
    },
  };
}
