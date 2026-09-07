export const revalidate = 60;

import type { Metadata } from "next";
import { getHeroNews, getNewsCategory, getCategories } from "@/lib/supabase";
import LandingLayout from "@/components/news/LandingLayout";
import MainHeroCard from "@/components/news/MainHeroCard";
import NewsSection from "@/components/news/NewsSection";
import SectionFooter from "@/components/news/SectionFooter";

export const metadata: Metadata = {
  title: "Мэдээ | Crypto News",
  description:
    "Монгол хэлээр криптографи, криптоанализ болон мэдээллийн аюулгүй байдлын мэдлэгийг хүргэх зорилготой мэдээний платформ.",
  alternates: {
    canonical: "https://crypto-news-alpha.vercel.app/news",
  },
};

const INITIAL_PER_SECTION = 5;

export default async function NewsPage() {
  const [heroNews, categories] = await Promise.all([
    getHeroNews(),
    getCategories(),
  ]);

  const sectionResults = await Promise.all(
    categories.map((cat) => getNewsCategory(cat.name, 0, INITIAL_PER_SECTION)),
  );

  return (
    <LandingLayout categories={categories}>
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
          news={sectionResults[i].news}
          hasMore={sectionResults[i].hasMore}
          index={i}
        />
      ))}

      <SectionFooter />
    </LandingLayout>
  );
}
