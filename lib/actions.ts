"use server";
import { createClient } from "@supabase/supabase-js";
import { getNewsCategory, LOAD_MORE_SIZE } from "@/lib/supabase";
import type { Comment } from "@/types/news";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

// Matches the maxLength attributes on the comment form inputs
// (components/news/Comments.tsx) — enforced again here since server
// actions can be invoked directly, bypassing the HTML form.
const MAX_COMMENT_BODY_LENGTH = 1000;
const MAX_COMMENT_NAME_LENGTH = 60;

function supabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

export async function loadMoreCategoryNews(
  category: string,
  offset: number,
  limit: number = LOAD_MORE_SIZE,
) {
  return getNewsCategory(category, offset, limit);
}

export async function trackViewAction(newsId: number) {
  const ip = await getClientIp();
  if (!rateLimit(`view:${ip}`, 60, 5 * 60 * 1000)) return;
  const { error } = await supabase()
    .from("page_views")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .insert([{ news_id: newsId, viewed_at: new Date().toISOString() }]);
  if (error) console.error("trackViewAction:", error);
}

export type SearchResult = {
  id: number;
  slug: string;
  title: string;
  lead: string;
  category_id: number;
  image_url: string | null;
  categories: { name: string } | null;
};

// Discriminated so the client can tell "no matches" (ok, empty array) apart
// from "the search itself failed" (rate-limited or a DB error) — both used
// to collapse to an empty array, which made a transient failure look like
// a real "not found" result.
export type SearchResponse =
  | { ok: true; results: SearchResult[] }
  | { ok: false; reason: "rate_limited" | "db_error" };

export async function getComments(newsId: number): Promise<Comment[]> {
  const { data, error } = await supabase()
    .from("comments")
    .select("id, news_id, author_name, body, status, created_at")
    .eq("news_id", newsId)
    .eq("status", "published")
    .order("created_at", { ascending: false })
    .limit(100);
  if (error) { console.error("getComments:", error); return []; }
  return data ?? [];
}

export async function submitComment(
  data: Omit<Comment, "id" | "created_at" | "status">,
  honeypot: string,
): Promise<{ ok?: boolean; error?: string }> {
  if (honeypot) return { ok: true };
  const name = data.author_name.trim();
  const body = data.body.trim();
  if (!name || !body) return { error: "required" };
  if (body.length < 3) return { error: "too_short" };
  if (name.length > MAX_COMMENT_NAME_LENGTH || body.length > MAX_COMMENT_BODY_LENGTH) {
    return { error: "too_long" };
  }

  const ip = await getClientIp();
  if (!rateLimit(`comment:${ip}`, 5, 10 * 60 * 1000)) {
    return { error: "rate_limited" };
  }

  const { error } = await supabase()
    .from("comments")
    .insert([{
      news_id: data.news_id,
      author_name: name,
      author_email: data.author_email?.trim() || null,
      body,
    }]);
  if (error) { console.error("submitComment:", error); return { error: "db" }; }
  return { ok: true };
}

export async function searchNews(q: string): Promise<SearchResponse> {
  const trimmed = q.trim();
  if (trimmed.length < 2) return { ok: true, results: [] };

  const ip = await getClientIp();
  if (!rateLimit(`search:${ip}`, 40, 60 * 1000)) {
    return { ok: false, reason: "rate_limited" };
  }

  // PostgREST's .or() takes a raw filter string where "," "." "(" ")" are
  // syntax, and ILIKE treats "%" "_" as wildcards — strip all of these so
  // user input can't inject extra filter conditions or wildcard patterns.
  const safe = trimmed.replace(/[,.()%_]/g, " ").trim();
  if (safe.length < 2) return { ok: true, results: [] };
  const { data, error } = await supabase()
    .from("news")
    .select("id, slug, title, lead, category_id, image_url, categories(name)")
    .eq("published", true)
    .or(`title.ilike.%${safe}%,lead.ilike.%${safe}%`)
    .order("id", { ascending: false })
    .limit(8);
  if (error) {
    console.error("searchNews:", error);
    return { ok: false, reason: "db_error" };
  }
  return { ok: true, results: (data as unknown as SearchResult[]) ?? [] };
}
