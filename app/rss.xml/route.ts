import { getAllNews } from "@/lib/supabase";

export const revalidate = 3600;

const BASE_URL = "https://crypto-news-alpha.vercel.app";
const FEED_TITLE = "Криптологи";
const FEED_DESCRIPTION =
  "Монгол хэлээр криптографи, криптоанализ болон мэдээллийн аюулгүй байдлын мэдлэгийг хүргэх зорилготой мэдээний платформ.";
const MAX_ITEMS = 30;

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const articles = (await getAllNews()).slice(0, MAX_ITEMS);

  const items = articles
    .map((a) => {
      const url = `${BASE_URL}/news/${a.slug}`;
      const pubDate = new Date(a.created_at ?? Date.now()).toUTCString();
      return `    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <category>${escapeXml(a.category)}</category>
      <description>${escapeXml(a.lead ?? "")}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(FEED_TITLE)}</title>
    <link>${BASE_URL}/news</link>
    <description>${escapeXml(FEED_DESCRIPTION)}</description>
    <language>mn</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
