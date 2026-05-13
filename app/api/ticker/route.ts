export const revalidate = 120;

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
  const { data, error } = await client
    .from("news")
    .select("title, slug")
    .eq("published", true)
    .order("id", { ascending: false })
    .limit(12);

  if (error) return NextResponse.json([]);
  return NextResponse.json(data ?? []);
}
