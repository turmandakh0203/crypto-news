"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { SearchIcon } from "../icons";

const SearchModal = dynamic(() => import("./SearchModal"), { ssr: false });

export default function SearchButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-3 py-1.5 rounded-full border border-ink/70 flex items-center gap-1.5 text-[10px] tracking-[0.14em] uppercase text-ink/70 font-bebas hover:text-ink hover:bg-surface transition-colors"
      >
        <SearchIcon className="w-3 h-3 text-ink/70" />
        <span className="hidden sm:inline">Хайх</span>
      </button>
      {open && <SearchModal onClose={() => setOpen(false)} />}
    </>
  );
}
