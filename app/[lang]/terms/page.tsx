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
    ? "شروط الاستخدام — نور الإسلام"
    : "Terms of Service — Noor Al Islam";
  const description = isAr
    ? "شروط وأحكام استخدام تطبيق نور الإسلام وموقعه الإلكتروني."
    : "Terms of Service for the Noor Al Islam app and website.";
  return {
    title,
    description,
    alternates: {
      canonical: `https://nooralisam.com/${lang}/terms`,
      languages: {
        en: "https://nooralisam.com/en/terms",
        ar: "https://nooralisam.com/ar/terms",
      },
    },
    openGraph: { title, description, type: "website", locale: isAr ? "ar_SA" : "en_US", url: `https://nooralisam.com/${lang}/terms` },
  };
}

export default async function TermsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: rawLang } = await params;
  const lang = toLang(rawLang);
  const isAr = lang === "ar";

  return (
    <main className={`min-h-screen bg-white ${isAr ? "text-right" : ""}`} dir={isAr ? "rtl" : "ltr"}>
      <section className="bg-gray-950 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">
            {isAr ? "شروط الاستخدام" : "Terms of Service"}
          </h1>
          <p className="text-gray-400">
            {isAr ? "آخر تحديث: 1 يناير 2024" : "Effective Date: January 1, 2024"}
            {" | "}
            {isAr ? "داتوس سولوشنز، الأردن" : "Datos Solutions, Jordan"}
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-gray max-w-none space-y-10">
          {isAr ? (
            <>
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. القبول بالشروط</h2>
                <p className="text-gray-600 leading-relaxed">
                  باستخدامك لتطبيق نور الإسلام أو الموقع الإلكتروني (nooralisam.com)، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي من هذه الشروط، يُرجى التوقف عن استخدام التطبيق والموقع. هذه الشروط مبرمة بينك وبين شركة داتوس سولوشنز، الأردن.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. وصف الخدمة</h2>
                <p className="text-gray-600 leading-relaxed">
                  يوفر تطبيق نور الإسلام مجموعة من الأدوات الإسلامية تشمل: أوقات الصلاة، قارئ القرآن الكريم، حاسبة الزكاة، فرز الاستثمارات الحلال، الأذكار والأدعية، وبوصلة القبلة. تُقدَّم هذه الخدمة مجاناً للمستخدمين، مدعومةً جزئياً بالإعلانات.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. الخدمة المجانية وحدود المسؤولية</h2>
                <p className="text-gray-600 leading-relaxed">
                  تُقدَّم خدمات نور الإسلام "كما هي" و"حسب التوافر" دون أي ضمانات صريحة أو ضمنية من أي نوع. لا تضمن داتوس سولوشنز خلوّ التطبيق من الأخطاء أو توافره على مدار الساعة. لن نكون مسؤولين عن أي أضرار مباشرة أو غير مباشرة أو عرضية ناجمة عن استخدام أو عدم القدرة على استخدام الخدمة.
                </p>
                <p className="text-gray-600 leading-relaxed mt-3">
                  <strong>تنبيه مهم:</strong> أوقات الصلاة وحسابات الزكاة المقدمة في التطبيق هي لأغراض إرشادية. دائماً تحقق من العلماء المحليين في حالة الشك أو للمسائل الفقهية الخاصة.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. استخدام الخدمة</h2>
                <p className="text-gray-600 leading-relaxed mb-3">توافق على استخدام تطبيق نور الإسلام للأغراض المشروعة فحسب. يُحظر عليك:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 leading-relaxed">
                  <li>استخدام الخدمة بأي طريقة تنتهك القوانين المعمول بها في الأردن أو في بلدك</li>
                  <li>محاولة الوصول غير المصرح به إلى أنظمتنا أو خوادمنا</li>
                  <li>إعادة بيع أو استنساخ محتوى التطبيق دون إذن كتابي صريح</li>
                  <li>استخدام التطبيق لنشر معلومات مضللة أو محتوى ضار</li>
                  <li>إجراء هندسة عكسية للتطبيق أو محاولة استخراج الشفرة المصدرية</li>
                  <li>إرهاق خوادمنا بطلبات مفرطة أو اختراق أمان التطبيق</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. الملكية الفكرية</h2>
                <p className="text-gray-600 leading-relaxed">
                  جميع المحتويات الأصلية في تطبيق نور الإسلام — بما في ذلك التصاميم والنصوص والرسوم والشفرة البرمجية — هي ملك لشركة داتوس سولوشنز وتحميها قوانين الملكية الفكرية المعمول بها. النص القرآني مصدره وقف ملك مفتوح المصدر، والصوتيات مرخصة من مزوديها. لا يمنحك استخدام التطبيق أي حقوق في هذه المحتويات بخلاف الحق في الاستخدام الشخصي غير التجاري.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. روابط الجهات الخارجية</h2>
                <p className="text-gray-600 leading-relaxed">
                  قد يحتوي التطبيق أو الموقع على روابط لمواقع خارجية. داتوس سولوشنز غير مسؤولة عن محتوى هذه المواقع أو سياسات خصوصيتها. نوصي بمراجعة سياسة الخصوصية لكل موقع خارجي تزوره.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. التعديلات على الشروط</h2>
                <p className="text-gray-600 leading-relaxed">
                  نحتفظ بحق تعديل هذه الشروط في أي وقت. سيُنشر التحديث على هذه الصفحة مع تاريخ السريان الجديد. استمرارك في استخدام التطبيق بعد نشر التغييرات يُعدّ قبولاً لها.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. إنهاء الخدمة</h2>
                <p className="text-gray-600 leading-relaxed">
                  نحتفظ بحق تعليق أو إنهاء وصولك إلى الخدمة في أي وقت وبدون إشعار مسبق في حال انتهاكك لهذه الشروط.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. القانون الحاكم</h2>
                <p className="text-gray-600 leading-relaxed">
                  تخضع هذه الشروط وتُفسَّر وفق قوانين المملكة الأردنية الهاشمية، وتختص المحاكم الأردنية بالفصل في أي نزاع ينشأ عن هذه الشروط أو يتعلق بها، دون الأخذ بأحكام تنازع القوانين.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. التواصل معنا</h2>
                <p className="text-gray-600 leading-relaxed">
                  لأي استفسارات تتعلق بهذه الشروط:
                </p>
                <div className="mt-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="text-gray-700 font-semibold">داتوس سولوشنز</p>
                  <p className="text-gray-600">عمّان، الأردن</p>
                  <p className="text-gray-600">البريد الإلكتروني: <a href="mailto:aljarawneh@gmail.com" className="text-green-700 hover:underline">aljarawneh@gmail.com</a></p>
                </div>
              </section>
            </>
          ) : (
            <>
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-600 leading-relaxed">
                  By using the Noor Al Islam app or website (nooralisam.com), you agree to be bound by these Terms of Service. If you do not agree to any of these terms, please discontinue use of the app and website. These Terms constitute a legally binding agreement between you and Datos Solutions, Jordan.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
                <p className="text-gray-600 leading-relaxed">
                  Noor Al Islam provides a suite of Islamic tools including: prayer times, Quran reader and audio, Zakat calculator, halal investment screener, Adhkar and duas, and Qibla compass. The service is provided free of charge to users and is partially supported by advertising.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Free Service and Disclaimer of Warranties</h2>
                <p className="text-gray-600 leading-relaxed">
                  Noor Al Islam services are provided "as is" and "as available" without warranties of any kind, either express or implied. Datos Solutions does not warrant that the app will be error-free, uninterrupted, or free of harmful components. We shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of or inability to use the service.
                </p>
                <p className="text-gray-600 leading-relaxed mt-3">
                  <strong>Important Notice:</strong> Prayer times and Zakat calculations provided in the app are for guidance purposes. Always consult local scholars for doubt or specific jurisprudential matters.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Acceptable Use</h2>
                <p className="text-gray-600 leading-relaxed mb-3">You agree to use Noor Al Islam only for lawful purposes. You must not:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 leading-relaxed">
                  <li>Use the service in any way that violates applicable laws in Jordan or your jurisdiction</li>
                  <li>Attempt unauthorized access to our systems or servers</li>
                  <li>Resell or reproduce app content without express written permission</li>
                  <li>Use the app to spread misinformation or harmful content</li>
                  <li>Reverse engineer the app or attempt to extract source code</li>
                  <li>Overload our servers with excessive requests or attempt to breach app security</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Intellectual Property</h2>
                <p className="text-gray-600 leading-relaxed">
                  All original content in Noor Al Islam — including designs, text, graphics, and code — is the property of Datos Solutions and is protected by applicable intellectual property laws. The Quranic text is sourced from open-source waqf material; audio recitations are licensed from their respective providers. Your use of the app grants you no rights in this content beyond personal, non-commercial use.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Third-Party Links</h2>
                <p className="text-gray-600 leading-relaxed">
                  The app or website may contain links to third-party websites. Datos Solutions is not responsible for the content or privacy practices of those sites. We recommend reviewing the privacy policy of any external site you visit.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Modifications to Terms</h2>
                <p className="text-gray-600 leading-relaxed">
                  We reserve the right to modify these Terms at any time. Updates will be posted on this page with a new effective date. Continued use of the app after changes are posted constitutes acceptance of the updated Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Termination</h2>
                <p className="text-gray-600 leading-relaxed">
                  We reserve the right to suspend or terminate your access to the service at any time without prior notice if you violate these Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Governing Law</h2>
                <p className="text-gray-600 leading-relaxed">
                  These Terms are governed by and construed in accordance with the laws of the Hashemite Kingdom of Jordan. Any disputes arising from or related to these Terms shall be subject to the exclusive jurisdiction of Jordanian courts, without regard to conflict of law provisions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact</h2>
                <p className="text-gray-600 leading-relaxed mb-3">For questions about these Terms:</p>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="text-gray-700 font-semibold">Datos Solutions</p>
                  <p className="text-gray-600">Amman, Jordan</p>
                  <p className="text-gray-600">Email: <a href="mailto:aljarawneh@gmail.com" className="text-green-700 hover:underline">aljarawneh@gmail.com</a></p>
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
