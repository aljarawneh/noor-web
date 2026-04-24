"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Moon, Globe } from "lucide-react";
import { type Lang, t } from "@/lib/translations";

interface NavbarProps {
  lang: Lang;
}

export default function Navbar({ lang }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isAr = lang === "ar";

  const otherLang: Lang = lang === "en" ? "ar" : "en";
  const switchHref = pathname.replace(`/${lang}`, `/${otherLang}`);

  const links = [
    { href: `/${lang}`,              label: t(lang, "nav.home") },
    { href: `/${lang}/prayer-times`, label: t(lang, "nav.prayer") },
    { href: `/${lang}/quran`,        label: t(lang, "nav.quran") },
    { href: `/${lang}/zakat`,        label: t(lang, "nav.zakat") },
    { href: `/${lang}/finance`,      label: t(lang, "nav.finance") },
  ];

  const IOS_URL    = "https://apps.apple.com/us/app/noor-al-islam/id6761771260";
  const ANDROID_URL = "https://play.google.com/store/apps/details?id=com.datossol.noor_app";

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo — always first in DOM; CSS order flips via dir="rtl" on parent */}
          <Link href={`/${lang}`} className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#1B5E20" }}>
              <Moon size={18} color="white" />
            </div>
            <div className={isAr ? "text-right" : ""}>
              <span className="font-bold text-gray-900 text-base leading-none block">Noor Al Islam</span>
              <span className="text-xs text-gray-400 leading-none font-arabic block">نور الإسلام</span>
            </div>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-0.5">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-green-800 hover:bg-green-50 transition-colors whitespace-nowrap"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Right-side actions (will appear on left in RTL because of parent dir=rtl) */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <Link
              href={switchHref}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <Globe size={15} />
              {t(lang, "nav.switchLang")}
            </Link>

            {/* iOS download */}
            <a
              href={IOS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-white transition-all hover:opacity-90"
              style={{ background: "#1B5E20" }}
              title={isAr ? "آب ستور — iOS" : "App Store — iOS"}
            >
              {/* Apple icon */}
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.14-2.18 1.27-2.16 3.8.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.37 2.78M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              {isAr ? "آب ستور" : "App Store"}
            </a>

            {/* Android download */}
            <a
              href={ANDROID_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all hover:opacity-90"
              style={{ background: "#D4AF37", color: "#1a1a1a" }}
              title={isAr ? "جوجل بلاي — Android" : "Google Play — Android"}
            >
              {/* Play icon */}
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <path d="M3 20.5v-17c0-.83.94-1.3 1.6-.8l14 8.5c.6.36.6 1.24 0 1.6l-14 8.5c-.66.5-1.6.03-1.6-.8z"/>
              </svg>
              {isAr ? "جوجل بلاي" : "Google Play"}
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <nav className="px-4 py-3 space-y-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-800 transition-colors ${isAr ? "text-right" : ""}`}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href={switchHref}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-100 ${isAr ? "justify-end" : ""}`}
            >
              <Globe size={15} />
              {t(lang, "nav.switchLang")}
            </Link>
            <div className={`flex gap-2 mt-2 ${isAr ? "flex-row-reverse" : ""}`}>
              <a
                href={IOS_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-white"
                style={{ background: "#1B5E20" }}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.14-2.18 1.27-2.16 3.8.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.37 2.78M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                {isAr ? "آب ستور" : "App Store"}
              </a>
              <a
                href={ANDROID_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold"
                style={{ background: "#D4AF37", color: "#1a1a1a" }}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M3 20.5v-17c0-.83.94-1.3 1.6-.8l14 8.5c.6.36.6 1.24 0 1.6l-14 8.5c-.66.5-1.6.03-1.6-.8z"/>
                </svg>
                {isAr ? "جوجل بلاي" : "Google Play"}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
