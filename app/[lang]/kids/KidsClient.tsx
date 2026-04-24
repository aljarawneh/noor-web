"use client";
import { Play, Pause } from "lucide-react";
import { useAudio } from "@/lib/audioContext";
import { type Lang } from "@/lib/translations";

interface Props {
  lang: Lang;
}

const SHORT_SURAHS = [
  { number: 1, name: "الفاتحة", englishName: "Al-Fatiha", totalAyahs: 7, emoji: "📖", snippet: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", color: "#1B5E20", bg: "#F0FDF4" },
  { number: 112, name: "الإخلاص", englishName: "Al-Ikhlas", totalAyahs: 4, emoji: "✨", snippet: "قُلْ هُوَ اللَّهُ أَحَدٌ", color: "#7C3AED", bg: "#F5F3FF" },
  { number: 113, name: "الفلق", englishName: "Al-Falaq", totalAyahs: 5, emoji: "🌅", snippet: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ", color: "#0F766E", bg: "#F0FDFA" },
  { number: 114, name: "الناس", englishName: "An-Nas", totalAyahs: 6, emoji: "🤲", snippet: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ", color: "#1565C0", bg: "#EFF6FF" },
  { number: 103, name: "العصر", englishName: "Al-Asr", totalAyahs: 3, emoji: "⏳", snippet: "وَالْعَصْرِ ۙ إِنَّ الْإِنسَانَ لَفِي خُسْرٍ", color: "#B45309", bg: "#FEF3C7" },
  { number: 108, name: "الكوثر", englishName: "Al-Kawthar", totalAyahs: 3, emoji: "💧", snippet: "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ", color: "#DC2626", bg: "#FEF2F2" },
];

const DAILY_DUAS = [
  { emoji: "🍽️", titleEn: "Before Eating", titleAr: "قبل الأكل", arabic: "بِسْمِ اللَّهِ", transliterationEn: "Bismillah", meaningEn: "In the name of Allah", color: "#1B5E20", bg: "#F0FDF4" },
  { emoji: "🙏", titleEn: "After Eating", titleAr: "بعد الأكل", arabic: "الْحَمْدُ لِلَّهِ", transliterationEn: "Alhamdulillah", meaningEn: "All praise is due to Allah", color: "#D4AF37", bg: "#FFFBEB" },
  { emoji: "🌙", titleEn: "Before Sleeping", titleAr: "قبل النوم", arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا", transliterationEn: "Bismikal-lahumma amootu wa-ahya", meaningEn: "In Your name O Allah, I die and live", color: "#4338CA", bg: "#EEF2FF" },
  { emoji: "🏠", titleEn: "Entering Home", titleAr: "عند دخول البيت", arabic: "بِسْمِ اللَّهِ وَلَجْنَا وَبِسْمِ اللَّهِ خَرَجْنَا", transliterationEn: "Bismillahi walajna, wa bismillahi kharajna", meaningEn: "In the name of Allah we enter, and in His name we leave", color: "#0F766E", bg: "#F0FDFA" },
  { emoji: "🚪", titleEn: "Leaving Home", titleAr: "عند الخروج من البيت", arabic: "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ", transliterationEn: "Bismillahi tawakkaltu 'alallah", meaningEn: "In the name of Allah, I trust in Allah", color: "#B45309", bg: "#FEF3C7" },
];

const PILLARS = [
  { num: 1, emoji: "☝️", titleEn: "Shahada", titleAr: "الشهادة", descEn: "Testifying that there is no god but Allah and that Muhammad is His Messenger", descAr: "شهادة أن لا إله إلا الله وأن محمداً رسول الله", color: "#1B5E20", bg: "#F0FDF4" },
  { num: 2, emoji: "🕌", titleEn: "Salah", titleAr: "الصلاة", descEn: "Praying five times a day at their appointed times", descAr: "إقامة الصلوات الخمس في أوقاتها", color: "#1565C0", bg: "#EFF6FF" },
  { num: 3, emoji: "💛", titleEn: "Zakat", titleAr: "الزكاة", descEn: "Giving a portion of wealth to those in need", descAr: "إعطاء نسبة من المال للمحتاجين", color: "#D4AF37", bg: "#FFFBEB" },
  { num: 4, emoji: "🌙", titleEn: "Sawm", titleAr: "الصوم", descEn: "Fasting during the holy month of Ramadan", descAr: "الصيام في شهر رمضان المبارك", color: "#7C3AED", bg: "#F5F3FF" },
  { num: 5, emoji: "🕋", titleEn: "Hajj", titleAr: "الحج", descEn: "Pilgrimage to Mecca once in a lifetime if able", descAr: "حج بيت الله الحرام مرة في العمر لمن استطاع", color: "#DC2626", bg: "#FEF2F2" },
];

export default function KidsClient({ lang }: Props) {
  const { nowPlaying, playing, playAyah } = useAudio();
  const isAr = lang === "ar";

  function handlePlaySurah(surah: typeof SHORT_SURAHS[0]) {
    playAyah({
      surahNum: surah.number,
      surahName: surah.name,
      surahNameEn: surah.englishName,
      ayahNum: 1,
      totalAyahs: surah.totalAyahs,
    });
  }

  return (
    <div className="space-y-16">
      {/* ── Short Surahs Section ── */}
      <section>
        <div className={`flex items-center gap-3 mb-6 ${isAr ? "flex-row-reverse" : ""}`}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: "#F0FDF4" }}>📖</div>
          <div className={isAr ? "text-right" : ""}>
            <h2 className="text-2xl font-bold text-gray-900">{isAr ? "سور قصيرة للحفظ" : "Short Surahs to Memorize"}</h2>
            <p className="text-gray-500 text-sm">{isAr ? "ابدأ بهذه السور السهلة" : "Start with these easy surahs"}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SHORT_SURAHS.map(surah => {
            const isPlaying = nowPlaying?.surahNum === surah.number && playing;
            return (
              <div
                key={surah.number}
                className="rounded-2xl p-5 border transition-all hover:shadow-lg hover:-translate-y-0.5"
                style={{ background: surah.bg, borderColor: surah.color + "33" }}
              >
                <div className={`flex items-start justify-between mb-4 ${isAr ? "flex-row-reverse" : ""}`}>
                  <div className={`flex items-center gap-3 ${isAr ? "flex-row-reverse" : ""}`}>
                    <span className="text-2xl">{surah.emoji}</span>
                    <div className={isAr ? "text-right" : ""}>
                      <p className="font-quran text-xl" style={{ color: surah.color }}>{surah.name}</p>
                      <p className="text-xs text-gray-500">{surah.englishName}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold px-2 py-1 rounded-full" style={{ background: surah.color + "22", color: surah.color }}>
                    {isAr ? `${surah.totalAyahs} آيات` : `${surah.totalAyahs} ayahs`}
                  </span>
                </div>

                <p className="font-quran text-lg text-gray-700 leading-relaxed mb-4 text-right" dir="rtl">
                  {surah.snippet}...
                </p>

                <button
                  onClick={() => handlePlaySurah(surah)}
                  className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition ${isAr ? "flex-row-reverse" : ""}`}
                  style={{
                    background: isPlaying ? surah.color : "white",
                    color: isPlaying ? "white" : surah.color,
                    border: `2px solid ${surah.color}`,
                  }}
                >
                  {isPlaying ? <Pause size={15}/> : <Play size={15}/>}
                  {isPlaying
                    ? (isAr ? "يعزف..." : "Playing...")
                    : (isAr ? "استمع" : "Listen")}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Daily Duas Section ── */}
      <section>
        <div className={`flex items-center gap-3 mb-6 ${isAr ? "flex-row-reverse" : ""}`}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: "#FEF3C7" }}>🤲</div>
          <div className={isAr ? "text-right" : ""}>
            <h2 className="text-2xl font-bold text-gray-900">{isAr ? "أدعية يومية" : "Daily Duas"}</h2>
            <p className="text-gray-500 text-sm">{isAr ? "أدعية مهمة للحياة اليومية" : "Important supplications for daily life"}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {DAILY_DUAS.map(dua => (
            <div
              key={dua.titleEn}
              className="rounded-2xl p-5 border"
              style={{ background: dua.bg, borderColor: dua.color + "33" }}
            >
              <div className={`flex items-center gap-3 mb-3 ${isAr ? "flex-row-reverse" : ""}`}>
                <span className="text-2xl">{dua.emoji}</span>
                <p className="font-bold text-gray-900">{isAr ? dua.titleAr : dua.titleEn}</p>
              </div>
              <p className="font-quran text-xl text-gray-800 leading-loose mb-2 text-right" dir="rtl">
                {dua.arabic}
              </p>
              <p className="text-xs text-gray-500 italic mb-1">{dua.transliterationEn}</p>
              <p className="text-sm text-gray-600">{dua.meaningEn}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pillars of Islam Section ── */}
      <section>
        <div className={`flex items-center gap-3 mb-6 ${isAr ? "flex-row-reverse" : ""}`}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: "#EFF6FF" }}>🕌</div>
          <div className={isAr ? "text-right" : ""}>
            <h2 className="text-2xl font-bold text-gray-900">{isAr ? "أركان الإسلام الخمسة" : "The Five Pillars of Islam"}</h2>
            <p className="text-gray-500 text-sm">{isAr ? "الأساس الذي يقوم عليه الإسلام" : "The foundation on which Islam is built"}</p>
          </div>
        </div>

        <div className="space-y-3">
          {PILLARS.map(pillar => (
            <div
              key={pillar.num}
              className={`flex items-center gap-4 rounded-2xl p-5 border ${isAr ? "flex-row-reverse" : ""}`}
              style={{ background: pillar.bg, borderColor: pillar.color + "33" }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0 font-bold"
                style={{ background: pillar.color, color: "white", fontSize: "1.1rem" }}
              >
                {pillar.num}
              </div>
              <div className={`flex-1 ${isAr ? "text-right" : ""}`}>
                <div className={`flex items-center gap-2 mb-1 ${isAr ? "flex-row-reverse justify-end" : ""}`}>
                  <span className="text-xl">{pillar.emoji}</span>
                  <p className="font-bold text-gray-900 text-lg">
                    {isAr ? pillar.titleAr : pillar.titleEn}
                  </p>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {isAr ? pillar.descAr : pillar.descEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Encouragement banner ── */}
      <section
        className="rounded-3xl p-8 text-center"
        style={{ background: "linear-gradient(135deg,#1B5E20,#2E7D32)" }}
      >
        <p className="text-4xl mb-4">🌟</p>
        <h3 className="text-2xl font-bold text-white mb-3">
          {isAr ? "استمر في التعلم!" : "Keep Learning!"}
        </h3>
        <p className="text-green-100 text-lg leading-relaxed max-w-md mx-auto">
          {isAr
            ? "كل يوم تتعلم فيه شيئاً جديداً عن دينك هو خطوة نحو الجنة. أحسنت!"
            : "Every day you learn something new about your faith is a step closer to Jannah. Well done!"}
        </p>
        <p className="font-quran text-3xl text-yellow-200 mt-4 leading-loose">
          وَقُل رَّبِّ زِدْنِي عِلْمًا
        </p>
        <p className="text-green-200 text-sm mt-2 italic">{isAr ? '"وقل ربي زدني علما" — طه ١١٤' : '"And say: My Lord, increase me in knowledge." — Ta-Ha 20:114'}</p>
      </section>
    </div>
  );
}
