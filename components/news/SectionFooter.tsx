export default function SectionFooter() {
  return (
    <div className="px-4 pt-4 flex flex-col sm:flex-row items-center sm:gap-4 border-t-[1px] border-accent bg-bg min-h-14">
      <span className="text-[10px] tracking-[0.15em] uppercase text-muted font-bebas">
        Crypto News — Криптологийн мэдээллийн эх сурвалж
      </span>
      <div className="hidden sm:block flex-1 h-px bg-border" />
      <span className="text-[10px] tracking-[0.15em] uppercase text-muted font-bebas">
        © 2023-2026 · v2.0.1 · Улаанбаатар
      </span>
      <span className="text-[10px] tracking-[0.15em] text-muted font-ttnormspro flex items-center gap-1">
        (Made with ❤️ by <span className="text-accent">IHAW</span>)
      </span>
    </div>
  );
}
