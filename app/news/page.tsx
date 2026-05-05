export const dynamic = "force-dynamic";

import { getAllNews, getCategories } from "@/lib/supabase";
import LandingLayout from "@/components/news/LandingLayout";
import type { News } from "@/types/news";
import MainHeroCard from "@/components/news/MainHeroCard";
import NewsSection from "@/components/news/NewsSection";
import SectionFooter from "@/components/news/SectionFooter";
import SectionHeader from "@/components/news/SectionHeader";

export default async function NewsPage() {
  const [allNews, categories] = await Promise.all([getAllNews(), getCategories()]);

  const heroNews = allNews[0];
  const restNews = heroNews
    ? allNews.filter((n) => n.id !== heroNews.id)
    : allNews;

  const byCategory: Record<string, News[]> = {};
  for (const cat of categories) {
    byCategory[cat.name] = restNews.filter((n) => n.category === cat.name);
  }

  return (
    <LandingLayout categories={categories}>
      <SectionHeader />

      {heroNews && <MainHeroCard news={heroNews} />}

      {categories.map((cat, i) => (
        <NewsSection
          key={cat.id}
          section={{
            key: cat.name,
            sectionLabel: cat.section_label ?? "",
            line1: cat.line1 ?? "",
            line2: cat.line2 ?? "",
            desc: cat.description ?? "",
          }}
          news={byCategory[cat.name] ?? []}
          index={i}
        />
      ))}

      <SectionFooter />
    </LandingLayout>
  );
}

export const metadata = {
  title: "Crypto News | Криптологи",
  description: "Мэдээ, кодлол, криптоанализ, криптографийн шинэ мэдээ",
};
