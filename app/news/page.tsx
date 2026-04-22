// app/news/page.tsx
export const dynamic = "force-dynamic";

import { getAllNews } from "@/lib/supabase";
import LandingLayout from "@/components/news/LandingLayout";
import type { News } from "@/types/news";
import MainHeroCard from "@/components/news/MainHeroCard";
import NewsSection from "@/components/news/NewsSection";
import SectionFooter from "@/components/news/SectionFooter";
import SectionHeader from "@/components/news/SectionHeader";

import { SECTIONS } from "@/types/news";

export default async function NewsPage() {
  const allNews = await getAllNews();
  const heroNews = allNews[0]
  const restNews = heroNews ? allNews.filter(n => n.id !== heroNews.id) : allNews

  const byCategory: Record<string, News[]> = {};
  for (const s of SECTIONS) {
    byCategory[s.key] = restNews.filter((n) => n.category === s.key);
  }

  return (
    <LandingLayout>
      <SectionHeader title="Криптологи" />

      {heroNews && <MainHeroCard news={heroNews} />}

      {SECTIONS.map((section, i) => (
        <NewsSection
          key={section.key}
          section={section}
          news={byCategory[section.key] ?? []}
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
