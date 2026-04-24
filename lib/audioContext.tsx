"use client";
import { createContext, useContext, useRef, useState, useCallback, useEffect } from "react";

export const QARIS = [
  { id: "Alafasy_128kbps", name: "Mishary Al-Afasy", nameAr: "مشاري العفاسي" },
  { id: "Husary_128kbps", name: "Al-Husary", nameAr: "محمود خليل الحصري" },
  { id: "Abdul_Basit_Murattal_192kbps", name: "Abdul Basit", nameAr: "عبد الباسط عبد الصمد" },
  { id: "AbdurRahman_As-Sudais_192kbps", name: "Al-Sudais", nameAr: "عبدالرحمن السديس" },
  { id: "Saad_Al-Ghamdi_128kbps", name: "Saad Al-Ghamdi", nameAr: "سعد الغامدي" },
  { id: "Minshawi_Murattal_128kbps", name: "Al-Minshawi", nameAr: "محمد صديق المنشاوي" },
  { id: "Mohammad_al_Tablawi_128kbps", name: "Al-Tablawi", nameAr: "محمد الطبلاوي" },
];

export type NowPlaying = {
  surahNum: number;
  surahName: string;
  surahNameEn: string;
  ayahNum: number;
  totalAyahs: number;
};

type AudioCtx = {
  nowPlaying: NowPlaying | null;
  playing: boolean;
  qari: string;
  volume: number;
  playAyah: (np: NowPlaying) => void;
  togglePlay: () => void;
  skipAyah: (dir: 1 | -1) => void;
  stop: () => void;
  setQari: (q: string) => void;
  setVolume: (v: number) => void;
};

const Ctx = createContext<AudioCtx | null>(null);

function makeUrl(qari: string, surah: number, ayah: number) {
  return `https://everyayah.com/data/${qari}/${String(surah).padStart(3, "0")}${String(ayah).padStart(3, "0")}.mp3`;
}

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [nowPlaying, setNowPlaying] = useState<NowPlaying | null>(null);
  const [playing, setPlaying] = useState(false);
  const [qari, setQariState] = useState(QARIS[0].id);
  const [volume, setVolumeState] = useState(1);

  const npRef = useRef<NowPlaying | null>(null);
  const qariRef = useRef(qari);
  useEffect(() => { npRef.current = nowPlaying; }, [nowPlaying]);
  useEffect(() => { qariRef.current = qari; }, [qari]);

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;
    audio.onplay = () => setPlaying(true);
    audio.onpause = () => setPlaying(false);
    audio.onended = () => {
      const np = npRef.current;
      if (np && np.ayahNum < np.totalAyahs) {
        const next = { ...np, ayahNum: np.ayahNum + 1 };
        audio.src = makeUrl(qariRef.current, next.surahNum, next.ayahNum);
        audio.load();
        audio.play().catch(() => {});
        setNowPlaying(next);
      } else {
        setPlaying(false);
      }
    };
    return () => { audio.pause(); };
  }, []);

  const playAyah = useCallback((np: NowPlaying) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = makeUrl(qariRef.current, np.surahNum, np.ayahNum);
    audio.load();
    audio.play().catch(() => {});
    setNowPlaying(np);
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) audio.play().catch(() => {});
    else audio.pause();
  }, []);

  const skipAyah = useCallback((dir: 1 | -1) => {
    const np = npRef.current;
    const audio = audioRef.current;
    if (!np || !audio) return;
    const next = np.ayahNum + dir;
    if (next < 1 || next > np.totalAyahs) return;
    const updated = { ...np, ayahNum: next };
    audio.src = makeUrl(qariRef.current, updated.surahNum, updated.ayahNum);
    audio.load();
    audio.play().catch(() => {});
    setNowPlaying(updated);
  }, []);

  const stop = useCallback(() => {
    audioRef.current?.pause();
    setNowPlaying(null);
    setPlaying(false);
  }, []);

  const setQari = useCallback((q: string) => {
    setQariState(q);
    qariRef.current = q;
    const np = npRef.current;
    const audio = audioRef.current;
    if (np && audio) {
      const wasPaused = audio.paused;
      audio.src = makeUrl(q, np.surahNum, np.ayahNum);
      audio.load();
      if (!wasPaused) audio.play().catch(() => {});
    }
  }, []);

  const setVolume = useCallback((v: number) => {
    setVolumeState(v);
    if (audioRef.current) audioRef.current.volume = v;
  }, []);

  return (
    <Ctx.Provider value={{ nowPlaying, playing, qari, volume, playAyah, togglePlay, skipAyah, stop, setQari, setVolume }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAudio outside AudioProvider");
  return ctx;
}
