"use client";
import { useEffect, useState } from "react";
import { EyeIconDark } from "@/components/icons";

type Props = { newsId: number; initialCount: number };

export default function ViewCount({ newsId, initialCount }: Props) {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    const t = setTimeout(() => {
      fetch(`/api/views/${newsId}`)
        .then((r) => r.json())
        .then(({ count: c }: { count: number }) => setCount(c))
        .catch(() => {});
    }, 1500);
    return () => clearTimeout(t);
  }, [newsId]);

  return (
    <span className="text-[11px] font-mono font-semibold tracking-[0.1em] text-[#f0ece0]/70 flex items-center gap-1">
      <EyeIconDark className="w-3 h-3" />
      {count}
    </span>
  );
}
