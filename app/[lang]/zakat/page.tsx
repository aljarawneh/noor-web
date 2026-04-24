import type { Metadata } from "next";
import { type Lang, t, toLang } from "@/lib/translations";
import ZakatClient from "./ZakatClient";

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
    ? "حاسبة الزكاة الإسلامية — احسب زكاتك مجاناً | نور الإسلام"
    : "Islamic Zakat Calculator — Calculate Your Zakat Free | Noor Al Islam";
  const description = t(lang, "zakat.metaDesc");
  return {
    title,
    description,
    keywords: t(lang, "zakat.metaKeywords"),
    alternates: {
      canonical: `https://noorislam.app/${lang}/zakat`,
      languages: {
        en: "https://noorislam.app/en/zakat",
        ar: "https://noorislam.app/ar/zakat",
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: isAr ? "ar_SA" : "en_US",
      alternateLocale: isAr ? "en_US" : "ar_SA",
      url: `https://noorislam.app/${lang}/zakat`,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ZakatPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = toLang(rawLang);
  return <ZakatClient lang={lang} />;
}
