"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import type { News } from "@/types/news";
import { TAG_COLORS } from "@/types/news";
import { formatDate } from "@/lib/supabase";

const PAGE_SIZE = 6;

function FeaturedCard({ news, index }: { news: News; index: number }) {
  const tagColor = TAG_COLORS[index % 5] ?? TAG_COLORS[0];
  return (
    <Link
      href={`/news/${news.slug}`}
      className="group block mx-2 mb-1 rounded-xl overflow-hidden border border-border border-t-0 relative"
    >
      <div
        className="absolute inset-x-0 top-0 h-[1px] z-10"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #fe2726 50%, transparent 100%)",
        }}
      />
      <div className="relative h-52">
        {news.image_url ? (
          <Image
            src={news.image_url}
            alt={news.title}
            fill
            className="object-cover opacity-80 group-hover:scale-105 transition-all duration-500"
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0518] to-[#160a28]" />
        )}
        <div className="absolute inset-0" />
      </div>

      <div className="px-4 pt-3 pb-4 bg-bg">
        {news.tags?.[0] && (
          <span
            className="text-[7px] tracking-[0.14em] uppercase rounded-full border px-1.5 py-[2px] inline-block mb-2"
            style={{
              color: tagColor.color,
              backgroundColor: tagColor.bg,
              borderColor: tagColor.border,
            }}
          >
            {news.tags[0]}
          </span>
        )}
        <h2 className="font-ttNormsPro font-bold text-[22px] leading-[1.2] text-ink mb-2 line-clamp-2">
          {news.title}
        </h2>
        <p className="text-[13px] text-muted leading-[1.6] line-clamp-2 mb-3">
          {news.lead}
        </p>
        <div className="flex justify-between items-center">
          {news.created_at && (
            <span className="text-[9px] tracking-[0.1em] text-white/40 font-mono">
              {formatDate(news.created_at)}
            </span>
          )}
          <span className="text-[7px] tracking-[0.16em] uppercase rounded-full text-accent border border-[rgba(230,51,41,0.4)] px-3 py-1.5 group-hover:bg-accent group-hover:text-white transition-all duration-300 inline-block">
            Дэлгэрэнгүй →
          </span>
        </div>
      </div>
    </Link>
  );
}

function ListCard({ news, index }: { news: News; index: number }) {
  const tagColor = TAG_COLORS[index % 5] ?? TAG_COLORS[0];
  return (
    <Link
      href={`/news/${news.slug}`}
      className="group flex items-center gap-3 px-4 py-3 border-b border-border hover:bg-surface transition-colors"
    >
      <div className="relative w-[72px] h-[72px] rounded-lg overflow-hidden flex-shrink-0">
        {news.image_url ? (
          <Image
            src={news.image_url}
            alt={news.title}
            fill
            className="object-cover group-hover:scale-110 transition-all duration-500"
            sizes="72px"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0518] to-[#160a28]" />
        )}
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
        <div>
          {news.tags?.[0] && (
            <span
              className="text-[7px] tracking-[0.12em] uppercase rounded-full border px-1.5 py-[2px] inline-block mb-1"
              style={{
                color: tagColor.color,
                backgroundColor: tagColor.bg,
                borderColor: tagColor.border,
              }}
            >
              {news.tags[0]}
            </span>
          )}
          <h3 className="font-ttNormsPro text-[14px] leading-[1.3] text-ink line-clamp-2">
            {news.title}
          </h3>
        </div>
        <div className="flex justify-between items-center mt-2">
          {news.created_at && (
            <span className="text-[9px] text-white/40 font-mono">
              {formatDate(news.created_at)}
            </span>
          )}
          <span className="text-[8px] tracking-[0.12em] uppercase rounded-full text-accent border border-[rgba(230,51,41,0.4)] px-3 py-1">
            Унших →
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function MobileNewsList({ news }: { news: News[] }) {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting)
          setVisible((v) => Math.min(v + PAGE_SIZE, news.length));
      },
      { rootMargin: "300px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [news.length]);

  if (!news.length) return null;
  const items = news.slice(0, visible);

  return (
    <div className="pb-2">
      <FeaturedCard news={items[0]} index={0} />
      <div className="mt-1">
        {items.slice(1).map((n, i) => (
          <ListCard key={n.id} news={n} index={i + 1} />
        ))}
      </div>

      {visible < news.length && (
        <div
          ref={sentinelRef}
          className="flex items-center justify-center py-6 gap-1"
        >
          <span
            className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"
            style={{ animationDelay: "0ms" }}
          />
          <span
            className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"
            style={{ animationDelay: "150ms" }}
          />
          <span
            className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      )}
    </div>
  );
}
