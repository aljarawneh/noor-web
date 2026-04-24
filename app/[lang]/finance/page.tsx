import type { Metadata } from "next";
import Link from "next/link";
import { TrendingUp, CheckCircle, XCircle, ChevronRight, Calculator, BookOpen } from "lucide-react";
import { type Lang, t, toLang } from "@/lib/translations";

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
    ? "المالية الإسلامية — الاستثمار الحلال وأحكام الشريعة | نور الإسلام"
    : "Islamic Finance — Halal Investing & Sharia Principles | Noor Al Islam";
  const description = t(lang, "finance.metaDesc");
  return {
    title,
    description,
    keywords: t(lang, "finance.metaKeywords"),
    alternates: {
      canonical: `https://noorislam.app/${lang}/finance`,
      languages: {
        en: "https://noorislam.app/en/finance",
        ar: "https://noorislam.app/ar/finance",
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: isAr ? "ar_SA" : "en_US",
      alternateLocale: isAr ? "en_US" : "ar_SA",
      url: `https://noorislam.app/${lang}/finance`,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function FinancePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: rawLang } = await params;
  const lang = toLang(rawLang);
  const isAr = lang === "ar";

  const investmentTypes = [
    { icon: "📈", titleKey: "finance.t1.title" as const, descKey: "finance.t1.desc" as const, color: "#1B5E20", bg: "#F0FDF4" },
    { icon: "📜", titleKey: "finance.t2.title" as const, descKey: "finance.t2.desc" as const, color: "#1565C0", bg: "#EFF6FF" },
    { icon: "🏠", titleKey: "finance.t3.title" as const, descKey: "finance.t3.desc" as const, color: "#5E35B1", bg: "#F5F3FF" },
    { icon: "🥇", titleKey: "finance.t4.title" as const, descKey: "finance.t4.desc" as const, color: "#B8860B", bg: "#FFFBEB" },
    { icon: "🤝", titleKey: "finance.t5.title" as const, descKey: "finance.t5.desc" as const, color: "#00695C", bg: "#F0FDFA" },
  ];

  const principles = [
    "finance.p1", "finance.p2", "finance.p3", "finance.p4", "finance.p5",
  ] as const;

  const haram = [
    "finance.h1", "finance.h2", "finance.h3", "finance.h4", "finance.h5", "finance.h6",
  ] as const;

  const steps = [
    "finance.s1", "finance.s2", "finance.s3", "finance.s4", "finance.s5", "finance.s6",
  ] as const;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
          style={{ background: "#FEF3C7" }}
        >
          <TrendingUp size={32} color="#B8860B" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          {t(lang, "finance.title")}
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto">{t(lang, "finance.subtitle")}</p>
        <p className="mt-4 text-xl font-arabic text-gray-700 leading-loose">
          وَأَحَلَّ اللَّهُ الْبَيْعَ وَحَرَّمَ الرِّبَا
        </p>
        <p className="text-gray-400 text-sm italic mt-1">{t(lang, "finance.verseRef")}</p>
      </div>

      {/* Quick links */}
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 ${isAr ? "text-right" : ""}`}>
        <Link
          href={`/${lang}/zakat`}
          className={`group flex items-center gap-4 bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:border-yellow-100 transition-all ${isAr ? "flex-row-reverse" : ""}`}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "#FFFBEB" }}
          >
            <Calculator size={24} color="#B8860B" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 group-hover:text-yellow-800 transition-colors">
              {t(lang, "finance.zakatCalc")}
            </h3>
            <p className="text-gray-500 text-sm">{t(lang, "finance.zakatDesc")}</p>
          </div>
          <ChevronRight size={18} color="#9CA3AF" className={`ml-auto ${isAr ? "rotate-180" : ""}`} />
        </Link>
        <a
          href="#"
          className={`group flex items-center gap-4 bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:border-green-100 transition-all ${isAr ? "flex-row-reverse" : ""}`}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "#F0FDF4" }}
          >
            <BookOpen size={24} color="#1B5E20" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 group-hover:text-green-800 transition-colors">
              {t(lang, "finance.savingsTracker")}
            </h3>
            <p className="text-gray-500 text-sm">{t(lang, "finance.savingsDesc")}</p>
          </div>
          <span
            className="ml-auto text-xs px-2 py-1 rounded-full font-semibold"
            style={{ background: "#FEF3C7", color: "#B8860B" }}
          >
            {t(lang, "finance.appOnly")}
          </span>
        </a>
      </div>

      {/* Principles */}
      <section className="mb-12">
        <h2 className={`text-2xl font-bold text-gray-900 mb-6 ${isAr ? "text-right" : ""}`}>
          {t(lang, "finance.principlesTitle")}
        </h2>
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="grid md:grid-cols-2 gap-3">
            {principles.map((key) => (
              <div key={key} className={`flex items-start gap-3 ${isAr ? "flex-row-reverse text-right" : ""}`}>
                <CheckCircle size={18} color="#1B5E20" className="mt-0.5 shrink-0" />
                <p className="text-gray-700 text-sm leading-relaxed">{t(lang, key)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment types */}
      <section className="mb-12">
        <h2 className={`text-2xl font-bold text-gray-900 mb-6 ${isAr ? "text-right" : ""}`}>
          {t(lang, "finance.typesTitle")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {investmentTypes.map((item) => (
            <div
              key={item.titleKey}
              className={`bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow ${isAr ? "text-right" : ""}`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 text-xl ${isAr ? "mr-auto" : ""}`}
                style={{ background: item.bg }}
              >
                {item.icon}
              </div>
              <h3 className="font-bold text-gray-900 mb-1">{t(lang, item.titleKey)}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{t(lang, item.descKey)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What to avoid */}
      <section className="mb-12">
        <h2 className={`text-2xl font-bold text-gray-900 mb-6 ${isAr ? "text-right" : ""}`}>
          {t(lang, "finance.haramTitle")}
        </h2>
        <div className="bg-white rounded-2xl p-6 border border-red-50 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {haram.map((key) => (
              <div key={key} className={`flex items-center gap-3 ${isAr ? "flex-row-reverse text-right" : ""}`}>
                <XCircle size={17} color="#EF4444" className="shrink-0" />
                <p className="text-gray-700 text-sm">{t(lang, key)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section>
        <h2 className={`text-2xl font-bold text-gray-900 mb-6 ${isAr ? "text-right" : ""}`}>
          {t(lang, "finance.stepsTitle")}
        </h2>
        <div className="space-y-3">
          {steps.map((key, i) => (
            <div
              key={key}
              className={`flex items-start gap-4 bg-white rounded-xl p-4 border border-gray-100 ${isAr ? "flex-row-reverse text-right" : ""}`}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-sm"
                style={{ background: "#F0FDF4", color: "#1B5E20" }}
              >
                {i + 1}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed pt-1">{t(lang, key)}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
