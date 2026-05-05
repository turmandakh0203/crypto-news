"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

interface Props {
  imageUrl?: string | null;
  alt: string;
  children: React.ReactNode;
}

export default function HeroParallax({ imageUrl, alt, children }: Props) {
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
      className="relative w-full h-[280px] md:h-[430px] overflow-hidden"
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
            sizes="100vw"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#150808] to-[#200c0a]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgba(230,51,41,0.2),transparent_55%)]" />
          </div>
        )}
      </div>
      {children}
    </div>
  );
}
