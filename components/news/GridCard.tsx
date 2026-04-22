"use client";
import Link from "next/link";
import Image from "next/image";
import type { News } from "@/types/news";
import { TAG_COLORS } from "@/types/news";
import { formatDate } from "@/lib/supabase";
import { useInView } from "@/lib/useInView";

type Props = { news: News; index: number };

export default function GridCard({ news, index }: Props) {
  const { ref, inView } = useInView<HTMLAnchorElement>();

  const v = inView ? "in-view" : "";
  const tags = Array.isArray(news.tags) ? news.tags : [];
  const tagColor = TAG_COLORS[index % 5] ?? TAG_COLORS[0];
  const slideClass =
    index % 3 === 0
      ? "anim-from-left"
      : index % 3 === 2
        ? "anim-from-right"
        : "anim-from-bottom";

  return (
    <div
      className={`relative m-2 rounded-xl overflow-hidden border border-border border-t-0 ${slideClass} ${v}`}
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
        className="group block relative overflow-hidden min-h-[280px] hover:bg-surface transition-colors"
      >
        {news.image_url ? (
          <Image
            src={news.image_url}
            alt={news.title}
            fill
            className="object-cover opacity-70 group-hover:scale-125 transition-all duration-700 ease-out"
            sizes="33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0518] to-[#160a28]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(140,60,220,0.25),transparent_60%)]" />
          </div>
        )}
        <div className="absolute inset-0 bg-black/60" />
        <div className="corner-tl" />
        <div className="corner-br" />

        <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-8">
          <div className="flex flex-col mb-4">
            {news.tags?.[0] && (
              <div className="reveal-wrap mb-1 self-start">
                <div
                  className={`reveal-up anim-delay-1 text-[7px] tracking-[0.14em] uppercase rounded-full border px-1.5 py-[2px] inline-block ${v}`}
                  style={{
                    color: tagColor.color,
                    backgroundColor: tagColor.bg,
                    borderColor: tagColor.border,
                  }}
                >
                  {news.tags[0]}
                </div>
              </div>
            )}
            <div className="reveal-wrap">
              <div
                className={`reveal-up anim-delay-2 font-ttNormsPro w-full md:w-4/5 text-[18px] md:text-[22px] text-white leading-[1.2] ${v}`}
              >
                {news.title}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="reveal-wrap">
              <div className={`reveal-up anim-delay-3 ${v}`}>
                <h3 className="text-[14px] text-white/70 font-SpaceGrotesk w-4/5 leading-[1.6] line-clamp-2 group-hover:text-white/90 transition-colors">
                  {news.lead}
                </h3>
              </div>
            </div>
            {news.created_at && (
              <div className="reveal-wrap">
                <div className={`reveal-up anim-delay-5 ${v}`}>
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] tracking-[0.1em] text-white/40 font-mono">
                      {formatDate(news.created_at)}
                    </span>
                    <span className="text-[7px] md:text-[9px] tracking-[0.16em] rounded-full text-accent border border-[rgba(230,51,41,0.4)] px-3 py-1.5 group-hover:bg-accent group-hover:text-white group-hover:tracking-[0.22em] transition-all duration-300 inline-block">
                      Дэлгэрэнгүй →
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
