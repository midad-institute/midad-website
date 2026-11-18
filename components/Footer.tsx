import Link from "next/link";
import { LogoMark } from "./Logo";
import type { Dict } from "@/lib/content";
import { href, type Locale } from "@/lib/i18n";
import { CONTACT_EMAIL, legal, legalUi } from "@/lib/legal";

export function Footer({ locale, t }: { locale: Locale; t: Dict }) {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || CONTACT_EMAIL;
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="stack gap-12" style={{ maxWidth: 340 }}>
          <div className="row gap-12" style={{ alignItems: "center" }}>
            <LogoMark size={40} stroke="#F6F3EC" drop="#C8913A" />
            <span style={{ fontFamily: "var(--font-latin-display)", fontSize: 20, fontWeight: 800, color: "var(--paper)" }}>Midad Institute</span>
          </div>
          <p lang="ar" style={{ fontFamily: "var(--font-arabic-display)", fontSize: 18, color: "var(--paper)" }}>
            معهد مِداد للقرآن والعربية
          </p>
          <p>{t.footer.about}</p>
        </div>
        <nav aria-label={t.footer.learn} className="row gap-40">
          <div className="stack gap-8">
            <h2>{t.footer.learn}</h2>
            <Link href={href(locale, "/courses")}>{t.nav.courses}</Link>
            <Link href={href(locale, "/pricing")}>{t.nav.pricing}</Link>
            <Link href={href(locale, "/book")}>{t.nav.book}</Link>
          </div>
          <div className="stack gap-8">
            <h2>{t.footer.institute}</h2>
            <Link href={href(locale, "/teachers")}>{t.nav.teachers}</Link>
            {email ? <a href={`mailto:${email}`}>{email}</a> : null}
            {whatsapp ? (
              <a href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`} dir="ltr">
                WhatsApp
              </a>
            ) : null}
          </div>
          <div className="stack gap-8">
            <h2>{legalUi[locale].legal}</h2>
            <Link href={href(locale, "/terms")}>{legal[locale].terms.title}</Link>
            <Link href={href(locale, "/privacy")}>{legal[locale].privacy.title}</Link>
            <Link href={href(locale, "/safeguarding")}>{legal[locale].safeguarding.title}</Link>
          </div>
        </nav>
      </div>
      <div className="container" style={{ borderTop: "1px solid var(--ink-3)", paddingBlock: 20, fontSize: 13 }}>
        © {new Date().getFullYear()} Midad Institute · {t.footer.rights}
      </div>
    </footer>
  );
}

export function WhatsAppButton({ label }: { label: string }) {
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  if (!whatsapp) return null;
  return (
    <a href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`} className="wa-float" aria-label={label} title={label} target="_blank" rel="noopener noreferrer">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 12a9 9 0 0 1-13.5 7.8L3 21l1.2-4.5A9 9 0 1 1 21 12z" />
      </svg>
    </a>
  );
}
