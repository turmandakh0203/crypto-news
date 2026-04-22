type Props = {
  sectionLabel: string;
  line1: string;
  line2: string;
  desc: string;
  index?: number;
};

export default function SectionBanner({
  sectionLabel,
  line1,
  line2,
  desc,
  index = 0,
}: Props) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <div className="relative border-b border-border px-5 py-8 md:px-10 md:py-10 bg-bg overflow-hidden flex items-center justify-between gap-4">
      <div className="corner-tl" />
      <div className="corner-br" />

      {/* Accent radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, var(--section-glow) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-[640px] px-1">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-3 h-[1px] bg-accent" />
          <span className="text-[7px] md:text-[9px] tracking-[0.24em] uppercase text-accent font-ttNormsPro">
            {sectionLabel}
          </span>
        </div>

        <h2 className="font-ttNormsPro font-bold text-[42px] md:text-[72px] leading-[1] text-ink">
          {line1}
          <br />
          <span className="text-accent">{line2}</span>
        </h2>

        <p className="text-[13px] text-muted font-ttNormsPro mt-5 leading-[1.4] line-clamp-2">
          {desc}
        </p>
      </div>

      {/* Том faded дугаар — баруун тал */}
      <div
        className="block flex-shrink-0 select-none pointer-events-none relative z-0"
        style={{
          fontFamily: "var(--font-ttNormsPro)",
          fontSize: "clamp(100px, 18vw, 220px)",
          fontWeight: 800,
          lineHeight: 1,
          color: "transparent",
          WebkitTextStroke: "2px var(--section-num-stroke)",
          letterSpacing: "-0.04em",
        }}
      >
        {num}
      </div>
    </div>
  );
}
