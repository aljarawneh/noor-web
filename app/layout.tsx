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
  metadataBase: new URL("https://noorislam.app"),
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
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
