"use client";
import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import {
  Play, Pause, SkipForward, SkipBack,
  ChevronLeft, ChevronRight, AlignLeft, BookOpen,
  Headphones, X,
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

// ── Ayah end marker (Unicode End of Ayah character) rendered as ornament
function AyahMarker({ n }: { n: number }) {
  return (
    <span
      className="inline-flex items-center justify-center mx-1 font-arabic shrink-0"
      style={{
        background: "linear-gradient(135deg,#C8A951,#8B6914)",
        color: "white",
        borderRadius: "50%",
        width: "1.6em",
        height: "1.6em",
        fontSize: "0.65em",
        verticalAlign: "middle",
        fontWeight: "bold",
      }}
    >
      {n}
    </span>
  );
}

export default function SurahReader({ arabic, translation, lang }: Props) {
  const isAr = lang === "ar";

  // ── View ──
  const [mode, setMode] = useState<"text" | "mushaf">("text");

  // ── Audio ──
  const [qari, setQari] = useState(QARIS[0].id);
  const [playingAyah, setPlayingAyah] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [showQariMenu, setShowQariMenu] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const playingRef = useRef<number | null>(null);
  useEffect(() => { playingRef.current = playingAyah; }, [playingAyah]);

  // ── Mushaf pages — group surah ayahs by page number ──
  const pageGroups = useMemo(() => {
    const map = new Map<number, Ayah[]>();
    for (const ayah of arabic.ayahs) {
      const p = ayah.page ?? 1;
      if (!map.has(p)) map.set(p, []);
      map.get(p)!.push(ayah);
    }
    return [...map.entries()].sort(([a], [b]) => a - b); // [[pageNum, ayahs[]], ...]
  }, [arabic.ayahs]);

  const [pageIdx, setPageIdx] = useState(0);
  const [currentPageNum, currentAyahs] = pageGroups[pageIdx] ?? [1, arabic.ayahs];

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

  // Switch qari while playing
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

  const isFirstPage = pageGroups[0]?.[0] === currentPageNum;

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
        <div className="flex flex-col items-center gap-5">
          {/* Page nav */}
          <div className={`flex w-full items-center justify-between ${isAr ? "flex-row-reverse" : ""}`}>
            <button
              onClick={() => setPageIdx(i => Math.max(0, i - 1))}
              disabled={pageIdx === 0}
              className={`flex items-center gap-1 px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-600 disabled:opacity-30 hover:bg-gray-50 transition ${isAr ? "flex-row-reverse" : ""}`}
            >
              {isAr ? <ChevronRight size={16}/> : <ChevronLeft size={16}/>}
              {isAr ? "السابقة" : "Prev"}
            </button>
            <span className="text-sm font-bold text-gray-700">
              {isAr ? `صفحة ${currentPageNum} من 604` : `Page ${currentPageNum} / 604`}
            </span>
            <button
              onClick={() => setPageIdx(i => Math.min(pageGroups.length - 1, i + 1))}
              disabled={pageIdx >= pageGroups.length - 1}
              className={`flex items-center gap-1 px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-600 disabled:opacity-30 hover:bg-gray-50 transition ${isAr ? "flex-row-reverse" : ""}`}
            >
              {isAr ? "التالية" : "Next"}
              {isAr ? <ChevronLeft size={16}/> : <ChevronRight size={16}/>}
            </button>
          </div>

          {/* Mushaf page — text-based rendering */}
          <div
            className="w-full max-w-2xl relative"
            style={{
              border: "8px solid #C8A951",
              borderRadius: "18px",
              boxShadow: "0 0 0 3px #8B6914, inset 0 0 30px rgba(200,169,81,0.08), 0 24px 60px rgba(0,0,0,0.22)",
              background: "#FEFAF3",
            }}
          >
            {/* Corner ornaments */}
            {["top-1 left-1","top-1 right-1","bottom-1 left-1","bottom-1 right-1"].map(pos => (
              <div
                key={pos}
                className={`absolute ${pos} w-5 h-5 rounded-full`}
                style={{ background: "radial-gradient(circle,#D4AF37,#8B6914)" }}
              />
            ))}

            {/* Inner frame */}
            <div
              className="m-3 rounded-xl p-6 sm:p-8"
              style={{ border: "1.5px solid rgba(200,169,81,0.4)", minHeight: "500px" }}
            >
              {/* Surah name header (only on first page of surah) */}
              {isFirstPage && (
                <div className="text-center mb-5">
                  <div
                    className="inline-block px-8 py-2 rounded-full mb-2"
                    style={{ background: "linear-gradient(90deg,#1B5E20,#2E7D32)", color: "white" }}
                  >
                    <p className="font-quran text-2xl leading-loose">{arabic.name}</p>
                  </div>
                  <p className="text-xs text-amber-700 font-semibold tracking-widest uppercase">
                    {arabic.englishName} · {arabic.numberOfAyahs} {isAr ? "آية" : "verses"}
                  </p>
                </div>
              )}

              {/* Bismillah (not for At-Tawbah and not on continuation pages) */}
              {isFirstPage && arabic.number !== 9 && (
                <p
                  className="font-quran text-center text-2xl leading-loose mb-6"
                  style={{ color: "#1B3A1F" }}
                  dir="rtl"
                >
                  بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ
                </p>
              )}

              {/* Page number top-right */}
              <div className={`flex justify-between text-xs text-amber-700 font-bold mb-4 ${isAr ? "flex-row-reverse" : ""}`}>
                <span className="font-arabic">{arabic.name}</span>
                <span>{currentPageNum}</span>
              </div>

              {/* Ayah text — continuous flow like real Mushaf */}
              <p
                className="font-quran text-[1.45rem] sm:text-[1.65rem] leading-[2.6] text-right"
                dir="rtl"
                style={{ color: "#1a1a1a", textAlign: "justify", textAlignLast: "right" }}
              >
                {currentAyahs.map(ayah => (
                  <span key={ayah.number}>
                    {ayah.text}
                    <AyahMarker n={ayah.numberInSurah}/>
                  </span>
                ))}
              </p>

              {/* Juz indicator */}
              <div className="mt-4 text-center">
                <span className="text-xs text-amber-600 font-arabic font-semibold">
                  {isAr ? `الجزء — صفحة ${currentPageNum}` : `Page ${currentPageNum} · Juz displayed`}
                </span>
              </div>
            </div>
          </div>

          {/* Page dots */}
          {pageGroups.length <= 20 && (
            <div className="flex gap-1.5 flex-wrap justify-center">
              {pageGroups.map(([pNum], i) => (
                <button
                  key={pNum}
                  onClick={() => setPageIdx(i)}
                  className={`w-8 h-8 rounded-full text-xs font-bold transition-all ${
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
