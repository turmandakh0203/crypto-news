import type { News } from "@/types/news";
import SectionBanner from "@/components/news/SectionBanner";
import HeroCard from "@/components/news/HeroCard";
import GridCard from "@/components/news/GridCard";
import MobileNewsList from "@/components/news/MobileNewsList";

type SectionConfig = {
  key: string;
  sectionLabel: string;
  line1: string;
  line2: string;
  desc: string;
};

type Props = {
  section: SectionConfig;
  news: News[];
  index?: number;
};

function EmptySection({ category }: { category: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 border border-border mx-3 md:mx-10 mb-6">
      <div className="font-bebas text-4xl text-muted mb-2">Мэдээ байхгүй</div>
      <p className="text-[10px] text-muted font-bebas tracking-[0.1em]">
        {category} ангилалд мэдээ нэмэгдээгүй байна
      </p>
    </div>
  );
}

export default function NewsSection({ section, news, index = 0 }: Props) {
  const heroes = news.slice(0, 2);
  const grid = news.slice(2);

  return (
    <section data-section={section.key} className="border-t border-border">
      <SectionBanner
        sectionLabel={section.sectionLabel}
        line1={section.line1}
        line2={section.line2}
        desc={section.desc}
        index={index}
      />

      {news.length === 0 ? (
        <EmptySection category={section.key} />
      ) : (
        <div className="px-3 py-4 md:px-10 md:py-6 bg-bg">
          {/* Mobile: Featured + list + infinite scroll */}
          <div className="md:hidden">
            <MobileNewsList news={news} />
          </div>

          {/* Desktop: 2 HeroCard + GridCard */}
          <div className="hidden md:block">
            {heroes.length > 0 && (
              <div className="grid grid-cols-2 gap-px mb-px">
                {heroes.map((n, i) => (
                  <HeroCard
                    key={n.id}
                    news={n}
                    direction={i === 0 ? "left" : "right"}
                  />
                ))}
              </div>
            )}
            {grid.length > 0 && (
              <div className="grid grid-cols-3 gap-px mt-px">
                {grid.map((n, i) => (
                  <GridCard news={n} key={n.id} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
