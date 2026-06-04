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
    ? "أوقات الصلاة اليوم | الفجر الظهر العصر المغرب العشاء بالموقع | نور الإسلام"
    : "Prayer Times Today — Fajr, Dhuhr, Asr, Maghrib, Isha | Noor Al Islam";
  const description = isAr
    ? "احصل على أوقات الصلاة الدقيقة اليوم بموقعك الجغرافي. أوقات الفجر والظهر والعصر والمغرب والعشاء محدّثة يومياً بالـGPS. مجاناً بدون تسجيل."
    : "Get accurate prayer times today for your location. Fajr, Dhuhr, Asr, Maghrib and Isha times updated daily using GPS. Free Islamic prayer schedule — no account needed.";
  return {
    title,
    description,
    keywords: isAr
      ? "أوقات الصلاة, أوقات الصلاة اليوم, وقت الفجر, وقت الظهر, وقت العصر, وقت المغرب, وقت العشاء, مواقيت الصلاة, أوقات الأذان, أذان"
      : "prayer times, prayer times today, fajr time, dhuhr time, asr time, maghrib time, isha time, muslim prayer times, salah times, namaz time, prayer schedule, islamic prayer times",
    alternates: {
      canonical: `https://nooralisam.com/${lang}/prayer-times`,
      languages: {
        en: "https://nooralisam.com/en/prayer-times",
        ar: "https://nooralisam.com/ar/prayer-times",
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: isAr ? "ar_SA" : "en_US",
      alternateLocale: isAr ? "en_US" : "ar_SA",
      url: `https://nooralisam.com/${lang}/prayer-times`,
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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {"@type": "Question", "name": "What are the 5 Islamic prayer times?", "acceptedAnswer": {"@type": "Answer", "text": "The five daily Islamic prayers are: Fajr (dawn prayer), Dhuhr (midday prayer), Asr (afternoon prayer), Maghrib (sunset prayer), and Isha (night prayer). Each prayer has a specific time window that varies by location and season."}},
      {"@type": "Question", "name": "How do I find prayer times for my location?", "acceptedAnswer": {"@type": "Answer", "text": "Noor Al Islam automatically detects your GPS location and calculates accurate prayer times using your coordinates. Simply allow location access and you'll see today's Fajr, Dhuhr, Asr, Maghrib, and Isha times instantly."}},
      {"@type": "Question", "name": "What is the Fajr prayer time?", "acceptedAnswer": {"@type": "Answer", "text": "Fajr is the first of the five daily Islamic prayers, performed before sunrise. Its time begins at astronomical dawn (when light first appears on the horizon) and ends just before sunrise. The exact time varies daily based on your location."}},
      {"@type": "Question", "name": "ما هي أوقات الصلوات الخمس؟", "acceptedAnswer": {"@type": "Answer", "text": "الصلوات الخمس هي: الفجر (قبل شروق الشمس)، الظهر (بعد زوال الشمس)، العصر (بعد الزوال حتى الغروب)، المغرب (بعد غروب الشمس)، والعشاء (بعد مغيب الشفق). تتغير أوقاتها حسب الموقع الجغرافي والفصل."}}
    ]
  };

  return (
    <>
      <PrayerTimesClient lang={lang} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
