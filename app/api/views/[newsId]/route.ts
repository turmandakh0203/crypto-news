export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getViewCount } from "@/lib/supabase";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ newsId: string }> },
) {
  const { newsId } = await params;
  const id = parseInt(newsId);
  if (isNaN(id)) return NextResponse.json({ count: 0 });
  const count = await getViewCount(id);
  return NextResponse.json({ count });
}
