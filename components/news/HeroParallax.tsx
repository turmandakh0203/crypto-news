"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import CardFallback from "./CardFallback";

interface Props {
  imageUrl?: string | null;
  alt: string;
  categoryIcon?: string | null;
  children: React.ReactNode;
}

export default function HeroParallax({
  imageUrl,
  alt,
  categoryIcon,
  children,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const imgWrap = imgWrapRef.current;
    if (!container || !imgWrap) return;

    const onScroll = () => {
      const rect = container.getBoundingClientRect();
      const scrolled = Math.max(0, -rect.top);
      imgWrap.style.transform = `translateY(${scrolled * 0.35}px)`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative max-w-[1400px] mx-auto h-[280px] md:h-[430px] overflow-hidden"
    >
      <div
        ref={imgWrapRef}
        className="absolute inset-[0%]"
        style={{ willChange: "transform" }}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 1400px) 100vw, 1400px"
            priority
          />
        ) : (
          <CardFallback
            categoryIcon={categoryIcon}
            iconClassName="w-16 h-16 text-white/20"
          />
        )}
      </div>
      {children}
    </div>
  );
}
