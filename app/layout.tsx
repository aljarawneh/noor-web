import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Noor Al Islam",
    default: "Noor Al Islam — نور الإسلام",
  },
  description:
    "Your complete Islamic companion: Prayer times, Quran, Zakat calculator, Halal investing, Adhkar and more.",
  metadataBase: new URL("https://noorislam.app"),
};

// Root layout: Next.js App Router requires this to output <html><body>.
// lang/dir are set by [lang]/layout.tsx which wraps with a provider pattern.
// We use suppressHydrationWarning because [lang]/layout modifies html attrs client-side if needed.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
