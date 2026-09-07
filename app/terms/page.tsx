import { getCategories } from "@/lib/supabase";
import LandingLayout from "@/components/news/LandingLayout";
import SectionFooter from "@/components/news/SectionFooter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Үйлчилгээний нөхцөл | Криптологи",
  description: "Криптологи сайтыг ашиглах дүрэм, журам.",
};

const SECTIONS = [
  {
    title: "1. Контентын лиценз, зохиогчийн эрх",
    body: [
      "Сайт дахь бүх нийтлэл, зураг, дизайн болон бусад контент нь Криптологи болон тухайн зохиогчдын өмч бөгөөд зохиогчийн эрхийн хуулиар хамгаалагдана.",
      "Хувийн, ашгийн бус зорилгоор нийтлэлээс иш татах, холбоос тавихыг зөвшөөрнө. Гэхдээ бүтэн нийтлэлийг эх сурвалжийг дурдалгүй хуулбарлан өөр платформд нийтлэхийг хориглоно. Бусад ашиглалтын хувьд бидэнтэй урьдчилан холбогдож зөвшөөрөл авна уу.",
    ],
  },
  {
    title: "2. Сэтгэгдлийн дүрэм",
    body: [
      "Сэтгэгдэл бичихдээ бусдыг доромжлох, үзэн ядалт өдөөх, хууль бус агуулга түгээх, спам зэрэг зохисгүй үйлдэл хийхийг хориглоно.",
      "Бид дүрэм зөрчсөн сэтгэгдлийг мэдэгдэлгүйгээр устгах, зохих шаардлагатай бол зохиогчийн хандалтыг хязгаарлах эрхтэй.",
    ],
  },
  {
    title: "3. Агуулгын зорилго, хариуцлагын хязгаарлалт",
    body: [
      "Сайтын нийтлэлүүд нь зөвхөн боловсрол, мэдээллийн зорилготой бөгөөд санхүүгийн, хууль зүйн, аюулгүй байдлын мэргэжлийн зөвлөгөө биш. Криптовалют, мэдээллийн аюулгүй байдалтай холбоотой аливаа шийдвэрийг та өөрийн эрсдэлээр гаргана.",
      "Бид нийтлэлийн үнэн зөв, бүрэн эх байдлыг хангахыг эрмэлздэг ч алдаа, хуучирсан мэдээлэл байж болзошгүй бөгөөд үүнээс үүдэх аливаа хохирлыг хариуцахгүй.",
    ],
  },
  {
    title: "4. Гадаад холбоос",
    body: [
      "Сайт дотор гуравдагч талын вэбсайт руу чиглэсэн холбоос байж болно. Эдгээр гадаад сайтын агуулга, нууцлалын бодлогод бид хариуцлага хүлээхгүй.",
    ],
  },
  {
    title: "5. Нөхцөлийн өөрчлөлт",
    body: [
      "Бид энэхүү Үйлчилгээний нөхцөлийг цаг үргэлжлүүлэн шинэчилж болно. Шинэчилсэн хувилбар нийтлэгдсэн цагаас эхлэн хүчин төгөлдөр болно.",
    ],
  },
  {
    title: "6. Хуулийн харьяалал",
    body: [
      "Энэхүү нөхцөл нь Монгол Улсын хууль тогтоомжийн дагуу зохицуулагдана.",
    ],
  },
];

export default async function TermsPage() {
  const categories = await getCategories();

  return (
    <LandingLayout categories={categories}>
      <section className="relative border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(230,51,41,0.08),transparent_60%)]" />
        <div
          className="absolute inset-x-0 top-0 h-[1px]"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, #e63329 40%, #ff6b35 70%, transparent 100%)",
          }}
        />
        <div className="max-w-[820px] mx-auto px-6 py-6 md:py-10 relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-5 h-[1.5px] bg-accent" />
            <span className="text-[10px] tracking-[0.22em] uppercase text-accent font-ttNormsPro font-semibold">
              Хууль эрх зүй
            </span>
          </div>
          <h1 className="font-ttNormsPro font-bold text-[32px] md:text-[52px] leading-[1.1] text-ink">
            Үйлчилгээний
            <span className="text-accent"> нөхцөл</span>
          </h1>
        </div>
      </section>

      <section>
        <div className="max-w-[820px] mx-auto px-6 py-6 md:py-10 flex flex-col gap-10">
          {SECTIONS.map((s) => (
            <div key={s.title}>
              <h2 className="font-ttNormsPro font-bold text-[18px] md:text-[20px] text-ink mb-3">
                {s.title}
              </h2>
              <div className="flex flex-col gap-3">
                {s.body.map((p, i) => (
                  <p
                    key={i}
                    className="text-[14px] text-muted leading-[1.9] font-ttNormsPro"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </div>
          ))}

          <div className="pt-4 border-t border-border">
            <p className="text-[14px] text-muted leading-[1.9] font-ttNormsPro">
              Асуулт байвал бидэнтэй{" "}
              <a
                href="mailto:info@ciphernews.mn"
                className="text-accent hover:underline"
              >
                info@ciphernews.mn
              </a>{" "}
              хаягаар холбогдоно уу.
            </p>
          </div>
        </div>
      </section>

      <SectionFooter />
    </LandingLayout>
  );
}
