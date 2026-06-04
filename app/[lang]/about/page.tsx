import type { Metadata } from "next";
import { type Lang, toLang } from "@/lib/translations";

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
    ? "عن نور الإسلام — تطبيقك الإسلامي الشامل | Datos Solutions"
    : "About Noor Al Islam — Your Complete Islamic Companion | Datos Solutions";
  const description = isAr
    ? "تعرّف على تطبيق نور الإسلام، مهمتنا، فريقنا في داتوس سولوشنز، وكيف نخدم أكثر من 50,000 مسلم حول العالم بأوقات الصلاة والقرآن والزكاة والأذكار."
    : "Learn about the Noor Al Islam app, our mission, our team at Datos Solutions, and how we serve 50,000+ Muslims worldwide with prayer times, Quran, Zakat, and Adhkar.";
  return {
    title,
    description,
    alternates: {
      canonical: `https://nooralisam.com/${lang}/about`,
      languages: {
        en: "https://nooralisam.com/en/about",
        ar: "https://nooralisam.com/ar/about",
      },
    },
    openGraph: { title, description, type: "website", locale: isAr ? "ar_SA" : "en_US", url: `https://nooralisam.com/${lang}/about` },
  };
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: rawLang } = await params;
  const lang = toLang(rawLang);
  const isAr = lang === "ar";

  return (
    <main className={`min-h-screen bg-white ${isAr ? "text-right" : ""}`} dir={isAr ? "rtl" : "ltr"}>
      {/* Hero */}
      <section className="bg-gray-950 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-semibold"
            style={{ background: "rgba(46,125,50,0.2)", color: "#4ade80", border: "1px solid rgba(46,125,50,0.4)" }}>
            {isAr ? "قصتنا" : "Our Story"}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {isAr ? "عن نور الإسلام" : "About Noor Al Islam"}
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
            {isAr
              ? "تطبيق إسلامي شامل بُني بشغف لخدمة المسلمين في رحلتهم الروحية اليومية."
              : "A comprehensive Islamic companion built with passion to serve Muslims in their daily spiritual journey."}
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Mission */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            {isAr ? "مهمتنا" : "Our Mission"}
          </h2>
          <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-4">
            {isAr ? (
              <>
                <p>
                  وُلد تطبيق نور الإسلام من رؤية بسيطة لكنها عميقة: أن يجد كل مسلم في العالم — في مكة أو مانيلا أو مانشستر — رفيقاً رقمياً يعينه على أداء فرائضه وإحياء سنن نبيه بسهولة ويُسر. نؤمن أن التقنية إذا وُظِّفت في خدمة الدين تحولت من أداة إلى أمانة.
                </p>
                <p>
                  رسالتنا هي توفير أدوات إسلامية دقيقة وجميلة وسهلة الاستخدام لكل مسلم، مجاناً وبلا استثناء. لا حسابات مدفوعة، لا ميزات محجوبة خلف جدار الاشتراك — الإسلام للجميع، وكذلك تطبيقنا.
                </p>
              </>
            ) : (
              <>
                <p>
                  Noor Al Islam was born from a simple but profound vision: that every Muslim in the world — in Mecca, Manila, or Manchester — should have access to a digital companion that helps them fulfill their religious obligations and revive the Sunnah of the Prophet ﷺ with ease and beauty. We believe that technology, when harnessed in service of faith, transforms from a tool into a trust.
                </p>
                <p>
                  Our mission is to provide accurate, beautiful, and easy-to-use Islamic tools to every Muslim — for free, without exception. No paywalled features, no premium accounts required for basic worship. Islam belongs to everyone, and so does our app.
                </p>
              </>
            )}
          </div>
        </section>

        {/* Stats */}
        <section>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "50K+", labelEn: "Active Users", labelAr: "مستخدم نشط" },
              { value: "4.9★", labelEn: "App Store Rating", labelAr: "تقييم التطبيق" },
              { value: "114", labelEn: "Quranic Surahs", labelAr: "سورة قرآنية" },
              { value: "7+", labelEn: "Featured Reciters", labelAr: "قارئ مميز" },
            ].map((stat) => (
              <div key={stat.value} className="text-center p-6 rounded-2xl bg-gray-50 border border-gray-100">
                <p className="text-3xl font-bold mb-1" style={{ color: "#1B5E20" }}>{stat.value}</p>
                <p className="text-sm text-gray-500">{isAr ? stat.labelAr : stat.labelEn}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What We Offer */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            {isAr ? "ما يقدمه التطبيق" : "What the App Offers"}
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                icon: "🕌",
                titleEn: "Accurate Prayer Times",
                titleAr: "أوقات صلاة دقيقة",
                descEn: "GPS-based prayer times updated daily, with Athan notifications and Qibla compass. Supports all major calculation methods (MWL, ISNA, Umm al-Qura, Egyptian, and more).",
                descAr: "أوقات صلاة مبنية على GPS، تتحدث يومياً، مع إشعارات الأذان وبوصلة القبلة. يدعم جميع طرق الحساب الرئيسية.",
              },
              {
                icon: "📖",
                titleEn: "Complete Quran Reader",
                titleAr: "قارئ القرآن الكامل",
                descEn: "Read the full Quran in Arabic with translations. Listen to audio recitations from 7 world-renowned reciters including Mishary Al-Afasy, Abdul Basit, and Al-Husary.",
                descAr: "اقرأ القرآن الكريم كاملاً بالعربية مع الترجمات. استمع إلى تلاوات صوتية من 7 قراء عالميين مشهورين.",
              },
              {
                icon: "💛",
                titleEn: "Zakat Calculator",
                titleAr: "حاسبة الزكاة",
                descEn: "Calculate your annual Zakat obligation accurately — covering cash, gold, silver, investments, and business assets with live gold/silver pricing.",
                descAr: "احسب زكاتك السنوية بدقة — تشمل النقود والذهب والفضة والاستثمارات وأصول الأعمال بأسعار الذهب والفضة المحدّثة.",
              },
              {
                icon: "📈",
                titleEn: "Halal Finance Screener",
                titleAr: "فرز التمويل الحلال",
                descEn: "Screen stocks and investments for Shariah compliance. Avoid riba and haram industries with our built-in Islamic finance screening tool.",
                descAr: "فرز الأسهم والاستثمارات للتوافق مع الشريعة. تجنب الربا والصناعات المحرمة بأداة الفرز المالي الإسلامي المدمجة.",
              },
              {
                icon: "🤲",
                titleEn: "Adhkar & Duas",
                titleAr: "الأذكار والأدعية",
                descEn: "Morning and evening adhkar, post-prayer supplications, and occasion-specific duas — all with Arabic text, transliteration, and translation.",
                descAr: "أذكار الصباح والمساء، وأذكار ما بعد الصلاة، وأدعية المناسبات — جميعها بالنص العربي والتشكيل والترجمة.",
              },
              {
                icon: "🌙",
                titleEn: "Kids Islamic Learning",
                titleAr: "التعليم الإسلامي للأطفال",
                descEn: "Short surahs for memorization, essential duas, and the five pillars of Islam — presented in a fun, interactive format for children.",
                descAr: "سور قصيرة للحفظ وأدعية أساسية وأركان الإسلام الخمسة — بطريقة ممتعة وتفاعلية للأطفال.",
              },
            ].map((feature) => (
              <div key={feature.titleEn} className="p-6 rounded-2xl border border-gray-100 bg-white hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{isAr ? feature.titleAr : feature.titleEn}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{isAr ? feature.descAr : feature.descEn}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            {isAr ? "فريق العمل" : "Our Team"}
          </h2>
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                style={{ background: "#1B5E20" }}>
                👨‍💻
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Mohammed Aljarawneh</h3>
                <p className="text-sm font-medium mb-3" style={{ color: "#1B5E20" }}>
                  {isAr ? "المؤسس والمطور الرئيسي — داتوس سولوشنز، الأردن" : "Founder & Lead Developer — Datos Solutions, Jordan"}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {isAr
                    ? "مطور تطبيقات متخصص في Flutter وتقنيات الويب الحديثة. أسس داتوس سولوشنز بهدف بناء تطبيقات تقنية ذات قيمة حقيقية للمجتمعات العربية والإسلامية. يؤمن بأن التطوير البرمجي الجيد هو في جوهره خدمة للناس."
                    : "A mobile and web developer specializing in Flutter and modern web technologies. Founded Datos Solutions with the goal of building technology that delivers real value to Arabic and Muslim communities worldwide. Believes that good software development is, at its core, a form of service to people."}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-6 p-6 rounded-2xl border border-gray-100 bg-white">
            <h3 className="font-bold text-gray-900 mb-2">Datos Solutions</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              {isAr
                ? "داتوس سولوشنز شركة تقنية أردنية متخصصة في تطوير التطبيقات الجوالة والويب. تؤمن الشركة بالاهتمام بالتفاصيل والتصميم الأنيق والتقنية التي تخدم الهدف بدلاً من التعقيد المفرط. تطبيق نور الإسلام هو أحد مشاريعها الرئيسية."
                : "Datos Solutions is a Jordanian technology company specializing in mobile and web application development. The company believes in attention to detail, elegant design, and technology that serves its purpose without unnecessary complexity. Noor Al Islam is one of its flagship products."}
            </p>
          </div>
        </section>

        {/* Values */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            {isAr ? "قيمنا" : "Our Values"}
          </h2>
          <div className="space-y-4">
            {[
              {
                icon: "🎯",
                titleEn: "Accuracy First",
                titleAr: "الدقة أولاً",
                descEn: "Prayer times, Zakat calculations, and Quranic text must be correct. We use verified astronomical algorithms, authenticated Quranic text (Hafs), and scholarly-validated Zakat formulas.",
                descAr: "أوقات الصلاة وحسابات الزكاة والنص القرآني يجب أن تكون صحيحة. نستخدم خوارزميات فلكية مُعتمدة ونصاً قرآنياً أصيلاً (رواية حفص) وصيغ زكاة مُتحقق منها علمياً.",
              },
              {
                icon: "🆓",
                titleEn: "Free for Every Muslim",
                titleAr: "مجاني لكل مسلم",
                descEn: "Core Islamic tools — prayer times, Quran reading, Qibla, and Adhkar — are and will remain completely free. We sustain the app through non-intrusive advertising.",
                descAr: "الأدوات الإسلامية الأساسية — أوقات الصلاة والقرآن والقبلة والأذكار — مجانية وستظل كذلك. نُموّل التطبيق من خلال إعلانات غير متدخلة.",
              },
              {
                icon: "🔒",
                titleEn: "Privacy Respected",
                titleAr: "الخصوصية محترمة",
                descEn: "We use your location only to calculate prayer times. We do not store your personal data on our servers. No account required — open the app and start.",
                descAr: "نستخدم موقعك الجغرافي فقط لحساب أوقات الصلاة. لا نخزن بياناتك الشخصية على خوادمنا. لا حساب مطلوب — افتح التطبيق وابدأ.",
              },
            ].map((v) => (
              <div key={v.titleEn} className={`flex gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100 ${isAr ? "flex-row-reverse text-right" : ""}`}>
                <div className="text-2xl shrink-0">{v.icon}</div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{isAr ? v.titleAr : v.titleEn}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{isAr ? v.descAr : v.descEn}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
