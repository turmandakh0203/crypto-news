import { LockIcon, NewspaperIcon, ChartBarIcon, CodeIcon } from "../icons";

// Ангилал бүрийн categories.icon баганад хадгалагдсан утгатай яг тохирно
// (жишээ нь LandingLayout-ийн навигацид ашигладаг ижил утгууд).
const CATEGORY_ICON_MAP: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  LockIcon,
  NewspaperIcon,
  ChartBarIcon,
  CodeIcon,
};

type Props = {
  /** news.category_icon — тухайн мэдээний ангиллын categories.icon утга */
  categoryIcon?: string | null;
  /**
   * Icon-ийн хэмжээ БОЛОН өнгө/тунгалагийг бүрэн тодорхойлно (Tailwind
   * классаар) — карт бүр өөр дэвсгэр давхарга дээр байдаг тул (зарим нь
   * дараа нь хар давхаргаар бүрхэгддэг) opacity-г ч энд шийднэ.
   */
  iconClassName?: string;
  className?: string;
};

// Зураггүй мэдээний карт/hero дээр ашиглах нэгдсэн fallback. Хуучин хоосон
// бараан блокын оронд тухайн мэдээний ангилалд тохирсон icon-ыг гэрэлтүүлж
// харуулснаар "хоосон харагдах" мэдрэмжийг арилгана.
export default function CardFallback({
  categoryIcon,
  iconClassName = "w-10 h-10 text-white/15",
  className = "",
}: Props) {
  const Icon = CATEGORY_ICON_MAP[categoryIcon ?? ""] ?? NewspaperIcon;

  return (
    <div
      className={`absolute inset-0 bg-gradient-to-br from-[#050d18] to-[#0a1628] flex items-center justify-center ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(230,51,41,0.15),transparent_60%)]" />
      <Icon className={`relative ${iconClassName}`} />
    </div>
  );
}
