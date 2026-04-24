import type { MetadataRoute } from "next";

const BASE_URL = "https://noorislam.app";
const LANGS = ["en", "ar"] as const;

const STATIC_PAGES = [
  { path: "", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/prayer-times", priority: 0.9, changeFrequency: "daily" as const },
  { path: "/quran", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/zakat", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/finance", priority: 0.7, changeFrequency: "monthly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Static pages
  for (const lang of LANGS) {
    for (const page of STATIC_PAGES) {
      entries.push({
        url: `${BASE_URL}/${lang}${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
      });
    }
  }

  // All 114 surah pages
  for (let n = 1; n <= 114; n++) {
    for (const lang of LANGS) {
      entries.push({
        url: `${BASE_URL}/${lang}/quran/${n}`,
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
