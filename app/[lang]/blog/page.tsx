import type { Metadata } from "next";
import Link from "next/link";
import { type Lang, toLang } from "@/lib/translations";
import { blogPosts } from "@/lib/blog-data";

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ar" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = toLang(rawLang);
  const isAr = lang === "ar";
  const title = isAr
    ? "مدونة نور الإسلام — مقالات إسلامية موثوقة"
    : "Noor Al Islam Blog — Islamic Guides and Articles";
  const description = isAr
    ? "مقالات إسلامية مفيدة: الصلاة، الزكاة، القرآن، الاستثمار الحلال، الأذكار، والقبلة — محتوى موثوق يساعدك في حياتك الروحية."
    : "Useful Islamic articles on prayer, Zakat, Quran reading, halal investing, Adhkar, and Qibla — trustworthy content to support your spiritual life.";
  return {
    title,
    description,
    alternates: {
      canonical: `https://nooralisam.com/${lang}/blog`,
      languages: {
        en: "https://nooralisam.com/en/blog",
        ar: "https://nooralisam.com/ar/blog",
      },
    },
    openGraph: { title, description, type: "website", locale: isAr ? "ar_SA" : "en_US", url: `https://nooralisam.com/${lang}/blog` },
  };
}

const categoryColors: Record<string, { bg: string; text: string }> = {
  Zakat: { bg: "#FFFBEB", text: "#B8860B" },
  Prayer: { bg: "#EFF6FF", text: "#1565C0" },
  Finance: { bg: "#F5F3FF", text: "#7C3AED" },
  Quran: { bg: "#F0FDF4", text: "#1B5E20" },
  Spirituality: { bg: "#FEF2F2", text: "#DC2626" },
  Technology: { bg: "#F0FDFA", text: "#0F766E" },
};

const categoryAr: Record<string, string> = {
  Zakat: "الزكاة",
  Prayer: "الصلاة",
  Finance: "التمويل",
  Quran: "القرآن",
  Spirituality: "الروحانيات",
  Technology: "التقنية",
};

function formatDate(dateStr: string, lang: Lang): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString(lang === "ar" ? "ar-JO" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: rawLang } = await params;
  const lang = toLang(rawLang);
  const isAr = lang === "ar";

  return (
    <main className={`min-h-screen bg-white ${isAr ? "text-right" : ""}`} dir={isAr ? "rtl" : "ltr"}>
      {/* Hero */}
      <section className="bg-gray-950 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-semibold"
            style={{ background: "rgba(46,125,50,0.2)", color: "#4ade80", border: "1px solid rgba(46,125,50,0.4)" }}>
            {isAr ? "المدونة الإسلامية" : "Islamic Blog"}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {isAr ? "مقالات ودروس إسلامية" : "Islamic Articles & Guides"}
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
            {isAr
              ? "محتوى إسلامي موثوق يساعدك على فهم دينك وتطبيقه في حياتك اليومية."
              : "Trustworthy Islamic content to help you understand your faith and apply it in daily life."}
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => {
            const colors = categoryColors[post.category] ?? { bg: "#F9FAFB", text: "#374151" };
            const catLabel = isAr ? (categoryAr[post.category] ?? post.category) : post.category;
            return (
              <Link
                key={post.slug}
                href={`/${lang}/blog/${post.slug}`}
                className="group flex flex-col rounded-2xl border border-gray-100 bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-200 overflow-hidden"
              >
                {/* Category banner */}
                <div className="px-6 pt-6 pb-0">
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
                    style={{ background: colors.bg, color: colors.text }}
                  >
                    {catLabel}
                  </span>
                </div>

                <div className="px-6 pb-6 flex flex-col flex-1">
                  <h2 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-green-800 transition-colors leading-snug">
                    {isAr ? post.titleAr : post.titleEn}
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-4">
                    {isAr ? post.excerptAr : post.excerptEn}
                  </p>
                  <div className={`flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-gray-100 ${isAr ? "flex-row-reverse" : ""}`}>
                    <span>{formatDate(post.date, lang)}</span>
                    <span>
                      {isAr ? `${post.readTime} دقائق قراءة` : `${post.readTime} min read`}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
