import Link from "next/link";
import { Moon } from "lucide-react";
import { type Lang, t } from "@/lib/translations";

interface FooterProps {
  lang: Lang;
}

export default function Footer({ lang }: FooterProps) {
  const isAr = lang === "ar";
  const year = new Date().getFullYear();

  const featureLinks = [
    [t(lang, "footer.prayer"), `/${lang}/prayer-times`],
    [t(lang, "footer.quran"), `/${lang}/quran`],
    [t(lang, "footer.zakat"), `/${lang}/zakat`],
    [t(lang, "footer.finance"), `/${lang}/finance`],
  ];

  return (
    <footer className="bg-gray-900 text-gray-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className={`grid grid-cols-1 md:grid-cols-4 gap-8 ${isAr ? "text-right" : ""}`}>
          {/* Brand */}
          <div className="md:col-span-1">
            <div className={`flex items-center gap-3 mb-4 ${isAr ? "flex-row-reverse" : ""}`}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#1B5E20" }}>
                <Moon size={18} color="white" />
              </div>
              <div className={isAr ? "text-right" : ""}>
                <p className="font-bold text-white">Noor Al Islam</p>
                <p className="text-xs font-arabic text-gray-400">نور الإسلام</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed">{t(lang, "footer.tagline")}</p>
            <p className="mt-4 text-lg font-arabic text-gray-300 leading-loose">
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
            </p>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t(lang, "footer.features")}</h4>
            <ul className="space-y-2 text-sm">
              {featureLinks.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Download */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t(lang, "footer.getApp")}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://apps.apple.com/us/app/noor-al-islam/id6761771260" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  {t(lang, "footer.appStore")}
                </a>
              </li>
              <li>
                <a href="https://play.google.com/store/apps/details?id=com.datossol.noor_app" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  {t(lang, "footer.googlePlay")}
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t(lang, "footer.about")}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t(lang, "footer.privacy")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t(lang, "footer.terms")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t(lang, "footer.contact")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={`border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 ${isAr ? "md:flex-row-reverse" : ""}`}>
          <p className="text-sm">
            © {year} Noor Al Islam. {t(lang, "footer.rights")}
          </p>
          <p className="text-sm font-arabic text-gray-500">وَأَحَلَّ اللَّهُ الْبَيْعَ وَحَرَّمَ الرِّبَا</p>
        </div>
      </div>
    </footer>
  );
}
