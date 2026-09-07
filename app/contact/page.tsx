import { getCategories } from "@/lib/supabase";
import LandingLayout from "@/components/news/LandingLayout";
import SectionFooter from "@/components/news/SectionFooter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Холбоо барих | Crypto News",
  description:
    "Санал, хүсэлт, алдааны мэдэгдэл эсвэл хамтын ажиллагааны хүсэлтээ илгээнэ үү.",
  alternates: { canonical: "https://crypto-news-alpha.vercel.app/contact" },
};

export default async function ContactPage() {
  const categories = await getCategories();

  return (
    <LandingLayout categories={categories}>
      <section className="relative border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(230,51,41,0.07),transparent_60%)]" />
        <div
          className="absolute inset-x-0 top-0 h-[1px]"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, #e63329 40%, #ff6b35 70%, transparent 100%)",
          }}
        />
        <div className="max-w-[900px] mx-auto px-6 py-16 md:py-24 relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-5 h-[1.5px] bg-accent" />
            <span className="text-[10px] tracking-[0.22em] uppercase text-accent font-ttNormsPro font-semibold">
              Crypto News · Холбоо барих
            </span>
          </div>
          <h1 className="font-ttNormsPro font-bold text-[40px] md:text-[64px] leading-[1.05] text-ink mb-6">
            Холбоо
            <span className="text-accent"> барих</span>
          </h1>
          <p className="text-[15px] md:text-[17px] text-muted leading-[1.85] font-ttNormsPro max-w-[580px] border-l-2 border-accent pl-5">
            Санал, хүсэлт, алдааны мэдэгдэл эсвэл хамтын ажиллагааны
            хүсэлтээ доорх хаягаар илгээнэ үү.
          </p>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="max-w-[900px] mx-auto px-6 py-14 md:py-20">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Зүүн — холбоо барих мэдээлэл */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-5 h-[1.5px] bg-accent" />
                <span className="text-[10px] tracking-[0.22em] uppercase text-muted font-ttNormsPro font-semibold">
                  Холбоо барих мэдээлэл
                </span>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <span className="text-accent text-[18px] mt-0.5">→</span>
                  <div>
                    <p className="text-[11px] tracking-[0.14em] uppercase text-muted font-ttNormsPro font-semibold mb-1">
                      Имэйл
                    </p>
                    <a
                      href="mailto:info@cryptonews.mn"
                      className="text-[15px] text-ink font-ttNormsPro hover:text-accent transition-colors"
                    >
                      info@cryptonews.mn
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="text-accent text-[18px] mt-0.5">→</span>
                  <div>
                    <p className="text-[11px] tracking-[0.14em] uppercase text-muted font-ttNormsPro font-semibold mb-1">
                      Байршил
                    </p>
                    <p className="text-[15px] text-ink font-ttNormsPro">
                      Улаанбаатар, Монгол Улс
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="text-accent text-[18px] mt-0.5">→</span>
                  <div>
                    <p className="text-[11px] tracking-[0.14em] uppercase text-muted font-ttNormsPro font-semibold mb-1">
                      Хариу өгөх хугацаа
                    </p>
                    <p className="text-[15px] text-ink font-ttNormsPro">
                      24–48 цагийн дотор
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-border">
                <p className="text-[11px] tracking-[0.14em] uppercase text-muted font-ttNormsPro font-semibold mb-4">
                  Ямар сэдвээр холбоо барьж болох вэ?
                </p>
                <ul className="space-y-2">
                  {[
                    "Нийтлэлийн алдаа, залруулга",
                    "Хамтын ажиллагааны санал",
                    "Нийтлэл илгээх хүсэлт",
                    "Техникийн асуудал",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-[13px] text-muted font-ttNormsPro"
                    >
                      <div className="w-1 h-1 rounded-full bg-accent/60 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Баруун — CTA карт */}
            <div className="flex flex-col gap-4">
              <a
                href="mailto:info@cryptonews.mn"
                className="group relative p-8 border border-border rounded-xl hover:border-accent/40 transition-colors duration-300 overflow-hidden block"
              >
                <div
                  className="absolute inset-x-0 top-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 0%, #e63329 50%, transparent 100%)",
                  }}
                />
                <div className="text-[32px] mb-4">✉️</div>
                <h3 className="font-ttNormsPro font-bold text-[16px] text-ink mb-2">
                  Имэйл илгээх
                </h3>
                <p className="text-[13px] text-muted leading-[1.8] font-ttNormsPro mb-4">
                  info@cryptonews.mn хаяг руу шууд имэйл илгээнэ үү.
                </p>
                <span className="text-[10px] tracking-[0.16em] uppercase text-accent font-ttNormsPro font-semibold">
                  Имэйл нээх →
                </span>
              </a>

              <a
                href="/news"
                className="group relative p-8 border border-border rounded-xl hover:border-accent/40 transition-colors duration-300 overflow-hidden block"
              >
                <div
                  className="absolute inset-x-0 top-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 0%, #e63329 50%, transparent 100%)",
                  }}
                />
                <div className="text-[32px] mb-4">📰</div>
                <h3 className="font-ttNormsPro font-bold text-[16px] text-ink mb-2">
                  Мэдээ унших
                </h3>
                <p className="text-[13px] text-muted leading-[1.8] font-ttNormsPro mb-4">
                  Криптографи, аюулгүй байдлын шинэ мэдээнүүдийг үзэх.
                </p>
                <span className="text-[10px] tracking-[0.16em] uppercase text-accent font-ttNormsPro font-semibold">
                  Мэдээ үзэх →
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <SectionFooter />
    </LandingLayout>
  );
}
