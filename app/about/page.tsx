import { getCategories } from "@/lib/supabase";
import LandingLayout from "@/components/news/LandingLayout";
import SectionFooter from "@/components/news/SectionFooter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Бидний тухай | Crypto News",
  description:
    "Монгол хэлээр криптографи, криптоанализ болон мэдээллийн аюулгүй байдлын мэдлэгийг хүргэх зорилготой мэдээний платформ.",
};

const PILLARS = [
  {
    icon: "🔐",
    title: "Криптограф",
    desc: "Шифрлэлтийн алгоритм, протокол, математик үндсийг монгол хэлээр тайлбарлана.",
  },
  {
    icon: "📰",
    title: "Мэдээ",
    desc: "Дэлхийн мэдээллийн аюулгүй байдлын салбарын шинэ мэдээ, хандлагыг хурдан хүргэнэ.",
  },
  {
    icon: "🔍",
    title: "Криптоанализ",
    desc: "Алдаатай хэрэгжилт, задлан шинжилгээ, CTF-ийн тайлбарыг дэлгэрэнгүй харуулна.",
  },
  {
    icon: "💻",
    title: "Кодлол",
    desc: "Аюулгүй кодчиллын арга барил, сангууд болон хөгжүүлэлтийн хэрэгслүүдийг практик жишээ, бодит хэрэглээнд тулгуурлан танилцуулна.",
  },
];

const STATS = [
  { num: "2024", label: "Үүссэн он" },
  { num: "100+", label: "Нийтлэл" },
  { num: "4", label: "Ангилал" },
  { num: "24/7", label: "Шинэчлэгдэнэ" },
];

export default async function AboutPage() {
  const categories = await getCategories();

  return (
    <LandingLayout categories={categories}>
      {/* ── Hero ── */}
      <section className="relative border-b border-border overflow-hidden">
        {/* BG decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(230,51,41,0.08),transparent_60%)]" />
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
              Crypto News · 2024
            </span>
          </div>

          <h1 className="font-ttNormsPro font-bold text-[40px] md:text-[72px] leading-[1.05] text-ink mb-6">
            Бидний
            <span className="text-accent"> тухай</span>
          </h1>

          <p className="text-[15px] md:text-[18px] text-muted leading-[1.85] font-ttNormsPro max-w-[640px] border-l-2 border-accent pl-5">
            Монгол хэлээр криптографи, криптоанализ болон мэдээллийн аюулгүй
            байдлын мэдлэгийг хүргэх зорилготой мэдээний платформ. Бид техникийн
            мэдлэгийг хялбар, ойлгомжтой хэлбэрт оруулж, монгол уншигчдад
            хүргэхийг зорьдог.
          </p>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="border-b border-border bg-surface/30">
        <div className="max-w-[900px] mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-ttNormsPro font-bold text-[32px] md:text-[40px] text-accent leading-none mb-1">
                  {s.num}
                </div>
                <div className="text-[10px] tracking-[0.16em] uppercase text-muted font-ttNormsPro">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="border-b border-border">
        <div className="max-w-[900px] mx-auto px-6 py-14 md:py-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-5 h-[1.5px] bg-accent" />
            <span className="text-[10px] tracking-[0.22em] uppercase text-muted font-ttNormsPro font-semibold">
              Эрхэм зорилго
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="font-ttNormsPro font-bold text-[26px] md:text-[34px] text-ink leading-[1.2] mb-5">
                Мэдлэгийг нийтэд
                <span className="text-accent"> нээлттэй байлгах</span>
              </h2>
              <p className="text-[14px] text-muted leading-[1.9] font-ttNormsPro">
                Мэдээллийн аюулгүй байдал бол зөвхөн мэргэжилтнүүдэд зориулсан
                сэдэв биш. Бид энэ мэдлэгийг монгол хэлээр хялбар,
                ойлгомжтойгоор хүргэснээр илүү олон хүн өөрийгөө дижитал орчинд
                аюулгүй байлгах боломжтой болно гэдэгт итгэдэг.
              </p>
            </div>
            <div>
              <p className="text-[14px] text-muted leading-[1.9] font-ttNormsPro mb-4">
                Crypto News нь судлаачид, оюутнууд, хөгжүүлэгчид болон мэдээллийн
                аюулгүй байдалд сонирхолтой хэн бүхэнд зориулсан тавцан юм.
              </p>
              <p className="text-[14px] text-muted leading-[1.9] font-ttNormsPro">
                Бид нийтлэл бүрдээ техникийн өндөр нарийвчлалыг хадгалж, монгол
                хэлний ойлгомжтой, мэргэжлийн найруулгатайгаар хүргэхийг
                эрхэмлэдэг.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pillars ── */}
      <section className="border-b border-border">
        <div className="max-w-[900px] mx-auto px-6 py-14 md:py-20">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-5 h-[1.5px] bg-accent" />
            <span className="text-[10px] tracking-[0.22em] uppercase text-muted font-ttNormsPro font-semibold">
              Бид юу хийдэг вэ?
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {PILLARS.map((p) => (
              <div
                key={p.title}
                className="group p-6 border border-border rounded-xl hover:border-accent/40 transition-colors duration-300 rounded relative overflow-hidden"
              >
                <div
                  className="absolute inset-x-0 top-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 0%, #e63329 50%, transparent 100%)",
                  }}
                />
                <div className="text-[28px] mb-4">{p.icon}</div>
                <h3 className="font-ttNormsPro font-bold text-[16px] text-ink mb-2 tracking-[0.04em]">
                  {p.title}
                </h3>
                <p className="text-[13px] text-muted leading-[1.8] font-ttNormsPro">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section className="border-b border-border">
        <div className="max-w-[900px] mx-auto px-6 py-14 md:py-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-5 h-[1.5px] bg-accent" />
            <span className="text-[10px] tracking-[0.22em] uppercase text-muted font-ttNormsPro font-semibold">
              Холбоо барих
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="font-ttNormsPro font-bold text-[22px] text-ink mb-4">
                Санал, хүсэлт байна уу?
              </h2>
              <p className="text-[14px] text-muted leading-[1.9] font-ttNormsPro mb-6">
                Нийтлэлийн санал, алдааны мэдэгдэл эсвэл хамтын ажиллагааны
                хүсэлтээ доорх хаягаар илгээнэ үү.
              </p>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 text-[13px] text-muted font-ttNormsPro">
                  <span className="text-accent">→</span>
                  <span>Улаанбаатар, Монгол Улс</span>
                </div>
                <div className="flex items-center gap-3 text-[13px] text-muted font-ttNormsPro">
                  <span className="text-accent">→</span>
                  <a
                    href="mailto:info@cryptonews.mn"
                    className="hover:text-ink transition-colors"
                  >
                    info@cryptonews.mn
                  </a>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-end">
              <a
                href="/news"
                className="inline-flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase font-ttNormsPro font-semibold text-accent border border-accent/40 rounded-full px-6 py-2 hover:bg-accent hover:text-white transition-all duration-300"
              >
                Мэдээ унших →
              </a>
            </div>
          </div>
        </div>
      </section>

      <SectionFooter />
    </LandingLayout>
  );
}
