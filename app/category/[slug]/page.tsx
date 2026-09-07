import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getCategoryBySlug,
  getNewsCategory,
  getCategories,
} from "@/lib/supabase";
import LandingLayout from "@/components/news/LandingLayout";
import GridCard from "@/components/news/GridCard";
import SectionFooter from "@/components/news/SectionFooter";
import DesktopLoadMore from "@/components/news/DesktopLoadMore";

export const revalidate = 3600;
export const dynamicParams = true;

type Props = { params: Promise<{ slug: string }> };

const INITIAL = 12;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = await getCategoryBySlug(slug);
  if (!cat) return { title: "Ангилал олдсонгүй" };

  const title = `${cat.name} | Криптологи`;
  const description = cat.description ?? `${cat.name} ангиллын мэдээнүүд`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://crypto-news-alpha.vercel.app/category/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://crypto-news-alpha.vercel.app/category/${slug}`,
      siteName: "Криптологи",
      type: "website",
    },
  };
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  const [cat, categories] = await Promise.all([
    getCategoryBySlug(slug),
    getCategories(),
  ]);

  if (!cat) notFound();

  const { news, hasMore } = await getNewsCategory(cat.name, 0, INITIAL);

  return (
    <LandingLayout activeCategory={cat.name} categories={categories}>
      {/* ── Header ── */}
      <section className="border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(230,51,41,0.07),transparent_60%)]" />
        <div
          className="absolute inset-x-0 top-0 h-[1px]"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, #e63329 40%, #ff6b35 70%, transparent 100%)",
          }}
        />
        <div className="max-w-[1200px] mx-auto px-6 py-12 md:py-16 relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-5 h-[1.5px] bg-accent" />
            <span className="text-[10px] tracking-[0.22em] uppercase text-accent font-ttNormsPro font-semibold">
              Ангилал
            </span>
          </div>
          <h1 className="font-ttNormsPro font-bold text-[36px] md:text-[56px] leading-[1.05] text-ink mb-3">
            {(cat.line1 && (
              <>
                {cat.line1}
                <span className="text-accent"> {cat.line2}</span>
              </>
            )) ||
              cat.name}
          </h1>
          {cat.description && (
            <p className="text-[14px] text-muted leading-[1.8] font-ttNormsPro max-w-[560px]">
              {cat.description}
            </p>
          )}
        </div>
      </section>

      {/* ── Grid ── */}
      <section className="max-w-[1200px] mx-auto px-6 py-10">
        {news.length === 0 ? (
          <p className="text-muted font-ttNormsPro text-[14px] py-20 text-center">
            Энэ ангилалд мэдээ байхгүй байна.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {news.map((n, i) => (
                <div key={n.id} className="bg-bg">
                  <GridCard news={n} index={i} />
                </div>
              ))}
            </div>
            <DesktopLoadMore
              category={cat.name}
              startOffset={news.length}
              initialHasMore={hasMore}
            />
          </>
        )}
      </section>

      <SectionFooter />
    </LandingLayout>
  );
}
