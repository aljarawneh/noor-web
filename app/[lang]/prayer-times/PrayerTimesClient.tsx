"use client";
import { useState, useEffect } from "react";
import { Clock, MapPin, Loader2, Compass } from "lucide-react";
import { type Lang, t } from "@/lib/translations";

const PRAYER_KEYS = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"] as const;
type PrayerKey = (typeof PRAYER_KEYS)[number];

const METHODS: Record<string, number> = {
  "Muslim World League": 3,
  "Egyptian General Authority": 5,
  "Umm al-Qura (Mecca)": 4,
  "Islamic Society of North America": 2,
  "University of Islamic Sciences, Karachi": 1,
};

const PRAYER_LABEL_KEYS: Record<PrayerKey, "prayer.fajr" | "prayer.sunrise" | "prayer.dhuhr" | "prayer.asr" | "prayer.maghrib" | "prayer.isha"> = {
  Fajr: "prayer.fajr",
  Sunrise: "prayer.sunrise",
  Dhuhr: "prayer.dhuhr",
  Asr: "prayer.asr",
  Maghrib: "prayer.maghrib",
  Isha: "prayer.isha",
};

type PrayerTimes = Record<string, string>;

export default function PrayerTimesClient({ lang }: { lang: Lang }) {
  const [times, setTimes] = useState<PrayerTimes | null>(null);
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [hijri, setHijri] = useState("");
  const [method, setMethod] = useState("Muslim World League");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const isAr = lang === "ar";

  const fetchByCoords = async (lat: number, lng: number) => {
    setLoading(true);
    setError("");
    try {
      const today = new Date();
      const d = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
      const res = await fetch(
        `https://api.aladhan.com/v1/timings/${d}?latitude=${lat}&longitude=${lng}&method=${METHODS[method]}`
      );
      const json = await res.json();
      setTimes(json.data.timings);
      setDate(json.data.date.readable);
      setHijri(
        `${json.data.date.hijri.day} ${json.data.date.hijri.month.en} ${json.data.date.hijri.year}`
      );
      const geo = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );
      const geoJson = await geo.json();
      setCity(
        geoJson.address?.city ||
          geoJson.address?.town ||
          geoJson.address?.state ||
          t(lang, "prayer.yourLocation")
      );
    } catch {
      setError(t(lang, "prayer.errorFetch"));
    }
    setLoading(false);
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError(t(lang, "prayer.errorGeo"));
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => fetchByCoords(pos.coords.latitude, pos.coords.longitude),
      () => {
        setError(t(lang, "prayer.errorLocation"));
        setLoading(false);
      }
    );
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { getLocation(); }, []);

  const now = new Date();
  const currentHour = now.getHours() * 60 + now.getMinutes();

  const nextPrayer = times
    ? PRAYER_KEYS.filter((p) => p !== "Sunrise").find((p) => {
        const [h, m] = (times[p] || "00:00").split(":").map(Number);
        return h * 60 + m > currentHour;
      })
    : null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
          style={{ background: "#EFF6FF" }}
        >
          <Clock size={32} color="#1565C0" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{t(lang, "prayer.title")}</h1>
        <p className="text-gray-500">{t(lang, "prayer.subtitle")}</p>
      </div>

      {/* Controls */}
      <div className={`flex flex-wrap gap-3 justify-center mb-8 ${isAr ? "flex-row-reverse" : ""}`}>
        <button
          onClick={getLocation}
          disabled={loading}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white hover:opacity-90 transition disabled:opacity-60 ${isAr ? "flex-row-reverse" : ""}`}
          style={{ background: "#1B5E20" }}
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <MapPin size={16} />}
          {loading ? t(lang, "prayer.detecting") : t(lang, "prayer.useLocation")}
        </button>
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-500 bg-white"
          dir="ltr"
        >
          {Object.keys(METHODS).map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
      </div>

      {error && <div className="text-center text-red-500 mb-6 text-sm">{error}</div>}

      {/* Location & date */}
      {(city || date) && (
        <div className="text-center mb-8">
          {city && (
            <p className={`text-lg font-semibold text-gray-800 flex items-center justify-center gap-2 ${isAr ? "flex-row-reverse" : ""}`}>
              <MapPin size={16} color="#1B5E20" />
              {city}
            </p>
          )}
          {date && (
            <p className="text-gray-500 text-sm mt-1">
              {date} · <span className="font-arabic">{hijri}</span>
            </p>
          )}
        </div>
      )}

      {/* Loading */}
      {loading && !times && (
        <div className="flex justify-center py-20">
          <Loader2 size={32} className="animate-spin text-green-700" />
        </div>
      )}

      {/* Prayer cards */}
      {times && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {PRAYER_KEYS.map((prayer) => {
            const isNext = prayer === nextPrayer;
            const isSunrise = prayer === "Sunrise";
            return (
              <div
                key={prayer}
                className={`rounded-2xl p-5 border transition-all ${
                  isNext ? "shadow-lg border-green-200" : "border-gray-100 bg-white"
                }`}
                style={
                  isNext
                    ? { background: "linear-gradient(135deg, #1B5E20, #2E7D32)", color: "white" }
                    : {}
                }
              >
                <div className={`flex items-center justify-between mb-3 ${isAr ? "flex-row-reverse" : ""}`}>
                  <p className={`text-sm font-medium ${isNext ? "text-green-100" : "text-gray-500"}`}>
                    {t(lang, PRAYER_LABEL_KEYS[prayer])}
                  </p>
                  {isNext && (
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-semibold"
                      style={{ background: "rgba(255,255,255,0.2)" }}
                    >
                      {t(lang, "prayer.next")}
                    </span>
                  )}
                  {isSunrise && !isNext && <Compass size={14} color="#9CA3AF" />}
                </div>
                <p className={`text-2xl font-bold ${isNext ? "text-white" : "text-gray-900"}`}>
                  {times[prayer] || "—"}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {/* Qibla note */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
        <Compass size={28} color="#5E35B1" className="mx-auto mb-3" />
        <h3 className="font-bold text-gray-800 mb-2">{t(lang, "prayer.qiblaTitle")}</h3>
        <p className="text-gray-500 text-sm mb-4">{t(lang, "prayer.qiblaDesc")}</p>
        <a
          href="#"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white text-sm hover:opacity-90"
          style={{ background: "#5E35B1" }}
        >
          {t(lang, "prayer.downloadApp")}
        </a>
      </div>
    </div>
  );
}
