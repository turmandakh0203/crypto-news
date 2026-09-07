import { EncryptedText } from "../ui/encrypted-text";

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
      <div className="flex items-center gap-3 py-3 mx-auto max-w-[1400px] px-4 md:px-8">
        <div className="w-[3px] h-4 bg-accent flex-shrink-0" />
        <span className="text-[9px] tracking-[0.22em] uppercase text-accent font-ttNormsPro font-semibold">
          {sectionLabel}
        </span>
        <span className="w-[1px] h-4 bg-muted/40" />

        <h2 className="font-ttNormsPro font-bold text-[15px] md:text-[17px] tracking-[0.03em] text-ink leading-none">
          <EncryptedText
            text={line1 + (line2 ? ` ${line2}` : "")}
            encryptedClassName="text-neutral-500"
            revealedClassName="dark:text-white text-black"
            revealDelayMs={70}
          />
        </h2>
      </div>
    </div>
  );
}
