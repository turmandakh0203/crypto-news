import { getCategories } from "@/lib/supabase";
import LandingLayout from "@/components/news/LandingLayout";
import SectionFooter from "@/components/news/SectionFooter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Нууцлалын бодлого | Crypto News",
  description:
    "Crypto News сайт хэрэглэгчийн мэдээллийг хэрхэн цуглуулж, ашигладаг тухай.",
};

const SECTIONS = [
  {
    title: "1. Ерөнхий мэдээлэл",
    body: [
      'Энэхүү Нууцлалын бодлого нь Crypto News ("бид", "сайт") сайтыг ашиглах явцад бидний цуглуулдаг мэдээллийг хэрхэн боловсруулж, хадгалж, хамгаалдгийг тайлбарлана. Сайтыг ашигласнаар та энэхүү бодлоготой танилцаж, зөвшөөрч буйд тооцогдоно.',
    ],
  },
  {
    title: "2. Бид ямар мэдээлэл цуглуулдаг вэ",
    body: [
      "Сэтгэгдэл бичих үед: таны нэр (заавал), имэйл хаяг (заавал биш, нийтэд харагдахгүй) болон сэтгэгдлийн агуулгыг хадгална.",
      "Хандалтын статистик: аль нийтлэлийг хэдэн удаа үзсэн тоог зөвхөн тоон утга хэлбэрээр (IP хаяг, хувийн танигч мэдээллийг хадгалахгүйгээр) цуглуулна. Нэг зочны давхардсан үзэлтийг тооцохгүй байхын тулд таны хөтчийн session storage-д түр хугацааны тэмдэглэгээ хийгддэг.",
      "Төхөөрөмжийн тохиргоо: харагдах горим (цайвар/харанхуй) сонголтыг таны хөтчийн локал санах ойд хадгална. Энэ мэдээлэл бидэнд илгээгдэхгүй.",
    ],
  },
  {
    title: "3. Мэдээллийг хэрхэн ашигладаг вэ",
    body: [
      "Таны бичсэн сэтгэгдлийг зохих зохицуулалт (спам, доромжлол шүүх) хийсний дараа нийтэд харуулах зорилгоор ашиглана.",
      "Имэйл хаягийг зөвхөн шаардлагатай тохиолдолд (жишээ нь, сэтгэгдэлтэй холбоотой лавлагаа) холбоо барихад ашиглах бөгөөд гуравдагч талд дамжуулахгүй, нийтэд харуулахгүй.",
      "Хандалтын статистикийг нийтлэлийн агуулгыг сайжруулах, алдартай сэдвийг тодорхойлох зорилгоор дотооддоо, нэгтгэсэн (aggregate) байдлаар ашиглана.",
    ],
  },
  {
    title: "4. Гуравдагч талын үйлчилгээ",
    body: [
      "Сайт нь өгөгдлийн сан, hosting зэрэг техник дэд бүтцэд Supabase болон Vercel үйлчилгээг ашигладаг. Эдгээр үйлчилгээ үзүүлэгчид өөрсдийн нууцлалын бодлоготой байдаг бөгөөд бид зөвхөн шаардлагатай техникийн өгөгдлийг тэдгээрт хадгалуулна.",
      "Сайт одоогоор гуравдагч талын зар сурталчилгаа, дагах (tracking) хэрэгсэл ашигладаггүй. Хэрэв ирээдүйд ийм үйлчилгээ нэмэгдвэл энэхүү бодлогыг шинэчилж мэдэгдэнэ.",
    ],
  },
  {
    title: "5. Cookie болон локал санах ой",
    body: [
      "Сайт нь зар сурталчилгааны cookie ашигладаггүй. Зөвхөн сайтын үндсэн ажиллагаанд шаардлагатай техникийн зориулалтаар (жишээ нь, давхардсан үзэлт тоолохгүй байх, харагдах горимыг санах) session storage болон локал санах ойг ашигладаг.",
    ],
  },
  {
    title: "6. Таны эрх",
    body: [
      "Та бидэнд илгээсэн мэдээллээ (жишээ нь, сэтгэгдэл) устгуулах, засуулах хүсэлтээ доорх холбоо барих хаягаар илгээх эрхтэй.",
    ],
  },
  {
    title: "7. Бодлогын өөрчлөлт",
    body: [
      "Бид энэхүү Нууцлалын бодлогыг цаг үргэлжлүүлэн шинэчилж болно. Чухал өөрчлөлт орсон тохиолдолд энэ хуудсан дээр тэмдэглэнэ.",
    ],
  },
];

export default async function PrivacyPage() {
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
          <h1 className="font-ttNormsPro font-bold text-[32px] md:text-[52px] leading-[1.1] text-ink mb-4">
            Нууцлалын
            <span className="text-accent"> бодлого</span>
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
                href="mailto:info@cryptonews.mn"
                className="text-accent hover:underline"
              >
                info@cryptonews.mn
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
