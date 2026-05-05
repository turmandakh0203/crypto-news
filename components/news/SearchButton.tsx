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
        className="px-3 py-1 bg-faint rounded-full border border-muted flex items-center gap-1.5 text-[10px] tracking-[0.14em] uppercase text-ink/70 font-bebas transition-colors"
      >
        <SearchIcon className="w-3 h-3.5 text-muted" />
        <span className="hidden sm:inline text-muted">Хайх...</span>
      </button>
      {open && <SearchModal onClose={() => setOpen(false)} />}
    </>
  );
}
