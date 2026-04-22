"use client";
import { useState } from "react";
import { ShareIcon } from "../icons";

type Props = { title: string; slug: string };

export default function ShareButton({ title, slug }: Props) {
  const [copied, setCopied] = useState(false);

  const url = `${typeof window !== "undefined" ? window.location.origin : ""}/news/${slug}`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {}
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleShare}
        className="flex items-center gap-1.5 text-[10px] tracking-[0.12em] border border-border rounded-full py-1.5 px-3 font-ttNormsPro text-muted hover:text-ink transition-colors group"
      >
        {copied ? (
          <>
            <svg
              width="10"
              height="10"
              viewBox="0 0 12 12"
              fill="none"
              className="text-accent"
            >
              <path
                d="M2 6l3 3 5-5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-accent">Хуулагдлаа</span>
          </>
        ) : (
          <>
            <ShareIcon className="text-ink/70 w-3 h-3" />
            Хуваалцах
          </>
        )}
      </button>
    </div>
  );
}
