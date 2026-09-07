import type { MetadataRoute } from "next";
import { getAllNews, getCategories, getAllAuthors } from "@/lib/supabase";

const BASE_URL = "https://crypto-news-alpha.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, categories, authors] = await Promise.all([
    getAllNews(),
    getCategories(),
    getAllAuthors(),
  ]);

  const articleUrls: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${BASE_URL}/news/${a.slug}`,
    lastModified: a.created_at ? new Date(a.created_at) : new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const categoryUrls: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${BASE_URL}/category/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.6,
  }));

  const authorUrls: MetadataRoute.Sitemap = authors.map((a) => ({
    url: `${BASE_URL}/author/${encodeURIComponent(a.name)}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.3,
  }));

  return [
    {
      url: `${BASE_URL}/news`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    ...categoryUrls,
    ...authorUrls,
    ...articleUrls,
  ];
}
