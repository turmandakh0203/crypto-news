"use server";
import { createClient } from "@supabase/supabase-js";

function supabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

export async function searchNews(q: string) {
  if (q.trim().length < 2) return [];
  const { data, error } = await supabase()
    .from("news")
    .select("id, slug, title, lead, category, image_url")
    .eq("published", true)
    .or(`title.ilike.%${q}%,lead.ilike.%${q}%`)
    .order("id", { ascending: false })
    .limit(8);
  if (error) { console.error("searchNews:", error); return []; }
  return data ?? [];
}
