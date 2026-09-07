export const revalidate = 3600;
export const dynamicParams = true;

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import sanitizeHtml from "sanitize-html";
import {
  getNewsBySlug,
  getRelatedNews,
  getViewCount,
  getCategories,
  getAllNews,
} from "@/lib/supabase";
import ViewTracker from "@/components/news/ViewTracker";
import { TAG_COLORS, PROSE_CLASSES } from "@/types/news";
import LandingLayout from "@/components/news/LandingLayout";
import YoutubeEmbed from "@/components/news/YoutubeEmbed";
import ExercisePlayground from "@/components/news/ExercisePlayground";
import type { ExerciseConfig } from "@/components/news/ExercisePlayground";
import type { Metadata } from "next";
import ScrollProgress from "@/components/news/ScrollProgress";
import BackToTop from "@/components/news/BackToTop";
import ShareButton from "@/components/news/ShareButton";
import HeroParallax from "@/components/news/HeroParallax";
import ViewCount from "@/components/news/ViewCount";
import SectionFooter from "@/components/news/SectionFooter";
import Comments from "@/components/news/Comments";
import BackButton from "@/components/news/BackButton";
import { getComments } from "@/lib/actions";
import { UserIcon, ExternalLinkIcon } from "@/components/icons";
import { BackgroundBeams } from "@/components/ui/background-beams";

type Props = { params: Promise<{ slug: string }> };

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

function readingTime(content: string): number {
  const text = content.replace(/<[^>]*>/g, " ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 120));
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const news = await getNewsBySlug(slug);
  if (!news) notFound();

  const [related, viewCount, categories, comments] = await Promise.all([
    getRelatedNews(news.category_id, news.id),
    getViewCount(news.id),
    getCategories(),
    getComments(news.id),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: news.title,
    description: news.lead ?? "",
    image: news.image_url ? [news.image_url] : [],
    datePublished: news.created_at ?? new Date().toISOString(),
    author: {
      "@type": "Person",
      name: news.author ?? "Crypto News",
    },
    publisher: {
      "@type": "Organization",
      name: "Crypto News",
      url: "https://crypto-news-alpha.vercel.app",
      logo: {
        "@type": "ImageObject",
        url: "https://crypto-news-alpha.vercel.app/ciphernews_icon_dark.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://crypto-news-alpha.vercel.app/news/${news.slug}`,
    },
    ...(news.source_url && { isBasedOn: news.source_url }),
  };

  return (
    <LandingLayout activeCategory={news.category} categories={categories}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ViewTracker newsId={news.id} />
      <ScrollProgress />
      <BackToTop />

      {/* Буцах товч — scroll хийсэн ч байнга харагдана, hero-тэй ижил баганад зэрэгцэнэ */}
      {/* <div className="fixed top-20 inset-x-0 z-30 pointer-events-none">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          <BackButton className="pointer-events-auto inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-surface/80 border border-border rounded-full backdrop-blur-md text-[9px] tracking-[0.12em] uppercase font-ttnormspro text-ink/70 hover:text-ink hover:border-accent/40 transition-colors">
            <span> ← </span> Буцах
          </BackButton>
        </div>
      </div> */}

      <article className="relative min-h-screen bg-bg text-ink">
        <BackgroundBeams className="fixed inset-0 z-0" subtle />

        {/* ── Hero зураг ── */}
        <HeroParallax imageUrl={news.image_url} alt={news.title}>
          <div className="absolute bottom-0 left-0 right-0 h-full bg-black/60" />

          {/* Гарчиг — хар давхаргын дунд байрлана */}
          <div className="absolute bottom-8 md:bottom-20 left-0 right-0 px-4 md:px-10">
            <div className="max-w-[760px]">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-4 h-[1.5px] bg-accent" />
                <span className="text-[10px] tracking-[0.22em] uppercase text-accent font-ttnormspro font-bold">
                  {news.tags?.[0]}
                </span>
              </div>
              <h1
                className="font-ttNormsPro text-[28px] md:text-[52px] leading-[1.1] font-semibold"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, rgb(255,201,134) 0%, rgb(230,51,41) 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                {news.title}
              </h1>

              {/* Metadata: огноо · зохиогч · үзэлт */}
              <div className="flex items-center gap-2 mt-4 flex-wrap">
                {news.created_at && (
                  <span className="text-[10px] font-mono font-semibold tracking-[0.1em] text-[#f0ece0]/70">
                    {formatDate(news.created_at)}
                  </span>
                )}
                {news.author && (
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-[1px] bg-accent/50" />
                    <Link
                      href={`/author/${encodeURIComponent(news.author)}`}
                      className="text-[11px] flex items-center gap-1 font-mono text-white/70 hover:text-white transition-colors"
                    >
                      <UserIcon className="w-2.5 h-2.5" />
                      {news.author}
                    </Link>
                    {news.author_role && (
                      <span className="text-[9px] text-white/60">
                        ({news.author_role})
                      </span>
                    )}
                  </div>
                )}
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-[1px] bg-accent/50" />
                  <ViewCount newsId={news.id} initialCount={viewCount} />
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-[1px] bg-accent/50" />
                  <span className="text-[11px] font-mono font-semibold tracking-[0.1em] text-[#f0ece0]/70">
                    {readingTime(news.content)} мин унших
                  </span>
                </div>
              </div>
            </div>
          </div>
        </HeroParallax>

        {/* ── Агуулга — hero-г давж эхэлнэ ── */}
        <div className="max-w-[1040px] mx-auto px-4 md:px-6 -mt-6 md:-mt-14 pt-10 md:pt-20 relative z-10">
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

          {/* Бэлтгэсэн / Эх сурвалж / Эх нийтлэл */}
          {(news.author || news.source_name || news.source_url) && (
            <div className="flex flex-wrap gap-x-8 gap-y-3 mb-6 p-4 rounded-lg border border-border bg-surface/60">
              {news.author && (
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] tracking-[0.16em] uppercase text-muted font-ttNormsPro font-semibold">
                    Бэлтгэсэн
                  </span>
                  <Link
                    href={`/author/${encodeURIComponent(news.author)}`}
                    className="inline-flex items-center gap-1.5 text-[13px] text-ink hover:text-accent transition-colors font-medium"
                  >
                    <UserIcon className="w-3 h-3" />
                    {news.author}
                    {news.author_role && (
                      <span className="text-muted font-normal">
                        ({news.author_role})
                      </span>
                    )}
                  </Link>
                </div>
              )}
              {news.source_name && (
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] tracking-[0.16em] uppercase text-muted font-ttNormsPro font-semibold">
                    Эх сурвалж
                  </span>
                  <span className="text-[13px] text-ink font-medium">
                    {news.source_name}
                  </span>
                </div>
              )}
              {news.source_url && (
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] tracking-[0.16em] uppercase text-muted font-ttNormsPro font-semibold">
                    Эх нийтлэл
                  </span>
                  <a
                    href={news.source_url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="inline-flex items-center gap-1.5 text-[13px] text-accent hover:underline font-medium"
                  >
                    Эх сурвалжийг үзэх
                    <ExternalLinkIcon className="w-3 h-3" />
                  </a>
                </div>
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
                  "*": ["class", "style", "id", "data-type"],
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

          {/* Desktop хуваалцах */}
          <div className="hidden md:flex items-center justify-end pt-6">
            <ShareButton title={news.title} slug={news.slug} />
          </div>

          {/* Холбоотой мэдээ */}
          {related.length > 0 && (
            <div className="mt-10 py-6 border-t border-border">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2.5 h-[1.5px] bg-accent" />
                <span className="text-[10px] tracking-[0.2em] uppercase text-muted font-ttNormsPro font-semibold">
                  Холбоотой мэдээ
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        <div className="absolute inset-0 bg-gradient-to-br from-[#05101e] to-[#0a1628]">
                          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(230,51,41,0.1),transparent_70%)]" />
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
                      <p className="text-[13px] text-ink leading-[1.5] line-clamp-3 transition-colors duration-300 font-ttnormspro">
                        {r.title}
                      </p>
                      <span className="mt-auto text-ink pt-2 text-[9px] tracking-[0.14em] uppercase group-hover:text-accent font-mono  duration-300">
                        Дэлгэрэнгүй →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Сэтгэгдэл */}
          <Comments newsId={news.id} initialComments={comments} />
        </div>
      </article>
      <SectionFooter />
    </LandingLayout>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const news = await getNewsBySlug(slug);
  if (!news) return { title: "Мэдээ олдсонгүй" };

  const title = `${news.title} | Crypto News`;
  const description = news.lead ?? undefined;
  const image = news.image_url ?? undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://crypto-news-alpha.vercel.app/news/${slug}`,
      siteName: "Crypto News",
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
    alternates: {
      canonical: `https://crypto-news-alpha.vercel.app/news/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  const articles = await getAllNews();
  return articles.map((a) => ({ slug: a.slug }));
}
