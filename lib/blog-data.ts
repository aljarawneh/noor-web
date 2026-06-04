export interface BlogPost {
  slug: string;
  titleEn: string;
  titleAr: string;
  excerptEn: string;
  excerptAr: string;
  contentEn: string;
  contentAr: string;
  date: string;
  readTime: number;
  category: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-calculate-zakat",
    titleEn: "How to Calculate Zakat: A Complete Step-by-Step Guide",
    titleAr: "كيفية حساب الزكاة: دليل شامل خطوة بخطوة",
    excerptEn: "Learn how to accurately calculate Zakat on gold, silver, cash, and business assets using the nisab threshold and the 2.5% formula.",
    excerptAr: "تعرّف على كيفية حساب الزكاة بدقة على الذهب والفضة والنقود وأصول الأعمال باستخدام نصاب الزكاة وصيغة 2.5%.",
    date: "2026-01-15",
    readTime: 7,
    category: "Zakat",
    contentEn: `<h2>What Is Zakat?</h2>
<p>Zakat is one of the Five Pillars of Islam — a mandatory annual charitable contribution paid by eligible Muslims. It is not optional; it is an obligation for every Muslim who possesses wealth above the <strong>nisab</strong> threshold for one full lunar year. The word "Zakat" in Arabic means purification and growth, reflecting how giving purifies your wealth and earns Allah's blessings.</p>

<h2>Who Must Pay Zakat?</h2>
<p>Zakat is obligatory on every adult Muslim who:</p>
<ul>
<li>Is free (not enslaved)</li>
<li>Possesses wealth equal to or greater than the nisab</li>
<li>Has owned this wealth for a full lunar year (hawl)</li>
<li>The wealth is surplus — beyond personal needs and debts</li>
</ul>

<h2>What Is the Nisab?</h2>
<p>The nisab is the minimum amount of wealth a Muslim must possess before Zakat becomes obligatory. It is based on two standards:</p>
<ul>
<li><strong>Gold Nisab:</strong> 87.48 grams of gold. As of 2026, with gold approximately $90 USD per gram, this equals roughly $7,900 USD.</li>
<li><strong>Silver Nisab:</strong> 612.36 grams of silver. With silver around $1 per gram, this is approximately $612 USD.</li>
</ul>
<p>Many scholars today recommend using the silver nisab because it is lower and therefore more inclusive, ensuring more people contribute to the community. However, both standards are valid, and you should choose based on your madhab (school of Islamic jurisprudence).</p>

<h2>The Zakat Rate</h2>
<p>The rate of Zakat is <strong>2.5%</strong> of your total zakatable wealth. This applies to cash, gold, silver, business inventory, and investment assets. For agricultural produce and mining, different rates apply — typically 5% or 10% depending on irrigation method.</p>

<h2>Assets Subject to Zakat</h2>
<ul>
<li><strong>Gold and Silver:</strong> All jewelry held as investment or savings (scholarly debate exists for personal-use jewelry; follow your madhab).</li>
<li><strong>Cash and Bank Deposits:</strong> All liquid cash, savings accounts, and money market accounts.</li>
<li><strong>Business Inventory:</strong> Goods held for sale at their market value.</li>
<li><strong>Investments:</strong> Stocks, mutual funds, and investment accounts at market value.</li>
<li><strong>Receivable Debts:</strong> Money owed to you that you expect to collect.</li>
</ul>

<h2>Assets NOT Subject to Zakat</h2>
<ul>
<li>Your primary home</li>
<li>Personal vehicle(s) used for daily transportation</li>
<li>Household furniture and appliances</li>
<li>Tools and equipment used in your trade or profession</li>
</ul>

<h2>Step-by-Step Zakat Calculation</h2>
<p>Here is a simple formula to calculate your Zakat:</p>
<ul>
<li><strong>Step 1:</strong> List all your zakatable assets (cash + gold + silver + investments + receivables + inventory).</li>
<li><strong>Step 2:</strong> Subtract any immediate debts and liabilities due within the year.</li>
<li><strong>Step 3:</strong> Check if your net wealth equals or exceeds the nisab.</li>
<li><strong>Step 4:</strong> If yes, multiply your net zakatable wealth by 0.025 (2.5%).</li>
</ul>

<p><strong>Example:</strong> You have $20,000 cash, $5,000 in investments, $2,000 worth of gold jewelry, and owe $3,000 on a credit card. Your zakatable wealth = $20,000 + $5,000 + $2,000 − $3,000 = $24,000. Your Zakat = $24,000 × 2.5% = <strong>$600</strong>.</p>

<h2>When to Pay Zakat</h2>
<p>Zakat is due once a full lunar year (hawl) has passed on your wealth reaching the nisab. Many Muslims choose Ramadan to pay their Zakat because the rewards of charity are multiplied in the blessed month. You can use the Zakat calculator in the Noor Al Islam app to determine your exact amount based on current gold and silver prices.</p>`,

    contentAr: `<h2>ما هي الزكاة؟</h2>
<p>الزكاة هي الركن الثالث من أركان الإسلام الخمسة — وهي فريضة سنوية واجبة على كل مسلم يملك ما يزيد على <strong>النصاب</strong> لمدة حول هجري كامل. وكلمة "زكاة" في اللغة تعني التطهير والنماء، مما يعكس كيف أن العطاء يطهّر المال ويجلب بركة الله.</p>

<h2>من يجب عليه أداء الزكاة؟</h2>
<p>تجب الزكاة على كل مسلم بالغ يتوفر فيه ما يلي:</p>
<ul>
<li>أن يكون حراً</li>
<li>أن يملك مالاً يساوي النصاب أو يزيد عليه</li>
<li>أن يكون الحول قد مرّ على امتلاك هذا المال</li>
<li>أن يكون المال فائضاً عن حاجته الأساسية وديونه</li>
</ul>

<h2>ما هو النصاب؟</h2>
<p>النصاب هو الحد الأدنى من الثروة الذي يجب بلوغه لتصبح الزكاة واجبة، ويقاس بمعيارين:</p>
<ul>
<li><strong>نصاب الذهب:</strong> 87.48 غراماً من الذهب، وهو ما يعادل نحو 7,900 دولار بأسعار عام 2026.</li>
<li><strong>نصاب الفضة:</strong> 612.36 غراماً من الفضة، وهو ما يعادل نحو 612 دولاراً.</li>
</ul>
<p>يوصي كثير من العلماء اليوم باستخدام نصاب الفضة لأنه أقل قيمة وبالتالي يشمل عدداً أكبر من المسلمين في أداء هذه الفريضة.</p>

<h2>نسبة الزكاة</h2>
<p>نسبة الزكاة الواجبة هي <strong>2.5%</strong> من إجمالي الأموال الزكوية، وتطبّق على النقود والذهب والفضة وعروض التجارة والأصول الاستثمارية.</p>

<h2>الأموال التي تجب فيها الزكاة</h2>
<ul>
<li><strong>الذهب والفضة:</strong> كل ما يُحتفظ به للادخار أو الاستثمار.</li>
<li><strong>النقود والودائع البنكية:</strong> جميع الأموال السائلة وحسابات التوفير.</li>
<li><strong>عروض التجارة:</strong> البضائع المعدّة للبيع بقيمتها السوقية.</li>
<li><strong>الأسهم والاستثمارات:</strong> بقيمتها السوقية وقت الحول.</li>
<li><strong>الديون المستحقة:</strong> الأموال التي يتوقع المسلم تحصيلها.</li>
</ul>

<h2>الأموال التي لا تجب فيها الزكاة</h2>
<ul>
<li>مسكن الإقامة الرئيسي</li>
<li>سيارة الاستخدام الشخصي اليومي</li>
<li>الأثاث والأجهزة المنزلية</li>
<li>الأدوات والمعدات المهنية</li>
</ul>

<h2>خطوات حساب الزكاة</h2>
<ul>
<li><strong>الخطوة 1:</strong> أحصِ جميع أموالك الزكوية (نقود + ذهب + فضة + استثمارات + ديون مستحقة + بضائع).</li>
<li><strong>الخطوة 2:</strong> اطرح الديون الحالة المطلوبة منك خلال العام.</li>
<li><strong>الخطوة 3:</strong> تحقق مما إذا كان صافي ثروتك يساوي النصاب أو يزيد عليه.</li>
<li><strong>الخطوة 4:</strong> إذا كان الأمر كذلك، اضرب صافي ثروتك في 0.025 (2.5%).</li>
</ul>
<p><strong>مثال:</strong> لديك 20,000 دولار نقداً، و5,000 دولار في استثمارات، و2,000 دولار ذهباً، وعليك دين 3,000 دولار. ثروتك الزكوية = 24,000 دولار. زكاتك = <strong>600 دولار</strong>.</p>`,
  },

  {
    slug: "five-daily-prayers-guide",
    titleEn: "The Five Daily Prayers: Times, Importance, and How to Perform Them",
    titleAr: "الصلوات الخمس: أوقاتها وأهميتها وكيفية أدائها",
    excerptEn: "A complete guide to Salah — the five obligatory daily prayers in Islam, including their times, number of rakaat, and spiritual significance.",
    excerptAr: "دليل شامل للصلاة — الصلوات الخمس الواجبة في الإسلام، بما في ذلك أوقاتها وعدد ركعاتها وأهميتها الروحية.",
    date: "2026-01-22",
    readTime: 8,
    category: "Prayer",
    contentEn: `<h2>Why Prayer Is the Pillar of Islam</h2>
<p>Salah (prayer) is the second pillar of Islam and is described by the Prophet Muhammad ﷺ as "the pillar of the religion." It is the direct connection between a Muslim and Allah — a conversation held five times every day without any intermediary. The Prophet ﷺ said: <strong>"The difference between a man and disbelief is abandoning the prayer."</strong> (Sahih Muslim)</p>
<p>Prayer was made obligatory on the Night of Isra and Mi'raj, when Allah directly prescribed it to the Prophet ﷺ during his miraculous night journey to the heavens. Originally fifty prayers per day were prescribed, but through Moses' counsel and the Prophet's return to Allah, it was reduced to five — yet carrying the reward of fifty.</p>

<h2>The Five Daily Prayers and Their Times</h2>
<ul>
<li><strong>Fajr (Dawn Prayer):</strong> Begins at true dawn (when the first light appears on the horizon) and ends at sunrise. It consists of 2 Fardh (obligatory) rakaat.</li>
<li><strong>Dhuhr (Noon Prayer):</strong> Begins when the sun passes its zenith (midday) and ends when the shadow of an object equals its length. It consists of 4 Fardh rakaat.</li>
<li><strong>Asr (Afternoon Prayer):</strong> Begins when the shadow equals the object's length (or double, depending on the madhab) and ends at sunset. It consists of 4 Fardh rakaat.</li>
<li><strong>Maghrib (Sunset Prayer):</strong> Begins immediately after sunset and ends when the red twilight disappears. It consists of 3 Fardh rakaat.</li>
<li><strong>Isha (Night Prayer):</strong> Begins when the red twilight disappears and ends at midnight (or Fajr in necessity). It consists of 4 Fardh rakaat.</li>
</ul>

<h2>Conditions for Valid Prayer</h2>
<p>Before beginning your prayer, ensure the following conditions are met:</p>
<ul>
<li><strong>Purity (Taharah):</strong> Perform Wudu (ablution) if you are in a state of minor impurity, or Ghusl (ritual bath) for major impurity.</li>
<li><strong>Clean body, clothing, and prayer area.</strong></li>
<li><strong>Covered Awrah:</strong> Men must cover from navel to knee; women must cover everything except the face and hands.</li>
<li><strong>Facing Qibla:</strong> Face the direction of the Kaaba in Mecca.</li>
<li><strong>Correct prayer time:</strong> Pray within the designated time window.</li>
<li><strong>Niyyah (Intention):</strong> Make a sincere intention in your heart to pray the specific prayer.</li>
</ul>

<h2>Structure of a Rakaat (Unit of Prayer)</h2>
<p>Each prayer is made up of rakaat (units). Here is what happens in each rakaat:</p>
<ul>
<li><strong>Takbir al-Ihram:</strong> Raise your hands to the earlobes and say "Allahu Akbar" to enter the prayer.</li>
<li><strong>Qiyam (Standing):</strong> Recite Surah Al-Fatiha, then any additional surah.</li>
<li><strong>Ruku (Bowing):</strong> Bow with your back parallel to the floor, saying "Subhana Rabbiyal Adheem" three times.</li>
<li><strong>I'tidal (Rising from Ruku):</strong> Stand upright and say "Sami'a Allahu liman Hamidah, Rabbana wa lakal Hamd."</li>
<li><strong>Sujud (Prostration):</strong> Prostrate with seven body parts touching the ground — forehead, nose, both palms, both knees, and toes — saying "Subhana Rabbiyal A'la" three times.</li>
<li><strong>Sitting between prostrations:</strong> Sit briefly between the two Sujaoud.</li>
<li><strong>Second Sujud:</strong> Repeat the prostration.</li>
</ul>

<h2>The Spiritual Significance of Prayer</h2>
<p>Prayer is not merely a ritual — it is a comprehensive spiritual, physical, and mental practice. When a Muslim stands in Salah, they engage in remembrance of Allah (dhikr), supplication (dua), recitation of the Quran, and physical movement. The five prayers spread throughout the day ensure that a Muslim returns to Allah's remembrance regularly, preventing the heart from hardening.</p>
<p>The Quran says: <strong>"Verily, prayer keeps one away from great sins and evil deeds."</strong> (Al-Ankabut 29:45)</p>
<p>Use the Noor Al Islam app to get precise prayer times based on your GPS location, wherever you are in the world.</p>`,

    contentAr: `<h2>لماذا الصلاة عماد الدين؟</h2>
<p>الصلاة هي الركن الثاني من أركان الإسلام، ووصفها النبي محمد ﷺ بأنها "عماد الدين". وهي الصلة المباشرة بين المسلم وربه — حديث يجري خمس مرات كل يوم بلا وسيط. قال النبي ﷺ: <strong>"بين الرجل وبين الكفر والشرك ترك الصلاة."</strong> (صحيح مسلم)</p>
<p>فُرضت الصلاة ليلة الإسراء والمعراج، حين خاطب الله نبيّه ﷺ مباشرة في السماء. وكانت خمسين صلاة ابتداءً، وبتوجيه من سيدنا موسى عليه السلام ورجوع النبي ﷺ إلى ربه، خُففت إلى خمس بأجر الخمسين.</p>

<h2>الصلوات الخمس وأوقاتها</h2>
<ul>
<li><strong>الفجر:</strong> يبدأ وقتها من طلوع الفجر الصادق وينتهي بطلوع الشمس. عدد ركعاتها: 2 فرض.</li>
<li><strong>الظهر:</strong> يبدأ وقتها بعد زوال الشمس وينتهي حين يساوي الظل المثل. عدد ركعاتها: 4 فرض.</li>
<li><strong>العصر:</strong> يبدأ وقتها بعد الظهر وينتهي بغروب الشمس. عدد ركعاتها: 4 فرض.</li>
<li><strong>المغرب:</strong> يبدأ وقتها مباشرة بعد غروب الشمس وينتهي بانتهاء الشفق الأحمر. عدد ركعاتها: 3 فرض.</li>
<li><strong>العشاء:</strong> يبدأ وقتها بعد غياب الشفق وينتهي عند منتصف الليل أو الفجر عند الضرورة. عدد ركعاتها: 4 فرض.</li>
</ul>

<h2>شروط صحة الصلاة</h2>
<ul>
<li><strong>الطهارة:</strong> الوضوء للحدث الأصغر، والغسل للحدث الأكبر.</li>
<li><strong>طهارة البدن والثوب والمكان.</strong></li>
<li><strong>ستر العورة:</strong> الرجل من السرة إلى الركبة، والمرأة جميع جسدها ما عدا الوجه والكفين.</li>
<li><strong>استقبال القبلة:</strong> التوجه نحو الكعبة المشرفة.</li>
<li><strong>دخول الوقت.</strong></li>
<li><strong>النية:</strong> استحضار نية الصلاة المعينة في القلب.</li>
</ul>

<h2>أركان الركعة الواحدة</h2>
<ul>
<li><strong>تكبيرة الإحرام:</strong> رفع اليدين إلى حذو الأذنين وقول "الله أكبر".</li>
<li><strong>القيام:</strong> قراءة سورة الفاتحة ثم سورة من القرآن.</li>
<li><strong>الركوع:</strong> الانحناء حتى يوازي الظهر الأرض مع قول "سبحان ربي العظيم" ثلاثاً.</li>
<li><strong>الاعتدال:</strong> الرفع من الركوع مع قول "سمع الله لمن حمده، ربنا ولك الحمد".</li>
<li><strong>السجود:</strong> السجود على الأعضاء السبعة مع قول "سبحان ربي الأعلى" ثلاثاً.</li>
<li><strong>الجلسة بين السجدتين.</strong></li>
<li><strong>السجدة الثانية.</strong></li>
</ul>

<h2>الأهمية الروحية للصلاة</h2>
<p>الصلاة ليست مجرد طقس — إنها ممارسة روحية وجسدية وعقلية شاملة. والصلوات الخمس الموزّعة على مدار اليوم تضمن عودة المسلم إلى ذكر الله بانتظام، فتحفظ القلب من القسوة. قال تعالى: <strong>"إِنَّ الصَّلَاةَ تَنْهَى عَنِ الْفَحْشَاءِ وَالْمُنكَرِ."</strong> (العنكبوت: 45)</p>
<p>استخدم تطبيق نور الإسلام للحصول على أوقات الصلاة الدقيقة بناءً على موقعك الجغرافي أينما كنت في العالم.</p>`,
  },

  {
    slug: "halal-investing-guide",
    titleEn: "Halal Investing: A Complete Guide to Islamic Finance and Ethical Investment",
    titleAr: "الاستثمار الحلال: دليل شامل للتمويل الإسلامي والاستثمار الأخلاقي",
    excerptEn: "Learn the principles of halal investing — what to avoid (riba, haram sectors), Shariah screening criteria, and how to build an ethical investment portfolio.",
    excerptAr: "تعرّف على مبادئ الاستثمار الحلال — ما يجب تجنبه (الربا، القطاعات المحرمة)، معايير الفرز الشرعي، وكيفية بناء محفظة استثمارية أخلاقية.",
    date: "2026-02-01",
    readTime: 9,
    category: "Finance",
    contentEn: `<h2>Introduction to Halal Investing</h2>
<p>Islam is a comprehensive way of life that guides its followers not only in worship but also in commerce and finance. The Quran explicitly forbids <strong>riba</strong> (interest/usury): <em>"Allah has permitted trade and forbidden riba."</em> (Al-Baqarah 2:275). Halal investing means building wealth through means that comply with Islamic law (Shariah) — avoiding prohibited industries and financial instruments while seeking honest, productive returns.</p>

<h2>The Core Prohibition: Riba (Interest)</h2>
<p>Riba is the most fundamental prohibition in Islamic finance. It refers to any guaranteed, pre-set return on money regardless of business outcomes. This includes:</p>
<ul>
<li>Bank interest (savings accounts, fixed deposits)</li>
<li>Bonds and conventional fixed-income instruments</li>
<li>Conventional mortgages and personal loans</li>
<li>Credit card interest</li>
</ul>
<p>Why is riba prohibited? Islam recognizes that money is not a commodity that can generate more money by itself — true profit comes from real economic activity, risk-sharing, and productive effort.</p>

<h2>Prohibited (Haram) Business Sectors</h2>
<p>Muslims must avoid investing in companies whose primary business involves:</p>
<ul>
<li><strong>Alcohol production or distribution</strong></li>
<li><strong>Conventional banking and insurance</strong> (interest-based)</li>
<li><strong>Gambling and casinos</strong></li>
<li><strong>Pork products</strong> (processing, distribution)</li>
<li><strong>Weapons and defense</strong> (controversial weapons)</li>
<li><strong>Tobacco and narcotics</strong></li>
<li><strong>Adult entertainment</strong></li>
</ul>

<h2>Shariah Screening Criteria</h2>
<p>Islamic finance scholars have developed screening criteria to evaluate whether a company's stock is acceptable for Muslim investors. Screening happens at two levels:</p>
<p><strong>1. Business Activity Screen:</strong> The company's core business must not be from a prohibited sector. Companies with small, incidental revenue from haram activities (e.g., a hotel chain with a bar) may be acceptable if haram revenue is below 5% of total revenue.</p>
<p><strong>2. Financial Ratio Screen:</strong> Even if the business activity is permissible, the company's financial structure must meet certain thresholds:</p>
<ul>
<li>Debt-to-assets ratio below 33% (to limit excessive leverage/riba)</li>
<li>Interest income below 5% of total revenue</li>
<li>Receivables-to-total-assets below 45-49%</li>
</ul>

<h2>Halal Investment Options</h2>
<ul>
<li><strong>Halal Stocks:</strong> Shares of Shariah-compliant companies screened by AAOIFI, Dow Jones Islamic Market Index, or MSCI Islamic Index.</li>
<li><strong>Sukuk (Islamic Bonds):</strong> Asset-backed securities that represent ownership in an asset or project, rather than a debt obligation. Returns are generated from the asset, not interest.</li>
<li><strong>Islamic REITs:</strong> Real estate investment trusts structured to be Shariah-compliant.</li>
<li><strong>Islamic Mutual Funds / ETFs:</strong> Pooled funds that only invest in Shariah-screened securities.</li>
<li><strong>Murabaha / Ijara Financing:</strong> Islamic home and auto financing structures based on cost-plus sale or leasing, not interest.</li>
<li><strong>Gold and Silver:</strong> Physical precious metals are a historically accepted halal store of value.</li>
</ul>

<h2>Practical Steps to Start Halal Investing</h2>
<ul>
<li>Check if your country has Islamic banks or Shariah-compliant brokerage accounts.</li>
<li>Use screeners like Zoya, Islamicly, or the Noor Al Islam finance feature to check individual stocks.</li>
<li>Diversify across halal sectors: technology, healthcare, consumer goods, infrastructure.</li>
<li>Purify any incidental haram income by donating the proportional amount to charity.</li>
<li>Consult a qualified Islamic finance scholar for complex situations.</li>
</ul>

<h2>Conclusion</h2>
<p>Halal investing is not about limiting your wealth — it is about growing it through honest, ethical, and productive means that align with your faith. With the growing global Islamic finance industry (now exceeding $3 trillion in assets), there are more halal investment options available than ever before. The Noor Al Islam app's Islamic Finance Screener helps you evaluate stocks and investment opportunities according to Shariah principles, making ethical investing accessible to every Muslim.</p>`,

    contentAr: `<h2>مقدمة في الاستثمار الحلال</h2>
<p>الإسلام منهج حياة شامل يُرشد المسلم في كل شؤون حياته بما فيها التجارة والمال. وقد حرّم القرآن الكريم <strong>الربا</strong> صراحةً: <em>"وَأَحَلَّ اللَّهُ الْبَيْعَ وَحَرَّمَ الرِّبَا."</em> (البقرة: 275). والاستثمار الحلال يعني بناء الثروة عبر وسائل متوافقة مع أحكام الشريعة الإسلامية — بتجنب الصناعات المحرمة والأدوات المالية غير الشرعية، مع السعي لتحقيق عوائد مشروعة منتجة.</p>

<h2>المحرّم الأساسي: الربا</h2>
<p>الربا هو أشد المحرمات في التمويل الإسلامي. ويشمل كل عائد مضمون محدد مسبقاً على المال بصرف النظر عن نتائج النشاط التجاري، مثل:</p>
<ul>
<li>فوائد البنوك على الودائع والقروض</li>
<li>السندات والأدوات ذات الدخل الثابت التقليدية</li>
<li>الرهن العقاري والقروض الشخصية التقليدية</li>
<li>فوائد بطاقات الائتمان</li>
</ul>

<h2>القطاعات المحرمة للاستثمار</h2>
<ul>
<li><strong>إنتاج الكحول وتوزيعه</strong></li>
<li><strong>البنوك والتأمين التقليدي</strong> (القائمة على الفائدة)</li>
<li><strong>القمار والكازينوهات</strong></li>
<li><strong>منتجات الخنزير</strong></li>
<li><strong>التبغ والمخدرات</strong></li>
<li><strong>الترفيه المحرم</strong></li>
</ul>

<h2>معايير الفرز الشرعي</h2>
<p>طوّر علماء التمويل الإسلامي معايير لتقييم مدى قبول أسهم الشركات للمستثمرين المسلمين، وتتم على مستويين:</p>
<p><strong>1. فرز النشاط التجاري:</strong> يجب أن يكون النشاط الأساسي للشركة مشروعاً، مع إمكانية قبول الإيرادات العرضية المحرمة إذا كانت أقل من 5% من إجمالي الإيرادات.</p>
<p><strong>2. فرز النسب المالية:</strong></p>
<ul>
<li>نسبة الديون إلى الأصول أقل من 33%</li>
<li>إيرادات الفوائد أقل من 5% من إجمالي الإيرادات</li>
<li>المستحقات إلى إجمالي الأصول أقل من 49%</li>
</ul>

<h2>خيارات الاستثمار الحلال</h2>
<ul>
<li><strong>الأسهم الحلال:</strong> أسهم الشركات المتوافقة مع الشريعة والمدرجة في مؤشرات إسلامية.</li>
<li><strong>الصكوك:</strong> أوراق مالية مدعومة بأصول حقيقية تمثل حصة في ملكية مشروع أو أصل.</li>
<li><strong>صناديق الاستثمار العقاري الإسلامية.</strong></li>
<li><strong>صناديق الاستثمار والمؤشرات الإسلامية.</strong></li>
<li><strong>الذهب والفضة:</strong> مخزن للقيمة مقبول شرعاً منذ القدم.</li>
</ul>

<h2>خطوات عملية لبدء الاستثمار الحلال</h2>
<ul>
<li>ابحث عن البنوك الإسلامية وحسابات الوساطة المتوافقة مع الشريعة في بلدك.</li>
<li>استخدم ميزة فرز الأسهم الإسلامية في تطبيق نور الإسلام للتحقق من أسهم بعينها.</li>
<li>نوّع محفظتك في قطاعات حلال: التقنية، الرعاية الصحية، السلع الاستهلاكية.</li>
<li>تطهير العوائد العرضية المحرمة بالتبرع بالنسبة المقابلة منها للصدقة.</li>
</ul>`,
  },

  {
    slug: "quran-daily-reading-tips",
    titleEn: "How to Build a Daily Quran Reading Habit: Practical Tips That Stick",
    titleAr: "كيف تبني عادة قراءة القرآن يومياً: نصائح عملية تدوم",
    excerptEn: "Practical strategies to help you read the Quran every day — from setting a schedule to understanding the meaning and staying consistent.",
    excerptAr: "استراتيجيات عملية تساعدك على قراءة القرآن كل يوم — من تحديد الجدول الزمني إلى فهم المعنى والمداومة على ذلك.",
    date: "2026-02-10",
    readTime: 6,
    category: "Quran",
    contentEn: `<h2>Why Daily Quran Reading Matters</h2>
<p>The Quran is the word of Allah — the greatest book ever given to humanity. The Prophet Muhammad ﷺ said: <strong>"The best among you are those who learn the Quran and teach it."</strong> (Sahih Bukhari). Yet despite this, many Muslims struggle to maintain a consistent reading habit. Life gets busy, motivation fades, and days pass without opening the Mushaf. If this sounds familiar, you are not alone — and there are tested strategies to help.</p>

<h2>Start Small: The Minimum Viable Daily Habit</h2>
<p>The biggest mistake Muslims make is setting an unrealistic goal like "I will read 5 pages every day" and then giving up after a week. Instead, start with just one page — or even just half a page. The Prophet ﷺ said: <strong>"The most beloved deeds to Allah are the most regular, even if they are few."</strong> (Sahih Bukhari)</p>
<p>One page per day = 600 pages = one complete Quran in approximately 20 months. That is infinitely better than zero. Once the habit is established, you can increase gradually.</p>

<h2>Attach Quran to an Existing Habit</h2>
<p>The most powerful way to build a new habit is to attach it to something you already do consistently. Here are proven attachment points:</p>
<ul>
<li><strong>After Fajr prayer:</strong> This is the most recommended time. The Quran of Fajr is witnessed (Al-Isra 17:78). Sit in your prayer spot after Fajr and read before the day starts.</li>
<li><strong>After Maghrib prayer:</strong> If Fajr is difficult, use the quiet evening time after Maghrib.</li>
<li><strong>Before sleeping:</strong> Read a small portion as your last conscious act each night.</li>
<li><strong>Lunch break:</strong> Even 5-10 minutes during a work break adds up.</li>
</ul>

<h2>Understand What You Read</h2>
<p>One of the biggest barriers to consistency is reading Arabic mechanically without understanding. The Quran was revealed to be pondered and reflected upon. Here is how to engage more deeply:</p>
<ul>
<li>Use a translation in your language alongside the Arabic text.</li>
<li>Read one page of Arabic followed by the translation of that page.</li>
<li>Reflect on one ayah per day — look up its tafsir (commentary) and write a reflection in a journal.</li>
<li>Use the Noor Al Islam Quran reader, which offers translation in multiple languages alongside the Arabic.</li>
</ul>

<h2>Use the Quran Reading Plans</h2>
<p>The Quran is divided into 30 Juz (parts), making it easy to plan a reading schedule:</p>
<ul>
<li><strong>Complete in 30 days:</strong> Read 1 Juz per day — about 20 pages.</li>
<li><strong>Complete in 60 days:</strong> Read half a Juz per day — about 10 pages.</li>
<li><strong>Complete in 3 months:</strong> Read 7 pages per day.</li>
<li><strong>Complete in 1 year:</strong> Read 2 pages per day.</li>
</ul>
<p>During Ramadan, many Muslims aim to complete the entire Quran once. For the rest of the year, a year-long plan with 2 pages per day is gentle and sustainable.</p>

<h2>Listen While You Read</h2>
<p>Listening to a reciter while following the text helps with tajweed (proper pronunciation) and keeps your mind from wandering. The Noor Al Islam app includes audio recitation by world-class reciters including Mishary Al-Afasy, Abdul Basit, and Al-Husary. Listen and follow along during your commute, exercise, or household chores.</p>

<h2>Track Your Progress and Stay Accountable</h2>
<ul>
<li>Use a Quran reading tracker — mark each page or surah you complete.</li>
<li>Find a reading partner (a spouse, sibling, or friend) and check in weekly.</li>
<li>Join a Quran circle (halaqah) at your local mosque.</li>
<li>Celebrate milestones — completing a Juz, a quarter of the Quran, or a full khatm (completion).</li>
</ul>

<h2>When You Miss a Day</h2>
<p>Missing a day is not failure — giving up after missing a day is. The Shaitan loves to whisper: "You missed yesterday, so why bother today?" Ignore this whisper. Simply pick up where you left off. Your relationship with the Quran is lifelong, and every letter you read earns ten hasanat (good deeds). Never let a day become a week.</p>`,

    contentAr: `<h2>لماذا تهم قراءة القرآن يومياً؟</h2>
<p>القرآن كلام الله — أعظم كتاب أُنزل على البشرية. قال النبي ﷺ: <strong>"خيركم من تعلّم القرآن وعلّمه."</strong> (صحيح البخاري). ومع ذلك يجد كثير من المسلمين صعوبة في المواظبة على التلاوة اليومية. تنشغل الحياة، وتتلاشى الهمة، وتمر الأيام دون فتح المصحف. إن كنت تشعر بهذا فأنت لست وحدك — وثمة استراتيجيات مجربة تساعدك.</p>

<h2>ابدأ صغيراً: الحد الأدنى للعادة اليومية</h2>
<p>أكبر خطأ يقع فيه المسلمون هو تحديد هدف غير واقعي كـ"سأقرأ 5 صفحات يومياً" ثم التخلي بعد أسبوع. بدلاً من ذلك، ابدأ بصفحة واحدة أو حتى نصف صفحة. قال النبي ﷺ: <strong>"أحب الأعمال إلى الله أدومها وإن قل."</strong> (صحيح البخاري)</p>
<p>صفحة واحدة يومياً = ختم كامل في نحو 20 شهراً. وهذا لا نهاية له أفضل من الصفر.</p>

<h2>اربط القرآن بعادة قائمة</h2>
<ul>
<li><strong>بعد صلاة الفجر:</strong> الوقت الأمثل الموصى به. اجلس في مصلاك بعد الفجر واقرأ قبل أن يبدأ اليوم.</li>
<li><strong>بعد صلاة المغرب:</strong> إن كان الفجر صعباً، استغل هدوء المساء.</li>
<li><strong>قبل النوم:</strong> اجعل القراءة آخر عمل واعٍ قبل النوم.</li>
<li><strong>استراحة الغداء:</strong> حتى 5-10 دقائق يومياً تتراكم وتُثمر.</li>
</ul>

<h2>افهم ما تقرأ</h2>
<ul>
<li>استخدم ترجمة بلغتك بجانب النص العربي.</li>
<li>اقرأ صفحة عربية ثم قرأ ترجمتها.</li>
<li>تأمّل في آية واحدة يومياً وابحث عن تفسيرها.</li>
<li>استخدم تطبيق نور الإسلام الذي يوفر الترجمة بعدة لغات مع النص العربي.</li>
</ul>

<h2>خطط القراءة المقترحة</h2>
<ul>
<li><strong>ختم في 30 يوماً:</strong> جزء واحد يومياً (20 صفحة تقريباً).</li>
<li><strong>ختم في 60 يوماً:</strong> نصف جزء يومياً.</li>
<li><strong>ختم في 3 أشهر:</strong> 7 صفحات يومياً.</li>
<li><strong>ختم في سنة:</strong> صفحتان يومياً — مريح ومستدام.</li>
</ul>

<h2>استمع أثناء القراءة</h2>
<p>الاستماع إلى قارئ أثناء متابعة النص يعين على الإتقان ويمنع تشتت الذهن. يتضمن تطبيق نور الإسلام تلاوات لكبار القراء كمشاري العفاسي وعبد الباسط عبد الصمد والحصري.</p>

<h2>عندما تفوتك يوم</h2>
<p>فوات يوم ليس فشلاً — الفشل هو الاستسلام. لا تدع يوماً يتحول إلى أسبوع. كل حرف تقرأه كُتبت لك عشر حسنات، فلا تحرم نفسك من هذا الخير.</p>`,
  },

  {
    slug: "what-is-adhkar",
    titleEn: "What Are Adhkar? The Power of Morning and Evening Remembrance",
    titleAr: "ما هي الأذكار؟ قوة الأذكار الصباحية والمسائية",
    excerptEn: "Discover the meaning of Adhkar, the importance of morning and evening dhikr, and the most common phrases every Muslim should know.",
    excerptAr: "اكتشف معنى الأذكار، وأهمية الأذكار الصباحية والمسائية، والعبارات الأكثر شيوعاً التي يجب على كل مسلم معرفتها.",
    date: "2026-02-20",
    readTime: 6,
    category: "Spirituality",
    contentEn: `<h2>What Does "Dhikr" Mean?</h2>
<p>The Arabic word <strong>dhikr</strong> (ذِكر) means remembrance — specifically, the remembrance of Allah. The plural form, <strong>adhkar</strong> (أذكار), refers to the specific phrases, prayers, and supplications prescribed by the Prophet Muhammad ﷺ for various times and occasions. Adhkar range from a simple "SubhanAllah" whispered during your commute to the structured morning and evening routines that spiritually fortify a Muslim's entire day.</p>
<p>Allah says in the Quran: <strong>"Verily, in the remembrance of Allah do hearts find rest."</strong> (Ar-Ra'd 13:28). This verse captures the essence of dhikr — it is not merely a verbal exercise but a source of deep inner peace and spiritual grounding.</p>

<h2>Morning Adhkar: Starting the Day Right</h2>
<p>The morning adhkar are recited after Fajr prayer until sunrise (or within the first portion of the morning). They serve as spiritual armor for the day ahead. Key morning adhkar include:</p>
<ul>
<li><strong>Ayat al-Kursi (2:255):</strong> Recited once — it is one of the greatest verses in the Quran and provides protection throughout the day.</li>
<li><strong>Surah Al-Ikhlas, Al-Falaq, and An-Nas:</strong> Recited 3 times each in the morning. The Prophet ﷺ said they suffice against everything.</li>
<li><strong>"SubhanAllahi wa bihamdihi"</strong> — 100 times: "Glory and praise be to Allah." The Prophet ﷺ said: "Whoever says this 100 times in the morning, his sins are forgiven even if they are like the foam of the sea." (Sahih Bukhari)</li>
<li><strong>Seeking Allah's forgiveness (istighfar):</strong> "Astaghfirullaha wa atubu ilayh" — 100 times.</li>
<li><strong>The morning du'a:</strong> "Allahumma bika asbahna wa bika amsayna wa bika nahya wa bika namutu wa ilayka al-masir."</li>
</ul>

<h2>Evening Adhkar: Ending the Day in Peace</h2>
<p>Evening adhkar are recited after Asr prayer until sunset (or until sleeping). They mirror the morning adhkar and complete the spiritual cycle of the day:</p>
<ul>
<li><strong>Ayat al-Kursi</strong> — once</li>
<li><strong>Surah Al-Ikhlas, Al-Falaq, An-Nas</strong> — 3 times each</li>
<li><strong>Sayyidul Istighfar (Master supplication for forgiveness):</strong> "Allahumma anta Rabbi la ilaha illa anta, khalaqtani wa ana abduka..." The Prophet ﷺ said: "Whoever says this with certainty in the evening and dies that night will enter Paradise." (Sahih Bukhari)</li>
<li><strong>"La ilaha illa Allahu wahdahu la sharika lah"</strong> — 100 times</li>
</ul>

<h2>Other Essential Daily Adhkar</h2>
<ul>
<li><strong>After each prayer:</strong> SubhanAllah (33x), Alhamdulillah (33x), Allahu Akbar (33x), and La ilaha illa Allah wahdahu la sharika lah... (1x).</li>
<li><strong>Before sleeping:</strong> Ayat al-Kursi, the last two verses of Al-Baqarah, and "Bismika Allahumma amutu wa ahya."</li>
<li><strong>When entering/leaving the home, before eating, before wudu</strong> — each has its specific du'a.</li>
</ul>

<h2>The Spiritual Benefits of Adhkar</h2>
<p>Regular dhikr transforms your relationship with Allah from a distant, weekly-worship connection to a living, breathing, moment-by-moment intimacy. The benefits are both spiritual and psychological:</p>
<ul>
<li>Protection from Shaytan and evil influences</li>
<li>Expiation of sins</li>
<li>Inner tranquility and stress reduction</li>
<li>Gratitude and mindfulness cultivated throughout the day</li>
<li>Immense rewards — many individual adhkar carry rewards equivalent to freeing slaves or performing Hajj</li>
</ul>

<h2>How to Build an Adhkar Habit</h2>
<p>The Noor Al Islam app includes a comprehensive Adhkar section with morning, evening, and occasion-specific supplications in Arabic with transliteration and translation. Simply open the app after Fajr and Asr prayers and work through the adhkar list — it takes only 10-15 minutes and will become one of the most valuable habits in your day.</p>`,

    contentAr: `<h2>ما معنى "الذكر"؟</h2>
<p>كلمة <strong>ذِكر</strong> تعني استحضار الله في القلب واللسان. و<strong>الأذكار</strong> هي العبارات والأدعية والتسبيحات المأثورة عن النبي ﷺ في أوقات وأحوال مختلفة. قال الله تعالى: <strong>"أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ."</strong> (الرعد: 28).</p>

<h2>أذكار الصباح: افتتح يومك على خير</h2>
<p>تُقال أذكار الصباح بعد صلاة الفجر حتى طلوع الشمس. وتشمل:</p>
<ul>
<li><strong>آية الكرسي</strong> — مرة واحدة: حفظ من كل شيطان حتى يُمسي.</li>
<li><strong>سورة الإخلاص والفلق والناس</strong> — ثلاث مرات كل منها: تكفي من كل شيء.</li>
<li><strong>"سبحان الله وبحمده"</strong> — مئة مرة: من قالها صباحاً غُفرت ذنوبه ولو كانت مثل زبد البحر. (صحيح البخاري)</li>
<li><strong>الاستغفار</strong> — مئة مرة: "أستغفر الله وأتوب إليه."</li>
<li><strong>دعاء الصباح:</strong> "اللهم بك أصبحنا وبك أمسينا وبك نحيا وبك نموت وإليك المصير."</li>
</ul>

<h2>أذكار المساء: أختم يومك بسلام</h2>
<ul>
<li><strong>آية الكرسي</strong> — مرة واحدة.</li>
<li><strong>سور الإخلاص والفلق والناس</strong> — ثلاث مرات.</li>
<li><strong>سيد الاستغفار:</strong> "اللهم أنت ربي لا إله إلا أنت..." — من قاله موقناً فمات من ليلته دخل الجنة. (صحيح البخاري)</li>
<li><strong>"لا إله إلا الله وحده لا شريك له"</strong> — مئة مرة.</li>
</ul>

<h2>أذكار يومية أخرى</h2>
<ul>
<li><strong>بعد كل صلاة:</strong> سبحان الله (33)، الحمد لله (33)، الله أكبر (33)، ولا إله إلا الله وحده لا شريك له (1).</li>
<li><strong>قبل النوم:</strong> آية الكرسي، والآيتان الأخيرتان من البقرة، و"باسمك اللهم أموت وأحيا."</li>
<li><strong>عند الدخول والخروج، قبل الأكل، قبل الوضوء</strong> — لكل موقف دعاؤه المأثور.</li>
</ul>

<h2>الفوائد الروحية للأذكار</h2>
<ul>
<li>الحماية من الشيطان والأذى</li>
<li>تكفير الذنوب والخطايا</li>
<li>الطمأنينة الداخلية وتخفيف التوتر</li>
<li>تنمية الشكر واليقظة على مدار اليوم</li>
<li>ثواب عظيم — بعض الأذكار يعادل عتق رقاب أو أداء حج</li>
</ul>

<p>يتضمن تطبيق نور الإسلام قسماً شاملاً للأذكار الصباحية والمسائية وأذكار المناسبات بالعربية مع الترجمة والتشكيل. افتح التطبيق بعد الفجر والعصر وستجد قائمة الأذكار جاهزة — لن تستغرق منك أكثر من 10-15 دقيقة.</p>`,
  },

  {
    slug: "qibla-direction-explained",
    titleEn: "How to Find the Qibla Direction: GPS, Compass, and Online Tools",
    titleAr: "كيفية تحديد اتجاه القبلة: GPS والبوصلة والأدوات الرقمية",
    excerptEn: "Learn how to accurately find the Qibla direction using GPS technology, a compass, the sun and stars, and modern apps wherever you are in the world.",
    excerptAr: "تعرّف على كيفية تحديد اتجاه القبلة بدقة باستخدام تقنية GPS والبوصلة والشمس والنجوم والتطبيقات الحديثة أينما كنت في العالم.",
    date: "2026-03-01",
    readTime: 5,
    category: "Prayer",
    contentEn: `<h2>Why Qibla Direction Matters</h2>
<p>Facing the Qibla — the direction of the Kaaba in Mecca — is a required condition (shart) for the validity of Salah. The Quran commands: <strong>"So turn your face toward al-Masjid al-Haram."</strong> (Al-Baqarah 2:144). Every Muslim prayer, wherever offered in the world, must be directed toward this single point of unity. Determining the Qibla correctly is therefore a practical necessity for every Muslim.</p>

<h2>The Geography of Qibla</h2>
<p>The Kaaba is located at approximately 21.4225° N latitude and 39.8262° E longitude in Mecca, Saudi Arabia. The Qibla direction is not simply "east" — it varies significantly depending on your location on the globe. For example:</p>
<ul>
<li>From <strong>New York</strong>, the Qibla is northeast (approximately 58° from north)</li>
<li>From <strong>London</strong>, the Qibla is southeast (approximately 119°)</li>
<li>From <strong>Jakarta</strong>, the Qibla is northwest (approximately 295°)</li>
<li>From <strong>Amman, Jordan</strong>, the Qibla is south-southeast (approximately 162°)</li>
</ul>
<p>This is because the shortest path between two points on a sphere follows the <strong>great circle route</strong>, not a simple compass bearing on a flat map.</p>

<h2>Method 1: Using a Qibla App (GPS)</h2>
<p>The most accurate and convenient method today is using a GPS-enabled Qibla compass. The Noor Al Islam app uses your device's GPS coordinates to calculate the exact great-circle bearing to the Kaaba and overlays it on an augmented-reality compass. Simply:</p>
<ul>
<li>Open the Noor Al Islam app</li>
<li>Navigate to the Qibla Compass feature</li>
<li>Allow location access</li>
<li>The arrow will point precisely to Mecca</li>
</ul>
<p>Ensure your phone's magnetometer (compass sensor) is calibrated by moving it in a figure-8 pattern if the readings seem off.</p>

<h2>Method 2: Using a Physical Compass</h2>
<p>If you have a compass and know your Qibla bearing for your city:</p>
<ul>
<li>Look up the Qibla bearing for your city online (in degrees from north)</li>
<li>Hold the compass flat and allow the needle to settle pointing north</li>
<li>Rotate yourself until the compass reading matches your Qibla bearing</li>
<li>That direction is your Qibla</li>
</ul>

<h2>Method 3: Using the Sun</h2>
<p>Classical Islamic scholars developed methods using the sun:</p>
<ul>
<li><strong>At solar noon</strong> (when the sun is at its highest): The sun is due south in the northern hemisphere. Stand facing the sun's position, then turn the calculated degrees toward Mecca.</li>
<li><strong>Sunrise/Sunset:</strong> The sun rises roughly in the east and sets in the west, giving you cardinal direction references.</li>
</ul>

<h2>Method 4: Using the North Star</h2>
<p>At night in the northern hemisphere, Polaris (the North Star) indicates true north. Find Polaris and use it as a reference to orient yourself toward the Qibla bearing for your location.</p>

<h2>What if You Cannot Determine the Qibla?</h2>
<p>Islamic scholars agree that if a person genuinely cannot determine the Qibla direction despite reasonable effort — for example, in a windowless room, during overcast weather at night, without any tools — they should make their best estimate (ijtihad) and pray in that direction. If they later discover they were wrong, the prayer is still valid according to most scholars, because the obligation is to make a sincere effort. Allah does not burden a soul beyond its capacity (Al-Baqarah 2:286).</p>`,

    contentAr: `<h2>لماذا تهم جهة القبلة؟</h2>
<p>استقبال القبلة — اتجاه الكعبة المشرفة في مكة المكرمة — شرط من شروط صحة الصلاة. قال الله تعالى: <strong>"فَوَلِّ وَجْهَكَ شَطْرَ الْمَسْجِدِ الْحَرَامِ."</strong> (البقرة: 144). كل صلاة مسلم في أي مكان بالعالم يجب أن تتجه نحو هذه النقطة الموحّدة.</p>

<h2>جغرافية القبلة</h2>
<p>تقع الكعبة المشرفة عند خط عرض 21.4225 شمالاً وخط طول 39.8262 شرقاً في مكة المكرمة. واتجاه القبلة ليس "شرقاً" دائماً — بل يتفاوت حسب موقعك على الكرة الأرضية:</p>
<ul>
<li>من <strong>نيويورك</strong>: القبلة نحو الشمال الشرقي (~58°)</li>
<li>من <strong>لندن</strong>: القبلة نحو الجنوب الشرقي (~119°)</li>
<li>من <strong>جاكرتا</strong>: القبلة نحو الشمال الغربي (~295°)</li>
<li>من <strong>عمّان</strong>: القبلة نحو الجنوب (~162°)</li>
</ul>

<h2>الطريقة الأولى: تطبيق القبلة (GPS)</h2>
<p>أدق الطرق وأيسرها هي استخدام بوصلة القبلة عبر GPS. تستخدم تطبيق نور الإسلام إحداثياتك للحساب الدقيق لاتجاه القبلة وتعرضه على بوصلة واقع معزز:</p>
<ul>
<li>افتح تطبيق نور الإسلام</li>
<li>اذهب إلى ميزة بوصلة القبلة</li>
<li>اسمح بالوصول إلى الموقع</li>
<li>ستشير السهم بدقة نحو مكة المكرمة</li>
</ul>

<h2>الطريقة الثانية: البوصلة العادية</h2>
<ul>
<li>ابحث عن درجة القبلة لمدينتك عبر الإنترنت</li>
<li>امسك البوصلة أفقياً واتركها تستقر نحو الشمال</li>
<li>أدر جسدك حتى تطابق القراءة زاوية القبلة لمدينتك</li>
</ul>

<h2>الطريقة الثالثة: الشمس</h2>
<ul>
<li><strong>وقت الزوال:</strong> الشمس في جنوبك تماماً (في نصف الكرة الشمالي). استخدم ذلك نقطة مرجعية.</li>
<li><strong>الشروق والغروب:</strong> الشمس تشرق تقريباً من الشرق وتغرب من الغرب.</li>
</ul>

<h2>الطريقة الرابعة: نجم الشمال</h2>
<p>في الليل بنصف الكرة الشمالي، يدل نجم القطب (الجدي) على الشمال الحقيقي، ويمكن استخدامه مرجعاً لتحديد القبلة.</p>

<h2>ماذا لو تعذّر تحديد القبلة؟</h2>
<p>اتفق العلماء على أن من بذل جهداً معقولاً ولم يتمكن من تحديد القبلة يجتهد في تقديرها ويُصلي، وصلاته صحيحة. فالله لا يكلّف نفساً إلا وسعها.</p>`,
  },

  {
    slug: "zakat-al-fitr-guide",
    titleEn: "Zakat al-Fitr: Complete Guide — Who Pays, How Much, and When",
    titleAr: "زكاة الفطر: دليل شامل — من يدفعها وكم مقدارها ومتى",
    excerptEn: "Everything you need to know about Zakat al-Fitr (Fitrana) — the obligatory charity at the end of Ramadan, including who must pay, the amount, and the deadline.",
    excerptAr: "كل ما تحتاج معرفته عن زكاة الفطر — الصدقة الواجبة في نهاية رمضان، بمن يجب عليه دفعها والمقدار والموعد النهائي.",
    date: "2026-03-15",
    readTime: 5,
    category: "Zakat",
    contentEn: `<h2>What Is Zakat al-Fitr?</h2>
<p>Zakat al-Fitr (also called Fitrana or Sadaqat al-Fitr) is a mandatory charitable payment made by every Muslim at the end of Ramadan, before the Eid al-Fitr prayer. It was prescribed by the Prophet Muhammad ﷺ and differs from the annual Zakat (2.5% of wealth) in its purpose, amount, and timing.</p>
<p>The Prophet ﷺ said: <strong>"The Messenger of Allah made Zakat al-Fitr obligatory as a purification for the fasting person from idle talk and obscene speech, and to feed the poor."</strong> (Abu Dawud, Ibn Majah — Hassan)</p>

<h2>Who Is Required to Pay?</h2>
<p>Zakat al-Fitr is obligatory on every Muslim who possesses food in excess of their own needs and the needs of their family on the day and night of Eid. Specifically:</p>
<ul>
<li>Every adult Muslim who has surplus food</li>
<li>A man must pay on behalf of himself, his wife, his young children, and any dependents he supports (including elderly parents in his care)</li>
<li>Children: It is obligatory on the father to pay on their behalf. If the father cannot, it falls on the child's own wealth if they have any.</li>
<li>There is no nisab threshold for Zakat al-Fitr — it applies to anyone who has more food than they need for that day.</li>
</ul>

<h2>How Much Is Zakat al-Fitr?</h2>
<p>Zakat al-Fitr is measured as <strong>one sa'</strong> (roughly 2.5–3 kg) of the staple food of the country. The staple foods mentioned in hadith include wheat, barley, dates, raisins, and dried yogurt (aqit). In our time, scholars have provided two ways to fulfill this obligation:</p>
<ul>
<li><strong>In food:</strong> Give one sa' (~2.5–3 kg) of the staple food of your land (rice, wheat, lentils, etc.) per person.</li>
<li><strong>In cash:</strong> Many scholars and Islamic organizations have permitted giving its cash equivalent, for ease of distribution. This typically ranges from $5–$15 per person depending on your country and the current food prices. Check with your local mosque or Islamic charity for the exact local amount.</li>
</ul>

<h2>When Must It Be Paid?</h2>
<p>The timing of Zakat al-Fitr is specific and must not be neglected:</p>
<ul>
<li><strong>Earliest permitted time:</strong> From the beginning of Ramadan (some scholars say from the 1st of Ramadan, others from the last two days).</li>
<li><strong>Recommended time:</strong> The night before Eid al-Fitr or on the morning of Eid, before the Eid prayer.</li>
<li><strong>Deadline (Wajib):</strong> Before the Eid prayer is performed. Paying it on time is essential — the Prophet ﷺ said: "Whoever pays it before the prayer, it is an accepted Zakat; whoever pays it after the prayer, it is a regular sadaqah." (Abu Dawud)</li>
<li><strong>If missed:</strong> It should still be paid as a general sadaqah (charity), not as Zakat al-Fitr, as its specific time has passed.</li>
</ul>

<h2>To Whom Is Zakat al-Fitr Given?</h2>
<p>Zakat al-Fitr goes to the same eight categories eligible for regular Zakat, but with a priority: the primary intention is to provide food for poor and needy Muslims so they can celebrate Eid with joy and dignity. The Prophet ﷺ wanted to ensure that every Muslim — even the poorest — could celebrate Eid without having to beg or go hungry on that blessed day.</p>
<p>Give your Zakat al-Fitr to local poor and needy individuals, your local mosque's collection fund, or trusted Islamic charities who will distribute it in your community or to Muslims in need globally.</p>`,

    contentAr: `<h2>ما هي زكاة الفطر؟</h2>
<p>زكاة الفطر (أو صدقة الفطر أو الفطرة) صدقة واجبة يؤديها كل مسلم في نهاية رمضان قبل صلاة عيد الفطر. وقد فرضها النبي ﷺ وتختلف عن زكاة المال في غرضها ومقدارها وتوقيتها.</p>
<p>قال النبي ﷺ: <strong>"فرض رسول الله زكاة الفطر طُهرةً للصائم من اللغو والرفث وطُعمةً للمساكين."</strong> (أبو داود، ابن ماجه — حسن)</p>

<h2>من يجب عليه الدفع؟</h2>
<ul>
<li>كل مسلم بالغ يملك قوتاً زائداً على حاجته وحاجة من يعول يوم وليلة العيد.</li>
<li>يجب على الرجل أن يؤدي عن نفسه وزوجته وأولاده الصغار ومن يعولهم.</li>
<li>لا يُشترط لها النصاب — تجب على من ملك ما يزيد على قوت يومه.</li>
</ul>

<h2>كم مقدار زكاة الفطر؟</h2>
<p>مقدار زكاة الفطر <strong>صاع</strong> (نحو 2.5–3 كيلوغرام) من قوت البلد (أرز، قمح، تمر، إلخ) عن كل شخص. وأجاز كثير من العلماء إخراجها نقداً بما يعادل ثمن الصاع من قوت البلد، وهو يتراوح عادةً بين 5–15 دولاراً بحسب البلد والأسعار. تحقق مع مسجدك المحلي للمبلغ المحدد.</p>

<h2>متى تُؤدَّى؟</h2>
<ul>
<li><strong>أول وقت جائز:</strong> من بداية رمضان (أو قبل العيد بيوم أو يومين عند بعض العلماء).</li>
<li><strong>الوقت المستحب:</strong> ليلة عيد الفطر أو صباحه قبل صلاة العيد.</li>
<li><strong>الموعد النهائي (الواجب):</strong> قبل صلاة العيد. قال النبي ﷺ: "من أداها قبل الصلاة فهي زكاة مقبولة، ومن أداها بعد الصلاة فهي صدقة من الصدقات." (أبو داود)</li>
</ul>

<h2>لمن تُعطى؟</h2>
<p>تُعطى زكاة الفطر للفقراء والمساكين بالدرجة الأولى، لتمكينهم من الاحتفال بعيد الفطر بفرح وكرامة. أدّها لفقراء حيّك أو لصندوق المسجد المحلي أو لجمعيات خيرية إسلامية موثوقة.</p>`,
  },

  {
    slug: "prayer-times-technology",
    titleEn: "How Prayer Time Apps Calculate Accurate Times: The Science Behind Salah",
    titleAr: "كيف تحسب تطبيقات أوقات الصلاة الأوقات الدقيقة: العلم وراء الصلاة",
    excerptEn: "Discover how modern Islamic apps use astronomical algorithms, GPS, and calculation methods to deliver accurate prayer times for any location on Earth.",
    excerptAr: "اكتشف كيف تستخدم التطبيقات الإسلامية الحديثة الخوارزميات الفلكية وتقنية GPS وطرق الحساب لتقديم أوقات صلاة دقيقة لأي موقع على وجه الأرض.",
    date: "2026-04-01",
    readTime: 7,
    category: "Technology",
    contentEn: `<h2>Why Prayer Time Calculation Is Complex</h2>
<p>Unlike a fixed clock schedule, Islamic prayer times are determined by the sun's position relative to the Earth — meaning they change every single day and vary significantly by location. The five daily prayer times depend on astronomical phenomena: solar noon, twilight angles, and sunset. Modern prayer time apps must perform real astronomical calculations to determine these times with precision.</p>

<h2>The Astronomical Foundations</h2>
<p>Each prayer time is tied to a specific solar event:</p>
<ul>
<li><strong>Fajr:</strong> Begins when the sun is a specific number of degrees below the horizon before dawn (the "true dawn" — when scattered light appears). Different calculation methods use 12°, 15°, 18°, or 19.5° below the horizon.</li>
<li><strong>Sunrise:</strong> When the upper limb of the sun crosses the visible horizon — marks the end of Fajr time.</li>
<li><strong>Dhuhr:</strong> Solar noon — when the sun crosses the meridian (the highest point in the sky). Dhuhr begins a few minutes after solar noon.</li>
<li><strong>Asr:</strong> When the shadow of an object equals its length plus the shadow at noon (Shafi'i method), or double its length (Hanafi method).</li>
<li><strong>Maghrib:</strong> Immediately after the upper limb of the sun disappears below the horizon.</li>
<li><strong>Isha:</strong> When the red (or white, depending on the method) twilight disappears — typically 12°, 15°, or 18° below the horizon after sunset.</li>
</ul>

<h2>The Role of GPS Coordinates</h2>
<p>The sun's position in the sky at any moment depends on three factors: the observer's latitude, longitude, and the date. A prayer time app uses your GPS coordinates to know exactly where on Earth you are, then calculates the sun's declination and hour angle for your location, and ultimately computes exact prayer times to the minute.</p>
<p>Without GPS, early Muslims relied on observing the actual sun, shadow lengths, and twilight — which is exactly what the astronomical algorithms replicate mathematically.</p>

<h2>Different Calculation Methods</h2>
<p>One reason different apps sometimes show slightly different prayer times is that there is scholarly disagreement on the exact twilight angles for Fajr and Isha. The major established calculation methods include:</p>
<ul>
<li><strong>Muslim World League (MWL):</strong> Fajr at 18°, Isha at 17°. Widely used in Europe and globally.</li>
<li><strong>Islamic Society of North America (ISNA):</strong> Fajr and Isha both at 15°. Standard in North America.</li>
<li><strong>Egyptian General Authority of Survey:</strong> Fajr at 19.5°, Isha at 17.5°. Used in Egypt, parts of Middle East and Africa.</li>
<li><strong>Umm al-Qura (Mecca):</strong> Fajr at 18.5°, Isha as fixed 90 minutes after Maghrib. Official Saudi Arabia method.</li>
<li><strong>University of Islamic Sciences, Karachi:</strong> Fajr and Isha at 18°. Standard in Pakistan, Bangladesh, India, Afghanistan.</li>
</ul>

<h2>High Latitude Challenges</h2>
<p>At high latitudes (above ~48°N, like Scandinavia, Canada, and northern UK), astronomical twilight can persist all night during summer, making Fajr and Isha times impossible to calculate normally. Scholars have agreed on several solution methods:</p>
<ul>
<li><strong>Nearest city:</strong> Use the prayer times of the nearest city at a normal latitude.</li>
<li><strong>Middle of night:</strong> Divide the night into halves or thirds and assign Isha to the midpoint.</li>
<li><strong>Angle-based:</strong> Use a fixed angle that ensures a reasonable time gap.</li>
</ul>
<p>The Noor Al Islam app handles high-latitude adjustments automatically based on your location.</p>

<h2>The Algorithms in Action</h2>
<p>Modern prayer time apps use the <strong>Julian Day Number</strong> to calculate the sun's position for any date, then apply spherical trigonometry to find sunrise, sunset, solar noon, and twilight angles. The entire computation happens on-device in milliseconds, using your current GPS coordinates, timezone, and the selected calculation method.</p>
<p>The result is a prayer schedule accurate to within one minute, matched to your exact location — whether you are in Amman, London, Jakarta, or anywhere else on Earth. The Noor Al Islam app automatically detects your location, selects the appropriate calculation method, and delivers your daily prayer schedule with optional Athan (call to prayer) notifications — all without any manual setup required.</p>`,

    contentAr: `<h2>لماذا حساب أوقات الصلاة معقد؟</h2>
<p>خلافاً للجداول الثابتة، تتحدد أوقات الصلاة الإسلامية بموقع الشمس بالنسبة للأرض — أي أنها تتغير كل يوم وتختلف اختلافاً كبيراً من موقع لآخر. وتعتمد الصلوات الخمس على ظواهر فلكية: الزوال، وزوايا الشفق، والغروب. لذا يجب على تطبيقات أوقات الصلاة إجراء حسابات فلكية حقيقية لتحديد هذه الأوقات بدقة.</p>

<h2>الأسس الفلكية لأوقات الصلاة</h2>
<ul>
<li><strong>الفجر:</strong> حين تكون الشمس بزاوية محددة تحت الأفق قبل الفجر (12° أو 15° أو 18° أو 19.5° حسب المذهب الحسابي).</li>
<li><strong>الشروق:</strong> حين يُرى حرف الشمس الأعلى فوق الأفق.</li>
<li><strong>الظهر:</strong> زوال الشمس (أعلى نقطة في السماء) مع إضافة دقائق قليلة.</li>
<li><strong>العصر:</strong> حين يساوي الظل المثل (شافعي) أو المثلين (حنفي).</li>
<li><strong>المغرب:</strong> بعد غروب الشمس مباشرةً.</li>
<li><strong>العشاء:</strong> حين يغيب الشفق (الأحمر أو الأبيض حسب المذهب).</li>
</ul>

<h2>دور إحداثيات GPS</h2>
<p>موقع الشمس في السماء في أي لحظة يعتمد على خط العرض وخط الطول والتاريخ. يستخدم التطبيق إحداثياتك لمعرفة موقعك تماماً، ثم يحسب ميل الشمس وزاوية الساعة ليصل إلى أوقات الصلاة بدقة الدقيقة.</p>

<h2>طرق الحساب المختلفة</h2>
<ul>
<li><strong>رابطة العالم الإسلامي:</strong> الفجر 18°، العشاء 17°. شائع في أوروبا.</li>
<li><strong>الجمعية الإسلامية لأمريكا الشمالية (ISNA):</strong> الفجر والعشاء 15°.</li>
<li><strong>الهيئة المصرية العامة للمساحة:</strong> الفجر 19.5°، العشاء 17.5°.</li>
<li><strong>أم القرى:</strong> الفجر 18.5°، العشاء 90 دقيقة بعد المغرب. المعتمد في السعودية.</li>
<li><strong>جامعة كراتشي:</strong> الفجر والعشاء 18°. المعتمد في باكستان والهند وبنغلاديش.</li>
</ul>

<h2>تحديات خطوط العرض العالية</h2>
<p>عند خطوط العرض العالية (فوق 48° شمالاً كإسكندنافيا وكندا وشمال المملكة المتحدة)، قد يستمر الشفق الفلكي طوال الليل صيفاً مما يجعل حساب الفجر والعشاء متعذراً. اتفق العلماء على عدة حلول: الاستعانة بأقرب مدينة ذات خط عرض طبيعي، أو تقسيم الليل بالأنصاف أو الأثلاث. يتعامل تطبيق نور الإسلام مع هذه التعديلات تلقائياً.</p>

<h2>الخوارزميات في العمل</h2>
<p>تستخدم تطبيقات الصلاة الحديثة <strong>رقم اليوم اليولياني</strong> لحساب موقع الشمس لأي تاريخ، ثم تطبق المثلثات الكروية لإيجاد الشروق والغروب والزوال وزوايا الشفق. تجري العملية الحسابية كاملة على الجهاز في أجزاء من الثانية، مستخدمةً إحداثياتك ومنطقتك الزمنية وطريقة الحساب المختارة، لتنتج جدولاً دقيقاً لأوقات صلاتك أينما كنت.</p>`,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
