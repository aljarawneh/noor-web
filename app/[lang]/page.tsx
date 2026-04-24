import type { Metadata } from "next";
import Link from "next/link";
import { Clock, BookOpen, Calculator, TrendingUp, Compass, Star, ChevronRight, Smartphone, Moon, Wind, MapPin } from "lucide-react";
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
  return {
    title: isAr
      ? "نور الإسلام — رفيقك الإسلامي الشامل"
      : "Noor Al Islam — Your Complete Islamic Companion",
    description: isAr
      ? "أوقات الصلاة، القرآن الكريم، حاسبة الزكاة، الاستثمار الحلال، الأذكار والمزيد — كل شيء في مكان واحد."
      : "Prayer times, Quran reader, Zakat calculator, Halal investing, Adhkar and more — all in one place, free.",
    keywords: isAr
      ? "نور الإسلام, أوقات الصلاة, القرآن, حاسبة الزكاة, استثمار حلال, أذكار, مسلم"
      : "noor al islam, islamic app, prayer times, quran, zakat calculator, halal investing, adhkar, muslim",
    alternates: {
      canonical: `https://noorislam.app/${lang}`,
      languages: { en: "https://noorislam.app/en", ar: "https://noorislam.app/ar" },
    },
    openGraph: {
      title: "Noor Al Islam — نور الإسلام",
      description: "Your complete Islamic companion: Prayer times, Quran, Zakat, Halal Finance.",
      type: "website",
      locale: isAr ? "ar_SA" : "en_US",
      alternateLocale: isAr ? "en_US" : "ar_SA",
      url: `https://noorislam.app/${lang}`,
    },
    twitter: { card: "summary_large_image", title: "Noor Al Islam", description: "Your complete Islamic companion." },
  };
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: rawLang } = await params;
  const lang = toLang(rawLang);
  const isAr = lang === "ar";

  const features = [
    {
      icon: Clock,
      titleKey: "home.feature.prayer.title" as const,
      descKey: "home.feature.prayer.desc" as const,
      href: `/${lang}/prayer-times`,
      color: "#1565C0",
      bg: "#EFF6FF",
      web: true,
    },
    {
      icon: BookOpen,
      titleKey: "home.feature.quran.title" as const,
      descKey: "home.feature.quran.desc" as const,
      href: `/${lang}/quran`,
      color: "#1B5E20",
      bg: "#F0FDF4",
      web: true,
    },
    {
      icon: Calculator,
      titleKey: "home.feature.zakat.title" as const,
      descKey: "home.feature.zakat.desc" as const,
      href: `/${lang}/zakat`,
      color: "#B8860B",
      bg: "#FFFBEB",
      web: true,
    },
    {
      icon: TrendingUp,
      titleKey: "home.feature.finance.title" as const,
      descKey: "home.feature.finance.desc" as const,
      href: `/${lang}/finance`,
      color: "#7C3AED",
      bg: "#F5F3FF",
      web: true,
    },
    {
      icon: Compass,
      titleKey: "home.feature.qibla.title" as const,
      descKey: "home.feature.qibla.desc" as const,
      href: `/${lang}/prayer-times`,
      color: "#0F766E",
      bg: "#F0FDFA",
      web: false,
    },
    {
      icon: Star,
      titleKey: "home.feature.adhkar.title" as const,
      descKey: "home.feature.adhkar.desc" as const,
      href: "https://apps.apple.com/us/app/noor-al-islam/id6761771260",
      color: "#DC2626",
      bg: "#FEF2F2",
      web: false,
    },
    {
      icon: Moon,
      titleKey: "home.feature.fasting.title" as const,
      descKey: "home.feature.fasting.desc" as const,
      href: "https://apps.apple.com/us/app/noor-al-islam/id6761771260",
      color: "#4338CA",
      bg: "#EEF2FF",
      web: false,
    },
    {
      icon: MapPin,
      titleKey: "home.feature.mosque.title" as const,
      descKey: "home.feature.mosque.desc" as const,
      href: "https://apps.apple.com/us/app/noor-al-islam/id6761771260",
      color: "#B45309",
      bg: "#FEF3C7",
      web: false,
    },
  ];

  const stats = [
    { value: "50K+", labelKey: "home.stat.users" as const },
    { value: "114", labelKey: "home.stat.surahs" as const },
    { value: "5", labelKey: "home.stat.prayers" as const },
    { value: "4.8★", labelKey: "home.stat.rating" as const },
  ];

  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1B5E20 0%, #2E7D32 60%, #0D3B0F 100%)" }}
      >
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
          <div className={`grid md:grid-cols-2 gap-12 items-center ${isAr ? "md:grid-flow-dense" : ""}`}>
            <div className={isAr ? "text-right md:col-start-2" : ""}>
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-medium ${isAr ? "flex-row-reverse" : ""}`}
                style={{
                  background: "rgba(255,255,255,0.12)",
                  color: "#F0D060",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                <Star size={13} fill="#F0D060" />
                {t(lang, "home.badge")}
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-4">
                {t(lang, "home.heroTitle")}
                <br />
                <span style={{ color: "#D4AF37" }}>{t(lang, "home.heroHighlight")}</span>
              </h1>
              <p className="text-2xl font-arabic text-green-200 mb-4 leading-loose">نور الإسلام</p>
              <p className="text-lg text-green-100 mb-8 leading-relaxed max-w-lg">
                {t(lang, "home.heroSubtitle")}
              </p>
              <div className={`flex flex-wrap gap-4 ${isAr ? "justify-end" : ""}`}>
                <a
                  href="https://apps.apple.com/us/app/noor-al-islam/id6761771260"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-green-900 hover:scale-105 transition-transform ${isAr ? "flex-row-reverse" : ""}`}
                  style={{ background: "#D4AF37" }}
                >
                  <Smartphone size={18} />
                  {t(lang, "home.downloadApp")}
                </a>
                <Link
                  href={`/${lang}/zakat`}
                  className={`flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white border border-white/25 hover:bg-white/10 transition-all ${isAr ? "flex-row-reverse" : ""}`}
                >
                  {t(lang, "home.tryZakat")}
                  <ChevronRight size={16} className={isAr ? "rotate-180" : ""} />
                </Link>
              </div>
            </div>

            <div className={`grid grid-cols-2 gap-4 ${isAr ? "md:col-start-1 md:row-start-1" : ""}`}>
              {stats.map((s) => (
                <div
                  key={s.labelKey}
                  className="rounded-2xl p-6 text-center"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.12)",
                  }}
                >
                  <p className="text-3xl font-bold text-white mb-1">{s.value}</p>
                  <p className="text-green-200 text-sm">{t(lang, s.labelKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quran verse */}
      <section className="bg-white border-y border-gray-100 py-10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-3xl font-arabic text-gray-800 leading-loose mb-3">
            وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ وَارْكَعُوا مَعَ الرَّاكِعِينَ
          </p>
          <p className="text-gray-400 text-sm italic">{t(lang, "home.verseRef")}</p>
        </div>
      </section>

      {/* Features grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t(lang, "home.featuresTitle")}
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">{t(lang, "home.featuresSubtitle")}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f) => (
            <a
              key={f.titleKey}
              href={f.href}
              target={f.href.startsWith("http") ? "_blank" : undefined}
              rel={f.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className={`group rounded-2xl p-5 border border-gray-100 bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer relative ${isAr ? "text-right" : ""}`}
            >
              {!f.web && (
                <span
                  className={`absolute top-3 text-xs px-2 py-0.5 rounded-full font-semibold ${isAr ? "left-3" : "right-3"}`}
                  style={{ background: "#F0FDF4", color: "#1B5E20" }}
                >
                  {isAr ? "التطبيق" : "App"}
                </span>
              )}
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${isAr ? "mr-auto" : ""}`}
                style={{ background: f.bg }}
              >
                <f.icon size={24} color={f.color} />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-1.5 group-hover:text-green-800 transition-colors">
                {t(lang, f.titleKey)}
              </h3>
              <p className="text-gray-500 text-xs leading-relaxed mb-3">{t(lang, f.descKey)}</p>
              <span
                className={`inline-flex items-center gap-1 text-xs font-semibold ${isAr ? "flex-row-reverse" : ""}`}
                style={{ color: f.color }}
              >
                {t(lang, "home.feature.try")}
                <ChevronRight size={12} className={isAr ? "rotate-180" : ""} />
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Download CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div
          className="rounded-3xl p-10 md:p-16 text-center"
          style={{ background: "linear-gradient(135deg, #1B5E20, #0D3B0F)" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t(lang, "home.ctaTitle")}
          </h2>
          <p className="text-green-100 text-lg mb-8 max-w-xl mx-auto">
            {t(lang, "home.ctaSubtitle")}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://apps.apple.com/us/app/noor-al-islam/id6761771260"
              target="_blank"
              rel="noopener noreferrer"
              className={`px-8 py-4 rounded-xl font-bold text-green-900 flex items-center gap-2 hover:scale-105 transition-transform ${isAr ? "flex-row-reverse" : ""}`}
              style={{ background: "#D4AF37" }}
            >
              <Smartphone size={20} />
              {t(lang, "home.appStore")}
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.datossol.noor_app"
              target="_blank"
              rel="noopener noreferrer"
              className={`px-8 py-4 rounded-xl font-bold text-green-900 flex items-center gap-2 hover:scale-105 transition-transform ${isAr ? "flex-row-reverse" : ""}`}
              style={{ background: "#D4AF37" }}
            >
              <Smartphone size={20} />
              {t(lang, "home.googlePlay")}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
