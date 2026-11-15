import type { Metadata } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import "../globals.css";
import { Header } from "@/components/Header";
import { Footer, WhatsAppButton } from "@/components/Footer";
import { dictionaries } from "@/lib/content";
import { dirOf, isLocale, locales } from "@/lib/i18n";

const inter = localFont({ src: "../fonts/Inter.woff2", variable: "--f-inter", weight: "100 900", display: "swap" });
const manrope = localFont({ src: "../fonts/Manrope.woff2", variable: "--f-manrope", weight: "200 800", display: "swap" });
const reem = localFont({ src: "../fonts/ReemKufi.woff2", variable: "--f-reem", weight: "400 700", display: "swap" });
const plex = localFont({
  src: [
    { path: "../fonts/IBMPlexSansArabic-Regular.woff2", weight: "400" },
    { path: "../fonts/IBMPlexSansArabic-SemiBold.woff2", weight: "600" },
    { path: "../fonts/IBMPlexSansArabic-Bold.woff2", weight: "700" },
  ],
  variable: "--f-plex",
  display: "swap",
});
const amiri = localFont({ src: "../fonts/AmiriQuran-Regular.woff2", variable: "--f-amiri", display: "swap", preload: false });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = dictionaries[locale];
  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: { languages: { en: "/en", ar: "/ar" } },
    icons: { icon: "/icon.svg" },
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = dictionaries[locale];
  return (
    <html lang={locale} dir={dirOf(locale)} className={`${inter.variable} ${manrope.variable} ${reem.variable} ${plex.variable} ${amiri.variable}`}>
      <body>
        <Header locale={locale} t={t} />
        <main id="main">{children}</main>
        <Footer locale={locale} t={t} />
        <WhatsAppButton label={t.footer.whatsapp} />
      </body>
    </html>
  );
}
