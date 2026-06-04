"use client";
import { useState } from "react";
import { Play, Pause, CheckCircle, XCircle, RotateCcw } from "lucide-react";
import { useAudio } from "@/lib/audioContext";
import { type Lang } from "@/lib/translations";

interface Props { lang: Lang; }

const SHORT_SURAHS = [
  { number: 1,   name: "الفاتحة", englishName: "Al-Fatiha",  totalAyahs: 7,  emoji: "📖", snippet: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",         color: "#1B5E20", bg: "#F0FDF4" },
  { number: 112, name: "الإخلاص", englishName: "Al-Ikhlas",  totalAyahs: 4,  emoji: "✨", snippet: "قُلْ هُوَ اللَّهُ أَحَدٌ",                        color: "#7C3AED", bg: "#F5F3FF" },
  { number: 113, name: "الفلق",   englishName: "Al-Falaq",   totalAyahs: 5,  emoji: "🌅", snippet: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ",                  color: "#0F766E", bg: "#F0FDFA" },
  { number: 114, name: "الناس",   englishName: "An-Nas",     totalAyahs: 6,  emoji: "🤲", snippet: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ",                   color: "#1565C0", bg: "#EFF6FF" },
  { number: 103, name: "العصر",   englishName: "Al-Asr",     totalAyahs: 3,  emoji: "⏳", snippet: "وَالْعَصْرِ ۙ إِنَّ الْإِنسَانَ لَفِي خُسْرٍ",   color: "#B45309", bg: "#FEF3C7" },
  { number: 108, name: "الكوثر", englishName: "Al-Kawthar", totalAyahs: 3,  emoji: "💧", snippet: "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ",                color: "#DC2626", bg: "#FEF2F2" },
];

const DAILY_DUAS = [
  { emoji: "🍽️", titleEn: "Before Eating",    titleAr: "قبل الأكل",              arabic: "بِسْمِ اللَّهِ",                                         transliterationEn: "Bismillah",                              meaningEn: "In the name of Allah",                           color: "#1B5E20", bg: "#F0FDF4" },
  { emoji: "🙏",  titleEn: "After Eating",     titleAr: "بعد الأكل",              arabic: "الْحَمْدُ لِلَّهِ",                                       transliterationEn: "Alhamdulillah",                          meaningEn: "All praise is due to Allah",                     color: "#D4AF37", bg: "#FFFBEB" },
  { emoji: "🌙",  titleEn: "Before Sleeping",  titleAr: "قبل النوم",              arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",               transliterationEn: "Bismikal-lahumma amootu wa-ahya",        meaningEn: "In Your name O Allah, I die and live",           color: "#4338CA", bg: "#EEF2FF" },
  { emoji: "🏠",  titleEn: "Entering Home",    titleAr: "عند دخول البيت",         arabic: "بِسْمِ اللَّهِ وَلَجْنَا وَبِسْمِ اللَّهِ خَرَجْنَا", transliterationEn: "Bismillahi walajna, wa bismillahi kharajna", meaningEn: "In the name of Allah we enter, and in His name we leave", color: "#0F766E", bg: "#F0FDFA" },
  { emoji: "🚪",  titleEn: "Leaving Home",     titleAr: "عند الخروج من البيت",    arabic: "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ",            transliterationEn: "Bismillahi tawakkaltu 'alallah",         meaningEn: "In the name of Allah, I trust in Allah",         color: "#B45309", bg: "#FEF3C7" },
];

const PILLARS = [
  { num: 1, emoji: "☝️", titleEn: "Shahada", titleAr: "الشهادة", descEn: "Testifying that there is no god but Allah and that Muhammad is His Messenger", descAr: "شهادة أن لا إله إلا الله وأن محمداً رسول الله",  color: "#1B5E20", bg: "#F0FDF4" },
  { num: 2, emoji: "🕌", titleEn: "Salah",   titleAr: "الصلاة",  descEn: "Praying five times a day at their appointed times",                            descAr: "إقامة الصلوات الخمس في أوقاتها",                  color: "#1565C0", bg: "#EFF6FF" },
  { num: 3, emoji: "💛", titleEn: "Zakat",   titleAr: "الزكاة",  descEn: "Giving a portion of wealth to those in need",                                  descAr: "إعطاء نسبة من المال للمحتاجين",                   color: "#D4AF37", bg: "#FFFBEB" },
  { num: 4, emoji: "🌙", titleEn: "Sawm",    titleAr: "الصوم",   descEn: "Fasting during the holy month of Ramadan",                                     descAr: "الصيام في شهر رمضان المبارك",                     color: "#7C3AED", bg: "#F5F3FF" },
  { num: 5, emoji: "🕋", titleEn: "Hajj",    titleAr: "الحج",    descEn: "Pilgrimage to Mecca once in a lifetime if able",                                descAr: "حج بيت الله الحرام مرة في العمر لمن استطاع",      color: "#DC2626", bg: "#FEF2F2" },
];

const STORIES = [
  {
    emoji: "🐘", titleEn: "The Elephant Army", titleAr: "أصحاب الفيل",
    summaryEn: "How Allah protected the Kaaba with tiny birds against Abraha's great army.",
    summaryAr: "كيف حمى الله الكعبة بطيور صغيرة من جيش أبرهة العظيم.",
    fullEn: "Long ago, a powerful king named Abraha built a great church and wanted everyone to visit it instead of the Kaaba. He marched with a huge army of elephants toward Mecca. But Allah sent flocks of tiny birds (Ababil) carrying small stones. Each stone destroyed the soldiers, and the entire army collapsed. The Kaaba was saved! This miracle is in Surah Al-Fil.",
    fullAr: "بنى ملك قوي اسمه أبرهة كنيسة ضخمة وأراد أن يصرف الناس عن الكعبة. سار بجيش من الفيلة نحو مكة، فأرسل الله أسراباً من الأبابيل تحمل حجارة من سجيل. دمّرت الحجارة الجيش بأكمله وأُنقذت الكعبة المشرفة. وهذه المعجزة مذكورة في سورة الفيل.",
    color: "#7C3AED", bg: "#F5F3FF",
  },
  {
    emoji: "🐺", titleEn: "Prophet Yusuf & His Brothers", titleAr: "النبي يوسف وإخوته",
    summaryEn: "Yusuf was thrown in a well by his brothers, yet became a great king and forgave them.",
    summaryAr: "ألقاه إخوته في البئر فصبر وأصبح ملكاً عظيماً وعفا عنهم.",
    fullEn: "Prophet Yusuf was beloved by his father Prophet Yaqub. His jealous brothers threw him in a deep well. Travelers found him and sold him as a slave in Egypt. Through patience and trust in Allah, Yusuf became the most powerful man in Egypt. When his brothers came begging for food during a famine, he forgave them saying: 'No blame on you today — Allah will forgive you.'",
    fullAr: "كان النبي يوسف أحب أبناء النبي يعقوب فغار منه إخوته وألقوه في البئر. وجده مسافرون وباعوه في مصر. بالصبر والتوكل على الله أصبح أقوى رجل في مصر. حين جاء إخوته يطلبون الطعام في المجاعة عفا عنهم قائلاً: لا تثريب عليكم اليوم، يغفر الله لكم.",
    color: "#0F766E", bg: "#F0FDFA",
  },
  {
    emoji: "🐟", titleEn: "Prophet Yunus & the Whale", titleAr: "النبي يونس والحوت",
    summaryEn: "Swallowed by a whale, Prophet Yunus prayed in the darkness and was saved by Allah.",
    summaryAr: "ابتلعه الحوت فدعا الله في الظلام فأنقذه.",
    fullEn: "Prophet Yunus left his people without Allah's permission and boarded a ship. A great storm struck and he was thrown into the sea. A huge whale swallowed him! In the darkness Yunus prayed: 'There is no god but You, glory be to You, I was among the wrongdoers.' Allah heard him and the whale released him. He returned to guide his people.",
    fullAr: "غادر النبي يونس قومه دون إذن الله وركب سفينة. اشتدت العاصفة فألقي في البحر وابتلعه حوت ضخم. في الظلام دعا: لا إله إلا أنت سبحانك إني كنت من الظالمين. سمعه الله فأخرجه الحوت على الشاطئ وعاد ليهدي قومه.",
    color: "#1565C0", bg: "#EFF6FF",
  },
  {
    emoji: "🕊️", titleEn: "The Cave of Thawr", titleAr: "غار ثور",
    summaryEn: "Allah protected the Prophet ﷺ and Abu Bakr in a cave with a spider's web and a dove.",
    summaryAr: "حمى الله النبي ﷺ وأبا بكر في الغار بخيط عنكبوت وحمامة.",
    fullEn: "When enemies planned to kill the Prophet ﷺ, he and Abu Bakr hid in the cave of Thawr. The enemies reached the entrance. Abu Bakr whispered: 'If they look down they will see us!' The Prophet replied: 'Do not grieve — Allah is with us.' A spider had spun its web and a dove nested at the entrance. The enemies turned away, and Allah's Prophet was safe.",
    fullAr: "حين خطط الأعداء لقتل النبي ﷺ اختبأ هو وأبو بكر في غار ثور. وصل الأعداء للمدخل فهمس أبو بكر: إن نظروا رأونا! فقال النبي بهدوء: لا تحزن إن الله معنا. كان عنكبوت قد نسج خيطه وحمامة عشّشت عند المدخل فانصرف الأعداء وأُنقذ النبي.",
    color: "#B45309", bg: "#FEF3C7",
  },
];

const QUIZ_QUESTIONS = [
  { questionEn: "How many pillars does Islam have?",        questionAr: "كم عدد أركان الإسلام؟",              options: ["3","4","5","6"],                                                                              correct: 2 },
  { questionEn: "Which surah is called 'The Opening'?",    questionAr: "ما اسم سورة الفاتحة بالعربية؟",       options: ["Al-Baqarah / البقرة","Al-Fatiha / الفاتحة","Al-Ikhlas / الإخلاص","Al-Nas / الناس"],          correct: 1 },
  { questionEn: "How many times do Muslims pray each day?",questionAr: "كم مرة يصلي المسلم في اليوم؟",        options: ["3","4","5","6"],                                                                              correct: 2 },
  { questionEn: "Which prophet was swallowed by a whale?", questionAr: "أي نبي ابتلعه الحوت؟",               options: ["Musa / موسى","Ibrahim / إبراهيم","Yunus / يونس","Isa / عيسى"],                              correct: 2 },
  { questionEn: "What do we say before eating?",           questionAr: "ماذا نقول قبل الأكل؟",                options: ["Alhamdulillah","Bismillah","Subhanallah","Allahu Akbar"],                                     correct: 1 },
  { questionEn: "How many surahs are in the Quran?",       questionAr: "كم عدد سور القرآن الكريم؟",           options: ["99","100","112","114"],                                                                       correct: 3 },
  { questionEn: "Which city has the Kaaba?",               questionAr: "في أي مدينة توجد الكعبة؟",            options: ["Madinah / المدينة","Mecca / مكة","Jerusalem / القدس","Cairo / القاهرة"],                     correct: 1 },
  { questionEn: "What is the Arabic word for fasting?",    questionAr: "ما الكلمة العربية للصيام؟",            options: ["Zakat / الزكاة","Hajj / الحج","Sawm / الصوم","Salah / الصلاة"],                            correct: 2 },
];

const TABS = [
  { id: "surahs",  labelEn: "Surahs",   labelAr: "السور",    emoji: "📖" },
  { id: "stories", labelEn: "Stories",  labelAr: "القصص",    emoji: "📚" },
  { id: "quiz",    labelEn: "Quiz",     labelAr: "اختبار",   emoji: "🧠" },
  { id: "duas",    labelEn: "Duas",     labelAr: "أدعية",    emoji: "🤲" },
  { id: "pillars", labelEn: "Pillars",  labelAr: "الأركان",  emoji: "🕌" },
];

export default function KidsClient({ lang }: Props) {
  const { nowPlaying, playing, playAyah, stop } = useAudio();
  const isAr = lang === "ar";

  const [activeTab, setActiveTab] = useState("surahs");
  const [openStory, setOpenStory] = useState<number | null>(null);
  const [quizIdx, setQuizIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  function handlePlaySurah(surah: typeof SHORT_SURAHS[0]) {
    if (nowPlaying?.surahNum === surah.number) { stop(); return; }
    playAyah({ surahNum: surah.number, surahName: surah.name, surahNameEn: surah.englishName, ayahNum: 1, totalAyahs: surah.totalAyahs });
  }

  function handleAnswer(i: number) {
    if (selected !== null) return;
    setSelected(i);
    if (i === QUIZ_QUESTIONS[quizIdx].correct) setScore(s => s + 1);
  }

  function nextQuestion() {
    if (quizIdx + 1 >= QUIZ_QUESTIONS.length) { setFinished(true); }
    else { setQuizIdx(q => q + 1); setSelected(null); }
  }

  function resetQuiz() { setQuizIdx(0); setSelected(null); setScore(0); setFinished(false); }

  const q = QUIZ_QUESTIONS[quizIdx];

  return (
    <div dir={isAr ? "rtl" : "ltr"}>
      {/* ── Tab bar ── */}
      <div className="flex gap-2 overflow-x-auto pb-1 mb-8 border-b border-gray-200 scrollbar-hide">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-3 rounded-t-xl text-sm font-bold whitespace-nowrap transition-all border-b-2 ${
              activeTab === tab.id
                ? "text-green-800 border-green-700 bg-green-50"
                : "text-gray-500 border-transparent hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            <span>{tab.emoji}</span>
            {isAr ? tab.labelAr : tab.labelEn}
          </button>
        ))}
      </div>

      {/* ── Surahs Tab ── */}
      {activeTab === "surahs" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SHORT_SURAHS.map(surah => {
            const isPlaying = nowPlaying?.surahNum === surah.number && playing;
            return (
              <div key={surah.number} className="rounded-2xl p-5 border transition-all hover:shadow-lg" style={{ background: surah.bg, borderColor: surah.color + "33" }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{surah.emoji}</span>
                    <div>
                      <p className="font-quran text-xl" style={{ color: surah.color }}>{surah.name}</p>
                      <p className="text-xs text-gray-500">{surah.englishName}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold px-2 py-1 rounded-full" style={{ background: surah.color + "22", color: surah.color }}>
                    {isAr ? `${surah.totalAyahs} آيات` : `${surah.totalAyahs} ayahs`}
                  </span>
                </div>
                <p className="font-quran text-lg text-gray-700 leading-relaxed mb-4 text-right" dir="rtl">{surah.snippet}...</p>
                <button
                  onClick={() => handlePlaySurah(surah)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition"
                  style={{ background: isPlaying ? surah.color : "white", color: isPlaying ? "white" : surah.color, border: `2px solid ${surah.color}` }}
                >
                  {isPlaying ? <Pause size={15}/> : <Play size={15}/>}
                  {isPlaying ? (isAr ? "إيقاف" : "Stop") : (isAr ? "استمع" : "Listen")}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Stories Tab ── */}
      {activeTab === "stories" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {STORIES.map((story, i) => (
            <div key={i} className="rounded-2xl border overflow-hidden" style={{ background: story.bg, borderColor: story.color + "33" }}>
              <button
                className="w-full p-5 text-right flex items-start gap-4"
                onClick={() => setOpenStory(openStory === i ? null : i)}
              >
                <span className="text-3xl shrink-0">{story.emoji}</span>
                <div className="flex-1 min-w-0 text-right">
                  <p className="font-bold text-gray-900 text-base mb-1">{isAr ? story.titleAr : story.titleEn}</p>
                  <p className="text-sm text-gray-500 leading-relaxed">{isAr ? story.summaryAr : story.summaryEn}</p>
                </div>
                <span className="text-lg shrink-0 transition-transform" style={{ transform: openStory === i ? "rotate(90deg)" : "rotate(0deg)", color: story.color }}>‹</span>
              </button>
              {openStory === i && (
                <div className="px-5 pb-5">
                  <div className="rounded-xl p-4 text-sm leading-loose text-right" style={{ background: "rgba(255,255,255,0.7)", color: "#374151" }}>
                    {isAr ? story.fullAr : story.fullEn}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ── Quiz Tab ── */}
      {activeTab === "quiz" && (
        <div className="rounded-3xl p-6 md:p-8 max-w-2xl mx-auto" style={{ background: "linear-gradient(135deg,#1B5E20,#2E7D32)" }}>
          {!finished ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <span className="text-green-200 text-sm font-semibold">
                  {isAr ? `سؤال ${quizIdx + 1} من ${QUIZ_QUESTIONS.length}` : `Question ${quizIdx + 1} of ${QUIZ_QUESTIONS.length}`}
                </span>
                <span className="text-green-200 text-sm">{isAr ? `النتيجة: ${score}` : `Score: ${score}`}</span>
              </div>
              <div className="w-full bg-green-800 rounded-full h-2 mb-6">
                <div className="h-2 rounded-full bg-yellow-300 transition-all" style={{ width: `${(quizIdx / QUIZ_QUESTIONS.length) * 100}%` }} />
              </div>
              <p className="text-white text-xl font-bold mb-6 leading-relaxed text-center">
                {isAr ? q.questionAr : q.questionEn}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {q.options.map((opt, i) => {
                  const isCorrect = i === q.correct;
                  const isSelected = i === selected;
                  let bg = "rgba(255,255,255,0.12)";
                  let border = "rgba(255,255,255,0.2)";
                  if (selected !== null) {
                    if (isCorrect) { bg = "#16a34a"; border = "#16a34a"; }
                    else if (isSelected) { bg = "#dc2626"; border = "#dc2626"; }
                  }
                  return (
                    <button key={i} onClick={() => handleAnswer(i)} disabled={selected !== null}
                      className="w-full py-3 px-4 rounded-xl text-sm font-semibold transition-all flex items-center justify-between gap-2 text-white"
                      style={{ background: bg, border: `2px solid ${border}`, cursor: selected !== null ? "default" : "pointer" }}
                    >
                      <span>{opt}</span>
                      {selected !== null && isCorrect && <CheckCircle size={16}/>}
                      {selected !== null && isSelected && !isCorrect && <XCircle size={16}/>}
                    </button>
                  );
                })}
              </div>
              {selected !== null && (
                <div className="text-center">
                  <p className="text-yellow-200 font-semibold mb-4">
                    {selected === q.correct
                      ? (isAr ? "🎉 أحسنت! إجابة صحيحة!" : "🎉 Correct! Well done!")
                      : (isAr ? "❌ إجابة خاطئة!" : "❌ Not quite!")}
                  </p>
                  <button onClick={nextQuestion} className="px-8 py-3 rounded-xl font-bold text-gray-900 hover:opacity-90" style={{ background: "#D4AF37" }}>
                    {quizIdx + 1 >= QUIZ_QUESTIONS.length ? (isAr ? "عرض النتيجة" : "See Result") : (isAr ? "السؤال التالي" : "Next Question")}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-4">
              <p className="text-6xl mb-4">{score >= 6 ? "🏆" : score >= 4 ? "⭐" : "📖"}</p>
              <h3 className="text-2xl font-bold text-white mb-2">
                {isAr ? `نتيجتك: ${score} / ${QUIZ_QUESTIONS.length}` : `Your Score: ${score} / ${QUIZ_QUESTIONS.length}`}
              </h3>
              <p className="text-green-100 mb-6">
                {score >= 6 ? (isAr ? "ممتاز! أنت عالِم صغير! 🌟" : "Excellent! You're a little scholar! 🌟")
                  : score >= 4 ? (isAr ? "جيد جداً! استمر في التعلم!" : "Very good! Keep learning!")
                  : (isAr ? "استمر في القراءة والتعلم!" : "Keep reading and learning!")}
              </p>
              <button onClick={resetQuiz} className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-gray-900 hover:opacity-90" style={{ background: "#D4AF37" }}>
                <RotateCcw size={16}/>
                {isAr ? "حاول مرة أخرى" : "Try Again"}
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── Duas Tab ── */}
      {activeTab === "duas" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {DAILY_DUAS.map(dua => (
            <div key={dua.titleEn} className="rounded-2xl p-5 border" style={{ background: dua.bg, borderColor: dua.color + "33" }}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{dua.emoji}</span>
                <p className="font-bold text-gray-900">{isAr ? dua.titleAr : dua.titleEn}</p>
              </div>
              <p className="font-quran text-xl text-gray-800 leading-loose mb-2 text-right" dir="rtl">{dua.arabic}</p>
              <p className="text-xs text-gray-500 italic mb-1">{dua.transliterationEn}</p>
              <p className="text-sm text-gray-600">{dua.meaningEn}</p>
            </div>
          ))}
        </div>
      )}

      {/* ── Pillars Tab ── */}
      {activeTab === "pillars" && (
        <div className="space-y-3 max-w-2xl mx-auto">
          {PILLARS.map(pillar => (
            <div key={pillar.num} className="flex items-center gap-4 rounded-2xl p-5 border" style={{ background: pillar.bg, borderColor: pillar.color + "33" }}>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 font-bold text-xl" style={{ background: pillar.color, color: "white" }}>
                {pillar.num}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{pillar.emoji}</span>
                  <p className="font-bold text-gray-900 text-lg">{isAr ? pillar.titleAr : pillar.titleEn}</p>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{isAr ? pillar.descAr : pillar.descEn}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Encouragement footer ── */}
      <div className="mt-12 rounded-3xl p-8 text-center" style={{ background: "linear-gradient(135deg,#1B5E20,#2E7D32)" }}>
        <p className="text-4xl mb-3">🌟</p>
        <h3 className="text-xl font-bold text-white mb-2">{isAr ? "استمر في التعلم!" : "Keep Learning!"}</h3>
        <p className="font-quran text-2xl text-yellow-200 mt-3 leading-loose">وَقُل رَّبِّ زِدْنِي عِلْمًا</p>
        <p className="text-green-200 text-xs mt-1">{isAr ? "طه ١١٤" : "Ta-Ha 20:114"}</p>
      </div>
    </div>
  );
}
