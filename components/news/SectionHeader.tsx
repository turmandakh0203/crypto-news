import SearchButton from "./SearchButton";

export default function SectionHeader() {
  const now = new Date().toISOString().slice(0, 10);

  return (
    <div className="hidden md:flex sticky md:top-0 z-20 items-center h-14 border-b border-border bg-bg">
      <div className="w-[3px] h-full bg-accent flex-shrink-0" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, var(--section-glow) 0%, transparent 40%)",
        }}
      />
      <span className="font-bebas text-[18px] tracking-[0.14em] text-ink px-4 flex items-center">
        Криптологи
      </span>
      <div className="flex-1 h-px bg-faint" />
      <div className="flex items-stretch px-2">
        <span className="hidden sm:flex px-4 items-center text-[10px] tracking-[0.12em] text-muted font-mono">
          {now}
        </span>
        <SearchButton />
      </div>
    </div>
  );
}
