import type { Metadata } from "next";
import { type Lang, toLang } from "@/lib/translations";
import KidsClient from "./KidsClient";

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
    ? "تعليم إسلامي للأطفال — سور وأدعية وأركان الإسلام | نور الإسلام"
    : "Islamic Learning for Kids — Surahs, Duas & Pillars of Islam | Noor Al Islam";
  const description = isAr
    ? "تعلم القرآن الكريم والأدعية اليومية وأركان الإسلام بطريقة ممتعة وتفاعلية للأطفال."
    : "Learn Quran surahs, daily duas, and the pillars of Islam in a fun and interactive way for children.";
  return {
    title,
    description,
    alternates: {
      canonical: `https://noorislam.app/${lang}/kids`,
      languages: {
        en: "https://noorislam.app/en/kids",
        ar: "https://noorislam.app/ar/kids",
      },
    },
    openGraph: { title, description, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function KidsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: rawLang } = await params;
  const lang = toLang(rawLang);
  const isAr = lang === "ar";

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="text-5xl mb-4">🌙⭐</div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          {isAr ? "التعليم الإسلامي للأطفال" : "Islamic Learning for Kids"}
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto text-lg">
          {isAr
            ? "تعلم القرآن والأدعية وأركان الإسلام بطريقة ممتعة وبسيطة"
            : "Learn Quran, daily duas, and the pillars of Islam in a fun and simple way"}
        </p>
      </div>

      <KidsClient lang={lang} />
    </div>
  );
}
