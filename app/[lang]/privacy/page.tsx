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
    ? "سياسة الخصوصية — نور الإسلام"
    : "Privacy Policy — Noor Al Islam";
  const description = isAr
    ? "سياسة الخصوصية لتطبيق نور الإسلام: كيف نجمع بياناتك ونستخدمها ونحميها."
    : "Privacy Policy for Noor Al Islam app: how we collect, use, and protect your data.";
  return {
    title,
    description,
    alternates: {
      canonical: `https://nooralisam.com/${lang}/privacy`,
      languages: {
        en: "https://nooralisam.com/en/privacy",
        ar: "https://nooralisam.com/ar/privacy",
      },
    },
    openGraph: { title, description, type: "website", locale: isAr ? "ar_SA" : "en_US", url: `https://nooralisam.com/${lang}/privacy` },
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: rawLang } = await params;
  const lang = toLang(rawLang);
  const isAr = lang === "ar";

  return (
    <main className={`min-h-screen bg-white ${isAr ? "text-right" : ""}`} dir={isAr ? "rtl" : "ltr"}>
      <section className="bg-gray-950 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">
            {isAr ? "سياسة الخصوصية" : "Privacy Policy"}
          </h1>
          <p className="text-gray-400">
            {isAr ? "آخر تحديث: 1 يناير 2024" : "Effective Date: January 1, 2024"}
            {" | "}
            {isAr ? "الناشر: داتوس سولوشنز، الأردن" : "Publisher: Datos Solutions, Jordan"}
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-gray max-w-none space-y-10">
          {isAr ? (
            <>
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. المقدمة</h2>
                <p className="text-gray-600 leading-relaxed">
                  مرحباً بك في تطبيق نور الإسلام، الذي طوّرته شركة داتوس سولوشنز في الأردن. نحن نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية. تشرح سياسة الخصوصية هذه كيفية جمعنا للمعلومات واستخدامها والإفصاح عنها وحمايتها عند استخدامك لتطبيقنا وموقعنا الإلكتروني.
                </p>
                <p className="text-gray-600 leading-relaxed mt-3">
                  باستخدامك لتطبيق نور الإسلام أو موقعنا الإلكتروني، فإنك توافق على الممارسات الموضحة في هذه السياسة.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. المعلومات التي نجمعها</h2>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">أ. البيانات التي تزودنا بها</h3>
                <p className="text-gray-600 leading-relaxed">لا يشترط تطبيق نور الإسلام إنشاء حساب. لا نجمع اسمك أو عنوان بريدك الإلكتروني أو أي معلومات تعريفية شخصية لاستخدام الوظائف الأساسية للتطبيق.</p>

                <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">ب. بيانات الموقع الجغرافي</h3>
                <p className="text-gray-600 leading-relaxed">
                  يطلب التطبيق الوصول إلى موقعك الجغرافي <strong>لغرض واحد فقط</strong>: حساب أوقات الصلاة الدقيقة وتحديد اتجاه القبلة لموقعك. نستخدم إحداثيات GPS الخاصة بك على الجهاز محلياً ولا نرسل موقعك أو نخزّنه على خوادمنا. يمكنك رفض الإذن بالوصول إلى الموقع ولكن لن تتمكن من الاستفادة من ميزة أوقات الصلاة حينئذٍ.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">ج. بيانات الاستخدام</h3>
                <p className="text-gray-600 leading-relaxed">قد نجمع بيانات مجهولة الهوية حول كيفية استخدام التطبيق، مثل الميزات الأكثر استخداماً وأنواع الأجهزة وبيانات الأداء. يُستخدم ذلك لتحسين التطبيق ولا يرتبط بأي شخص بعينه.</p>

                <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">د. ملفات تعريف الارتباط (Cookies)</h3>
                <p className="text-gray-600 leading-relaxed">يستخدم موقعنا الإلكتروني ملفات تعريف ارتباط ضرورية للوظائف الأساسية، وملفات تحليلية (عبر خدمة مثل Google Analytics) لفهم كيفية استخدام الزوار للموقع، ومن المحتمل استخدام ملفات إعلانية من خلال خدمة Google AdSense. يمكنك إعداد متصفحك لرفض ملفات تعريف الارتباط، وإن كان ذلك قد يؤثر على تجربة استخدام الموقع.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. كيف نستخدم معلوماتك</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2 leading-relaxed">
                  <li>حساب أوقات الصلاة الدقيقة وتحديد اتجاه القبلة بناءً على موقعك</li>
                  <li>تقديم وظائف التطبيق الأساسية (أوقات الصلاة، القرآن، الزكاة، الأذكار)</li>
                  <li>تحليل أنماط استخدام التطبيق لتحسين الأداء والميزات</li>
                  <li>عرض إعلانات ملائمة عبر Google AdMob (للمستخدمين غير المشتركين)</li>
                  <li>الرد على استفساراتك وطلبات الدعم الفني</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. الخدمات الخارجية</h2>
                <p className="text-gray-600 leading-relaxed mb-3">نستخدم خدمات خارجية قد تجمع معلومات عنك:</p>

                <h3 className="text-lg font-semibold text-gray-800 mb-2">Google AdMob</h3>
                <p className="text-gray-600 leading-relaxed">نستخدم Google AdMob لعرض الإعلانات. قد يجمع AdMob معلومات الجهاز ومعرّف الإعلان والبيانات المتعلقة بالاهتمامات. يمكنك الاطلاع على <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-green-700 hover:underline">سياسة خصوصية Google</a> لمزيد من التفاصيل.</p>

                <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Google Analytics</h3>
                <p className="text-gray-600 leading-relaxed">يستخدم موقعنا Google Analytics لتحليل حركة الزوار. تجمع هذه الخدمة بيانات مجهولة الهوية مثل نوع المتصفح والصفحات المُزارة والمدة الزمنية.</p>

                <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Apple App Store و Google Play</h3>
                <p className="text-gray-600 leading-relaxed">خاضع لسياسات خصوصية Apple وGoogle عند تنزيل التطبيق عبر متجريهما.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. مشاركة البيانات</h2>
                <p className="text-gray-600 leading-relaxed">
                  لا نبيع بياناتك الشخصية ولا نؤجّرها ولا نتاجر بها مع أطراف ثالثة. قد نشارك البيانات مع مزودي خدماتنا (مثل Google لأغراض الإعلانات والتحليلات) وفق اتفاقيات تعالج خصوصيتك. في حال توقف التطبيق أو اندماجه مع جهة أخرى، سيُخطَر المستخدمون مسبقاً بأي تغيير في معالجة البيانات.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. حقوق المستخدم</h2>
                <p className="text-gray-600 leading-relaxed mb-3">بموجب لوائح حماية البيانات المعمول بها، يحق لك:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 leading-relaxed">
                  <li>الاطلاع على البيانات الشخصية التي نحتفظ بها (إن وجدت)</li>
                  <li>طلب تصحيح أي بيانات غير دقيقة</li>
                  <li>طلب حذف بياناتك</li>
                  <li>إلغاء الاشتراك في الاتصالات التسويقية</li>
                  <li>سحب موافقتك على معالجة البيانات في أي وقت</li>
                </ul>
                <p className="text-gray-600 leading-relaxed mt-3">لممارسة أي من هذه الحقوق، تواصل معنا على: <a href="mailto:aljarawneh@gmail.com" className="text-green-700 hover:underline">aljarawneh@gmail.com</a></p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. أمان البيانات</h2>
                <p className="text-gray-600 leading-relaxed">
                  نتخذ تدابير أمنية تقنية وتنظيمية معقولة لحماية بياناتك من الوصول غير المصرح به أو الإفصاح أو التعديل أو التدمير. غير أنه لا توجد طريقة نقل بيانات عبر الإنترنت أو طريقة تخزين إلكترونية آمنة بنسبة 100%.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. الأطفال</h2>
                <p className="text-gray-600 leading-relaxed">
                  تطبيقنا مناسب لجميع الأعمار ولكننا لا نجمع عن قصد بيانات شخصية من الأطفال دون سن 13 عاماً. إذا اكتشفنا أننا جمعنا معلومات من طفل دون هذا السن، سنحذفها فوراً.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. التغييرات على هذه السياسة</h2>
                <p className="text-gray-600 leading-relaxed">
                  قد نحدّث سياسة الخصوصية هذه بصفة دورية. سيُنشر التحديث على هذه الصفحة مع تاريخ السريان الجديد. نشجعك على مراجعة هذه الصفحة بصفة منتظمة.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. التواصل معنا</h2>
                <p className="text-gray-600 leading-relaxed">
                  لأي أسئلة أو مخاوف تتعلق بهذه السياسة:
                </p>
                <div className="mt-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="text-gray-700"><strong>داتوس سولوشنز</strong></p>
                  <p className="text-gray-600">عمّان، الأردن</p>
                  <p className="text-gray-600">البريد الإلكتروني: <a href="mailto:aljarawneh@gmail.com" className="text-green-700 hover:underline">aljarawneh@gmail.com</a></p>
                </div>
              </section>
            </>
          ) : (
            <>
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
                <p className="text-gray-600 leading-relaxed">
                  Welcome to Noor Al Islam, developed by Datos Solutions, based in Amman, Jordan. We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application and website (nooralisam.com).
                </p>
                <p className="text-gray-600 leading-relaxed mt-3">
                  By using Noor Al Islam, you agree to the practices described in this policy. If you do not agree, please discontinue use of the app and website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>

                <h3 className="text-lg font-semibold text-gray-800 mb-2">a. Information You Provide</h3>
                <p className="text-gray-600 leading-relaxed">Noor Al Islam does not require account registration. We do not collect your name, email address, or any identifying personal information to use the core features of the app.</p>

                <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">b. Location Data</h3>
                <p className="text-gray-600 leading-relaxed">
                  The app requests access to your device&apos;s location for <strong>one purpose only</strong>: to calculate accurate daily prayer times and determine the Qibla direction for your location. Your GPS coordinates are processed on-device and are not transmitted to or stored on our servers. You may deny location permission, but prayer time features will not be available without it.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">c. Usage Data</h3>
                <p className="text-gray-600 leading-relaxed">We may collect anonymized usage data such as which features are used most, device type, and performance metrics. This data is used to improve the app and is not linked to any individual user.</p>

                <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">d. Cookies and Tracking Technologies</h3>
                <p className="text-gray-600 leading-relaxed">Our website uses essential cookies for core functionality, analytics cookies (via Google Analytics) to understand how visitors use the site, and advertising cookies through Google AdSense. You can configure your browser to refuse cookies, though this may affect site functionality.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2 leading-relaxed">
                  <li>To calculate accurate prayer times and Qibla direction based on your location</li>
                  <li>To provide core app functionality (prayer times, Quran, Zakat calculator, Adhkar)</li>
                  <li>To analyze usage patterns and improve app performance and features</li>
                  <li>To display relevant advertising through Google AdMob (for free-tier users)</li>
                  <li>To respond to your support inquiries and feedback</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Third-Party Services</h2>
                <p className="text-gray-600 leading-relaxed mb-4">We integrate third-party services that may collect information about you:</p>

                <h3 className="text-lg font-semibold text-gray-800 mb-2">Google AdMob</h3>
                <p className="text-gray-600 leading-relaxed">We use Google AdMob to serve advertisements in the app. AdMob may collect device identifiers, advertising IDs, and interest-based data to serve relevant ads. See <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-green-700 hover:underline">Google&apos;s Privacy Policy</a> for details. You can opt out of personalized ads through your device settings.</p>

                <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Google Analytics</h3>
                <p className="text-gray-600 leading-relaxed">Our website uses Google Analytics to analyze traffic. This service collects anonymized data including browser type, pages visited, time on site, and geographic region (country-level only).</p>

                <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Apple App Store and Google Play</h3>
                <p className="text-gray-600 leading-relaxed">When you download our app through the App Store or Google Play, their respective privacy policies apply to that download transaction.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Sharing</h2>
                <p className="text-gray-600 leading-relaxed">
                  We do not sell, rent, or trade your personal data to third parties. We may share data with service providers (such as Google for advertising and analytics) under agreements that protect your privacy. In the event of a business transfer or merger, users will be notified of any changes to data processing.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights</h2>
                <p className="text-gray-600 leading-relaxed mb-3">Under applicable data protection laws, you have the right to:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 leading-relaxed">
                  <li>Access the personal data we hold about you (if any)</li>
                  <li>Request correction of inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Opt out of marketing communications</li>
                  <li>Withdraw consent to data processing at any time</li>
                </ul>
                <p className="text-gray-600 leading-relaxed mt-3">To exercise any of these rights, contact us at: <a href="mailto:aljarawneh@gmail.com" className="text-green-700 hover:underline">aljarawneh@gmail.com</a></p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Data Security</h2>
                <p className="text-gray-600 leading-relaxed">
                  We implement reasonable technical and organizational security measures to protect your data from unauthorized access, disclosure, alteration, or destruction. However, no method of internet transmission or electronic storage is 100% secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Children</h2>
                <p className="text-gray-600 leading-relaxed">
                  Our app is suitable for all ages. We do not knowingly collect personal data from children under 13. If we discover we have collected information from a child under 13 without parental consent, we will delete it immediately.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to This Policy</h2>
                <p className="text-gray-600 leading-relaxed">
                  We may update this Privacy Policy periodically. Updates will be posted on this page with a new effective date. We encourage you to review this page regularly. Continued use of the app after changes constitutes acceptance of the updated policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Us</h2>
                <p className="text-gray-600 leading-relaxed mb-3">
                  For any questions, concerns, or requests related to this Privacy Policy:
                </p>
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
