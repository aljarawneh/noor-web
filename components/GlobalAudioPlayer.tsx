"use client";
import { Play, Pause, SkipBack, SkipForward, X, Volume2, Headphones } from "lucide-react";
import { useAudio, QARIS } from "@/lib/audioContext";
import { type Lang } from "@/lib/translations";
import { useState } from "react";

export default function GlobalAudioPlayer({ lang }: { lang: Lang }) {
  const { nowPlaying, playing, qari, volume, togglePlay, skipAyah, stop, setQari, setVolume } = useAudio();
  const [showQariMenu, setShowQariMenu] = useState(false);
  const isAr = lang === "ar";

  if (!nowPlaying) return null;

  const qariInfo = QARIS.find(q => q.id === qari);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50" style={{ background: "rgba(255,255,255,0.97)", backdropFilter: "blur(20px)", borderTop: "1px solid #e5e7eb", boxShadow: "0 -8px 32px rgba(0,0,0,0.1)" }}>
      {/* Progress bar accent */}
      <div className="h-0.5 w-full" style={{ background: "linear-gradient(90deg,#1B5E20,#D4AF37)" }} />

      <div className="max-w-5xl mx-auto px-4 py-3">
        <div className="flex items-center gap-3">
          {/* Surah info */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-900 truncate">
              {isAr ? nowPlaying.surahName : nowPlaying.surahNameEn}
            </p>
            <p className="text-xs text-gray-400 truncate">
              {isAr ? `آية ${nowPlaying.ayahNum} من ${nowPlaying.totalAyahs}` : `Ayah ${nowPlaying.ayahNum} / ${nowPlaying.totalAyahs}`}
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button onClick={() => skipAyah(-1)} disabled={nowPlaying.ayahNum <= 1} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center disabled:opacity-30 transition">
              {isAr ? <SkipForward size={14}/> : <SkipBack size={14}/>}
            </button>
            <button onClick={togglePlay} className="w-11 h-11 rounded-full text-white flex items-center justify-center shadow-md hover:opacity-90 transition" style={{ background: "#1B5E20" }}>
              {playing ? <Pause size={18}/> : <Play size={18}/>}
            </button>
            <button onClick={() => skipAyah(1)} disabled={nowPlaying.ayahNum >= nowPlaying.totalAyahs} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center disabled:opacity-30 transition">
              {isAr ? <SkipBack size={14}/> : <SkipForward size={14}/>}
            </button>
          </div>

          {/* Qari selector */}
          <div className="relative hidden sm:block">
            <button onClick={() => setShowQariMenu(v => !v)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-gray-600 transition">
              <Headphones size={12}/>
              <span className="max-w-20 truncate">{isAr ? qariInfo?.nameAr.split(" ")[0] : qariInfo?.name.split(" ")[0]}</span>
            </button>
            {showQariMenu && (
              <div className="absolute bottom-full mb-2 right-0 bg-white rounded-2xl border border-gray-200 shadow-2xl overflow-hidden w-56 z-50">
                <div className="px-4 py-3 border-b border-gray-100 text-xs font-bold text-gray-600">{isAr ? "القارئ" : "Reciter"}</div>
                {QARIS.map(q => (
                  <button key={q.id} onClick={() => { setQari(q.id); setShowQariMenu(false); }} className={`w-full px-4 py-2.5 text-xs text-left hover:bg-green-50 flex justify-between items-center transition ${qari === q.id ? "bg-green-50 font-bold" : ""}`}>
                    <span style={{ color: qari === q.id ? "#1B5E20" : undefined }}>{isAr ? q.nameAr : q.name}</span>
                    {qari === q.id && <span style={{ color: "#1B5E20" }}>✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Volume */}
          <div className="hidden md:flex items-center gap-2">
            <Volume2 size={14} className="text-gray-400 shrink-0"/>
            <input type="range" min="0" max="1" step="0.05" value={volume} onChange={e => setVolume(parseFloat(e.target.value))} className="w-20 accent-green-700" />
          </div>

          {/* Stop */}
          <button onClick={stop} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-red-50 hover:text-red-500 flex items-center justify-center transition text-gray-400">
            <X size={14}/>
          </button>
        </div>
      </div>
    </div>
  );
}
