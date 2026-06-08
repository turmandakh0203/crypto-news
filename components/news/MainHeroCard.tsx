"use client";
import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import sanitizeHtml from "sanitize-html";
import type { News } from "@/types/news";
import { TAG_COLORS, PROSE_CLASSES } from "@/types/news";
import { formatDate } from "@/lib/supabase";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { CalenderIcon, UserIcon } from "../icons";

const NOISE_GRADIENT =
  "linear-gradient(135deg, rgb(230, 51, 41), rgb(255, 107, 53), rgb(26, 95, 180))";
const NOISE_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`;

type Props = { news: News };

export default function MainHeroCard({ news }: Props) {
  const [inView, setInView] = useState(false);
  const [active, setActive] = useState(false);
  const expandedRef = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    let r1: number, r2: number;
    r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => setInView(true));
    });
    return () => {
      cancelAnimationFrame(r1);
      cancelAnimationFrame(r2);
    };
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setActive(false);
    }
    document.body.style.overflow = active ? "hidden" : "auto";
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(expandedRef, () => setActive(false));

  const v = inView ? "in-view" : "";

  return (
    <>
      {/* ── Expanded overlay ── */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 grid place-items-center p-4"
          >
            <motion.div
              layoutId={`main-hero-${news.id}-${id}`}
              ref={expandedRef}
              className="relative w-full max-w-[540px] rounded-2xl p-[6px]"
              style={{ background: NOISE_GRADIENT }}
            >
              <div
                className="absolute inset-0 rounded-2xl opacity-25 mix-blend-overlay pointer-events-none"
                style={{
                  backgroundImage: NOISE_SVG,
                  backgroundRepeat: "repeat",
                  backgroundSize: "220px 220px",
                }}
              />
              <div className="relative flex flex-col bg-bg rounded-xl overflow-hidden max-h-[88vh]">
                <motion.div
                  layoutId={`main-hero-img-${news.id}-${id}`}
                  className="relative h-64 flex-shrink-0"
                >
                  {news.image_url ? (
                    <Image
                      src={news.image_url}
                      alt={news.title}
                      fill
                      className="object-cover"
                      sizes="540px"
                      priority
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#050d18] to-[#0a1628]" />
                  )}
                  <div className="absolute inset-0 bg-black/30" />
                  <button
                    onClick={() => setActive(false)}
                    className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-colors z-10"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M1 1l10 10M11 1L1 11"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                  {/* Tag label over image */}
                  <div className="absolute bottom-4 left-5 flex items-center gap-3">
                    <div className="h-[1.5px] w-5 bg-[#e63329]" />
                    <span className="text-[11px] uppercase text-[#e63329] font-ttNormsPro font-bold tracking-[0.18em]">
                      Сүүлийн мэдээ — {news.tags?.[0] || news.category}
                    </span>
                  </div>
                </motion.div>

                <div className="flex flex-col flex-1 overflow-auto p-5 gap-3">
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
                  <h2 className="font-ttNormsPro font-bold text-[22px] leading-[1.2] text-ink">
                    {news.title}
                  </h2>
                  <p className="text-[13px] text-muted leading-[1.7] line-clamp-3">
                    {news.lead}
                  </p>
                  {news.content && (
                    <div className="relative overflow-hidden max-h-[220px]">
                      <div
                        className={PROSE_CLASSES}
                        dangerouslySetInnerHTML={{
                          __html: sanitizeHtml(news.content, {
                            allowedTags:
                              sanitizeHtml.defaults.allowedTags.concat([
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
                                "allowfullscreen",
                                "frameborder",
                                "width",
                                "height",
                              ],
                            },
                          }),
                        }}
                      />
                      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-bg to-transparent pointer-events-none" />
                    </div>
                  )}
                  <div className="mt-auto pt-3 border-t border-border space-y-2">
                    <div className="flex flex-wrap items-center gap-3 text-[12px] text-muted font-mono">
                      {news.created_at && (
                        <span className="flex items-center gap-1">
                          <CalenderIcon className="w-3 h-3" />
                          {formatDate(news.created_at)}
                        </span>
                      )}
                      {news.author && (
                        <>
                          <span className="opacity-80">·</span>
                          <span className="flex items-center gap-1.5">
                            <UserIcon className="w-3 h-3" />
                            {news.author}
                            {news.author_role && (
                              <span className="opacity-60">
                                ({news.author_role})
                              </span>
                            )}
                          </span>
                        </>
                      )}
                    </div>
                    <Link
                      href={`/news/${news.slug}`}
                      onClick={() => setActive(false)}
                      className="flex items-center justify-center w-full py-2.5 rounded-full text-[11px] tracking-[0.18em] uppercase font-semibold bg-accent text-white hover:bg-accent/85 transition-colors"
                    >
                      Бүгдийг унших →
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main hero card ── */}
      <motion.div
        layoutId={`main-hero-${news.id}-${id}`}
        onClick={() => setActive(true)}
        className="relative rounded-xl overflow-hidden my-6 mx-4 md:mx-20 cursor-pointer"
      >
        <div className="corner-tl z-10 px-4" />
        <div className="corner-br z-10 px-4" />

        <div className="group relative overflow-hidden h-[420px] md:h-[620px]">
          <motion.div
            layoutId={`main-hero-img-${news.id}-${id}`}
            className="absolute inset-0"
          >
            {news.image_url ? (
              <Image
                src={news.image_url}
                alt={news.title}
                fill
                className="object-cover group-hover:scale-125 transition-all duration-700 ease-out"
                sizes="calc(100vw - 2rem)"
                priority
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-[#050d18] to-[#0a1628]" />
            )}
          </motion.div>

          <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors duration-500" />

          <div className="absolute bottom-0 left-0 right-0 px-5 pb-6 md:px-10 md:pb-10 z-10">
            <div className="reveal-wrap mb-4">
              <div
                className={`reveal-up anim-delay-1 flex items-center gap-3 ${v}`}
              >
                <div
                  className={`h-[1.5px] w-6 bg-[#e63329] anim-slide-r anim-delay-1 ${v}`}
                />
                <span className="text-[12px] uppercase text-[#e63329] font-ttNormsPro font-bold tracking-[0.18em]">
                  Сүүлийн мэдээ — {news.tags?.[0] || news.category}
                </span>
              </div>
            </div>

            <div className="mb-4 reveal-wrap">
              <h1
                className={`reveal-up font-ttNormsPro font-bold text-[36px] md:text-[80px] leading-[1.2] w-full md:w-1/2 ${v}`}
                style={{
                  animationDelay: "0.1s",
                  backgroundImage:
                    "linear-gradient(90deg, rgb(255,201,134) 0%, rgb(254,39,38) 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                {news.title}
              </h1>
            </div>

            <div className="reveal-wrap mb-6">
              <div className={`reveal-up anim-delay-4 ${v}`}>
                <p className="line-clamp-2 text-[14px] md:text-[16px] text-white/65 leading-[1.75] w-full md:w-1/2 font-light">
                  {news.lead}
                </p>
              </div>
            </div>

            <div className="reveal-wrap">
              <div className={`reveal-up anim-delay- ${v}`}>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3 text-white/50 text-[12px] font-mono">
                    {news.created_at && (
                      <span className="flex items-center gap-1.5">
                        <CalenderIcon className="w-3 h-3" />
                        {formatDate(news.created_at)}
                      </span>
                    )}
                  </div>
                  <span className="mt-3 inline-flex items-center gap-2 px-3 py-1 tracking-[0.05em] rounded-full text-orange-400 group-hover:bg-accent group-hover:text-white font-medium text-sm flex-shrink-0 transition-colors">
                    Дэлгэрэнгүй
                    <span className="group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
