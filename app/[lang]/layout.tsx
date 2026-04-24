import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { type Lang } from "@/lib/translations";

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
      <div
        dir={isAr ? "rtl" : "ltr"}
        className={`min-h-screen flex flex-col ${isAr ? "font-arabic" : ""}`}
        style={{
          fontFamily: isAr
            ? "'Amiri', 'Traditional Arabic', serif"
            : "'Segoe UI', system-ui, -apple-system, sans-serif",
        }}
      >
        <Navbar lang={lang} />
        <main className="flex-1">{children}</main>
        <Footer lang={lang} />
      </div>
    </>
  );
}
