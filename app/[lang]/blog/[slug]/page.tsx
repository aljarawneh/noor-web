import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { type Lang, toLang } from "@/lib/translations";
import { blogPosts, getPostBySlug } from "@/lib/blog-data";

export async function generateStaticParams() {
  const params: { lang: string; slug: string }[] = [];
  for (const lang of ["en", "ar"]) {
    for (const post of blogPosts) {
      params.push({ lang, slug: post.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang: rawLang, slug } = await params;
  const lang = toLang(rawLang);
  const isAr = lang === "ar";
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not Found" };
  const title = isAr ? post.titleAr : post.titleEn;
  const description = isAr ? post.excerptAr : post.excerptEn;
  return {
    title: `${title} | Noor Al Islam Blog`,
    description,
    alternates: {
      canonical: `https://nooralisam.com/${lang}/blog/${slug}`,
      languages: {
        en: `https://nooralisam.com/en/blog/${slug}`,
        ar: `https://nooralisam.com/ar/blog/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      type: "article",
      locale: isAr ? "ar_SA" : "en_US",
      url: `https://nooralisam.com/${lang}/blog/${slug}`,
    },
  };
}

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

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang: rawLang, slug } = await params;
  const lang = toLang(rawLang);
  const isAr = lang === "ar";
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const content = isAr ? post.contentAr : post.contentEn;
  const catLabel = isAr ? (categoryAr[post.category] ?? post.category) : post.category;

  return (
    <main className={`min-h-screen bg-white ${isAr ? "text-right" : ""}`} dir={isAr ? "rtl" : "ltr"}>
      {/* Hero */}
      <section className="bg-gray-950 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            <Link
              href={`/${lang}/blog`}
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              {isAr ? "المدونة" : "Blog"}
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-green-400 text-sm">{catLabel}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-snug">
            {isAr ? post.titleAr : post.titleEn}
          </h1>
          <div className={`flex items-center gap-4 text-gray-400 text-sm ${isAr ? "flex-row-reverse" : ""}`}>
            <span>{formatDate(post.date, lang)}</span>
            <span>·</span>
            <span>
              {isAr ? `${post.readTime} دقائق قراءة` : `${post.readTime} min read`}
            </span>
            <span>·</span>
            <span className="text-gray-300">Datos Solutions</span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-xl text-gray-500 leading-relaxed mb-10 italic border-l-4 border-green-600 pl-4" style={isAr ? { borderLeft: "none", borderRight: "4px solid #16a34a", paddingLeft: 0, paddingRight: "1rem" } : {}}>
          {isAr ? post.excerptAr : post.excerptEn}
        </p>

        <article
          className="prose prose-lg prose-gray max-w-none
            prose-h2:text-2xl prose-h2:font-bold prose-h2:text-gray-900 prose-h2:mt-10 prose-h2:mb-4
            prose-p:text-gray-600 prose-p:leading-relaxed
            prose-ul:text-gray-600 prose-li:leading-relaxed
            prose-strong:text-gray-900"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {/* Related Articles */}
        <div className="mt-16 pt-10 border-t border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {isAr ? "مقالات ذات صلة" : "More Articles"}
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {blogPosts
              .filter((p) => p.slug !== post.slug)
              .slice(0, 4)
              .map((related) => (
                <Link
                  key={related.slug}
                  href={`/${lang}/blog/${related.slug}`}
                  className="group p-5 rounded-xl border border-gray-100 hover:shadow-md hover:border-green-200 transition-all"
                >
                  <p className="text-xs text-gray-400 mb-2">
                    {isAr ? (categoryAr[related.category] ?? related.category) : related.category}
                  </p>
                  <h3 className="font-bold text-gray-900 text-sm leading-snug group-hover:text-green-800 transition-colors">
                    {isAr ? related.titleAr : related.titleEn}
                  </h3>
                  <p className="text-xs text-gray-500 mt-2">
                    {isAr ? `${related.readTime} دقائق` : `${related.readTime} min`}
                  </p>
                </Link>
              ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href={`/${lang}/blog`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm hover:opacity-90 transition-opacity"
              style={{ background: "#1B5E20" }}
            >
              {isAr ? "عرض جميع المقالات" : "View All Articles"}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
