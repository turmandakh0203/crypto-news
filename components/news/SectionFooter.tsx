import Link from "next/link";

const CATEGORIES = [
  { name: "Криптограф", slug: "Криптограф" },
  { name: "Мэдээ", slug: "Мэдээ" },
  { name: "Криптоанализ", slug: "Криптоанализ" },
  { name: "Кодлол", slug: "Кодлол" },
];

const QUICK_LINKS = [
  { label: "Нүүр хуудас", href: "/news" },
  { label: "Сүүлийн мэдээ", href: "/news" },
];

export default function SectionFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-bg mt-0">
      {/* Accent top line */}
      <div
        className="h-[2px] w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #e63329 40%, #ff9b3c 70%, transparent 100%)",
        }}
      />

      {/* Main footer content */}
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* ── Лого + тайлбар ── */}
          <div className="md:col-span-1">
            <Link href="/news" className="inline-block mb-4 group">
              <span className="font-bebas text-[36px] leading-none tracking-[0.08em] text-ink group-hover:text-accent transition-colors font-semibold">
                КРИПТО
                <span className="text-accent group-hover:text-ink transition-colors">
                  ЛОГИ
                </span>
              </span>
            </Link>
            <p className="text-[13px] text-muted leading-[1.8] tracking-[1.5px] font-ttNormsPro max-w-[260px] mb-6">
              Монгол хэлээр криптографи, криптоанализ болон мэдээллийн аюулгүй
              байдлын мэдлэгийг хүргэх зорилготой мэдээний платформ.
            </p>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-[12px] tracking-[0.14em] text-muted font-ttNormsPro">
                Шинэ мэдээ тогтмол нийтлэгддэг
              </span>
            </div>
          </div>

          {/* ── Ангилалууд ── */}
          <div>
            <h3 className="text-[10px] tracking-[0.2em] uppercase text-muted font-ttNormsPro font-semibold mb-5 flex items-center gap-2">
              <div className="w-2 h-[1.5px] bg-accent" />
              Ангилалууд
            </h3>
            <ul className="space-y-3">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/news?scroll=${encodeURIComponent(cat.slug)}`}
                    className="text-[13px] text-muted hover:text-ink font-ttNormsPro transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-[1px] bg-accent transition-all duration-200 overflow-hidden" />
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Холбоос + мэдээлэл ── */}
          <div>
            <h3 className="text-[10px] tracking-[0.2em] uppercase text-muted font-ttNormsPro font-semibold mb-5 flex items-center gap-2">
              <div className="w-2 h-[1.5px] bg-accent" />
              Холбоос
            </h3>
            <ul className="space-y-3 mb-8">
              {QUICK_LINKS.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-muted hover:text-ink font-ttNormsPro transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-[1px] bg-accent transition-all duration-200 overflow-hidden" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="text-[10px] tracking-[0.2em] uppercase text-muted font-ttNormsPro font-semibold mb-4 flex items-center gap-2">
              <div className="w-2 h-[1.5px] bg-accent" />
              Байршил
            </h3>
            <p className="text-[13px] text-muted font-ttNormsPro leading-[1.7]">
              Улаанбаатар, Монгол Улс
            </p>
          </div>
        </div>
      </div>

      {/* ── Copyright bar ── */}
      <div className="border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6 py-[14.5px] flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="text-[12px] tracking-[0.14em] text-muted font-ttNormsPro uppercase">
            © 2024–{year} · CryptoLogy · v2.1.0
          </span>
          <span className="text-[12px] tracking-[0.1em] text-muted font-ttNormsPro">
            Made with <span className="text-accent">❤️</span> by{" "}
            <span className="text-ink font-semibold">IHAW</span> - Улаанбаатар
          </span>
        </div>
      </div>
    </footer>
  );
}
