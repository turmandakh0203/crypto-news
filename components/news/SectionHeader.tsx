"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { SearchIcon } from "../icons";

const SearchModal = dynamic(() => import("./SearchModal"), { ssr: false });

export default function SectionHeader({ title }: { title: string }) {
  const [open, setOpen] = useState(false);
  const now = new Date().toISOString().slice(0, 10);

  return (
    <>
      <div className="relative flex items-center h-10 border-b border-border bg-bg">
        <div className="w-[3px] h-full bg-accent flex-shrink-0" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, var(--section-glow) 0%, transparent 40%)",
          }}
        />
        <span className="font-bebas text-[18px] tracking-[0.14em] text-ink px-4 flex items-center">
          {title}
        </span>
        <div className="flex-1 h-px bg-faint" />
        <div className="flex items-stretch px-2">
          <span className="hidden sm:flex px-4 items-center text-[10px] tracking-[0.12em] text-muted font-mono">
            {now}
          </span>
          <button
            onClick={() => setOpen(true)}
            className="px-3 py-1.5 rounded-full border border-border flex items-center gap-1.5 text-[10px] tracking-[0.14em] uppercase text-muted font-bebas hover:text-ink hover:bg-surface transition-colors"
          >
            <SearchIcon className="w-2.5 h-2.5 text-ink/70" />
            <span className="hidden sm:inline">Хайх</span>
          </button>
        </div>
      </div>

      {open && <SearchModal onClose={() => setOpen(false)} />}
    </>
  );
}
