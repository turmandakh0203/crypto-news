"use client";
import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import sanitizeHtml from "sanitize-html";
import type { News } from "@/types/news";
import { TAG_COLORS, PROSE_CLASSES } from "@/types/news";
import { formatDate } from "@/lib/supabase";
import { useInView } from "@/lib/useInView";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { CalenderIcon, UserIcon, EyeIconDark } from "../icons";

const NOISE_GRADIENT =
  "linear-gradient(135deg, rgb(230, 51, 41), rgb(26, 95, 180), rgb(255, 107, 53))";
const NOISE_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`;

type Props = { news: News; index: number };

export default function GridCard({ news, index }: Props) {
  const { ref: inViewRef, inView } = useInView<HTMLDivElement>();
  const [active, setActive] = useState(false);
  const expandedRef = useRef<HTMLDivElement>(null);
  const id = useId();

  const v = inView ? "in-view" : "";
  const tagColor = TAG_COLORS[index % 5] ?? TAG_COLORS[0];
  const slideClass =
    index % 3 === 0
      ? "anim-from-left"
      : index % 3 === 2
        ? "anim-from-right"
        : "anim-from-bottom";

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setActive(false);
    }
    document.body.style.overflow = active ? "hidden" : "auto";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [active]);

  useOutsideClick(expandedRef, () => setActive(false));

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
              layoutId={`card-${news.id}-${id}`}
              ref={expandedRef}
              className="relative w-full max-w-[580px] rounded-2xl p-[6px]"
              style={{ background: NOISE_GRADIENT }}
            >
              {/* Noise texture on the gradient border */}
              <div
                className="absolute inset-0 rounded-2xl opacity-25 mix-blend-overlay pointer-events-none"
                style={{
                  backgroundImage: NOISE_SVG,
                  backgroundRepeat: "repeat",
                  backgroundSize: "220px 220px",
                }}
              />
              {/* Card content */}
              <div className="relative flex flex-col bg-bg rounded-xl overflow-hidden max-h-[85vh]">
                {/* Image */}
                <motion.div
                  layoutId={`image-${news.id}-${id}`}
                  className="relative h-56 flex-shrink-0"
                >
                  {news.image_url ? (
                    <Image
                      src={news.image_url}
                      alt={news.title}
                      fill
                      className="object-cover"
                      sizes="480px"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#050d18] to-[#0a1628]" />
                  )}
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
                </motion.div>

                {/* Content */}
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
                  <h3 className="font-ttNormsPro font-bold text-[20px] leading-[1.25] text-ink">
                    {news.title}
                  </h3>
                  <p className="text-[13px] text-muted leading-[1.7] line-clamp-5">
                    {news.lead}
                  </p>

                  <div className="relative overflow-hidden max-h-[220px]">
                    <div
                      className={PROSE_CLASSES}
                      dangerouslySetInnerHTML={{
                        __html: sanitizeHtml(news.content, {
                          allowedTags: sanitizeHtml.defaults.allowedTags.concat(
                            ["img", "iframe", "h1", "h2", "details", "summary"],
                          ),
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
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-bg to-transparent pointer-events-none" />
                  </div>
                  <div className="mt-auto pt-3 border-t border-border space-y-2">
                    <div className="flex flex-wrap items-center gap-3 text-[12px] text-muted font-mono">
                      {news.created_at && (
                        <span className="flex items-center gap-1 text-[11px] text-muted font-mono">
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

      {/* ── Grid card ── */}
      <div ref={inViewRef} className={`${slideClass} ${v}`}>
        <motion.div
          layoutId={`card-${news.id}-${id}`}
          className="relative rounded-xl overflow-hidden border border-border border-t-0 bg-bg hover:border-accent/40 transition-colors"
        >
          {/* Gradient top border */}
          <div
            className="absolute inset-x-0 top-0 h-[1px] z-10"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, #fe2726 50%, transparent 100%)",
            }}
          />

          <Link href={`/news/${news.slug}`} className="group block">
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <motion.div
                layoutId={`image-${news.id}-${id}`}
                className="absolute inset-0"
              >
                {news.image_url ? (
                  <Image
                    src={news.image_url}
                    alt={news.title}
                    fill
                    priority={index === 0}
                    className="object-cover group-hover:scale-110 transition-all duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1400px) 33vw, 460px"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#050d18] to-[#0a1628]">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(230,51,41,0.15),transparent_60%)]" />
                  </div>
                )}
              </motion.div>

              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-colors duration-500" />
              <div className="corner-tl" />
              <div className="corner-br" />

              {news.tags?.[0] && (
                <div className="absolute top-5 left-6 z-10">
                  <span
                    className="text-[8px] tracking-[0.18em] uppercase rounded-full border font-semibold px-1.5 py-[2px] inline-block backdrop-blur-lg"
                    style={{
                      color: tagColor.color,
                      backgroundColor: tagColor.bg,
                      borderColor: tagColor.border,
                    }}
                  >
                    {news.tags[0]}
                  </span>
                </div>
              )}
            </div>

            {/* Text content on its own background */}
            <div className="p-5 flex flex-col gap-2.5">
              <h2
                className="font-ttNormsPro font-bold text-[17px] md:text-[19px] w-full leading-[1.3] line-clamp-2"
                style={{
                  backgroundImage:
                    "linear-gradient(110deg, rgb(255,210,160) 0%, rgb(230,51,41) 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                {news.title}
              </h2>
              <p className="text-[13px] text-muted font-SpaceGrotesk tracking-[0.02em] leading-[1.6] line-clamp-2">
                {news.lead}
              </p>

              <div className="flex justify-between items-center pt-2.5 mt-1 border-t border-border">
                <div className="flex gap-1.5 items-center text-[11px] tracking-[0.05em] text-muted font-mono">
                  {news.created_at && (
                    <span className="flex items-center gap-1">
                      <CalenderIcon className="w-3 h-3" />
                      {formatDate(news.created_at)}
                    </span>
                  )}
                  {news.author && (
                    <>
                      <span className="opacity-60">·</span>
                      <span className="flex items-center gap-1">
                        <UserIcon className="w-3 h-3" />
                        {news.author}
                      </span>
                    </>
                  )}
                </div>
                <span className="inline-flex items-center gap-1 text-accent text-[11px] font-semibold tracking-[0.08em] uppercase flex-shrink-0">
                  Дэлгэрэнгүй
                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </span>
              </div>
            </div>
          </Link>

          {/* Preview button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setActive(true);
            }}
            aria-label="Түргэн харах"
            className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 flex items-center justify-center text-white transition-colors"
          >
            <EyeIconDark className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </>
  );
}
