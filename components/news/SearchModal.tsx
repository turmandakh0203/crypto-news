"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { searchNews, type SearchResult } from "@/lib/actions";
import { CrossIcon, SearchIcon } from "../icons";

// "idle" — fewer than 2 characters typed, nothing to show.
// "loading" — a search is pending (debounce or in-flight request).
// "success" — results came back with at least one match.
// "empty" — the search completed but found nothing.
// "error" — the search itself failed (rate-limited or a server error),
//           distinct from a legitimate "no matches" result.
type Status = "idle" | "loading" | "success" | "empty" | "error";

type Props = { onClose: () => void };

export default function SearchModal({ onClose }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const requestIdRef = useRef(0);
  const router = useRouter();

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const search = useCallback(async (q: string) => {
    const requestId = ++requestIdRef.current;
    try {
      const res = await searchNews(q);
      if (requestIdRef.current !== requestId) return; // a newer query superseded this one
      if (!res.ok) {
        setResults([]);
        setStatus("error");
        return;
      }
      setResults(res.results);
      setSelected(0);
      setStatus(res.results.length === 0 ? "empty" : "success");
    } catch {
      if (requestIdRef.current !== requestId) return;
      setResults([]);
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    if (query.trim().length < 2) {
      requestIdRef.current++; // invalidate any in-flight search for the old query
      setStatus("idle");
      setResults([]);
      return;
    }
    // Set "loading" immediately (before the debounce fires) so the UI never
    // has a window where it looks like "no results" while actually just
    // waiting to send the request.
    setStatus("loading");
    const t = setTimeout(() => search(query), 250);
    return () => clearTimeout(t);
  }, [query, search]);

  const navigate = (slug: string) => {
    router.push(`/news/${slug}`);
    onClose();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, results.length - 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    }
    if (e.key === "Enter" && results[selected])
      navigate(results[selected].slug);
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-start justify-center pt-[10vh] px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Modal */}
      <div className="relative w-full max-w-[600px] bg-bg border border-border rounded-3xl overflow-hidden shadow-2xl">
        {/* Input */}
        <div className="flex items-center gap-3 px-4 border-b border-border">
          <SearchIcon className="w-4 h-4 text-ink/70" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Мэдээ хайх..."
            className="flex-1 py-3.5 bg-transparent text-[14px] text-ink placeholder:text-muted outline-none font-ttNormsPro"
          />
          {status === "loading" && (
            <div className="w-3.5 h-3.5 border border-accent border-t-transparent rounded-full animate-spin flex-shrink-0" />
          )}
          <button
            onClick={onClose}
            className="text-[10px] tracking-[0.1em] text-ink/80 border border-border rounded-full font-ttNormsPro hover:text-ink transition-colors flex-shrink-0"
          >
            <CrossIcon className="w-6 h-6 text-ink/80" />
          </button>
        </div>

        {/* Results */}
        {status === "loading" && (
          <div className="px-4 py-8 flex items-center justify-center gap-2.5 text-[12px] text-muted font-ttNormsPro">
            <span className="w-3.5 h-3.5 border border-accent border-t-transparent rounded-full animate-spin flex-shrink-0" />
            Хайж байна...
          </div>
        )}

        {status === "success" && (
          <ul className="max-h-[60vh] overflow-y-auto">
            {results.map((r, i) => (
              <li key={r.id}>
                <button
                  onClick={() => navigate(r.slug)}
                  onMouseEnter={() => setSelected(i)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                    selected === i ? "bg-surface" : "hover:bg-surface/50"
                  }`}
                >
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-faint">
                    {r.image_url && (
                      <Image
                        src={r.image_url}
                        alt={r.title}
                        fill
                        className="object-cover opacity-80"
                        sizes="48px"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[8px] tracking-[0.12em] uppercase text-accent font-mono">
                      {r.categories?.name ?? ""}
                    </span>
                    <p className="text-[13px] text-ink font-ttNormsPro leading-[1.3] line-clamp-1 mt-0.5">
                      {r.title}
                    </p>
                    <p className="text-[11px] text-muted line-clamp-1 mt-0.5">
                      {r.lead}
                    </p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}

        {status === "empty" && (
          <div className="px-4 py-8 text-center text-[12px] text-muted font-ttNormsPro">
            &quot;{query}&quot; — мэдээ олдсонгүй
          </div>
        )}

        {status === "error" && (
          <div className="px-4 py-8 flex flex-col items-center gap-2 text-center text-[12px] font-ttNormsPro">
            <span className="text-red-400">
              Алдаа гарлаа. Дахин оролдоно уу.
            </span>
            <button
              onClick={() => {
                setStatus("loading");
                search(query);
              }}
              className="text-[11px] text-accent underline underline-offset-2 hover:no-underline"
            >
              Дахин оролдох
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
