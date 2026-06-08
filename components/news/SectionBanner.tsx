type Props = {
  sectionLabel: string;
  line1: string;
  line2: string;
  desc: string;
  index?: number;
};

export default function SectionBanner({ sectionLabel, line1, line2 }: Props) {
  return (
    <div className="border-b border-border bg-bg">
      <div className="flex items-center gap-3 px-5 py-3 md:px-[84px]">
        <div className="w-[3px] h-4 bg-accent flex-shrink-0" />
        <span className="text-[9px] tracking-[0.22em] uppercase text-accent font-ttNormsPro font-semibold">
          {sectionLabel}
        </span>
        <span className="w-[1px] h-4 bg-muted/40" />
        <h2 className="font-ttNormsPro font-bold text-[15px] md:text-[17px] tracking-[0.03em] text-ink leading-none">
          {line1}
          {line2 && <span className="text-accent"> {line2}</span>}
        </h2>
      </div>
    </div>
  );
}
