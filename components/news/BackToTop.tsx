"use client";
import { useEffect, useRef } from "react";

export default function BackToTop() {
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const toggle = () => {
      const btn = btnRef.current;
      if (!btn) return;
      if (window.scrollY > 400) {
        btn.style.opacity = "1";
        btn.style.transform = "translateY(0)";
        btn.style.pointerEvents = "auto";
      } else {
        btn.style.opacity = "0";
        btn.style.transform = "translateY(1rem)";
        btn.style.pointerEvents = "none";
      }
    };
    window.addEventListener("scroll", toggle, { passive: true });
    return () => window.removeEventListener("scroll", toggle);
  }, []);

  return (
    <button
      ref={btnRef}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Дээш буцах"
      className="fixed bottom-16 right-4 md:bottom-8 md:right-8 z-50 w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center bg-surface/60 border border-border backdrop-blur-sm text-muted hover:border-accent hover:text-accent transition-all duration-300"
      style={{ opacity: 0, transform: "translateY(1rem)", pointerEvents: "none" }}
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      >
        <path d="M6 10V2M2 6l4-4 4 4" />
      </svg>
    </button>
  );
}
