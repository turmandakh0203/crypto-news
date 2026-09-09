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
        className="px-1 py-1 bg-bg/85 flex items-center gap-1 text-[11px] tracking-[0.14em] text-ink/70 font-ttNormsPro font-medium transition-colors"
      >
        <SearchIcon className="w-4 h-4 text-ink" />
        {/* <span className="hidden sm:inline text-ink">Мэдээ хайх...</span> */}
      </button>
      {open && <SearchModal onClose={() => setOpen(false)} />}
    </>
  );
}
