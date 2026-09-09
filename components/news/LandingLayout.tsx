"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import ThemeToggle from "@/components/ThemeToggle";
import SearchButton from "@/components/news/SearchButton";
import {
  HomeIcon,
  LockIcon,
  NewspaperIcon,
  ChartBarIcon,
  CodeIcon,
} from "@/components/icons";
import type { Category } from "@/types/news";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  LockIcon,
  NewspaperIcon,
  ChartBarIcon,
  CodeIcon,
};

// Мобайл цэсний (Sheet) доод хэсэгт зориулсан бяцхан "footer". SectionFooter
// бол өгөгдөл татдаг async Server Component, харин энэ файл "use client" тул
// SectionFooter-ийг энд шууд импортлож болохгүй (build эвдэнэ) — тиймээс
// зөвхөн статик холбоосуудыг энд тусад нь давхардуулав.
const MOBILE_SHEET_LINKS = [
  { label: "Бидний тухай", href: "/about" },
  { label: "Холбоо барих", href: "/contact" },
  { label: "Нууцлалын бодлого", href: "/privacy" },
  { label: "Үйлчилгээний нөхцөл", href: "/terms" },
];

type Props = {
  children: React.ReactNode;
  activeCategory?: string;
  categories?: Category[];
};

function LandingLayoutInner({
  children,
  activeCategory,
  categories = [],
}: Props) {
  const router = useRouter();
  const pathname = usePathname();

  // Header nav highlighting follows the current route only — a category is
  // "active" when the page itself represents that category (passed in via
  // activeCategory), not while merely scrolling past it on the /news feed.
  const active = activeCategory ?? "";
  const [mounted, setMounted] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  const [headerHidden, setHeaderHidden] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (typeof window !== "undefined") {
      history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHeaderHidden(y > lastY && y > 60);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const logo =
    mounted && resolvedTheme === "light"
      ? "/ciphernews_icon_dark.svg"
      : "/ciphernews_icon_white.svg";

  const handleLogoClick = () => {
    if (pathname === "/news") window.scrollTo({ top: 0, behavior: "smooth" });
    else router.push("/news");
  };

  return (
    <div className="min-h-screen bg-bg text-ink flex flex-col">
      {/* ── Top navigation header ── */}
      <header
        className={`sticky top-0 z-20 border-b border-border transition-transform duration-300 bg-surface/80 backdrop-blur-2xl ${headerHidden ? "-translate-y-full" : ""}`}
      >
        {/* Top accent gradient line */}
        <div
          className="absolute inset-x-0 top-0 h-[2px]"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, #e63329 30%, #ff6b35 60%, transparent 100%)",
          }}
        />

        <div className="flex items-center h-14 gap-3 max-w-[1400px] mx-auto px-2 md:px-4">
          {/* Mobile hamburger */}
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger className="md:hidden flex items-center justify-center w-8 h-8 text-ink">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M2 4h14M2 9h14M2 14h14"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </SheetTrigger>
            <SheetContent
              side="left"
              showCloseButton={false}
              className="w-72 bg-bg border-border p-0 flex flex-col"
            >
              {/* Sheet header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                <button
                  onClick={handleLogoClick}
                  className="flex items-center gap-2"
                >
                  <img src={logo} alt="Logo" className="w-6 h-6" />
                  <span
                    className="text-[14px] font-ttNormsPro font-bold tracking-[0.12em] grid justify-items-start"
                    style={{ lineHeight: 1 }}
                  >
                    <span className="text-ink">CRYPTO</span>
                    <span className="text-accent">NEWS</span>
                  </span>
                </button>
                <SheetClose className="text-muted hover:text-ink transition-colors">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M2 2l12 12M14 2L2 14"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </SheetClose>
              </div>
              {/* Sheet nav items */}
              <nav className="flex flex-col px-3 py-4 gap-1">
                {/* <button
                  onClick={() => {
                    handleLogoClick();
                    setSheetOpen(false);
                  }}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg text-[12px] tracking-[0.08em] uppercase font-ttNormsPro font-semibold transition-colors ${
                    active === ""
                      ? "text-accent bg-accent/10"
                      : "text-ink hover:bg-surface"
                  }`}
                >
                  <HomeIcon className="w-4 h-4" />
                  Нүүр
                </button> */}
                {categories.map((cat) => {
                  const Icon = ICON_MAP[cat.icon ?? ""] ?? NewspaperIcon;
                  const label = cat.nav_label ?? cat.name;
                  const isActive = active === cat.name;
                  return (
                    <Link
                      key={cat.id}
                      href={`/category/${cat.slug}`}
                      onClick={() => setSheetOpen(false)}
                      className={`flex items-center gap-3 px-3 py-3 rounded-lg border-l-2 text-[12px] tracking-[0.08em] uppercase font-ttNormsPro font-bold transition-all duration-200 focus:outline-none focus:scale-105 ${
                        isActive
                          ? "text-accent bg-accent/10 border-accent"
                          : "text-ink hover:bg-surface border-transparent focus:text-accent focus:bg-accent/10"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                    </Link>
                  );
                })}
              </nav>

              {/* Sheet footer — доод хэсгийн хоосон зайг дүүргэнэ */}
              <div className="mt-auto px-5 py-4 border-t border-border">
                <ul className="flex flex-col gap-2 mb-4">
                  {MOBILE_SHEET_LINKS.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setSheetOpen(false)}
                        className="text-[12px] text-muted hover:text-ink font-ttNormsPro transition-colors flex items-center gap-1 group"
                      >
                        <div className="w-2 h-[1.5px] bg-accent" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <span className="text-[10px] tracking-[0.1em] text-muted font-ttNormsPro uppercase">
                  © 2024–{new Date().getFullYear()} · Crypto News
                </span>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-2 flex-shrink-0 group"
          >
            <img
              src={logo}
              alt="Logo"
              className="w-8 h-8 group-hover:scale-110 transition-transform duration-200 md:block hidden"
            />
            <span
              className="text-[15px] font-ttNormsPro font-bold tracking-[0.12em] grid justify-items-start"
              style={{ lineHeight: 1 }}
            >
              <span className="text-ink">CRYPTO</span>
              <span className="text-accent">NEWS</span>
            </span>
          </button>

          {/* Desktop category nav */}
          <nav className="hidden md:flex items-center justify-center flex-1">
            {/* <button
              onClick={handleLogoClick}
              className={`relative px-3 h-14 text-[13px] tracking-[0.1em] uppercase font-ttNormsPro font-semibold transition-all duration-200 ${
                active === ""
                  ? "text-accent"
                  : "text-ink hover:text-muted hover:bg-surface/60 rounded"
              }`}
            >
              Нүүр
              {active === "" && (
                <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-accent rounded-full" />
              )}
            </button> */}
            {categories.map((cat) => {
              const label = cat.nav_label ?? cat.name;
              const isActive = active === cat.name;
              return (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  className={`group relative px-8 h-14 flex items-center text-[15px] tracking-[0.1em] font-ttNormsPro font-medium transition-all duration-200${
                    isActive
                      ? "text-accent"
                      : "text-ink hover:text-accent hover:scale-110 rounded"
                  }`}
                >
                  {label}
                  {/* Идэвхтэй ангилал БОЛОН focus орсон үед харагдана —
                      үргэлж DOM-д байгаа тул CSS transition ажиллана */}
                  <span
                    className={`absolute bottom-0 left-3 right-3 h-[2px] bg-accent rounded-full origin-center transition-all duration-300 ${
                      isActive
                        ? "opacity-100 scale-x-100"
                        : "opacity-0 scale-x-0 group-focus:opacity-100 group-focus:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3 ml-auto">
            <SearchButton />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* ── Main content ── */}
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}

export default function LandingLayout(props: Props) {
  return <LandingLayoutInner {...props} />;
}
