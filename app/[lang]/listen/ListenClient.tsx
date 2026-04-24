"use client";
import { useState } from "react";
import { Play, Pause, Search, Headphones } from "lucide-react";
import { useAudio, QARIS } from "@/lib/audioContext";
import { type Lang } from "@/lib/translations";
import { type Surah } from "@/lib/surahs";

interface Props {
  surahs: Surah[];
  lang: Lang;
}

export default function ListenClient({ surahs, lang }: Props) {
  const { nowPlaying, playing, qari, setQari, playAyah } = useAudio();
  const [search, setSearch] = useState("");
  const [showQariMenu, setShowQariMenu] = useState(false);
  const isAr = lang === "ar";

  const filtered = surahs.filter(s =>
    s.englishName.toLowerCase().includes(search.toLowerCase()) ||
    s.name.includes(search) ||
    String(s.number).includes(search)
  );

  const qariInfo = QARIS.find(q => q.id === qari);

  function handlePlay(surah: Surah) {
    const isCurrentlyPlaying = nowPlaying?.surahNum === surah.number;
    if (isCurrentlyPlaying) return;
    playAyah({
      surahNum: surah.number,
      surahName: surah.name,
      surahNameEn: surah.englishName,
      ayahNum: 1,
      totalAyahs: surah.numberOfAyahs,
    });
  }

  return (
    <div>
      {/* Controls bar */}
      <div className={`flex flex-col sm:flex-row gap-3 mb-8 ${isAr ? "sm:flex-row-reverse" : ""}`}>
        {/* Search */}
        <div className="relative flex-1">
          <Search size={16} className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${isAr ? "right-3" : "left-3"}`} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={isAr ? "ابحث عن سورة..." : "Search surah..."}
            className={`w-full py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-200 ${isAr ? "pr-10 pl-4 text-right" : "pl-10 pr-4"}`}
          />
        </div>

        {/* Qari selector */}
        <div className="relative">
          <button
            onClick={() => setShowQariMenu(v => !v)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-700 hover:bg-gray-50 transition whitespace-nowrap ${isAr ? "flex-row-reverse" : ""}`}
          >
            <Headphones size={15} style={{ color: "#1B5E20" }} />
            {isAr ? qariInfo?.nameAr : qariInfo?.name}
          </button>
          {showQariMenu && (
            <div className={`absolute top-full mt-2 bg-white rounded-2xl border border-gray-200 shadow-2xl overflow-hidden w-64 z-50 ${isAr ? "right-0" : "left-0"}`}>
              <div className={`px-4 py-3 border-b border-gray-100 text-xs font-bold text-gray-600 ${isAr ? "text-right" : ""}`}>
                {isAr ? "اختر القارئ" : "Select Reciter"}
              </div>
              {QARIS.map(q => (
                <button
                  key={q.id}
                  onClick={() => { setQari(q.id); setShowQariMenu(false); }}
                  className={`w-full px-4 py-3 text-sm hover:bg-green-50 flex items-center justify-between transition ${qari === q.id ? "bg-green-50 font-semibold" : "text-gray-700"} ${isAr ? "flex-row-reverse text-right" : "text-left"}`}
                >
                  <div className={`flex flex-col ${isAr ? "items-end" : ""}`}>
                    <span style={{ color: qari === q.id ? "#1B5E20" : undefined }}>{isAr ? q.nameAr : q.name}</span>
                    <span className="text-xs text-gray-400">{isAr ? q.name : q.nameAr}</span>
                  </div>
                  {qari === q.id && <span style={{ color: "#1B5E20" }} className="text-lg">✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Surah count */}
      <p className={`text-xs text-gray-400 mb-4 ${isAr ? "text-right" : ""}`}>
        {isAr ? `${filtered.length} سورة` : `${filtered.length} surahs`}
      </p>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {filtered.map(surah => {
          const isPlaying = nowPlaying?.surahNum === surah.number;
          const isActive = isPlaying && playing;

          return (
            <div
              key={surah.number}
              className={`relative bg-white rounded-2xl border p-4 transition-all cursor-pointer group hover:shadow-lg hover:-translate-y-0.5 ${
                isPlaying ? "border-green-400 shadow-green-100 shadow-md" : "border-gray-100 hover:border-green-200"
              }`}
              onClick={() => handlePlay(surah)}
            >
              {/* Number badge */}
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-3"
                style={{
                  background: isPlaying ? "#1B5E20" : "#F0FDF4",
                  color: isPlaying ? "white" : "#1B5E20",
                }}
              >
                {surah.number}
              </div>

              {/* Names */}
              <p className="font-quran text-lg text-gray-900 leading-snug mb-0.5 text-right" dir="rtl">
                {surah.name}
              </p>
              <p className="text-xs text-gray-500 truncate mb-3">{surah.englishName}</p>

              {/* Ayah count */}
              <p className="text-xs text-gray-400 mb-3">
                {isAr ? `${surah.numberOfAyahs} آية` : `${surah.numberOfAyahs} ayahs`}
              </p>

              {/* Play button */}
              <button
                className={`w-full flex items-center justify-center gap-1.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                  isPlaying
                    ? "text-white"
                    : "bg-green-50 text-green-700 hover:bg-green-100"
                }`}
                style={isPlaying ? { background: "#1B5E20" } : {}}
                onClick={e => { e.stopPropagation(); handlePlay(surah); }}
              >
                {isActive ? <Pause size={12}/> : <Play size={12}/>}
                {isActive
                  ? (isAr ? "يعزف" : "Playing")
                  : (isAr ? "استمع" : "Listen")}
              </button>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg mb-2">{isAr ? "لا توجد نتائج" : "No results found"}</p>
          <p className="text-sm">{isAr ? "جرب بحثاً مختلفاً" : "Try a different search"}</p>
        </div>
      )}
    </div>
  );
}
