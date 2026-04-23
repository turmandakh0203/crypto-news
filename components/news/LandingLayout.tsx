"use client";
import { Suspense, useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
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

const NAV_CATEGORIES = ["Криптограф", "Мэдээ", "Криптоанализ", "Кодлол"];

type Props = { children: React.ReactNode; activeCategory?: string };

function ScrollHandler() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const section = searchParams.get("scroll");
    if (!section) return;
    const el = document.querySelector<HTMLElement>(
      `[data-section="${section}"]`,
    );
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 36;
    window.scrollTo({ top, behavior: "smooth" });
    window.history.replaceState(null, "", "/news");
  }, [searchParams]);

  return null;
}

function LandingLayoutInner({ children, activeCategory }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const [active, setActive] = useState(activeCategory ?? "");
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (typeof window !== "undefined") {
      history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => setMounted(true), []);
  const logo =
    mounted && resolvedTheme === "light"
      ? "/ciphernews_icon_dark.svg"
      : "/ciphernews_icon_white.svg";

  useEffect(() => {
    if (pathname !== "/news") return;
    const sections = document.querySelectorAll<HTMLElement>("[data-section]");
    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const key = entry.target.getAttribute("data-section") ?? "";
          if (entry.isIntersecting) {
            visible.set(key, entry.intersectionRatio);
          } else {
            visible.delete(key);
          }
        });
        if (visible.size === 0) {
          setActive("");
        } else {
          const best = [...visible.entries()].reduce((a, b) =>
            a[1] > b[1] ? a : b,
          );
          setActive(best[0]);
        }
      },
      { threshold: [0.1, 0.3, 0.5], rootMargin: "-10% 0px -40% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [pathname]);

  const handleLogoClick = () => {
    if (pathname === "/news") window.scrollTo({ top: 0, behavior: "smooth" });
    else router.push("/news");
  };

  const handleCategoryClick = (key: string) => {
    if (pathname !== "/news") {
      router.push(`/news?scroll=${encodeURIComponent(key)}`);
      return;
    }
    const el = document.querySelector<HTMLElement>(`[data-section="${key}"]`);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 36;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-bg text-ink flex flex-col md:flex-row">
      <Suspense fallback={null}>
        <ScrollHandler />
      </Suspense>

      {/* ── Mobile top bar ── */}
      <header className="md:hidden sticky top-0 z-20 bg-bg border-b border-border">
        <div className="flex items-center justify-between px-3 h-12">
          <button onClick={handleLogoClick} className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="w-6 h-6" />
            <span className="text-[12px] font-ttNormsPro font-bold tracking-[0.18em] text-ink">
              CRYPTO<span className="text-accent">NEWS</span>
            </span>
          </button>
          <div className="flex items-center gap-2">
            <SearchButton />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* ── Mobile bottom tab bar ── */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-bg border-t border-border flex"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <button
          onClick={handleLogoClick}
          className={`flex-1 flex flex-col items-center justify-center py-2 gap-0.5 transition-colors ${
            active === "" ? "text-accent" : "text-muted hover:text-ink"
          }`}
        >
          <HomeIcon className="w-5 h-5" />
          <span className="text-[8px] tracking-[0.06em] uppercase font-ttNormsPro">
            Нүүр
          </span>
        </button>
        {[
          { key: "Криптограф", label: "Крипто", Icon: LockIcon },
          { key: "Мэдээ", label: "Мэдээ", Icon: NewspaperIcon },
          { key: "Криптоанализ", label: "Анализ", Icon: ChartBarIcon },
          { key: "Кодлол", label: "Кодлол", Icon: CodeIcon },
        ].map(({ key, label, Icon }) => (
          <button
            key={key}
            onClick={() => handleCategoryClick(key)}
            className={`flex-1 flex flex-col items-center justify-center py-2 gap-0.5 transition-colors ${
              active === key ? "text-accent" : "text-muted hover:text-ink"
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[8px] tracking-[0.06em] uppercase font-ttNormsPro">
              {label}
            </span>
          </button>
        ))}
      </nav>

      {/* ── Зүүн sidebar (desktop) ── */}
      <aside
        className={`hidden md:flex group/sidebar flex-shrink-0 border-r border-border sticky top-0 h-screen flex-col z-20 overflow-hidden transition-[width] duration-300 ease-in-out ${
          pathname === "/news" ? "w-[60px] hover:w-[180px]" : "w-[180px]"
        }`}
      >
        {/* Лого */}
        <div className="px-2.5 py-2 border-b border-border flex items-center gap-3 min-w-[180px]">
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-3 group/logo"
          >
            <img src={logo} alt="Logo" className="w-10 h-10 flex-shrink-0" />
            <div
              className={`flex flex-col leading-none transition-opacity duration-100 gap-2 delay-100 ${pathname === "/news" ? "opacity-0 group-hover/sidebar:opacity-100" : "opacity-100"}`}
            >
              <span className="text-[13px] font-ttNprmsPro font-bold tracking-[0.18em] text-ink group-hover/logo:text-accent transition-colors whitespace-nowrap">
                CRYPTO
              </span>
              <span className="text-[11px] font-ttNprmsPro font-bold tracking-[0.18em] text-accent mt-[1px] whitespace-nowrap">
                NEWS
              </span>
            </div>
          </button>
        </div>

        {/* Навигаци */}
        <nav className="flex flex-col flex-1 py-3 min-w-[180px]">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 10% 40%, var(--section-glow) 0%, transparent 60%)",
            }}
          />
          {NAV_CATEGORIES.map((cat, i) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`group/item relative flex items-center gap-2 px-5 py-3 transition-all duration-200 border-l-2 text-left ${
                cat === active
                  ? "border-accent bg-accent/5"
                  : "border-transparent hover:border-accent/50 hover:bg-surface"
              }`}
            >
              <span
                className={`text-[11px] font-ttNormsPro tracking-[0.1em] w-5 flex-shrink-0 font-semibold ${
                  cat === active ? "text-accent" : "text-muted"
                }`}
              >
                0{i + 1}
              </span>
              <span
                className={`text-[11px] tracking-[0.08em] uppercase font-ttNormsPro transition-colors duration-200 whitespace-nowrap delay-100 ${
                  pathname === "/news"
                    ? "opacity-0 group-hover/sidebar:opacity-100"
                    : "opacity-100"
                } ${cat === active ? "text-accent" : "text-muted group-hover/item:text-ink"}`}
              >
                {cat}
              </span>
              {cat === active && (
                <div
                  className={`ml-auto w-1 h-1 rounded-full bg-accent flex-shrink-0 transition-opacity delay-100 ${pathname === "/news" ? "opacity-0 group-hover/sidebar:opacity-100" : "opacity-100"}`}
                />
              )}
            </button>
          ))}
        </nav>

        {/* Theme toggle */}
        <div className="px-1 flex items-center h-14 gap-3 border-t border-[var(--border)]  min-w-[180px]">
          <ThemeToggle />
          <span
            className={`text-[11px] tracking-[0.08em] uppercase font-ttNormsPro text-muted whitespace-nowrap transition-opacity duration-200 delay-100 ${
              pathname === "/news"
                ? "opacity-0 group-hover/sidebar:opacity-100"
                : "opacity-100"
            }`}
          >
            {resolvedTheme === "dark" ? "Dark mode on" : "Light mode on"}
          </span>
        </div>
      </aside>

      {/* ── Агуулга ── */}
      <div className="flex-1 min-w-0 pb-16 md:pb-0">{children}</div>
    </div>
  );
}

export default function LandingLayout(props: Props) {
  return <LandingLayoutInner {...props} />;
}
