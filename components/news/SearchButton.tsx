"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { SearchIcon } from "../icons";

const SearchModal = dynamic(() => import("./SearchModal"), { ssr: false });

export default function SearchButton({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-3 py-1 bg-bg/85 rounded-full border border-ink/80 flex items-center gap-1.5 text-[10px] tracking-[0.14em] uppercase text-ink/70 font-bebas font-bold transition-colors"
      >
        <SearchIcon className="w-3 h-3.5 text-ink/80" />
        <span className="hidden sm:inline text-ink/80">Хайх...</span>
      </button>
      {open && <SearchModal onClose={() => setOpen(false)} />}
    </>
  );
}
