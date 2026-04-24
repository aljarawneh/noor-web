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

  // Build opposite lang URL
  const otherLang: Lang = lang === "en" ? "ar" : "en";
  const switchHref = pathname.replace(`/${lang}`, `/${otherLang}`);

  const links = [
    { href: `/${lang}`, label: t(lang, "nav.home") },
    { href: `/${lang}/prayer-times`, label: t(lang, "nav.prayer") },
    { href: `/${lang}/quran`, label: t(lang, "nav.quran") },
    { href: `/${lang}/zakat`, label: t(lang, "nav.zakat") },
    { href: `/${lang}/finance`, label: t(lang, "nav.finance") },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between h-16 ${isAr ? "flex-row-reverse" : ""}`}>
          {/* Logo */}
          <Link href={`/${lang}`} className={`flex items-center gap-3 ${isAr ? "flex-row-reverse" : ""}`}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#1B5E20" }}>
              <Moon size={18} color="white" />
            </div>
            <div className={isAr ? "text-right" : ""}>
              <span className="font-bold text-gray-900 text-lg">Noor Al Islam</span>
              <span className={`block text-xs text-gray-400 leading-none font-arabic`}>نور الإسلام</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className={`hidden md:flex items-center gap-1 ${isAr ? "flex-row-reverse" : ""}`}>
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-green-800 hover:bg-green-50 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className={`hidden md:flex items-center gap-2 ${isAr ? "flex-row-reverse" : ""}`}>
            {/* Language switcher */}
            <Link
              href={switchHref}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <Globe size={15} />
              {t(lang, "nav.switchLang")}
            </Link>
            <a
              href="https://apps.apple.com/us/app/noor-al-islam/id6761771260"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95"
              style={{ background: "#1B5E20" }}
            >
              {t(lang, "nav.download")}
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
              className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-100 ${isAr ? "flex-row-reverse" : ""}`}
            >
              <Globe size={15} />
              {t(lang, "nav.switchLang")}
            </Link>
            <a
              href="https://apps.apple.com/us/app/noor-al-islam/id6761771260"
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-2 px-4 py-3 rounded-xl text-sm font-semibold text-white text-center"
              style={{ background: "#1B5E20" }}
            >
              {t(lang, "nav.download")}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
