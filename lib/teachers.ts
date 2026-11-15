/**
 * Teacher profiles shown on the site. Add one entry per teacher once their details are confirmed.
 * Photos go in /public/teachers/ (e.g. "/teachers/ahmad.jpg"); recitation clips in /public/recitations/.
 */
export type Teacher = {
  id: string;
  gender: "male" | "female";
  name: { en: string; ar: string };
  role: { en: string; ar: string };
  sanad: { en: string; ar: string };
  tags: Array<"kids" | "adults" | "sisters" | "hifz" | "tajweed" | "noorani" | "arabic" | "islamic">;
  photo?: string;
  recitation?: string;
};

export const teachers: Teacher[] = [];

export type Testimonial = { quote: { en: string; ar: string }; name: string; place: string };

/** Only real testimonials, with the family's permission to publish. */
export const testimonials: Testimonial[] = [];
