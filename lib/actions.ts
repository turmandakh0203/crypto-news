"use server";
import { createClient } from "@supabase/supabase-js";
import { getNewsCategory, LOAD_MORE_SIZE } from "@/lib/supabase";
import type { Comment } from "@/types/news";

function supabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

export async function loadMoreCategoryNews(
  category: string,
  page: number,
  limit: number = LOAD_MORE_SIZE,
) {
  return getNewsCategory(category, page, limit);
}

export async function trackViewAction(newsId: number) {
  const { error } = await supabase()
    .from("page_views")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .insert([{ news_id: newsId, viewed_at: new Date().toISOString() }]);
  if (error) console.error("trackViewAction:", error);
}

type SearchResult = {
  id: number;
  slug: string;
  title: string;
  lead: string;
  category_id: number;
  image_url: string | null;
  categories: { name: string } | null;
};

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
  if (!data.author_name.trim() || !data.body.trim()) return { error: "required" };
  if (data.body.trim().length < 3) return { error: "too_short" };
  const { error } = await supabase()
    .from("comments")
    .insert([{
      news_id: data.news_id,
      author_name: data.author_name.trim(),
      author_email: data.author_email?.trim() || null,
      body: data.body.trim(),
    }]);
  if (error) { console.error("submitComment:", error); return { error: "db" }; }
  return { ok: true };
}

export async function searchNews(q: string): Promise<SearchResult[]> {
  if (q.trim().length < 2) return [];
  const { data, error } = await supabase()
    .from("news")
    .select("id, slug, title, lead, category_id, image_url, categories(name)")
    .eq("published", true)
    .or(`title.ilike.%${q}%,lead.ilike.%${q}%`)
    .order("id", { ascending: false })
    .limit(8);
  if (error) {
    console.error("searchNews:", error);
    return [];
  }
  return (data as unknown as SearchResult[]) ?? [];
}
