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
      const top = el.getBoundingClientRect().top + window.scrollY - 56;
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
    const top = el.getBoundingClientRect().top + window.scrollY - 56;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-bg text-ink flex flex-col">
      <NewsTicker />

      <Suspense fallback={null}>
        <ScrollHandler />
      </Suspense>

      {/* ── Top navigation header ── */}
      <header
        className={`sticky top-0 z-20 border-b border-border transition-transform duration-300 bg-surface/30 backdrop-blur-2xl ${headerHidden ? "-translate-y-full" : ""}`}
      >
        {/* Top accent gradient line */}
        <div
          className="absolute inset-x-0 top-0 h-[2px]"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, #e63329 30%, #ff6b35 60%, transparent 100%)",
          }}
        />

        <div className="flex items-center h-14 px-4 md:px-8 gap-3">
          {/* Logo */}
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-2 flex-shrink-0 group"
          >
            <img
              src={logo}
              alt="Logo"
              className="w-7 h-7 group-hover:scale-110 transition-transform duration-200"
            />
            <span
              className="text-[15px] font-ttNormsPro font-bold tracking-[0.12em] grid justify-items-start"
              style={{ lineHeight: 1 }}
            >
              <span className="text-ink">CRYPTO</span>
              <span className="text-accent">NEWS</span>
            </span>
          </button>

          {/* Divider */}
          <div className="hidden md:block w-px h-5 bg-border mx-1" />

          {/* Desktop category nav */}
          <nav className="hidden md:flex items-center justify-center flex-1">
            <button
              onClick={handleLogoClick}
              className={`relative px-3 h-14 text-[11px] tracking-[0.1em] uppercase font-ttNormsPro font-semibold transition-all duration-200 ${
                active === ""
                  ? "text-accent"
                  : "text-ink hover:text-muted hover:bg-surface/60 rounded"
              }`}
            >
              Нүүр
              {active === "" && (
                <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-accent rounded-full" />
              )}
            </button>
            {categories.map((cat) => {
              const label = cat.nav_label ?? cat.name;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.name)}
                  className={`relative px-3 h-14 text-[11px] tracking-[0.1em] uppercase font-ttNormsPro font-semibold transition-all duration-200 ${
                    active === cat.name
                      ? "text-accent"
                      : "text-ink hover:text-muted hover:bg-surface/60 rounded"
                  }`}
                >
                  {label}
                  {active === cat.name && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-accent rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2 ml-auto">
            <SearchButton />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* ── Main content ── */}
      <main className="flex-1 min-w-0 pb-16 md:pb-0 ">{children}</main>

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
    </div>
  );
}

export default function LandingLayout(props: Props) {
  return <LandingLayoutInner {...props} />;
}
