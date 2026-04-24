import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { type Lang } from "@/lib/translations";
import { AudioProvider } from "@/lib/audioContext";
import GlobalAudioPlayer from "@/components/GlobalAudioPlayer";

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ar" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  await params;
  return {};
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang: Lang = rawLang === "ar" ? "ar" : "en";
  const isAr = lang === "ar";

  return (
    <>
      {/*
        Next.js does not allow nested <html>/<body> in route segments.
        We inject lang/dir via a script so the root <html> gets the right attributes
        without hydration mismatch. suppressHydrationWarning is set on <html> in root layout.
      */}
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang="${lang}";document.documentElement.dir="${isAr ? "rtl" : "ltr"}";`,
        }}
      />
      <AudioProvider>
        <div
          dir={isAr ? "rtl" : "ltr"}
          lang={lang}
          className="min-h-screen flex flex-col"
          style={{
            fontFamily: isAr
              ? "'Noto Naskh Arabic', 'Amiri', 'Traditional Arabic', system-ui, sans-serif"
              : "'Segoe UI', system-ui, -apple-system, sans-serif",
          }}
        >
          <Navbar lang={lang} />
          <main className="flex-1">{children}</main>
          <GlobalAudioPlayer lang={lang} />
          <Footer lang={lang} />
        </div>
      </AudioProvider>
    </>
  );
}
