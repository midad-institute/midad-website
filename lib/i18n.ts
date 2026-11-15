export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function dirOf(locale: Locale) {
  return locale === "ar" ? "rtl" : "ltr";
}

export function otherLocale(locale: Locale): Locale {
  return locale === "ar" ? "en" : "ar";
}

/** Prefix an internal path with the locale, e.g. href("ar", "/pricing") → "/ar/pricing". */
export function href(locale: Locale, path: string) {
  return `/${locale}${path === "/" ? "" : path}`;
}
