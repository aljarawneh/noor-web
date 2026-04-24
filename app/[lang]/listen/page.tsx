import type { Metadata } from "next";
import { Headphones } from "lucide-react";
import { type Lang, toLang } from "@/lib/translations";
import { SURAH_LIST } from "@/lib/surahs";
import ListenClient from "./ListenClient";

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ar" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = toLang(rawLang);
  const isAr = lang === "ar";
  const title = isAr
    ? "استمع إلى القرآن الكريم — جميع السور | نور الإسلام"
    : "Listen to the Holy Quran — All 114 Surahs | Noor Al Islam";
  const description = isAr
    ? "استمع إلى القرآن الكريم بصوت كبار القراء مثل مشاري العفاسي والحصري وعبد الباسط. جميع السور الـ 114 مجاناً."
    : "Listen to the Holy Quran recited by world-class reciters including Mishary Al-Afasy, Al-Husary, and Abdul Basit. All 114 surahs, free.";
  return {
    title,
    description,
    alternates: {
      canonical: `https://noorislam.app/${lang}/listen`,
      languages: {
        en: "https://noorislam.app/en/listen",
        ar: "https://noorislam.app/ar/listen",
      },
    },
    openGraph: { title, description, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ListenPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: rawLang } = await params;
  const lang = toLang(rawLang);
  const isAr = lang === "ar";

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
          style={{ background: "#F0FDF4" }}
        >
          <Headphones size={32} color="#1B5E20" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          {isAr ? "استمع إلى القرآن الكريم" : "Listen to the Holy Quran"}
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          {isAr
            ? "استمع إلى جميع السور بأصوات أفضل القراء في العالم. اختر القارئ المفضل لديك وابدأ الاستماع."
            : "Listen to all surahs recited by world-class reciters. Choose your favorite reciter and start listening."}
        </p>
      </div>

      <ListenClient surahs={SURAH_LIST} lang={lang} />
    </div>
  );
}
