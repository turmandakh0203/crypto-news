"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import type { News } from "@/types/news";
import { TAG_COLORS } from "@/types/news";
import { formatDate } from "@/lib/supabase";
import { loadMoreCategoryNews } from "@/lib/actions";
import { LOAD_MORE_SIZE } from "@/lib/supabase";

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
            "linear-gradient(90deg, transparent 0%, #1a5fb4 50%, transparent 100%)",
        }}
      />
      <div className="relative h-52">
        {news.image_url ? (
          <Image
            src={news.image_url}
            alt={news.title}
            fill
            priority={index === 0}
            className="object-cover opacity-80 group-hover:scale-105 transition-all duration-500"
            sizes="calc(100vw - 1rem)"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#050d18] to-[#0a1628]" />
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
            <span className="text-[9px] tracking-[0.1em] text-muted font-mono">
              {formatDate(news.created_at)}
            </span>
          )}
          <span className="text-[7px] tracking-[0.16em] uppercase rounded-full text-accent border border-accent/40 px-3 py-1.5 group-hover:bg-accent group-hover:text-white transition-all duration-300 inline-block">
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
          <div className="absolute inset-0 bg-gradient-to-br from-[#050d18] to-[#0a1628]" />
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
            <span className="text-[9px] text-muted font-mono">
              {formatDate(news.created_at)}
            </span>
          )}
          <span className="text-[8px] tracking-[0.12em] uppercase rounded-full text-accent border border-accent/40 px-3 py-1">
            Унших →
          </span>
        </div>
      </div>
    </Link>
  );
}

type Props = { news: News[]; hasMore?: boolean; category?: string };

export default function MobileNewsList({
  news,
  hasMore = false,
  category = "",
}: Props) {
  const [allItems, setAllItems] = useState(news);
  const [canLoadMore, setCanLoadMore] = useState(hasMore);
  const [loading, setLoading] = useState(false);
  const offsetRef = useRef(news.length);

  async function handleLoadMore() {
    if (loading || !category) return;
    setLoading(true);
    const { news: more, hasMore: nextMore } = await loadMoreCategoryNews(
      category,
      offsetRef.current,
      LOAD_MORE_SIZE,
    );
    setAllItems((prev) => [...prev, ...more]);
    offsetRef.current += more.length;
    setCanLoadMore(nextMore);
    setLoading(false);
  }

  if (!allItems.length) return null;

  return (
    <div className="pb-2">
      <FeaturedCard news={allItems[0]} index={0} />
      <div className="mt-1">
        {allItems.slice(1).map((n, i) => (
          <ListCard key={n.id} news={n} index={i + 1} />
        ))}
      </div>

      {canLoadMore && (
        <div className="flex justify-center pt-4 px-4">
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="w-full text-[10px] tracking-[0.18em] uppercase font-ttNormsPro rounded-2xl font-semibold text-accent border border-accent/40 py-2 hover:bg-accent hover:text-white transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? "Уншиж байна..." : `Дараагийн мэдээнүүд →`}
          </button>
        </div>
      )}
    </div>
  );
}
