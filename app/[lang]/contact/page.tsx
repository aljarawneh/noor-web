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
    ? "تواصل معنا — نور الإسلام"
    : "Contact Us — Noor Al Islam";
  const description = isAr
    ? "تواصل مع فريق نور الإسلام لأي استفسارات، اقتراحات، أو مشاكل تقنية. نحن هنا للمساعدة."
    : "Contact the Noor Al Islam team for any questions, suggestions, or technical issues. We are here to help.";
  return {
    title,
    description,
    alternates: {
      canonical: `https://nooralisam.com/${lang}/contact`,
      languages: {
        en: "https://nooralisam.com/en/contact",
        ar: "https://nooralisam.com/ar/contact",
      },
    },
    openGraph: { title, description, type: "website", locale: isAr ? "ar_SA" : "en_US", url: `https://nooralisam.com/${lang}/contact` },
  };
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: rawLang } = await params;
  const lang = toLang(rawLang);
  const isAr = lang === "ar";

  return (
    <main className={`min-h-screen bg-white ${isAr ? "text-right" : ""}`} dir={isAr ? "rtl" : "ltr"}>
      {/* Hero */}
      <section className="bg-gray-950 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {isAr ? "تواصل معنا" : "Contact Us"}
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
            {isAr
              ? "نسعد بسماع آرائك ومقترحاتك. تواصل معنا عبر البريد الإلكتروني أو نموذج التواصل أدناه."
              : "We love hearing from you. Reach out via email or the contact form below — we typically respond within 1–2 business days."}
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {isAr ? "معلومات التواصل" : "Get in Touch"}
              </h2>
              <div className="space-y-5">
                <div className={`flex items-start gap-4 ${isAr ? "flex-row-reverse" : ""}`}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-xl"
                    style={{ background: "#F0FDF4" }}>
                    ✉️
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">{isAr ? "البريد الإلكتروني" : "Email"}</p>
                    <a href="mailto:aljarawneh@gmail.com" className="text-green-700 hover:underline text-sm">
                      aljarawneh@gmail.com
                    </a>
                    <p className="text-xs text-gray-400 mt-1">
                      {isAr ? "نرد في غضون 1-2 يوم عمل" : "We reply within 1–2 business days"}
                    </p>
                  </div>
                </div>

                <div className={`flex items-start gap-4 ${isAr ? "flex-row-reverse" : ""}`}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-xl"
                    style={{ background: "#F0FDF4" }}>
                    🏢
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">{isAr ? "الشركة" : "Company"}</p>
                    <p className="text-gray-600 text-sm">Datos Solutions</p>
                    <p className="text-gray-400 text-xs">{isAr ? "الأردن، عمّان" : "Amman, Jordan"}</p>
                  </div>
                </div>

                <div className={`flex items-start gap-4 ${isAr ? "flex-row-reverse" : ""}`}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-xl"
                    style={{ background: "#F0FDF4" }}>
                    📱
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">{isAr ? "تابعنا على" : "Follow Us"}</p>
                    <div className="flex flex-col gap-2">
                      <a
                        href="https://www.instagram.com/datos.solutions"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-pink-600 transition-colors"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                        </svg>
                        Instagram
                      </a>
                      <a
                        href="https://www.linkedin.com/company/datos-solutions"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-700 transition-colors"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        LinkedIn
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                {isAr ? "أسئلة شائعة" : "Common Questions"}
              </h3>
              <div className="space-y-3">
                {[
                  {
                    qEn: "How do I report a bug?",
                    qAr: "كيف أبلّغ عن خطأ في التطبيق؟",
                    aEn: "Email us with your device model, OS version, and a description of the issue.",
                    aAr: "أرسل لنا بريداً إلكترونياً يتضمن نوع جهازك وإصدار نظام التشغيل ووصف المشكلة.",
                  },
                  {
                    qEn: "Can I suggest a new feature?",
                    qAr: "هل يمكنني اقتراح ميزة جديدة؟",
                    aEn: "Absolutely — we build what our users need. Send us your ideas!",
                    aAr: "بالتأكيد — نبني ما يحتاجه مستخدمونا. أرسل لنا أفكارك!",
                  },
                  {
                    qEn: "I have a privacy concern.",
                    qAr: "لديّ استفسار عن الخصوصية.",
                    aEn: "We take privacy seriously. Email us and we will respond within 48 hours.",
                    aAr: "نأخذ الخصوصية بجدية. راسلنا وسنرد في غضون 48 ساعة.",
                  },
                ].map((faq) => (
                  <div key={faq.qEn} className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                    <p className="font-semibold text-gray-900 text-sm mb-1">{isAr ? faq.qAr : faq.qEn}</p>
                    <p className="text-gray-500 text-sm">{isAr ? faq.aAr : faq.aEn}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {isAr ? "أرسل رسالة" : "Send a Message"}
            </h2>
            <form
              action="mailto:aljarawneh@gmail.com"
              method="post"
              encType="text/plain"
              className="space-y-5"
            >
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  {isAr ? "الاسم" : "Full Name"} *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder={isAr ? "أدخل اسمك" : "Enter your full name"}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 text-sm"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  {isAr ? "البريد الإلكتروني" : "Email Address"} *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder={isAr ? "أدخل بريدك الإلكتروني" : "Enter your email address"}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 text-sm"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  {isAr ? "الموضوع" : "Subject"} *
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 text-sm bg-white"
                >
                  <option value="">{isAr ? "اختر الموضوع" : "Select a subject"}</option>
                  <option value="bug">{isAr ? "الإبلاغ عن خطأ" : "Report a Bug"}</option>
                  <option value="feature">{isAr ? "اقتراح ميزة" : "Feature Request"}</option>
                  <option value="privacy">{isAr ? "استفسار عن الخصوصية" : "Privacy Question"}</option>
                  <option value="partnership">{isAr ? "شراكة أو تعاون" : "Partnership / Collaboration"}</option>
                  <option value="other">{isAr ? "أخرى" : "Other"}</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  {isAr ? "الرسالة" : "Message"} *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  placeholder={isAr ? "اكتب رسالتك هنا..." : "Write your message here..."}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 text-sm resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl font-bold text-white text-sm hover:opacity-90 transition-opacity"
                style={{ background: "#1B5E20" }}
              >
                {isAr ? "إرسال الرسالة" : "Send Message"}
              </button>
              <p className="text-xs text-gray-400 text-center">
                {isAr
                  ? "سيفتح هذا النموذج تطبيق البريد الإلكتروني لديك لإرسال الرسالة."
                  : "This form will open your email client to send the message."}
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
