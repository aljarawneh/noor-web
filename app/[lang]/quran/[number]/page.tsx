import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { type Lang, t, toLang } from "@/lib/translations";

// Revalidate every 30 days — ISR, not full static pre-render
export const revalidate = 2592000;

// Pre-render all 114 surahs for both languages (static export)
export async function generateStaticParams() {
  const params: { lang: string; number: string }[] = [];
  for (let n = 1; n <= 114; n++) {
    params.push({ lang: "en", number: String(n) });
    params.push({ lang: "ar", number: String(n) });
  }
  return params;
}

interface Ayah {
  number: number;
  numberInSurah: number;
  text: string;
}

interface SurahData {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
  ayahs: Ayah[];
}

async function fetchArabic(number: string): Promise<SurahData | null> {
  try {
    const res = await fetch(`https://api.alquran.cloud/v1/surah/${number}`, {
      next: { revalidate: 2592000 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    if (!json.data || !json.data.ayahs) return null;
    return json.data as SurahData;
  } catch {
    return null;
  }
}

async function fetchTranslation(number: string): Promise<SurahData | null> {
  try {
    const res = await fetch(`https://api.alquran.cloud/v1/surah/${number}/en.asad`, {
      next: { revalidate: 2592000 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    if (!json.data || !json.data.ayahs) return null;
    return json.data as SurahData;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; number: string }>;
}): Promise<Metadata> {
  const { lang: rawLang, number } = await params;
  const lang = toLang(rawLang);
  const isAr = lang === "ar";

  let englishName = `Surah ${number}`;
  let arabicName = "";
  try {
    const data = await fetchArabic(number);
    if (data) {
      englishName = data.englishName;
      arabicName = data.name;
    }
  } catch {
    // fallback
  }

  const title = isAr
    ? `سورة ${arabicName || englishName} — القرآن الكريم | نور الإسلام`
    : `Surah ${englishName} — Read Online | Noor Al Islam`;

  const description = isAr
    ? `اقرأ سورة ${arabicName || englishName} بالنص العربي والترجمة الإنجليزية. السورة رقم ${number} من 114 في القرآن الكريم.`
    : `Read Surah ${englishName} (${arabicName}) online with Arabic text and English translation by Muhammad Asad. Surah ${number} of 114.`;

  return {
    title,
    description,
    keywords: isAr
      ? `سورة ${arabicName}, قرآن, ${arabicName} أونلاين`
      : `surah ${englishName.toLowerCase()}, quran surah ${number}, ${englishName} arabic, quran translation`,
    alternates: {
      canonical: `https://noorislam.app/${lang}/quran/${number}`,
      languages: {
        en: `https://noorislam.app/en/quran/${number}`,
        ar: `https://noorislam.app/ar/quran/${number}`,
      },
    },
    openGraph: {
      title,
      description,
      type: "article",
      locale: isAr ? "ar_SA" : "en_US",
      alternateLocale: isAr ? "en_US" : "ar_SA",
      url: `https://noorislam.app/${lang}/quran/${number}`,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function SurahPage({
  params,
}: {
  params: Promise<{ lang: string; number: string }>;
}) {
  const { lang: rawLang, number } = await params;
  const lang = toLang(rawLang);
  const isAr = lang === "ar";

  const [arabic, translation] = await Promise.all([
    fetchArabic(number),
    fetchTranslation(number),
  ]);

  if (!arabic) {
    notFound();
  }

  const isMeccan = arabic.revelationType === "Meccan";
  const prevNum = parseInt(number) - 1;
  const nextNum = parseInt(number) + 1;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Back link */}
      <div className={`mb-8 ${isAr ? "text-right" : ""}`}>
        <Link
          href={`/${lang}/quran`}
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-green-700 transition-colors"
        >
          {t(lang, "quran.back")}
        </Link>
      </div>

      {/* Surah header */}
      <div
        className="rounded-2xl p-8 mb-8 text-center text-white"
        style={{ background: "linear-gradient(135deg, #1B5E20, #2E7D32)" }}
      >
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="text-green-200 text-sm">
            {isMeccan ? t(lang, "quran.meccan") : t(lang, "quran.medinan")}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-green-300" />
          <span className="text-green-200 text-sm">
            {arabic.numberOfAyahs} {t(lang, "quran.verses")}
          </span>
        </div>
        <h1 className="text-4xl font-quran mb-2 leading-loose">{arabic.name}</h1>
        <p className="text-xl font-bold text-green-100">
          {arabic.number}. {arabic.englishName}
        </p>
        <p className="text-green-200 text-sm mt-1 italic">{arabic.englishNameTranslation}</p>

        {/* Bismillah (not for At-Tawbah #9) */}
        {arabic.number !== 9 && (
          <p className="mt-6 text-2xl font-quran text-yellow-200 leading-loose">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </p>
        )}
      </div>

      {/* Ayahs */}
      <div className="space-y-6">
        {arabic.ayahs.map((ayah, idx) => {
          const trans = translation?.ayahs[idx];
          return (
            <div
              key={ayah.number}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
            >
              {/* Ayah number badge */}
              <div className={`flex items-center gap-3 mb-4 ${isAr ? "flex-row-reverse" : ""}`}>
                <span
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                  style={{ background: "#F0FDF4", color: "#1B5E20" }}
                >
                  {ayah.numberInSurah}
                </span>
                <span className="text-xs text-gray-400">
                  {t(lang, "quran.ayah")} {ayah.numberInSurah}
                </span>
              </div>

              {/* Arabic text */}
              <p
                className="font-quran text-3xl text-gray-900 leading-[2.2] mb-5 text-right"
                dir="rtl"
              >
                {ayah.text}
              </p>

              {/* Translation */}
              {trans && (
                <div className={`border-t border-gray-100 pt-4 ${isAr ? "text-right" : ""}`}>
                  <p className="text-xs text-gray-400 mb-2 font-medium">
                    {t(lang, "quran.translation")}
                  </p>
                  <p className="text-gray-700 text-sm leading-relaxed" dir="ltr">
                    {trans.text}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Prev / Next navigation */}
      <div className={`flex justify-between items-center mt-10 gap-4 ${isAr ? "flex-row-reverse" : ""}`}>
        {prevNum >= 1 ? (
          <Link
            href={`/${lang}/quran/${prevNum}`}
            className="flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
          >
            {isAr ? "→" : "←"} {t(lang, "quran.surah")} {prevNum}
          </Link>
        ) : (
          <div />
        )}
        {nextNum <= 114 ? (
          <Link
            href={`/${lang}/quran/${nextNum}`}
            className="flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
          >
            {t(lang, "quran.surah")} {nextNum} {isAr ? "←" : "→"}
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
