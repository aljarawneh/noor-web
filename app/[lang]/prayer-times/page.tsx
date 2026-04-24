import type { Metadata } from "next";
import { type Lang, toLang } from "@/lib/translations";
import PrayerTimesClient from "./PrayerTimesClient";

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
    ? "أوقات الصلاة — الفجر، الظهر، العصر، المغرب، العشاء | نور الإسلام"
    : "Prayer Times — Fajr, Dhuhr, Asr, Maghrib, Isha | Noor Al Islam";
  const description = isAr
    ? "احصل على أوقات صلاة دقيقة بناءً على موقعك. الفجر، الشروق، الظهر، العصر، المغرب، العشاء مع طرق الحساب المتعددة."
    : "Get accurate Islamic prayer times based on your location. Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha with multiple calculation methods.";
  return {
    title,
    description,
    keywords: isAr
      ? "أوقات الصلاة, الفجر, الظهر, العصر, المغرب, العشاء, أذان, قبلة"
      : "prayer times, fajr time, dhuhr time, asr time, maghrib time, isha time, athan, qibla, muslim prayer",
    alternates: {
      canonical: `https://noorislam.app/${lang}/prayer-times`,
      languages: {
        en: "https://noorislam.app/en/prayer-times",
        ar: "https://noorislam.app/ar/prayer-times",
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: isAr ? "ar_SA" : "en_US",
      alternateLocale: isAr ? "en_US" : "ar_SA",
      url: `https://noorislam.app/${lang}/prayer-times`,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function PrayerTimesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = toLang(rawLang);
  return <PrayerTimesClient lang={lang} />;
}
