"use client";
import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import {
  Play, Pause, SkipForward, SkipBack,
  ChevronLeft, ChevronRight, AlignLeft, BookOpen,
  Headphones, X, BookMarked,
} from "lucide-react";
import { type Lang } from "@/lib/translations";

const QARIS = [
  { id: "Alafasy_128kbps",               name: "Mishary Al-Afasy",   nameAr: "مشاري العفاسي" },
  { id: "Husary_128kbps",                name: "Al-Husary",          nameAr: "محمود خليل الحصري" },
  { id: "Abdul_Basit_Murattal_192kbps",  name: "Abdul Basit",        nameAr: "عبد الباسط عبد الصمد" },
  { id: "AbdurRahman_As-Sudais_192kbps", name: "Al-Sudais",          nameAr: "عبدالرحمن السديس" },
  { id: "Saad_Al-Ghamdi_128kbps",        name: "Saad Al-Ghamdi",    nameAr: "سعد الغامدي" },
  { id: "Minshawi_Murattal_128kbps",     name: "Al-Minshawi",        nameAr: "محمد صديق المنشاوي" },
  { id: "Mohammad_al_Tablawi_128kbps",   name: "Al-Tablawi",         nameAr: "محمد الطبلاوي" },
];

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

function audioUrl(qari: string, surah: number, ayah: number) {
  return `https://everyayah.com/data/${qari}/${String(surah).padStart(3,"0")}${String(ayah).padStart(3,"0")}.mp3`;
}

function mushafPageUrl(pageNum: number) {
  const p = String(pageNum).padStart(3, "0");
  return `https://raw.githubusercontent.com/quran/quran-images/master/media/jpg_medq/page${p}.jpg`;
}

export default function SurahReader({ arabic, translation, lang }: Props) {
  const isAr = lang === "ar";

  // ── View ──
  const [mode, setMode] = useState<"text" | "mushaf">("text");
  const [imgError, setImgError] = useState(false);

  // ── Audio ──
  const [qari, setQari] = useState(QARIS[0].id);
  const [playingAyah, setPlayingAyah] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [showQariMenu, setShowQariMenu] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const playingRef = useRef<number | null>(null);
  useEffect(() => { playingRef.current = playingAyah; }, [playingAyah]);

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

  const play = useCallback((n: number) => {
    if (!audioRef.current) return;
    audioRef.current.src = audioUrl(qari, arabic.number, n);
    audioRef.current.load();
    audioRef.current.play().catch(() => {});
    setPlayingAyah(n);
    setPlaying(true);
  }, [qari, arabic.number]);

  const handleEnded = useCallback(() => {
    const cur = playingRef.current;
    if (cur !== null && cur < arabic.numberOfAyahs) play(cur + 1);
    else { setPlaying(false); setPlayingAyah(null); }
  }, [arabic.numberOfAyahs, play]);

  useEffect(() => {
    if (playingRef.current !== null) play(playingRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qari]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) audioRef.current.pause();
    else if (playingAyah === null) play(1);
    else audioRef.current.play().catch(() => {});
  };

  return (
    <div className="pb-28">
      {/* ── Mode toggle ── */}
      <div className={`flex gap-2 mb-6 ${isAr ? "flex-row-reverse" : ""}`}>
        {(["text","mushaf"] as const).map(m => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
              mode === m
                ? "text-white border-transparent shadow-sm"
                : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
            }`}
            style={mode === m ? { background: "#1B5E20" } : {}}
          >
            {m === "text" ? <AlignLeft size={15}/> : <BookOpen size={15}/>}
            {m === "text"
              ? (isAr ? "عرض النص" : "Text View")
              : (isAr ? "عرض المصحف" : "Mushaf View")}
          </button>
        ))}
      </div>

      {/* ══════════ MUSHAF VIEW ══════════ */}
      {mode === "mushaf" && (
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
              {currentAyahs.map((ayah, idx) => {
                const trans = translation?.ayahs.find(a => a.numberInSurah === ayah.numberInSurah);
                const active = playingAyah === ayah.numberInSurah;
                return (
                  <div
                    key={ayah.number}
                    className={`bg-white rounded-2xl p-4 border shadow-sm transition-all cursor-pointer ${
                      active ? "border-green-400 shadow-green-100 shadow-md" : "border-gray-100 hover:border-green-200"
                    }`}
                    onClick={() => {
                      if (active && playing) audioRef.current?.pause();
                      else play(ayah.numberInSurah);
                    }}
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
                {["top-1 left-1","top-1 right-1","bottom-1 left-1","bottom-1 right-1"].map(pos => (
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
      )}

      {/* ══════════ TEXT VIEW ══════════ */}
      {mode === "text" && (
        <div className="space-y-5">
          {arabic.ayahs.map((ayah, idx) => {
            const trans = translation?.ayahs[idx];
            const active = playingAyah === ayah.numberInSurah;
            return (
              <div
                key={ayah.number}
                className={`bg-white rounded-2xl p-6 border shadow-sm transition-all duration-200 ${
                  active ? "border-green-400 shadow-green-100 shadow-lg" : "border-gray-100"
                }`}
              >
                <div className={`flex items-center justify-between mb-4 ${isAr ? "flex-row-reverse" : ""}`}>
                  <div className={`flex items-center gap-2 ${isAr ? "flex-row-reverse" : ""}`}>
                    <span
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                      style={{ background: "#F0FDF4", color: "#1B5E20" }}
                    >
                      {ayah.numberInSurah}
                    </span>
                    <span className="text-xs text-gray-400">
                      {isAr ? `آية ${ayah.numberInSurah}` : `Ayah ${ayah.numberInSurah}`}
                    </span>
                    {ayah.page && (
                      <span className="text-xs text-gray-300 hidden sm:inline">
                        · {isAr ? `ص${ayah.page}` : `p.${ayah.page}`}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      if (active && playing) audioRef.current?.pause();
                      else play(ayah.numberInSurah);
                    }}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                      active ? "text-white shadow" : "bg-gray-100 text-gray-500 hover:bg-green-50 hover:text-green-700"
                    }`}
                    style={active ? { background: "#1B5E20" } : {}}
                    title={isAr ? "استمع" : "Listen"}
                  >
                    {active && playing ? <Pause size={14}/> : <Play size={14}/>}
                  </button>
                </div>

                <p className="font-quran text-3xl text-gray-900 leading-[2.4] mb-5 text-right" dir="rtl">
                  {ayah.text}
                </p>

                {trans && (
                  <div className={`border-t border-gray-100 pt-4 ${isAr ? "text-right" : ""}`}>
                    <p className="text-xs text-gray-400 mb-1.5 font-medium uppercase tracking-wide">
                      {isAr ? "الترجمة" : "Translation"}
                    </p>
                    <p className="text-gray-700 text-sm leading-relaxed" dir="ltr">{trans.text}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Hidden audio */}
      <audio
        ref={audioRef}
        onEnded={handleEnded}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        preload="none"
      />

      {/* ══════════ FIXED AUDIO BAR ══════════ */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 bg-white/96 backdrop-blur border-t border-gray-200"
        style={{ boxShadow: "0 -4px 24px rgba(0,0,0,0.08)" }}
      >
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className={`flex items-center gap-3 ${isAr ? "flex-row-reverse" : ""}`}>
            {/* Qari selector */}
            <div className="relative shrink-0">
              <button
                onClick={() => setShowQariMenu(v => !v)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-gray-700 transition"
              >
                <Headphones size={13}/>
                <span className="hidden sm:inline max-w-[90px] truncate">
                  {(isAr
                    ? QARIS.find(q => q.id === qari)?.nameAr
                    : QARIS.find(q => q.id === qari)?.name
                  )?.split(" ")[0]}
                </span>
              </button>
              {showQariMenu && (
                <div className={`absolute bottom-full mb-2 z-50 bg-white rounded-2xl border border-gray-200 shadow-2xl overflow-hidden w-60 ${isAr ? "right-0" : "left-0"}`}>
                  <div className={`flex items-center justify-between px-4 py-3 border-b border-gray-100 ${isAr ? "flex-row-reverse" : ""}`}>
                    <p className="text-xs font-bold text-gray-700">{isAr ? "اختر القارئ" : "Select Reciter"}</p>
                    <button onClick={() => setShowQariMenu(false)}><X size={14} className="text-gray-400 hover:text-gray-700"/></button>
                  </div>
                  {QARIS.map(q => (
                    <button
                      key={q.id}
                      onClick={() => { setQari(q.id); setShowQariMenu(false); }}
                      className={`w-full px-4 py-3 text-sm hover:bg-green-50 transition flex items-center justify-between ${
                        qari === q.id ? "bg-green-50 font-semibold" : "text-gray-700"
                      } ${isAr ? "flex-row-reverse text-right" : "text-left"}`}
                    >
                      <span style={{ color: qari === q.id ? "#1B5E20" : undefined }}>
                        {isAr ? q.nameAr : q.name}
                      </span>
                      {qari === q.id && <span style={{ color: "#1B5E20" }}>✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Controls */}
            <div className={`flex items-center gap-2 shrink-0 ${isAr ? "flex-row-reverse" : ""}`}>
              <button
                onClick={() => playingAyah && playingAyah > 1 && play(playingAyah - 1)}
                disabled={!playingAyah || playingAyah <= 1}
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center disabled:opacity-30 transition"
              >
                {isAr ? <SkipForward size={15}/> : <SkipBack size={15}/>}
              </button>
              <button
                onClick={togglePlay}
                className="w-11 h-11 rounded-full text-white flex items-center justify-center shadow-md hover:opacity-90 active:scale-95 transition"
                style={{ background: "#1B5E20" }}
              >
                {playing ? <Pause size={18}/> : <Play size={18}/>}
              </button>
              <button
                onClick={() => playingAyah && playingAyah < arabic.numberOfAyahs && play(playingAyah + 1)}
                disabled={!playingAyah || playingAyah >= arabic.numberOfAyahs}
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center disabled:opacity-30 transition"
              >
                {isAr ? <SkipBack size={15}/> : <SkipForward size={15}/>}
              </button>
            </div>

            {/* Now playing */}
            <div className={`flex-1 min-w-0 ${isAr ? "text-right" : ""}`}>
              {playingAyah !== null ? (
                <>
                  <p className="text-xs font-semibold text-gray-800 truncate">
                    {arabic.englishName} · {isAr ? `آية ${playingAyah}` : `Ayah ${playingAyah}`}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {isAr ? QARIS.find(q=>q.id===qari)?.nameAr : QARIS.find(q=>q.id===qari)?.name}
                  </p>
                </>
              ) : (
                <p className="text-xs text-gray-400">
                  {isAr ? "اضغط ▶ بجانب أي آية للاستماع" : "Press ▶ on any ayah to listen"}
                </p>
              )}
            </div>

            <p className="font-arabic text-base text-gray-500 shrink-0 hidden sm:block leading-none">{arabic.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
