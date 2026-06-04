import type { Metadata } from "next";
import { type Lang, toLang } from "@/lib/translations";
import KidsClient from "./KidsClient";

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
    ? "قصص إسلامية للأطفال | تعليم القرآن والأدعية وأركان الإسلام | نور الإسلام"
    : "Islamic Stories for Kids — Learn Quran, Duas & Pillars of Islam Free | Noor Al Islam";
  const description = isAr
    ? "تعليم إسلامي مجاني للأطفال: سور قصيرة للحفظ، قصص إسلامية، أدعية يومية، وأركان الإسلام الخمسة — تفاعلي وممتع لأطفالك."
    : "Free Islamic education for children: short surahs to memorize, Islamic bedtime stories, daily duas, and the 5 pillars of Islam — fun and interactive for kids.";
  return {
    title,
    description,
    keywords: isAr
      ? "قصص إسلامية للأطفال, تعليم القرآن للأطفال, أركان الإسلام للأطفال, أدعية للأطفال, قصص الأنبياء للأطفال, تربية إسلامية, تعليم إسلامي"
      : "islamic stories for kids, quran for kids, islamic education children, 5 pillars of islam kids, duas for kids, islamic kids app, learn quran kids, muslim children, islamic bedtime stories",
    alternates: {
      canonical: `https://nooralisam.com/${lang}/kids`,
      languages: {
        en: "https://nooralisam.com/en/kids",
        ar: "https://nooralisam.com/ar/kids",
      },
    },
    openGraph: { title, description, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function KidsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: rawLang } = await params;
  const lang = toLang(rawLang);
  const isAr = lang === "ar";

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {"@type": "Question", "name": "What are the 5 pillars of Islam for kids?", "acceptedAnswer": {"@type": "Answer", "text": "The 5 pillars of Islam are: 1) Shahada - declaring faith in Allah and His Prophet, 2) Salah - praying 5 times daily, 3) Zakat - giving charity to those in need, 4) Sawm - fasting during Ramadan, 5) Hajj - pilgrimage to Mecca once in a lifetime if able."}},
      {"@type": "Question", "name": "What Islamic stories are good for children?", "acceptedAnswer": {"@type": "Answer", "text": "Great Islamic stories for children include: the story of Prophet Yusuf and his brothers (patience and forgiveness), Prophet Yunus and the whale (trust in Allah), the Elephant Army and the Kaaba (Allah's protection), and the Cave of Thawr (faith and trust in Allah). These stories teach moral values in an engaging way."}},
      {"@type": "Question", "name": "How can I teach my child about Islam?", "acceptedAnswer": {"@type": "Answer", "text": "Start with short surahs like Al-Fatiha, Al-Ikhlas, and Al-Nas. Teach simple daily duas (before eating, sleeping, etc.). Share Islamic stories from the Quran. Explain the 5 pillars of Islam in simple terms. Noor Al Islam offers free interactive Islamic learning for children."}},
      {"@type": "Question", "name": "كيف أعلم أطفالي الإسلام؟", "acceptedAnswer": {"@type": "Answer", "text": "ابدأ بتحفيظهم السور القصيرة كالفاتحة والإخلاص والناس. علّمهم الأدعية اليومية البسيطة. احكِ لهم قصص الأنبياء بطريقة شيّقة. اشرح أركان الإسلام الخمسة بأسلوب مبسّط. يوفر تطبيق نور الإسلام تعليماً إسلامياً تفاعلياً مجانياً للأطفال."}}
    ]
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="text-5xl mb-4">🌙⭐</div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          {isAr ? "التعليم الإسلامي للأطفال" : "Islamic Learning for Kids"}
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto text-lg">
          {isAr
            ? "تعلم القرآن والأدعية وأركان الإسلام بطريقة ممتعة وبسيطة"
            : "Learn Quran, daily duas, and the pillars of Islam in a fun and simple way"}
        </p>
      </div>

      <KidsClient lang={lang} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </div>
  );
}
