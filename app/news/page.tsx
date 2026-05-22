export const dynamic = "force-dynamic";

import { getHeroNews, getNewsCategory, getCategories } from "@/lib/supabase";
import LandingLayout from "@/components/news/LandingLayout";
import MainHeroCard from "@/components/news/MainHeroCard";
import NewsSection from "@/components/news/NewsSection";
import SectionFooter from "@/components/news/SectionFooter";

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

export const metadata = {
  title: "Crypto News | Криптологи",
  description: "Мэдээ, кодлол, криптоанализ, криптографийн шинэ мэдээ",
};
