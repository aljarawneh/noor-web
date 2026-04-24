"use client";
import { useState } from "react";
import Link from "next/link";
import { Search, ChevronRight } from "lucide-react";
import { type Lang, t } from "@/lib/translations";

interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

interface Props {
  surahs: Surah[];
  lang: Lang;
}

export default function QuranListClient({ surahs, lang }: Props) {
  const [query, setQuery] = useState("");
  const isAr = lang === "ar";

  const filtered = query.trim()
    ? surahs.filter(
        (s) =>
          s.englishName.toLowerCase().includes(query.toLowerCase()) ||
          s.name.includes(query) ||
          String(s.number).includes(query)
      )
    : surahs;

  return (
    <>
      {/* Search */}
      <div className="relative mb-6">
        <Search
          size={18}
          className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${isAr ? "right-4" : "left-4"}`}
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={isAr ? "ابحث عن سورة..." : "Search surah..."}
          dir={isAr ? "rtl" : "ltr"}
          className={`w-full bg-white border border-gray-200 rounded-xl py-3 text-sm focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 ${isAr ? "pr-11 pl-4 text-right" : "pl-11 pr-4"}`}
        />
      </div>

      {/* Surah list */}
      <div className="divide-y divide-gray-100 bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        {filtered.map((s) => {
          const isMeccan = s.revelationType === "Meccan";
          return (
            <Link
              key={s.number}
              href={`/${lang}/quran/${s.number}`}
              className={`flex items-center gap-4 px-5 py-4 hover:bg-green-50 transition-colors group ${isAr ? "flex-row-reverse" : ""}`}
            >
              {/* Number badge */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0"
                style={{ background: "#F0FDF4", color: "#1B5E20" }}
              >
                {s.number}
              </div>

              {/* Names */}
              <div className={`flex-1 min-w-0 ${isAr ? "text-right" : ""}`}>
                <div className={`flex items-center gap-2 mb-0.5 ${isAr ? "flex-row-reverse justify-end" : ""}`}>
                  <p className="font-semibold text-gray-900 text-sm">{s.englishName}</p>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full shrink-0 font-medium"
                    style={{
                      background: isMeccan ? "#FEF3C7" : "#EFF6FF",
                      color: isMeccan ? "#B45309" : "#1565C0",
                    }}
                  >
                    {isMeccan ? t(lang, "quran.meccan") : t(lang, "quran.medinan")}
                  </span>
                </div>
                <p className="text-xs text-gray-400">
                  {s.englishNameTranslation} · {s.numberOfAyahs} {t(lang, "quran.verses")}
                </p>
              </div>

              {/* Arabic name */}
              <div className={`flex items-center gap-2 shrink-0 ${isAr ? "flex-row-reverse" : ""}`}>
                <p className="font-arabic text-xl text-gray-700 leading-none">{s.name}</p>
                <ChevronRight
                  size={16}
                  className={`text-gray-300 group-hover:text-green-600 transition-colors ${isAr ? "rotate-180" : ""}`}
                />
              </div>
            </Link>
          );
        })}

        {filtered.length === 0 && (
          <div className="py-12 text-center text-gray-400 text-sm">
            {isAr ? "لا توجد نتائج" : "No results found"}
          </div>
        )}
      </div>
    </>
  );
}
