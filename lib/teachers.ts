/**
 * Teacher profiles shown on the site. Add one entry per teacher once their details are confirmed.
 * Photos go in /public/teachers/ (e.g. "/teachers/ahmad.jpg"); recitation clips in /public/recitations/.
 */
export type Teacher = {
  id: string;
  gender: "male" | "female";
  name: { en: string; ar: string };
  role: { en: string; ar: string };
  /** Degree and/or ijazah — only what the teacher actually holds. */
  sanad: { en: string; ar: string };
  bio?: { en: string; ar: string };
  tags: Array<"kids" | "adults" | "sisters" | "hifz" | "tajweed" | "noorani" | "arabic" | "islamic">;
  photo?: string;
  recitation?: string;
};

export const teachers: Teacher[] = [
  {
    id: "abdullah-mahmoud",
    gender: "male",
    name: { en: "Abdullah Mahmoud Abdelaziz", ar: "عبدالله محمود عبدالعزيز" },
    role: {
      en: "Quran, Tajweed, Arabic & Islamic Studies Teacher · 4 years' experience",
      ar: "معلم قرآن وتجويد ولغة عربية وعلوم شرعية · خبرة 4 سنوات",
    },
    sanad: {
      en: "Al-Azhar University — Faculty of Languages & Translation, Islamic Studies in English",
      ar: "جامعة الأزهر — كلية اللغات والترجمة، قسم الدراسات الإسلامية باللغة الإنجليزية",
    },
    bio: {
      en: "A graduate of Al-Azhar University's Faculty of Languages and Translation (Islamic Studies in English), with four years of experience teaching Arabic, the Holy Quran, Tajweed and Islamic studies to non-native Arabic speakers. He teaches Arabic from beginner to advanced levels, as well as the Islamic sciences, including Fiqh, Aqeedah, Usul al-Fiqh (principles of jurisprudence) and Hadith terminology. An advanced Quran and Tajweed instructor, he guides students in memorization, correcting their recitation and mastering the rules of Tajweed. His lessons are engaging and interactive, and tailored to each student's needs, so learning is effective and enjoyable.",
      ar: "تخرّج في كلية اللغات والترجمة بجامعة الأزهر، قسم الدراسات الإسلامية باللغة الإنجليزية، وله أربع سنوات من الخبرة في تعليم اللغة العربية والقرآن الكريم والتجويد والعلوم الشرعية لغير الناطقين بالعربية. يدرّس العربية من المستوى المبتدئ إلى المتقدم، ويدرّس العلوم الشرعية كالفقه والعقيدة وأصول الفقه ومصطلح الحديث. وهو معلم متمكّن في القرآن والتجويد، يرافق الطلاب في الحفظ وتصحيح التلاوة وإتقان أحكام التجويد. يعتمد أسلوبًا تفاعليًا ممتعًا يناسب احتياجات كل طالب، ليكون التعلّم أكثر فاعلية ومتعة.",
    },
    tags: ["kids", "adults", "noorani", "tajweed", "hifz", "arabic", "islamic"],
    photo: "/teachers/abdullah-mahmoud.jpg",
  },
];

export type Testimonial = { quote: { en: string; ar: string }; name: string; place: string };

/** Only real testimonials, with the family's permission to publish. */
export const testimonials: Testimonial[] = [];
