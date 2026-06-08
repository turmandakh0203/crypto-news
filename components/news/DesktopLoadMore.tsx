"use client";
import { useState, useRef } from "react";
import type { News } from "@/types/news";
import GridCard from "@/components/news/GridCard";
import { loadMoreCategoryNews } from "@/lib/actions";
import { LOAD_MORE_SIZE } from "@/lib/supabase";

type Props = {
  category: string;
  startOffset: number;
  initialHasMore?: boolean;
};

export default function DesktopLoadMore({
  category,
  startOffset,
  initialHasMore = true,
}: Props) {
  const [items, setItems] = useState<News[]>([]);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loading, setLoading] = useState(false);
  const offsetRef = useRef(startOffset);

  async function handleLoadMore() {
    if (loading) return;
    setLoading(true);
    const { news, hasMore: more } = await loadMoreCategoryNews(
      category,
      offsetRef.current,
      LOAD_MORE_SIZE,
    );
    setItems((prev) => [...prev, ...news]);
    offsetRef.current += news.length;
    setHasMore(more);
    setLoading(false);
  }

  return (
    <>
      {items.length > 0 && (
        <div className="grid grid-cols-3 gap-px mt-px px-20">
          {items.map((n, i) => (
            <GridCard news={n} key={n.id} index={i} />
          ))}
        </div>
      )}
      {hasMore && (
        <div className="flex justify-center pt-4">
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="text-[10px] tracking-[0.14em] uppercase font-ttNormsPro font-semibold text-accent rounded-2xl border border-accent/40 px-6 py-2 hover:bg-accent hover:text-white transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? "Уншиж байна..." : `Цааш мэдээ унших →`}
          </button>
        </div>
      )}
    </>
  );
}
