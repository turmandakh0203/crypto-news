"use client";
import { useEffect } from "react";
import { trackViewAction } from "@/lib/actions";

export default function ViewTracker({ newsId }: { newsId: number }) {
  useEffect(() => {
    const key = `viewed_${newsId}`;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
    trackViewAction(newsId);
  }, [newsId]);
  return null;
}
