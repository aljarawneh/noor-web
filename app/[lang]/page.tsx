import type { Metadata } from "next";
import Link from "next/link";
import {
  Clock, BookOpen, Calculator, TrendingUp, Compass, Star,
  ChevronRight, Moon, Wind, MapPin, Headphones, Users,
} from "lucide-react";
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

const IOS_URL = "https://apps.apple.com/us/app/noor-al-islam/id6761771260";
const ANDROID_URL = "https://play.google.com/store/apps/details?id=com.datossol.noor_app";

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
      href: IOS_URL,
      color: "#DC2626",
      bg: "#FEF2F2",
      web: false,
    },
    {
      icon: Moon,
      titleKey: "home.feature.fasting.title" as const,
      descKey: "home.feature.fasting.desc" as const,
      href: IOS_URL,
      color: "#4338CA",
      bg: "#EEF2FF",
      web: false,
    },
    {
      icon: MapPin,
      titleKey: "home.feature.mosque.title" as const,
      descKey: "home.feature.mosque.desc" as const,
      href: IOS_URL,
      color: "#B45309",
      bg: "#FEF3C7",
      web: false,
    },
  ];

  const stats = [
    { value: "50K+", labelKey: "home.stat.users" as const, icon: Users },
    { value: "114", labelKey: "home.stat.surahs" as const, icon: BookOpen },
    { value: "5", labelKey: "home.stat.prayers" as const, icon: Clock },
    { value: "4.8★", labelKey: "home.stat.rating" as const, icon: Star },
  ];

  const quickLinks = [
    { href: `/${lang}/prayer-times`, label: isAr ? "أوقات الصلاة" : "Prayer Times", emoji: "🕌" },
    { href: `/${lang}/quran`, label: isAr ? "القرآن" : "Quran", emoji: "📖" },
    { href: `/${lang}/listen`, label: isAr ? "استمع القرآن" : "Listen to Quran", emoji: "🎧" },
    { href: `/${lang}/kids`, label: isAr ? "للأطفال" : "Kids", emoji: "⭐" },
    { href: `/${lang}/zakat`, label: isAr ? "الزكاة" : "Zakat", emoji: "💛" },
    { href: `/${lang}/finance`, label: isAr ? "التمويل الإسلامي" : "Islamic Finance", emoji: "📈" },
  ];

  const featuredQaris = [
    { nameEn: "Mishary Al-Afasy", nameAr: "مشاري العفاسي", country: "Kuwait" },
    { nameEn: "Al-Husary", nameAr: "محمود خليل الحصري", country: "Egypt" },
    { nameEn: "Abdul Basit", nameAr: "عبد الباسط عبد الصمد", country: "Egypt" },
    { nameEn: "Al-Sudais", nameAr: "عبدالرحمن السديس", country: "Saudi Arabia" },
  ];

  return (
    <>
      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1B5E20 0%, #2E7D32 60%, #0D3B0F 100%)" }}
      >
        {/* Dot pattern overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Glow orb */}
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle,#D4AF37,transparent)" }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className={`max-w-3xl ${isAr ? "ml-auto text-right" : ""}`}>
            {/* Badge */}
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

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4">
              {t(lang, "home.heroTitle")}
              <br />
              <span style={{ color: "#D4AF37" }}>{t(lang, "home.heroHighlight")}</span>
            </h1>

            <p className="text-2xl font-arabic text-green-200 mb-4 leading-loose">نور الإسلام</p>

            <p className="text-lg text-green-100 mb-8 leading-relaxed max-w-xl">
              {t(lang, "home.heroSubtitle")}
            </p>

            {/* CTA Buttons */}
            <div className={`flex flex-wrap gap-4 mb-12 ${isAr ? "justify-end" : ""}`}>
              <a
                href={IOS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-gray-900 hover:scale-105 transition-transform ${isAr ? "flex-row-reverse" : ""}`}
                style={{ background: "#D4AF37" }}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.14-2.18 1.27-2.16 3.8.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.37 2.78M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                {t(lang, "home.appStore")}
              </a>
              <a
                href={ANDROID_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold hover:scale-105 transition-transform ${isAr ? "flex-row-reverse" : ""}`}
                style={{ background: "rgba(255,255,255,0.15)", color: "white", border: "1px solid rgba(255,255,255,0.25)" }}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M3 20.5v-17c0-.83.94-1.3 1.6-.8l14 8.5c.6.36.6 1.24 0 1.6l-14 8.5c-.66.5-1.6.03-1.6-.8z"/>
                </svg>
                {t(lang, "home.googlePlay")}
              </a>
            </div>

            {/* Stats row */}
            <div className={`grid grid-cols-4 gap-4 max-w-lg ${isAr ? "ml-auto" : ""}`}>
              {stats.map(s => (
                <div key={s.labelKey} className="text-center">
                  <p className="text-2xl font-bold text-white">{s.value}</p>
                  <p className="text-green-300 text-xs mt-0.5">{t(lang, s.labelKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Quick Access Bar ── */}
      <section className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className={`flex gap-2 overflow-x-auto pb-1 scrollbar-hide ${isAr ? "flex-row-reverse" : ""}`}>
            {quickLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 hover:bg-green-50 text-gray-700 hover:text-green-800 text-sm font-semibold whitespace-nowrap border border-gray-200 hover:border-green-200 transition-all shrink-0"
              >
                <span>{link.emoji}</span>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quran verse ── */}
      <section className="bg-white border-b border-gray-100 py-10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-3xl font-arabic text-gray-800 leading-loose mb-3">
            وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ وَارْكَعُوا مَعَ الرَّاكِعِينَ
          </p>
          <p className="text-gray-400 text-sm italic">{t(lang, "home.verseRef")}</p>
        </div>
      </section>

      {/* ── Features grid ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className={`text-center mb-14 ${isAr ? "text-center" : ""}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t(lang, "home.featuresTitle")}
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">{t(lang, "home.featuresSubtitle")}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map(f => (
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

      {/* ── Quran Listening Teaser ── */}
      <section
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg,#0D1117 0%,#1a2332 50%,#0D1117 100%)" }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, #D4AF37 1px, transparent 0)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className={`flex flex-col lg:flex-row gap-12 items-center ${isAr ? "lg:flex-row-reverse" : ""}`}>
            {/* Left content */}
            <div className={`flex-1 ${isAr ? "text-right" : ""}`}>
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-medium ${isAr ? "flex-row-reverse" : ""}`}
                style={{ background: "rgba(212,175,55,0.15)", color: "#D4AF37", border: "1px solid rgba(212,175,55,0.3)" }}
              >
                <Headphones size={13} />
                {isAr ? "جديد" : "New"}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {isAr ? "استمع إلى القرآن الكريم" : "Listen to the Holy Quran"}
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-md">
                {isAr
                  ? "استمع إلى جميع السور الـ 114 بأصوات كبار القراء. اختر من بين 7 قراء مشهورين عالمياً."
                  : "Listen to all 114 surahs recited by world-class reciters. Choose from 7 globally renowned reciters."}
              </p>
              <Link
                href={`/${lang}/listen`}
                className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold hover:scale-105 transition-transform ${isAr ? "flex-row-reverse" : ""}`}
                style={{ background: "#D4AF37", color: "#1a1a1a" }}
              >
                <Headphones size={18} />
                {isAr ? "ابدأ الاستماع" : "Start Listening"}
                <ChevronRight size={16} className={isAr ? "rotate-180" : ""} />
              </Link>
            </div>

            {/* Right - Reciters */}
            <div className="flex-1 grid grid-cols-2 gap-3 w-full max-w-sm">
              {featuredQaris.map(q => (
                <div
                  key={q.nameEn}
                  className={`rounded-2xl p-4 ${isAr ? "text-right" : ""}`}
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center mb-3" style={{ background: "rgba(212,175,55,0.2)" }}>
                    <Headphones size={18} style={{ color: "#D4AF37" }} />
                  </div>
                  <p className="text-white font-semibold text-sm leading-snug">{isAr ? q.nameAr : q.nameEn}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{q.country}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Kids Section ── */}
      <section
        className="relative overflow-hidden py-20"
        style={{ background: "linear-gradient(135deg,#F0FDF4 0%,#FFFBEB 50%,#EFF6FF 100%)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex flex-col lg:flex-row gap-12 items-center ${isAr ? "lg:flex-row-reverse" : ""}`}>
            {/* Icons decoration */}
            <div className="flex-1 flex items-center justify-center">
              <div className="relative w-64 h-64">
                <div
                  className="absolute inset-0 rounded-3xl flex items-center justify-center text-8xl"
                  style={{ background: "linear-gradient(135deg,#1B5E20,#2E7D32)", transform: "rotate(-6deg)" }}
                >
                  🌙
                </div>
                <div className="absolute -top-4 -right-4 w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg" style={{ background: "white" }}>⭐</div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg" style={{ background: "white" }}>📖</div>
              </div>
            </div>

            {/* Content */}
            <div className={`flex-1 ${isAr ? "text-right" : ""}`}>
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-semibold ${isAr ? "flex-row-reverse" : ""}`}
                style={{ background: "#F0FDF4", color: "#1B5E20", border: "1px solid #bbf7d0" }}
              >
                <span>⭐</span>
                {isAr ? "للأطفال" : "For Kids"}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {isAr ? "التعليم الإسلامي للأطفال" : "Islamic Learning for Kids"}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6 max-w-md">
                {isAr
                  ? "سور قصيرة للحفظ، أدعية يومية، وأركان الإسلام — بطريقة ممتعة وتفاعلية مناسبة للأطفال."
                  : "Short surahs to memorize, daily duas, and the pillars of Islam — in a fun, interactive way designed for children."}
              </p>
              <div className={`flex gap-4 flex-wrap ${isAr ? "justify-end" : ""}`}>
                <Link
                  href={`/${lang}/kids`}
                  className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white hover:opacity-90 transition ${isAr ? "flex-row-reverse" : ""}`}
                  style={{ background: "#1B5E20" }}
                >
                  {isAr ? "ابدأ التعلم" : "Start Learning"}
                  <ChevronRight size={16} className={isAr ? "rotate-180" : ""} />
                </Link>
              </div>

              {/* Mini feature list */}
              <div className="mt-8 space-y-2">
                {[
                  { emoji: "📖", textEn: "6 short surahs for memorization", textAr: "6 سور قصيرة للحفظ" },
                  { emoji: "🤲", textEn: "5 essential daily duas", textAr: "5 أدعية يومية أساسية" },
                  { emoji: "🕌", textEn: "5 pillars of Islam explained", textAr: "أركان الإسلام الخمسة" },
                ].map(item => (
                  <div key={item.textEn} className={`flex items-center gap-3 ${isAr ? "flex-row-reverse" : ""}`}>
                    <span className="text-xl">{item.emoji}</span>
                    <span className="text-gray-600 text-sm">{isAr ? item.textAr : item.textEn}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Download CTA ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
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
          <div className={`flex flex-wrap justify-center gap-4 ${isAr ? "flex-row-reverse" : ""}`}>
            <a
              href={IOS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-8 py-4 rounded-xl font-bold text-gray-900 flex items-center gap-2 hover:scale-105 transition-transform ${isAr ? "flex-row-reverse" : ""}`}
              style={{ background: "#D4AF37" }}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.14-2.18 1.27-2.16 3.8.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.37 2.78M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              {t(lang, "home.appStore")}
            </a>
            <a
              href={ANDROID_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-8 py-4 rounded-xl font-bold text-gray-900 flex items-center gap-2 hover:scale-105 transition-transform ${isAr ? "flex-row-reverse" : ""}`}
              style={{ background: "#D4AF37" }}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M3 20.5v-17c0-.83.94-1.3 1.6-.8l14 8.5c.6.36.6 1.24 0 1.6l-14 8.5c-.66.5-1.6.03-1.6-.8z"/>
              </svg>
              {t(lang, "home.googlePlay")}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
