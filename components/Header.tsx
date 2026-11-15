"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LogoMark } from "./Logo";
import type { Dict } from "@/lib/content";
import { href, otherLocale, type Locale } from "@/lib/i18n";

export function Header({ locale, t }: { locale: Locale; t: Dict }) {
  const pathname = usePathname() || `/${locale}`;
  const [open, setOpen] = useState(false);
  const rest = pathname.replace(/^\/(en|ar)/, "") || "/";
  const switchHref = href(otherLocale(locale), rest);
  const links = [
    { path: "/courses", label: t.nav.courses },
    { path: "/teachers", label: t.nav.teachers },
    { path: "/pricing", label: t.nav.pricing },
  ];

  return (
    <header className="site-header">
      <div className="container">
        <Link href={href(locale, "/")} className="logo" aria-label={t.nav.home}>
          <LogoMark />
          <span className="logo-word">
            <b>{t.brand.short}</b>
            <small>{t.brand.sub}</small>
          </span>
        </Link>

        <nav aria-label={t.nav.main} className={`main-nav${open ? " open" : ""}`} id="main-nav">
          {links.map((l) => {
            const target = href(locale, l.path);
            return (
              <Link key={l.path} href={target} aria-current={pathname === target ? "page" : undefined} onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            );
          })}
          <Link href={href(locale, "/book")} className="nav-book-mobile" onClick={() => setOpen(false)}>
            {t.nav.book}
          </Link>
        </nav>

        <div className="header-actions">
          <Link href={switchHref} className="lang-switch" lang={otherLocale(locale)} hrefLang={otherLocale(locale)}>
            {t.nav.switchTo}
          </Link>
          <Link href={href(locale, "/book")} className="btn btn-primary">
            {t.nav.book}
          </Link>
          <button type="button" className="menu-toggle" aria-expanded={open} aria-controls="main-nav" aria-label={t.nav.menu} onClick={() => setOpen(!open)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
