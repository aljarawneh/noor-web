"use client";
import { useState, useMemo, useEffect } from "react";
import {
  Play, Pause,
  ChevronLeft, ChevronRight, BookOpen, BookMarked,
} from "lucide-react";
import { type Lang } from "@/lib/translations";
import { useAudio } from "@/lib/audioContext";

export interface Ayah {
  number: number;
  numberInSurah: number;
  text: string;
  page?: number;
}

export interface SurahData {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
  ayahs: Ayah[];
}

interface Props {
  arabic: SurahData;
  translation: SurahData | null;
  lang: Lang;
}

function mushafPageUrl(pageNum: number) {
  const p = String(pageNum).padStart(3, "0");
  return `https://raw.githubusercontent.com/quran/quran-images/master/media/jpg_medq/page${p}.jpg`;
}

export default function SurahReader({ arabic, translation, lang }: Props) {
  const isAr = lang === "ar";

  // ── View ──
  const mode = "mushaf";
  const [imgError, setImgError] = useState(false);

  // ── Global audio ──
  const { nowPlaying, playing, playAyah: ctxPlay, togglePlay } = useAudio();
  const playingAyah = nowPlaying?.surahNum === arabic.number ? nowPlaying.ayahNum : null;

  // ── Mushaf pages — group surah ayahs by Quran page number ──
  const pageGroups = useMemo(() => {
    const map = new Map<number, Ayah[]>();
    for (const ayah of arabic.ayahs) {
      const p = ayah.page ?? 1;
      if (!map.has(p)) map.set(p, []);
      map.get(p)!.push(ayah);
    }
    return [...map.entries()].sort(([a], [b]) => a - b);
  }, [arabic.ayahs]);

  const [pageIdx, setPageIdx] = useState(0);
  const [currentPageNum, currentAyahs] = pageGroups[pageIdx] ?? [1, arabic.ayahs];

  // Reset imgError on page change
  useEffect(() => { setImgError(false); }, [currentPageNum]);

  function handleAyahClick(ayahNum: number) {
    if (playingAyah === ayahNum && playing) {
      togglePlay();
    } else {
      ctxPlay({
        surahNum: arabic.number,
        surahName: arabic.name,
        surahNameEn: arabic.englishName,
        ayahNum,
        totalAyahs: arabic.numberOfAyahs,
      });
    }
  }

  return (
    <div className="pb-10">

      {/* ══════════ MUSHAF VIEW ══════════ */}
      <div className="flex flex-col gap-4">
          {/* ── Top navigation bar ── */}
          <div
            className="flex items-center justify-between gap-3 px-4 py-3 rounded-2xl text-white text-sm font-semibold"
            style={{ background: "linear-gradient(135deg,#1B5E20,#2E7D32)" }}
          >
            <button
              onClick={() => setPageIdx(i => Math.max(0, i - 1))}
              disabled={pageIdx === 0}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 disabled:opacity-30 transition ${isAr ? "flex-row-reverse" : ""}`}
            >
              {isAr ? <ChevronRight size={15}/> : <ChevronLeft size={15}/>}
              {isAr ? "السابقة" : "Prev"}
            </button>

            <div className="flex items-center gap-4 text-center">
              <div>
                <p className="text-[10px] text-green-200 uppercase tracking-widest">{isAr ? "الصفحة" : "Page"}</p>
                <p className="text-lg font-bold leading-none">{currentPageNum}</p>
              </div>
              <div className="w-px h-8 bg-white/20"/>
              <div>
                <p className="text-[10px] text-green-200 uppercase tracking-widest">{isAr ? "من" : "of"}</p>
                <p className="text-lg font-bold leading-none">604</p>
              </div>
              <div className="w-px h-8 bg-white/20 hidden sm:block"/>
              <div className="hidden sm:block">
                <p className="text-[10px] text-green-200 uppercase tracking-widest">{isAr ? "السورة" : "Surah"}</p>
                <p className="text-sm font-bold leading-none font-arabic">{arabic.name}</p>
              </div>
            </div>

            <button
              onClick={() => setPageIdx(i => Math.min(pageGroups.length - 1, i + 1))}
              disabled={pageIdx >= pageGroups.length - 1}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 disabled:opacity-30 transition ${isAr ? "flex-row-reverse" : ""}`}
            >
              {isAr ? "التالية" : "Next"}
              {isAr ? <ChevronLeft size={15}/> : <ChevronRight size={15}/>}
            </button>
          </div>

          {/* ── Two-panel layout ── */}
          <div className="flex flex-col lg:flex-row gap-4 items-start">

            {/* LEFT panel — Translation & Tafsir */}
            <div className="w-full lg:w-2/5 order-2 lg:order-1 space-y-3 max-h-[80vh] overflow-y-auto pr-1">
              <div className="sticky top-0 z-10 bg-gray-50 pb-2">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
                  <BookMarked size={12}/>
                  {isAr ? "الآيات والترجمة" : "Verses & Translation"}
                </div>
              </div>
              {currentAyahs.map((ayah) => {
                const trans = translation?.ayahs.find(a => a.numberInSurah === ayah.numberInSurah);
                const active = playingAyah === ayah.numberInSurah;
                return (
                  <div
                    key={ayah.number}
                    className={`bg-white rounded-2xl p-4 border shadow-sm transition-all cursor-pointer ${
                      active ? "border-green-400 shadow-green-100 shadow-md" : "border-gray-100 hover:border-green-200"
                    }`}
                    onClick={() => handleAyahClick(ayah.numberInSurah)}
                  >
                    <div className={`flex items-center justify-between mb-3 ${isAr ? "flex-row-reverse" : ""}`}>
                      <div className={`flex items-center gap-2 ${isAr ? "flex-row-reverse" : ""}`}>
                        <span
                          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                          style={{ background: active ? "#1B5E20" : "#F0FDF4", color: active ? "white" : "#1B5E20" }}
                        >
                          {ayah.numberInSurah}
                        </span>
                        <span className="text-xs text-gray-400">
                          {isAr ? `آية ${ayah.numberInSurah}` : `Ayah ${ayah.numberInSurah}`}
                        </span>
                      </div>
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center ${
                          active ? "text-white" : "bg-gray-100 text-gray-400"
                        }`}
                        style={active ? { background: "#1B5E20" } : {}}
                      >
                        {active && playing ? <Pause size={11}/> : <Play size={11}/>}
                      </div>
                    </div>

                    <p className="font-quran text-xl text-gray-900 leading-[2.2] mb-3 text-right" dir="rtl">
                      {ayah.text}
                    </p>

                    {trans && (
                      <p className={`text-xs text-gray-500 leading-relaxed border-t border-gray-100 pt-2 ${isAr ? "text-right" : ""}`} dir={isAr ? "rtl" : "ltr"}>
                        {trans.text}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* RIGHT panel — Mushaf page image */}
            <div className="w-full lg:w-3/5 order-1 lg:order-2 sticky top-4">
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  border: "6px solid #C8A951",
                  boxShadow: "0 0 0 2px #8B6914, 0 24px 60px rgba(0,0,0,0.25)",
                  background: "#FEFAF3",
                }}
              >
                {/* Corner ornaments */}
                {["top-1 left-1", "top-1 right-1", "bottom-1 left-1", "bottom-1 right-1"].map(pos => (
                  <div
                    key={pos}
                    className={`absolute ${pos} w-4 h-4 rounded-full z-10`}
                    style={{ background: "radial-gradient(circle,#D4AF37,#8B6914)" }}
                  />
                ))}

                {!imgError ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={currentPageNum}
                    src={mushafPageUrl(currentPageNum)}
                    alt={`Quran page ${currentPageNum}`}
                    className="w-full h-auto block"
                    onError={() => setImgError(true)}
                    style={{ minHeight: "400px", objectFit: "contain" }}
                  />
                ) : (
                  /* Fallback: text rendering if image fails */
                  <div className="p-8" style={{ minHeight: "500px" }}>
                    <div className="text-center mb-5">
                      <p className="text-xs text-amber-600 font-semibold mb-3">
                        {isAr ? `صفحة ${currentPageNum}` : `Page ${currentPageNum}`}
                      </p>
                    </div>
                    <p
                      className="font-quran text-[1.5rem] leading-[2.8] text-right"
                      dir="rtl"
                      style={{ color: "#1a1a1a", textAlign: "justify", textAlignLast: "right" }}
                    >
                      {currentAyahs.map(ayah => (
                        <span key={ayah.number}>
                          {ayah.text}
                          <span
                            className="inline-flex items-center justify-center mx-1 font-arabic shrink-0"
                            style={{
                              background: "linear-gradient(135deg,#C8A951,#8B6914)",
                              color: "white",
                              borderRadius: "50%",
                              width: "1.5em",
                              height: "1.5em",
                              fontSize: "0.6em",
                              verticalAlign: "middle",
                              fontWeight: "bold",
                            }}
                          >
                            {ayah.numberInSurah}
                          </span>
                        </span>
                      ))}
                    </p>
                  </div>
                )}

                {/* Page number badge */}
                <div
                  className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white"
                  style={{ background: "rgba(27,94,32,0.85)", backdropFilter: "blur(4px)" }}
                >
                  {currentPageNum}
                </div>
              </div>

              {/* Page dots */}
              {pageGroups.length <= 30 && (
                <div className="flex gap-1.5 flex-wrap justify-center mt-3">
                  {pageGroups.map(([pNum], i) => (
                    <button
                      key={pNum}
                      onClick={() => setPageIdx(i)}
                      className={`w-7 h-7 rounded-full text-xs font-bold transition-all ${
                        i === pageIdx ? "text-white shadow" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                      }`}
                      style={i === pageIdx ? { background: "#1B5E20" } : {}}
                    >
                      {pNum}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
      </div>
    </div>
  );
}
