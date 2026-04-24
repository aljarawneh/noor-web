import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { type Lang, t, toLang } from "@/lib/translations";
import SurahReader, { type SurahData } from "@/components/SurahReader";

export const revalidate = 2592000;

export async function generateStaticParams() {
  const params: { lang: string; number: string }[] = [];
  for (let n = 1; n <= 114; n++) {
    params.push({ lang: "en", number: String(n) });
    params.push({ lang: "ar", number: String(n) });
  }
  return params;
}

// Strip Arabic Extended-A annotation marks (U+08A0–U+08FF) — ruku, sajda,
// pause signs — not rendered by any web font, causing □ boxes.
function cleanArabic(text: string) {
  return text.replace(/[\u08A0-\u08FF]/g, "").replace(/\s+/g, " ").trim();
}

async function fetchArabic(number: string): Promise<SurahData | null> {
  try {
    const res = await fetch(`https://api.alquran.cloud/v1/surah/${number}`, {
      next: { revalidate: 2592000 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    const data = json.data ?? null;
    if (data?.ayahs) {
      data.ayahs = data.ayahs.map((a: { text: string }) => ({ ...a, text: cleanArabic(a.text) }));
    }
    return data;
  } catch { return null; }
}

async function fetchTranslation(number: string): Promise<SurahData | null> {
  try {
    const res = await fetch(`https://api.alquran.cloud/v1/surah/${number}/en.asad`, {
      next: { revalidate: 2592000 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data ?? null;
  } catch { return null; }
}

export async function generateMetadata({
  params,
}: { params: Promise<{ lang: string; number: string }> }): Promise<Metadata> {
  const { lang: rawLang, number } = await params;
  const lang = toLang(rawLang);
  const isAr = lang === "ar";

  let englishName = `Surah ${number}`;
  let arabicName = "";
  try {
    const data = await fetchArabic(number);
    if (data) { englishName = data.englishName; arabicName = data.name; }
  } catch { /* fallback */ }

  const title = isAr
    ? `سورة ${arabicName || englishName} — القرآن الكريم | نور الإسلام`
    : `Surah ${englishName} — Read & Listen Online | Noor Al Islam`;
  const description = isAr
    ? `اقرأ واستمع إلى سورة ${arabicName || englishName} بالنص العربي والترجمة وعدة قراء. السورة رقم ${number}.`
    : `Read and listen to Surah ${englishName} (${arabicName}) with Arabic text, English translation, and multiple reciters.`;

  return {
    title,
    description,
    keywords: isAr
      ? `سورة ${arabicName}, قرآن, استماع قرآن, ${arabicName} أونلاين`
      : `surah ${englishName.toLowerCase()}, quran ${number}, listen quran, quran translation`,
    alternates: {
      canonical: `https://noorislam.app/${lang}/quran/${number}`,
      languages: {
        en: `https://noorislam.app/en/quran/${number}`,
        ar: `https://noorislam.app/ar/quran/${number}`,
      },
    },
    openGraph: {
      title, description,
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
}: { params: Promise<{ lang: string; number: string }> }) {
  const { lang: rawLang, number } = await params;
  const lang = toLang(rawLang);
  const isAr = lang === "ar";

  const [arabic, translation] = await Promise.all([
    fetchArabic(number),
    fetchTranslation(number),
  ]);

  if (!arabic) notFound();

  const isMeccan = arabic.revelationType === "Meccan";
  const prevNum = parseInt(number) - 1;
  const nextNum = parseInt(number) + 1;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Back */}
      <div className={`mb-6 ${isAr ? "text-right" : ""}`}>
        <Link
          href={`/${lang}/quran`}
          className={`inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-green-700 transition-colors ${isAr ? "flex-row-reverse" : ""}`}
        >
          {isAr ? <ChevronRight size={15}/> : <ChevronLeft size={15}/>}
          {t(lang, "quran.back")}
        </Link>
      </div>

      {/* Surah header */}
      <div
        className="rounded-2xl p-8 mb-8 text-center text-white"
        style={{ background: "linear-gradient(135deg, #1B5E20, #2E7D32)" }}
      >
        <div className={`flex items-center justify-center gap-3 mb-3 ${isAr ? "flex-row-reverse" : ""}`}>
          <span className="text-green-200 text-sm">
            {isMeccan ? t(lang, "quran.meccan") : t(lang, "quran.medinan")}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-green-300"/>
          <span className="text-green-200 text-sm">
            {arabic.numberOfAyahs} {t(lang, "quran.verses")}
          </span>
        </div>
        <h1 className="text-5xl font-quran mb-2 leading-loose">{arabic.name}</h1>
        <p className="text-xl font-bold text-green-100">
          {arabic.number}. {arabic.englishName}
        </p>
        <p className="text-green-200 text-sm mt-1 italic">{arabic.englishNameTranslation}</p>

        {arabic.number !== 9 && (
          <p className="mt-6 text-2xl font-quran text-yellow-200 leading-loose">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </p>
        )}
      </div>

      {/* Interactive reader (text + mushaf + audio) */}
      <SurahReader arabic={arabic} translation={translation} lang={lang} />

      {/* Prev / Next navigation */}
      <div className={`flex justify-between items-center mt-10 gap-4 ${isAr ? "flex-row-reverse" : ""}`}>
        {prevNum >= 1 ? (
          <Link
            href={`/${lang}/quran/${prevNum}`}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition ${isAr ? "flex-row-reverse" : ""}`}
          >
            {isAr ? <ChevronRight size={15}/> : <ChevronLeft size={15}/>}
            {t(lang, "quran.surah")} {prevNum}
          </Link>
        ) : <div/>}
        {nextNum <= 114 ? (
          <Link
            href={`/${lang}/quran/${nextNum}`}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition ${isAr ? "flex-row-reverse" : ""}`}
          >
            {t(lang, "quran.surah")} {nextNum}
            {isAr ? <ChevronLeft size={15}/> : <ChevronRight size={15}/>}
          </Link>
        ) : <div/>}
      </div>
    </div>
  );
}
