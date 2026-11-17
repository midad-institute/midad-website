import type { Locale } from "./i18n";

export const CONTACT_EMAIL = "bm999308@gmail.com";
export const LEGAL_UPDATED = { en: "17 November 2026", ar: "17 نوفمبر 2026" };

export type LegalSection = { h: string; body?: string[]; list?: string[] };
export type LegalDoc = { title: string; lead: string; sections: LegalSection[] };
export type LegalSlug = "terms" | "privacy" | "safeguarding";

const E = CONTACT_EMAIL;

const en: Record<LegalSlug, LegalDoc> = {
  terms: {
    title: "Terms of Service",
    lead: "These terms explain how classes at Midad Institute work. By booking a class you agree to them.",
    sections: [
      {
        h: "Who we are",
        body: [
          `Midad Institute ("Midad", "we") offers live one-to-one online classes in the Quran, Tajweed, Arabic and Islamic studies. We are based in Cairo, Egypt. You can reach us at ${E}.`,
        ],
      },
      {
        h: "Who can book",
        list: [
          "Adults (18+) can book classes for themselves.",
          "Classes for anyone under 18 must be booked by a parent or legal guardian, who agrees to these terms on the student's behalf.",
          "Please give us accurate details so we can contact you and place the student at the right level.",
        ],
      },
      {
        h: "The free trial class",
        list: [
          "The first class is free, lasts 30 minutes and needs no payment card.",
          "We choose the teacher for each student based on level, goals and your preference for a male or female teacher.",
          "We confirm the class time with you on WhatsApp or email. Times are shown in your own time zone.",
        ],
      },
      {
        h: "Subscriptions and prices",
        list: [
          "Prices are shown on our Pricing page per hour of teaching, in USD, GBP or EUR. Classes can be 30, 45 or 60 minutes.",
          "Subscriptions are paid monthly, in advance. We will tell you how to pay before your first paid month.",
          "The launch price stays the same for you for as long as your subscription continues without a break.",
          "A 10% discount applies to each additional sibling from the same family.",
          "You can stop your subscription at any time. It ends at the end of the month you have already paid for.",
        ],
      },
      {
        h: "Cancelling and rescheduling classes",
        list: [
          "If you cancel at least 4 hours before a class, you get a make-up class.",
          "If you cancel with less than 4 hours' notice, or the student does not attend, the class counts as taken.",
          "If a teacher has to cancel, we will offer a make-up class or credit it to your next month.",
        ],
      },
      {
        h: "During classes",
        list: [
          "Classes take place on Zoom or Google Meet. You need a stable internet connection and a device with a microphone.",
          "We do not record classes.",
          "Students and teachers are expected to be respectful. We may end a subscription in case of abusive or inappropriate behaviour.",
          "Our Child Safeguarding Policy also applies to every class with a student under 18.",
        ],
      },
      {
        h: "Teaching materials",
        body: [
          "Materials and class reports we share are for the student's personal learning. Please don't republish or sell them.",
        ],
      },
      {
        h: "Our responsibility",
        body: [
          "We work hard to give every student a qualified teacher and a good learning experience, but we can't guarantee a specific result, such as finishing memorisation by a certain date. We are not responsible for problems caused by your internet connection, device or third-party video services.",
        ],
      },
      {
        h: "Changes to these terms",
        body: [
          "We may update these terms. If we make an important change, we will tell current students by email or WhatsApp before it takes effect.",
        ],
      },
      { h: "Contact", body: [`Questions about these terms: ${E}.`] },
    ],
  },

  privacy: {
    title: "Privacy Policy",
    lead: "This policy explains what information we collect, why, and the choices you have.",
    sections: [
      {
        h: "Who is responsible",
        body: [`Midad Institute, based in Cairo, Egypt, is responsible for your information. Contact: ${E}.`],
      },
      {
        h: "What we collect",
        body: ["When you book a free trial class, we collect:"],
        list: [
          "Your name, and the student's name if different",
          "Your email address and WhatsApp number",
          "Who the class is for and the student's age group (not the exact date of birth)",
          "The track you chose, your teacher preference, the class time and your time zone",
          "Any notes you choose to add",
        ],
      },
      {
        h: "Why we use it",
        list: [
          "To arrange and confirm the trial class, and to choose the right teacher",
          "To contact you about classes, schedules and your subscription",
          "To send class reports to parents",
        ],
      },
      {
        h: "What we don't do",
        list: [
          "We don't sell your information or share it for advertising.",
          "We don't use advertising or tracking cookies, and we don't run third-party analytics on this site.",
          "We don't record classes.",
        ],
      },
      {
        h: "Services we use",
        body: ["We use a small number of trusted providers to run the site. They process data only to provide their service to us:"],
        list: [
          "Cloudflare — hosts this website",
          "Supabase — stores booking information (servers in Frankfurt, Germany)",
          "Resend — sends booking notification emails",
          "Telegram — sends a booking alert to our staff",
          "Zoom or Google Meet — used for live classes",
        ],
      },
      {
        h: "How long we keep it",
        body: [
          "We keep a trial booking for up to 12 months if it doesn't lead to a subscription, then delete it. For students who subscribe, we keep their information while they study with us, and for up to 12 months after they leave.",
        ],
      },
      {
        h: "Children's information",
        body: [
          "Bookings for students under 18 must be made by a parent or guardian. We only collect what we need to teach the child, and we communicate with the parent or guardian, not directly with the child outside class. A parent can ask us at any time to see or delete their child's information.",
        ],
      },
      {
        h: "Your rights",
        body: [
          `You can ask us to see, correct or delete your information, or to stop contacting you. Email ${E} and we will reply within 30 days. Depending on where you live (for example the UK, EU or US), you may also have the right to complain to your local data protection authority.`,
        ],
      },
      {
        h: "Security",
        body: [
          "Booking information is stored in a secured database. Only authorised staff can view it, after signing in.",
        ],
      },
      {
        h: "Changes",
        body: ["If we change this policy, we will update the date at the top of this page."],
      },
    ],
  },

  safeguarding: {
    title: "Child Safeguarding Policy",
    lead: "Many of our students are children. Keeping them safe matters more to us than anything else we do.",
    sections: [
      {
        h: "Our commitment",
        body: [
          "Every child deserves to learn in a safe, respectful environment. This policy applies to all our teachers and staff, and to every class with a student under 18.",
        ],
      },
      {
        h: "Our teachers",
        list: [
          "We check every teacher's identity and qualifications before they teach.",
          "Teachers are trained in teaching children online and in this policy.",
          "Female teachers are available for girls and young children.",
          "We are introducing formal background checks for all teachers.",
        ],
      },
      {
        h: "How classes are run",
        list: [
          "All classes take place on Zoom or Google Meet, using links we send to the parent.",
          "We do not record classes.",
          "For children under 13, a parent or guardian should be at home during class and help set it up.",
          "Classes take place in a family area of the home, not behind a closed door, whenever possible.",
          "Teachers dress modestly and keep a quiet, appropriate background.",
        ],
      },
      {
        h: "Communication",
        list: [
          "Teachers communicate with the parent or guardian, not privately with the child.",
          "Teachers must not contact students through personal social media or private messages.",
          "Class reports and messages are always sent to the parent.",
        ],
      },
      {
        h: "What teachers must never do",
        list: [
          "Ask a child to keep a secret from their parents",
          "Ask for personal photos or personal information",
          "Meet a student in person, or arrange contact outside of class",
          "Use harsh, humiliating or physical discipline",
        ],
      },
      {
        h: "Reporting a concern",
        body: [
          `If you are worried about anything that happened in a class, or about a child's safety, email us at ${E} with "Safeguarding" in the subject line. We treat every report seriously and confidentially, and we will reply within 24 hours.`,
          "When we receive a concern, we pause the teacher's classes with that student while we look into it. If a child may be at risk, we will tell the parents and, where appropriate, the relevant authorities.",
          "If a child is in immediate danger, contact your local emergency services first.",
        ],
      },
      {
        h: "Reviewing this policy",
        body: ["We review this policy at least once a year and whenever something changes in how we teach."],
      },
    ],
  },
};

const ar: Record<LegalSlug, LegalDoc> = {
  terms: {
    title: "شروط الخدمة",
    lead: "توضّح هذه الشروط طريقة عمل الحصص في معهد مِداد. بحجزك لأي حصة فأنت توافق عليها.",
    sections: [
      {
        h: "من نحن",
        body: [
          `معهد مِداد («مِداد» أو «نحن») يقدّم حصصًا مباشرة فردية عبر الإنترنت في القرآن الكريم والتجويد واللغة العربية والعلوم الشرعية. مقرّنا القاهرة، مصر. يمكنك مراسلتنا على ${E}.`,
        ],
      },
      {
        h: "من يحق له الحجز",
        list: [
          "يمكن للبالغين (18 سنة فأكثر) حجز الحصص لأنفسهم.",
          "حصص من هم دون 18 سنة يحجزها ولي الأمر أو الوصي القانوني، ويوافق على هذه الشروط نيابةً عن الطالب.",
          "نرجو إدخال بيانات صحيحة حتى نتمكّن من التواصل معك ووضع الطالب في المستوى المناسب.",
        ],
      },
      {
        h: "الحصة التجريبية المجانية",
        list: [
          "الحصة الأولى مجانية، ومدتها 30 دقيقة، ولا تحتاج إلى بطاقة دفع.",
          "نحن نختار المعلم لكل طالب بحسب مستواه وأهدافه وتفضيلك لمعلم أو معلمة.",
          "نؤكد موعد الحصة معك عبر واتساب أو البريد الإلكتروني، والمواعيد تظهر بتوقيتك المحلي.",
        ],
      },
      {
        h: "الاشتراكات والأسعار",
        list: [
          "الأسعار معروضة في صفحة الأسعار بحساب ساعة التدريس، بالدولار أو الجنيه الإسترليني أو اليورو. ومدة الحصة 30 أو 45 أو 60 دقيقة.",
          "يُدفع الاشتراك شهريًا ومقدّمًا، وسنخبرك بطريقة الدفع قبل أول شهر مدفوع.",
          "يبقى سعر الإطلاق ثابتًا لك ما دام اشتراكك مستمرًا دون انقطاع.",
          "يُطبَّق خصم 10% على كل أخ أو أخت إضافيين من الأسرة نفسها.",
          "يمكنك إيقاف اشتراكك في أي وقت، وينتهي في آخر الشهر الذي دفعته.",
        ],
      },
      {
        h: "إلغاء الحصص وتغيير مواعيدها",
        list: [
          "إذا ألغيت الحصة قبل موعدها بـ 4 ساعات على الأقل، تحصل على حصة تعويضية.",
          "إذا ألغيتها قبل موعدها بأقل من 4 ساعات، أو لم يحضر الطالب، تُحتسب الحصة.",
          "إذا اضطر المعلم إلى إلغاء حصة، نقدّم لك حصة تعويضية أو نضيفها إلى رصيد الشهر التالي.",
        ],
      },
      {
        h: "أثناء الحصص",
        list: [
          "تُعقد الحصص عبر Zoom أو Google Meet، وتحتاج إلى اتصال إنترنت مستقر وجهاز به ميكروفون.",
          "لا نسجّل الحصص.",
          "نتوقع الاحترام المتبادل بين الطلاب والمعلمين، ويحق لنا إنهاء الاشتراك في حال الإساءة أو السلوك غير اللائق.",
          "تنطبق سياسة حماية الأطفال لدينا أيضًا على كل حصة لطالب دون 18 سنة.",
        ],
      },
      {
        h: "المواد التعليمية",
        body: ["المواد وتقارير الحصص التي نشاركها مخصّصة لتعلّم الطالب الشخصي، فنرجو عدم إعادة نشرها أو بيعها."],
      },
      {
        h: "حدود مسؤوليتنا",
        body: [
          "نحرص على أن يكون لكل طالب معلم مؤهَّل وتجربة تعلّم جيدة، لكننا لا نضمن نتيجة محددة، مثل إتمام الحفظ في موعد معيّن. ولسنا مسؤولين عن المشكلات الناتجة عن اتصال الإنترنت أو الجهاز أو خدمات الفيديو الخارجية.",
        ],
      },
      {
        h: "تعديل هذه الشروط",
        body: ["قد نحدّث هذه الشروط، وإذا أجرينا تعديلًا مهمًا فسنُبلغ الطلاب الحاليين عبر البريد الإلكتروني أو واتساب قبل سريانه."],
      },
      { h: "التواصل", body: [`لأي سؤال عن هذه الشروط: ${E}.`] },
    ],
  },

  privacy: {
    title: "سياسة الخصوصية",
    lead: "توضّح هذه السياسة البيانات التي نجمعها، وسبب جمعها، والخيارات المتاحة لك.",
    sections: [
      {
        h: "الجهة المسؤولة",
        body: [`معهد مِداد، ومقرّه القاهرة، مصر، هو المسؤول عن بياناتك. للتواصل: ${E}.`],
      },
      {
        h: "البيانات التي نجمعها",
        body: ["عند حجز حصة تجريبية مجانية نجمع:"],
        list: [
          "اسمك، واسم الطالب إن كان شخصًا آخر",
          "بريدك الإلكتروني ورقم واتساب",
          "لمن الحصة، والفئة العمرية للطالب (لا تاريخ الميلاد بالتحديد)",
          "المسار الذي اخترته، وتفضيل المعلم، وموعد الحصة، ومنطقتك الزمنية",
          "أي ملاحظات تختار إضافتها",
        ],
      },
      {
        h: "لماذا نستخدمها",
        list: [
          "لترتيب الحصة التجريبية وتأكيدها، واختيار المعلم المناسب",
          "للتواصل معك بشأن الحصص والمواعيد والاشتراك",
          "لإرسال تقارير الحصص إلى أولياء الأمور",
        ],
      },
      {
        h: "ما لا نفعله",
        list: [
          "لا نبيع بياناتك ولا نشاركها لأغراض إعلانية.",
          "لا نستخدم ملفات تعريف الارتباط (الكوكيز) الإعلانية أو التتبعية، ولا أدوات تحليل خارجية على هذا الموقع.",
          "لا نسجّل الحصص.",
        ],
      },
      {
        h: "الخدمات التي نستعين بها",
        body: ["نستعين بعدد محدود من مزوّدي الخدمة الموثوقين لتشغيل الموقع، ولا يعالجون البيانات إلا لتقديم خدمتهم لنا:"],
        list: [
          "Cloudflare — استضافة الموقع",
          "Supabase — تخزين بيانات الحجز (خوادم في فرانكفورت، ألمانيا)",
          "Resend — إرسال رسائل البريد الخاصة بالحجز",
          "Telegram — إرسال تنبيه الحجز إلى فريقنا",
          "Zoom أو Google Meet — لعقد الحصص المباشرة",
        ],
      },
      {
        h: "مدة الاحتفاظ بالبيانات",
        body: [
          "نحتفظ ببيانات الحجز التجريبي مدة أقصاها 12 شهرًا إن لم يتبعه اشتراك، ثم نحذفها. أما الطلاب المشتركون فنحتفظ ببياناتهم طوال مدة دراستهم معنا، ومدة أقصاها 12 شهرًا بعد مغادرتهم.",
        ],
      },
      {
        h: "بيانات الأطفال",
        body: [
          "يحجز ولي الأمر أو الوصي لكل طالب دون 18 سنة. ولا نجمع إلا ما نحتاج إليه لتعليم الطفل، ونتواصل مع ولي الأمر لا مع الطفل مباشرة خارج الحصة. ويمكن لولي الأمر أن يطلب في أي وقت الاطلاع على بيانات طفله أو حذفها.",
        ],
      },
      {
        h: "حقوقك",
        body: [
          `يمكنك أن تطلب الاطلاع على بياناتك أو تصحيحها أو حذفها، أو التوقف عن التواصل معك. راسلنا على ${E} وسنرد خلال 30 يومًا. وبحسب بلد إقامتك (مثل المملكة المتحدة أو الاتحاد الأوروبي أو الولايات المتحدة) قد يحق لك أيضًا تقديم شكوى إلى هيئة حماية البيانات المحلية.`,
        ],
      },
      {
        h: "حماية البيانات",
        body: ["تُحفظ بيانات الحجز في قاعدة بيانات مؤمَّنة، ولا يطّلع عليها إلا الموظفون المخوَّلون بعد تسجيل الدخول."],
      },
      {
        h: "تحديث السياسة",
        body: ["إذا عدّلنا هذه السياسة فسنحدّث التاريخ أعلى هذه الصفحة."],
      },
    ],
  },

  safeguarding: {
    title: "سياسة حماية الأطفال",
    lead: "كثير من طلابنا أطفال، وسلامتهم أهم عندنا من أي شيء آخر.",
    sections: [
      {
        h: "التزامنا",
        body: [
          "من حق كل طفل أن يتعلّم في بيئة آمنة ومحترمة. تنطبق هذه السياسة على جميع معلمينا وموظفينا، وعلى كل حصة لطالب دون 18 سنة.",
        ],
      },
      {
        h: "معلمونا",
        list: [
          "نتحقق من هوية كل معلم ومؤهلاته قبل أن يبدأ التدريس.",
          "يتدرّب المعلمون على تعليم الأطفال عبر الإنترنت وعلى هذه السياسة.",
          "تتوفر معلمات للفتيات والأطفال الصغار.",
          "نعمل على إدخال فحص رسمي للسجل الجنائي لجميع المعلمين.",
        ],
      },
      {
        h: "كيف تُعقد الحصص",
        list: [
          "تُعقد كل الحصص عبر Zoom أو Google Meet، بروابط نرسلها إلى ولي الأمر.",
          "لا نسجّل الحصص.",
          "للأطفال دون 13 سنة، ينبغي أن يكون ولي الأمر أو الوصي في البيت أثناء الحصة، وأن يساعد في تجهيزها.",
          "يُفضَّل أن تكون الحصة في مكان مشترك من البيت، لا خلف باب مغلق.",
          "يلتزم المعلمون باللباس المحتشم وبخلفية هادئة ومناسبة.",
        ],
      },
      {
        h: "التواصل",
        list: [
          "يتواصل المعلمون مع ولي الأمر أو الوصي، لا مع الطفل بشكل خاص.",
          "يُمنع المعلمون من التواصل مع الطلاب عبر حساباتهم الشخصية على مواقع التواصل أو الرسائل الخاصة.",
          "تُرسَل تقارير الحصص والرسائل دائمًا إلى ولي الأمر.",
        ],
      },
      {
        h: "ما لا يفعله المعلم أبدًا",
        list: [
          "أن يطلب من الطفل إخفاء أمر عن والديه",
          "أن يطلب صورًا شخصية أو معلومات خاصة",
          "أن يقابل الطالب شخصيًا، أو يرتّب تواصلًا خارج الحصة",
          "أن يستخدم أسلوبًا قاسيًا أو مهينًا أو عقابًا بدنيًا",
        ],
      },
      {
        h: "الإبلاغ عن أي قلق",
        body: [
          `إذا أقلقك أي شيء حدث في حصة، أو كان لديك قلق على سلامة طفل، فراسلنا على ${E} واكتب «Safeguarding» في عنوان الرسالة. نتعامل مع كل بلاغ بجدية وسرية، ونرد خلال 24 ساعة.`,
          "عند وصول أي بلاغ نوقف حصص المعلم مع هذا الطالب حتى ننتهي من التحقق. وإذا كان الطفل معرّضًا لخطر، نُبلغ والديه، والجهات المختصة عند الحاجة.",
          "إذا كان الطفل في خطر فوري، فاتصل بخدمات الطوارئ المحلية أولًا.",
        ],
      },
      {
        h: "مراجعة السياسة",
        body: ["نراجع هذه السياسة مرة واحدة على الأقل كل عام، وكلما تغيّر شيء في طريقة تدريسنا."],
      },
    ],
  },
};

export const legal: Record<Locale, Record<LegalSlug, LegalDoc>> = { en, ar };

export const legalUi = {
  en: { updated: "Last updated", legal: "Legal", agree: "By booking, you agree to our {terms} and {privacy}. If the student is under 18, a parent or guardian must make the booking." },
  ar: { updated: "آخر تحديث", legal: "قانوني", agree: "بالحجز فأنت توافق على {terms} و{privacy}. وإذا كان الطالب دون 18 سنة فيجب أن يحجز ولي الأمر أو الوصي." },
} as const;
