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
import type { Category } from "@/types/news";
import NewsTicker from "@/components/news/NewsTicker";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  LockIcon,
  NewspaperIcon,
  ChartBarIcon,
  CodeIcon,
};

type Props = {
  children: React.ReactNode;
  activeCategory?: string;
  categories?: Category[];
};

function ScrollHandler() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const section = searchParams.get("scroll");
    if (!section) return;
    let attempts = 0;
    const tryScroll = () => {
      const el = document.querySelector<HTMLElement>(
        `[data-section="${section}"]`,
      );
      if (!el) {
        if (++attempts < 20) setTimeout(tryScroll, 100);
        return;
      }
      const top = el.getBoundingClientRect().top + window.scrollY - 36;
      window.scrollTo({ top, behavior: "smooth" });
      window.history.replaceState(null, "", "/news");
    };
    tryScroll();
  }, [searchParams]);

  return null;
}

function LandingLayoutInner({
  children,
  activeCategory,
  categories = [],
}: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const [active, setActive] = useState(activeCategory ?? "");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (activeCategory && pathname !== "/news") setActive(activeCategory);
  }, [activeCategory, pathname]);
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
    <div className="min-h-screen bg-bg text-ink flex flex-col">
      <NewsTicker />
      <div className="flex flex-col md:flex-row flex-1">
        <Suspense fallback={null}>
          <ScrollHandler />
        </Suspense>

        {/* ── Mobile top bar ── */}
        <header
          className={`md:hidden sticky top-0 z-20 bg-bg border-b border-border py-2 transition-transform duration-300 ${headerHidden ? "-translate-y-full" : ""}`}
        >
          <div className="flex items-center justify-between px-3 h-11">
            <button
              onClick={handleLogoClick}
              className="flex items-center gap-2"
            >
              <img src={logo} alt="Logo" className="w-7 h-7" />
              <span
                className="text-[16px] font-ttNormsPro font-bold tracking-[0.12em] grid justify-items-start"
                style={{ lineHeight: 1 }}
              >
                <span className="text-ink">CRYPTO</span>
                <span className="text-accent">NEWS</span>
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
          {categories.map((cat) => {
            const Icon = ICON_MAP[cat.icon ?? ""] ?? NewspaperIcon;
            const label = cat.nav_label ?? cat.name;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.name)}
                className={`flex-1 flex flex-col items-center justify-center py-2 gap-0.5 transition-colors ${
                  active === cat.name
                    ? "text-accent"
                    : "text-muted hover:text-ink"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[8px] tracking-[0.06em] uppercase font-ttNormsPro">
                  {label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* ── Зүүн sidebar (desktop) ── */}
        <aside
          className={`hidden md:flex group/sidebar flex-shrink-0 border-r border-border sticky top-0 h-screen flex-col z-20 overflow-hidden transition-[width] duration-300 ease-in-out ${
            pathname === "/news" ? "w-[48px] hover:w-[180px]" : "w-[180px]"
          }`}
        >
          {/* Лого */}
          <div className="px-1.5 py-2 border-b border-border flex items-center gap-3 min-w-[180px]">
            <button
              onClick={handleLogoClick}
              className="flex items-center gap-3 group/logo"
            >
              <img src={logo} alt="Logo" className="w-9 h-10 flex-shrink-0" />
              <div
                className={`flex flex-col leading-none transition-opacity duration-100 gap-0.5 delay-100 ${pathname === "/news" ? "opacity-0 group-hover/sidebar:opacity-100" : "opacity-100"}`}
              >
                <span className="text-[14px] font-ttNprmsPro font-bold tracking-[0.16em] text-ink transition-colors whitespace-nowrap">
                  CRYPTO
                </span>
                <span className="text-[13px] font-ttNprmsPro font-bold tracking-[0.16em] text-accent mt-[1px] whitespace-nowrap">
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
            {categories.map((cat, i) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.name)}
                className={`group/item relative flex items-center gap-2 px-1.5 py-3 transition-all duration-200 text-left group`}
              >
                <span
                  className={`${cat.name === active ? "w-1 h-[17px] bg-accent" : ""}w-0 group-hover:w-1 h-[17px] bg-accent transition-all duration-200 overflow-hidden`}
                />

                <span
                  className={`text-[11px] font-ttNormsPro tracking-[0.1em] w-5 flex-shrink-0 font-semibold ${
                    cat.name === active ? "text-accent" : "text-muted"
                  }`}
                >
                  0{i + 1}
                </span>
                <span
                  className={`text-[11px] tracking-[0.08em] uppercase font-ttNormsPro transition-colors duration-200 whitespace-nowrap delay-100 ${
                    pathname === "/news"
                      ? "opacity-0 group-hover/sidebar:opacity-100"
                      : "opacity-100"
                  } ${cat.name === active ? "text-accent" : "text-muted group-hover/item:text-ink"}`}
                >
                  {cat.name}
                </span>
                {cat.name === active && (
                  <div
                    className={`ml-auto w-1 h-1 rounded-full bg-accent flex-shrink-0 transition-opacity delay-100 ${pathname === "/news" ? "opacity-0 group-hover/sidebar:opacity-100" : "opacity-100"}`}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Theme toggle */}
          <div className="px-1 flex items-center h-12 gap-3 border-t border-[var(--border)]  min-w-[180px]">
            <ThemeToggle />
            <span
              className={`text-[11px] tracking-[0.08em] uppercase font-ttNormsPro text-muted whitespace-nowrap transition-opacity duration-200 delay-100 ${
                pathname === "/news"
                  ? "opacity-0 group-hover/sidebar:opacity-100"
                  : "opacity-100"
              }`}
            >
              {mounted && resolvedTheme !== "dark"
                ? "Light mode on"
                : "Dark mode on"}
            </span>
          </div>
        </aside>

        {/* ── Агуулга ── */}
        <main className="flex-1 min-w-0 pb-16 md:pb-0">{children}</main>
      </div>
    </div>
  );
}

export default function LandingLayout(props: Props) {
  return <LandingLayoutInner {...props} />;
}
