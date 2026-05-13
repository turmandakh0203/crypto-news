"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type TickerItem = { title: string; slug: string };

export default function NewsTicker() {
  const [items, setItems] = useState<TickerItem[]>([]);

  useEffect(() => {
    fetch("/api/ticker")
      .then((r) => r.json())
      .then(setItems)
      .catch(() => {});
  }, []);

  if (items.length === 0) return null;

  const doubled = [...items, ...items];

  return (
    <div className="bg-accent h-7 flex items-center overflow-hidden relative z-50 select-none">
      {/* Зүүн тал — ШИНЭ МЭДЭЭ шошго */}
      <div className="flex-shrink-0 flex items-center gap-2 px-3 h-full bg-black/20 border-r border-white/20 z-10">
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
        <span className="text-[9px] tracking-[0.22em] uppercase font-ttNormsPro font-bold text-white whitespace-nowrap">
          Шинэ мэдээ
        </span>
      </div>

      {/* Гүйдэг хэсэг */}
      <div className="flex-1 overflow-hidden">
        <div className="flex animate-ticker whitespace-nowrap">
          {doubled.map((item, i) => (
            <Link
              key={i}
              href={`/news/${item.slug}`}
              className="inline-flex items-center gap-3 px-5 text-[11px] tracking-[0.08em] font-ttNormsPro uppercase text-white font-semi-bold hover:text-white transition-colors shrink-0"
            >
              <span className="text-white text-[8px]">►</span>
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
