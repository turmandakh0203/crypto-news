import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getNewsByAuthor,
  getAllAuthors,
  getCategories,
} from "@/lib/supabase";
import LandingLayout from "@/components/news/LandingLayout";
import GridCard from "@/components/news/GridCard";
import SectionFooter from "@/components/news/SectionFooter";

export const revalidate = 3600;
export const dynamicParams = true;

type Props = { params: Promise<{ name: string }> };

export async function generateStaticParams() {
  const authors = await getAllAuthors();
  return authors.map((a) => ({ name: encodeURIComponent(a.name) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { name } = await params;
  const decoded = decodeURIComponent(name);
  const articles = await getNewsByAuthor(decoded);
  if (articles.length === 0) return { title: "Зохиогч олдсонгүй" };

  const role = articles[0]?.author_role;
  const title = `${decoded} | Crypto News`;
  const description = role
    ? `${decoded} — ${role}. Нийт ${articles.length} нийтлэл.`
    : `${decoded}-ийн нийтлэлүүд. Нийт ${articles.length} нийтлэл.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://crypto-news-alpha.vercel.app/author/${name}`,
    },
    openGraph: { title, description, type: "profile" },
  };
}

export default async function AuthorPage({ params }: Props) {
  const { name } = await params;
  const decoded = decodeURIComponent(name);

  const [articles, categories] = await Promise.all([
    getNewsByAuthor(decoded),
    getCategories(),
  ]);

  if (articles.length === 0) notFound();

  const role = articles[0]?.author_role;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: decoded,
    ...(role && { jobTitle: role }),
    url: `https://crypto-news-alpha.vercel.app/author/${name}`,
    worksFor: {
      "@type": "Organization",
      name: "Crypto News",
      url: "https://crypto-news-alpha.vercel.app",
    },
  };

  return (
    <LandingLayout categories={categories}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Hero ── */}
      <section className="border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(230,51,41,0.07),transparent_60%)]" />
        <div
          className="absolute inset-x-0 top-0 h-[1px]"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, #e63329 40%, #ff6b35 70%, transparent 100%)",
          }}
        />
        <div className="max-w-[900px] mx-auto px-6 py-14 md:py-20 relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-5 h-[1.5px] bg-accent" />
            <span className="text-[10px] tracking-[0.22em] uppercase text-accent font-ttNormsPro font-semibold">
              Зохиогч
            </span>
          </div>

          <div className="flex items-center gap-5 mb-6">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-full bg-surface border border-border flex items-center justify-center flex-shrink-0">
              <span className="text-[28px] font-ttNormsPro font-bold text-accent">
                {decoded.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h1 className="font-ttNormsPro font-bold text-[32px] md:text-[48px] leading-[1.1] text-ink">
                {decoded}
              </h1>
              {role && (
                <p className="text-[13px] text-accent font-ttNormsPro tracking-[0.06em] mt-1">
                  {role}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="font-ttNormsPro font-bold text-[28px] text-accent leading-none">
                {articles.length}
              </div>
              <div className="text-[10px] tracking-[0.14em] uppercase text-muted font-ttNormsPro mt-1">
                Нийтлэл
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Нийтлэлүүд ── */}
      <section className="max-w-[1200px] mx-auto px-6 py-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-5 h-[1.5px] bg-accent" />
          <span className="text-[10px] tracking-[0.22em] uppercase text-muted font-ttNormsPro font-semibold">
            Нийтлэлүүд
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {articles.map((n, i) => (
            <div key={n.id} className="bg-bg">
              <GridCard news={n} index={i} />
            </div>
          ))}
        </div>
      </section>

      <SectionFooter />
    </LandingLayout>
  );
}
