"use client";
import { useState } from "react";
import { Calculator, ChevronDown, ChevronUp, Info } from "lucide-react";
import { type Lang, t } from "@/lib/translations";

const CURRENCIES = ["USD", "EUR", "GBP", "SAR", "AED", "KWD", "EGP", "JOD"];
const NISAB_GOLD_GRAMS = 85;
const NISAB_SILVER_GRAMS = 595;

export default function ZakatClient({ lang }: { lang: Lang }) {
  const [currency, setCurrency] = useState("USD");
  const [goldPrice, setGoldPrice] = useState("95");
  const [silverPrice, setSilverPrice] = useState("1.2");
  const [cash, setCash] = useState("");
  const [goldGrams, setGoldGrams] = useState("");
  const [silverGrams, setSilverGrams] = useState("");
  const [business, setBusiness] = useState("");
  const [receivables, setReceivables] = useState("");
  const [calculated, setCalculated] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const isAr = lang === "ar";

  const gp = parseFloat(goldPrice) || 0;
  const sp = parseFloat(silverPrice) || 0;
  const nisabGold = NISAB_GOLD_GRAMS * gp;
  const nisabSilver = NISAB_SILVER_GRAMS * sp;

  const totalAssets =
    (parseFloat(cash) || 0) +
    (parseFloat(goldGrams) || 0) * gp +
    (parseFloat(silverGrams) || 0) * sp +
    (parseFloat(business) || 0) +
    (parseFloat(receivables) || 0);

  const meetsNisab = totalAssets >= nisabGold;
  const zakatDue = meetsNisab ? totalAssets * 0.025 : 0;

  const fmt = (v: number) =>
    v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const fields = [
    { labelKey: "zakat.cash" as const, value: cash, set: setCash, prefix: currency },
    { labelKey: "zakat.goldGrams" as const, value: goldGrams, set: setGoldGrams, prefix: "g" },
    { labelKey: "zakat.silverGrams" as const, value: silverGrams, set: setSilverGrams, prefix: "g" },
    { labelKey: "zakat.business" as const, value: business, set: setBusiness, prefix: currency },
    { labelKey: "zakat.receivables" as const, value: receivables, set: setReceivables, prefix: currency },
  ];

  const conditions = [
    { key: "Nisab", desc: t(lang, "zakat.nisabCond") },
    { key: "Haul", desc: t(lang, "zakat.haulCond") },
    { key: "Rate", desc: t(lang, "zakat.rateCond") },
    { key: t(lang, "zakat.intentionCond").split(" ")[0], desc: t(lang, "zakat.intentionCond") },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
          style={{ background: "#FFFBEB" }}
        >
          <Calculator size={32} color="#B8860B" />
        </div>
        <h1 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-3 ${isAr ? "font-arabic" : ""}`}>
          {t(lang, "zakat.title")}
        </h1>
        <p className="text-gray-500 max-w-lg mx-auto">{t(lang, "zakat.subtitle")}</p>
        <p className="mt-3 text-xl font-arabic text-gray-700 leading-loose">
          وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Form */}
        <div className="md:col-span-2 space-y-5">
          {/* Currency & Prices */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h2 className={`font-bold text-gray-800 mb-4 flex items-center gap-2 ${isAr ? "flex-row-reverse" : ""}`}>
              <span
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs text-white font-bold"
                style={{ background: "#B8860B" }}
              >
                1
              </span>
              {t(lang, "zakat.step1")}
            </h2>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className={`block text-xs text-gray-500 mb-1 ${isAr ? "text-right" : ""}`}>
                  {t(lang, "zakat.currency")}
                </label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-green-500 bg-gray-50"
                >
                  {CURRENCIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={`block text-xs text-gray-500 mb-1 ${isAr ? "text-right" : ""}`}>
                  {t(lang, "zakat.goldPrice")}
                </label>
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
                  <span className="px-3 text-xs text-gray-400">{currency}</span>
                  <input
                    type="number"
                    value={goldPrice}
                    onChange={(e) => setGoldPrice(e.target.value)}
                    className="flex-1 py-2.5 pr-3 text-sm bg-transparent focus:outline-none"
                    placeholder="95"
                  />
                </div>
              </div>
              <div>
                <label className={`block text-xs text-gray-500 mb-1 ${isAr ? "text-right" : ""}`}>
                  {t(lang, "zakat.silverPrice")}
                </label>
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
                  <span className="px-3 text-xs text-gray-400">{currency}</span>
                  <input
                    type="number"
                    value={silverPrice}
                    onChange={(e) => setSilverPrice(e.target.value)}
                    className="flex-1 py-2.5 pr-3 text-sm bg-transparent focus:outline-none"
                    placeholder="1.2"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Assets */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h2 className={`font-bold text-gray-800 mb-4 flex items-center gap-2 ${isAr ? "flex-row-reverse" : ""}`}>
              <span
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs text-white font-bold"
                style={{ background: "#B8860B" }}
              >
                2
              </span>
              {t(lang, "zakat.step2")}
            </h2>
            <div className="space-y-3">
              {fields.map(({ labelKey, value, set, prefix }) => (
                <div
                  key={labelKey}
                  className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50 focus-within:border-green-500 transition-colors"
                >
                  <span className="px-3 py-3 text-xs text-gray-400 border-r border-gray-200 bg-white min-w-12 text-center">
                    {prefix}
                  </span>
                  <input
                    type="number"
                    value={value}
                    onChange={(e) => set(e.target.value)}
                    placeholder={t(lang, labelKey)}
                    className={`flex-1 px-3 py-3 text-sm bg-transparent focus:outline-none text-gray-700 ${isAr ? "text-right" : ""}`}
                    dir="ltr"
                  />
                </div>
              ))}
            </div>

            <button
              onClick={() => setCalculated(true)}
              className={`w-full mt-5 py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 hover:opacity-90 transition-opacity active:scale-[0.98] ${isAr ? "flex-row-reverse" : ""}`}
              style={{ background: "linear-gradient(135deg, #1B5E20, #2E7D32)" }}
            >
              <Calculator size={18} />
              {t(lang, "zakat.calculate")}
            </button>
          </div>
        </div>

        {/* Results sidebar */}
        <div className="space-y-4">
          {/* Nisab info */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <h3 className={`font-bold text-gray-800 mb-3 text-sm ${isAr ? "text-right" : ""}`}>
              {t(lang, "zakat.nisabTitle")}
            </h3>
            <div className="space-y-2">
              <div className={`flex justify-between text-sm ${isAr ? "flex-row-reverse" : ""}`}>
                <span className="text-gray-500">{t(lang, "zakat.gold85")}</span>
                <span className="font-semibold text-gray-800">
                  {currency} {fmt(nisabGold)}
                </span>
              </div>
              <div className={`flex justify-between text-sm ${isAr ? "flex-row-reverse" : ""}`}>
                <span className="text-gray-500">{t(lang, "zakat.silver595")}</span>
                <span className="font-semibold text-gray-800">
                  {currency} {fmt(nisabSilver)}
                </span>
              </div>
              <div
                className={`flex justify-between text-sm border-t border-gray-100 pt-2 mt-2 ${isAr ? "flex-row-reverse" : ""}`}
              >
                <span className="text-gray-500">{t(lang, "zakat.yourTotal")}</span>
                <span className="font-bold" style={{ color: meetsNisab ? "#1B5E20" : "#6B7280" }}>
                  {currency} {fmt(totalAssets)}
                </span>
              </div>
            </div>
          </div>

          {/* Result */}
          {calculated && (
            <div
              className="rounded-2xl p-5 text-white"
              style={{
                background: meetsNisab
                  ? "linear-gradient(135deg, #1B5E20, #2E7D32)"
                  : "linear-gradient(135deg, #4B5563, #6B7280)",
              }}
            >
              <p className={`text-sm opacity-75 mb-1 ${isAr ? "text-right" : ""}`}>
                {meetsNisab ? t(lang, "zakat.obligatory") : t(lang, "zakat.belowNisab")}
              </p>
              {meetsNisab ? (
                <div className={isAr ? "text-right" : ""}>
                  <p className="text-3xl font-bold mb-1">
                    {currency} {fmt(zakatDue)}
                  </p>
                  <p className="text-xs opacity-70">
                    2.5% of {currency} {fmt(totalAssets)}
                  </p>
                </div>
              ) : (
                <p className={`text-sm mt-2 opacity-80 ${isAr ? "text-right" : ""}`}>
                  {t(lang, "zakat.belowMsg")}
                </p>
              )}
            </div>
          )}

          {/* Conditions */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <button
              onClick={() => setShowInfo(!showInfo)}
              className={`w-full flex items-center justify-between text-sm font-semibold text-gray-700 ${isAr ? "flex-row-reverse" : ""}`}
            >
              <span className={`flex items-center gap-2 ${isAr ? "flex-row-reverse" : ""}`}>
                <Info size={15} />
                {t(lang, "zakat.conditionsTitle")}
              </span>
              {showInfo ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
            </button>
            {showInfo && (
              <ul className="mt-3 space-y-2 text-sm text-gray-600">
                {conditions.map(({ key, desc }) => (
                  <li key={key} className={`flex gap-2 ${isAr ? "flex-row-reverse text-right" : ""}`}>
                    <span className="font-semibold text-gray-800 shrink-0">{key}:</span>
                    <span>{desc}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
