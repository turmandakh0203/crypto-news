import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Хуудас олдсонгүй | Crypto News",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg text-ink flex flex-col items-center justify-center px-6">
      {/* Top accent line */}
      <div
        className="fixed inset-x-0 top-0 h-[2px]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #e63329 30%, #ff6b35 60%, transparent 100%)",
        }}
      />

      <div className="max-w-[480px] w-full text-center">
        {/* 404 number */}
        <div
          className="font-ttNormsPro font-bold text-[120px] md:text-[160px] leading-none mb-4 select-none"
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgba(230,51,41,0.6) 0%, rgba(230,51,41,0.12) 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          404
        </div>

        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="w-8 h-[1.5px] bg-accent" />
          <span className="text-[10px] tracking-[0.22em] uppercase text-accent font-ttNormsPro font-semibold">
            Хуудас олдсонгүй
          </span>
          <div className="w-8 h-[1.5px] bg-accent" />
        </div>

        <p className="text-[14px] text-muted leading-[1.85] font-ttNormsPro mb-10">
          Таны хайсан хуудас устсан эсвэл шилжсэн байна.
          <br />
          Нүүр хуудас руу буцаж үргэлжлүүлнэ үү.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase font-ttNormsPro font-semibold text-white bg-accent border border-accent rounded-full px-6 py-2.5 hover:bg-accent/80 transition-all duration-300"
          >
            Нүүр хуудас →
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase font-ttNormsPro font-semibold text-accent border border-accent/40 rounded-full px-6 py-2.5 hover:bg-accent hover:text-white transition-all duration-300"
          >
            Бидний тухай
          </Link>
        </div>
      </div>

      {/* Bottom logo */}
      <div className="absolute bottom-8 flex items-center gap-2 opacity-30">
        <span className="font-ttNormsPro font-bold text-[13px] tracking-[0.12em] text-ink">
          CRYPTO<span className="text-accent">NEWS</span>
        </span>
      </div>
    </div>
  );
}
