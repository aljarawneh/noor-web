import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

// ── Google AdSense publisher ID ──────────────────────────────────────────────
// Replace with your real publisher ID from https://adsense.google.com
// Format: ca-pub-XXXXXXXXXXXXXXXX
const ADSENSE_PUB_ID = "ca-pub-4613958392515337";
// ────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: {
    template: "%s | Noor Al Islam",
    default: "Noor Al Islam — نور الإسلام",
  },
  description:
    "Your complete Islamic companion: Prayer times, Quran, Zakat calculator, Halal investing, Adhkar and more.",
  metadataBase: new URL("https://nooralisam.com"),
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/favicon.svg",
  },
  other: {
    "google-adsense-account": ADSENSE_PUB_ID,
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Noor Al Islam — نور الإسلام",
    "url": "https://nooralisam.com",
    "description": "Your complete Islamic companion: Prayer times, Quran, Zakat calculator, Halal investing, Adhkar and more.",
    "inLanguage": ["en", "ar"],
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://nooralisam.com/en/quran?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    "name": "Noor Al Islam",
    "alternateName": "نور الإسلام",
    "description": "Complete Islamic app: Prayer times, Quran reader with audio, Zakat calculator, Halal finance, Adhkar, and Qibla direction.",
    "url": "https://nooralisam.com",
    "applicationCategory": "LifestyleApplication",
    "operatingSystem": "iOS, Android",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "1200" },
    "installUrl": [
      "https://apps.apple.com/us/app/noor-al-islam/id6761771260",
      "https://play.google.com/store/apps/details?id=com.datossol.noor_app",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Noor Al Islam",
    "alternateName": "نور الإسلام",
    "url": "https://nooralisam.com",
    "logo": "https://nooralisam.com/favicon.svg",
    "sameAs": [
      "https://apps.apple.com/us/app/noor-al-islam/id6761771260",
      "https://play.google.com/store/apps/details?id=com.datossol.noor_app",
    ],
  },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUB_ID}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
