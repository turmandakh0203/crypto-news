"use client";
import { useState, useEffect, useRef } from "react";
import type { News } from "@/types/news";
import GridCard from "@/components/news/GridCard";
import { loadMoreCategoryNews } from "@/lib/actions";
import { LOAD_MORE_SIZE } from "@/lib/supabase";

type Props = { category: string; startPage: number };

export default function DesktopLoadMore({ category, startPage }: Props) {
  const [items, setItems] = useState<News[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const pageRef = useRef(startPage);
  const loadingRef = useRef(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting || loadingRef.current) return;
        loadingRef.current = true;
        const { news, hasMore: more } = await loadMoreCategoryNews(
          category,
          pageRef.current,
          LOAD_MORE_SIZE,
        );
        setItems((prev) => [...prev, ...news]);
        pageRef.current += 1;
        setHasMore(more);
        loadingRef.current = false;
      },
      { rootMargin: "300px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [category]);

  return (
    <>
      {items.length > 0 && (
        <div className="grid grid-cols-3 gap-px mt-px">
          {items.map((n, i) => (
            <GridCard news={n} key={n.id} index={i} />
          ))}
        </div>
      )}
      {hasMore && <div ref={sentinelRef} className="h-2" />}
    </>
  );
}
