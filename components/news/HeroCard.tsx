"use client";
import Link from "next/link";
import Image from "next/image";
import type { News } from "@/types/news";
import { formatDate } from "@/lib/supabase";
import { useInView } from "@/lib/useInView";

type Props = { news: News; direction?: "left" | "right" };

export default function HeroCard({ news, direction = "left" }: Props) {
  const { ref, inView } = useInView<HTMLAnchorElement>();
  const v = inView ? "in-view" : "";

  const slideClass =
    direction === "right" ? "anim-from-right" : "anim-from-left";

  return (
    <div
      className={`relative m-2 rounded-xl overflow-hidden border border-border ${slideClass} ${v}`}
    >
      {/* Gradient top border */}
      <div
        className="absolute inset-x-0 top-0 h-[1px] z-10"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #fe2726 50%, transparent 100%)",
        }}
      />
      <Link
        ref={ref}
        href={`/news/${news.slug}`}
        className="group block relative overflow-hidden min-h-[300px] md:min-h-[480px]"
      >
        {/* Зураг */}
        {news.image_url ? (
          <Image
            src={news.image_url}
            alt={news.title}
            fill
            className="object-cover group-hover:scale-125 transition-all duration-700 ease-out"
            sizes="50vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#150808] to-[#200c0a]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(220,80,40,0.2),transparent_60%)]" />
          </div>
        )}

        <div className="absolute inset-0 bg-black/80 group-hover:bg-black/60 transition-colors duration-500" />
        <div className="absolute inset-0 [background:repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.012)_2px,rgba(255,255,255,0.012)_3px)]" />

        {/* Corner brackets */}
        <div className="corner-tl" />
        <div className="corner-br" />

        {/* Контент */}
        <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-10 z-10">
          {/* Tag */}
          <div className="reveal-wrap mb-2">
            <div
              className={`reveal-up anim-delay-1 flex items-center gap-3 ${v}`}
            >
              <div
                className={`h-[1.5px] w-4 bg-accent anim-slide-r anim-delay-1 ${v}`}
              />
              <span className="text-[8px] tracking-[0.22em] uppercase text-accent font-bebas">
                {news.tags?.[0]}
              </span>
            </div>
          </div>

          {/* Гарчиг — мөр бүр тусдаа reveal */}
          <div className="pb-4 reveal-wrap">
            <div className={`reveal-up anim-delay-2 ${v}`}>
              <h1
                className="font-ttNormsPro font-medium text-[26px] md:text-[44px] w-full md:w-4/5 leading-[1.1] line-clamp-3"
                style={{
                  backgroundImage:
                    "linear-gradient(110deg, rgb(255,232,185) 0%, rgb(215,55,40) 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                {news.title}
              </h1>
            </div>
          </div>

          {/* Lead */}
          <div className="reveal-wrap mb-6">
            <div className={`reveal-up anim-delay-4 ${v}`}>
              <p className="text-[13px] md:text-[15px] text-white/65 leading-[1.75] w-full md:w-4/5 font-SpaceGrotesk line-clamp-2">
                {news.lead}
              </p>
            </div>
          </div>

          {/* Огноо + товч */}
          <div className="reveal-wrap">
            <div className={`reveal-up anim-delay-5 ${v}`}>
              <div className="flex justify-between items-center">
                {news.created_at && (
                  <span className="text-[10px] tracking-[0.1em] text-white/40 font-mono">
                    {formatDate(news.created_at)}
                  </span>
                )}
                <span className="text-[7px] md:text-[9px] tracking-[0.3em] text-accent rounded-full border border-[rgba(230,51,41,0.4)] px-4 py-2 group-hover:bg-accent group-hover:text-white transition-all duration-300 inline-block">
                  Дэлгэрэнгүй →
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
