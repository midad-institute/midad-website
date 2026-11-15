import Link from "next/link";
import { notFound } from "next/navigation";
import { dictionaries, fill, trackIds } from "@/lib/content";
import { href, isLocale, otherLocale } from "@/lib/i18n";
import { formatMoney, hourlyRate, monthlyPrice } from "@/lib/pricing";
import { testimonials } from "@/lib/teachers";

const trustIcons = [
  <path key="a" d="M12 2l3 6 6 .9-4.5 4.3 1 6.3L12 16.6 6.5 19.5l1-6.3L3 8.9 9 8z" />,
  <path key="b" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h8M8 17h5" />,
  <path key="c" d="M12 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8zM4 21c0-4 4-6 8-6s8 2 8 6" />,
  <path key="d" d="M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18zM12 7v5l3 3" />,
];

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = dictionaries[locale];
  const h = t.home;
  const other = otherLocale(locale);

  return (
    <>
      <section className="container hero">
        <div className="stack gap-24">
          <p className="pill">{h.badge}</p>
          <h1 className="h1">
            {h.title1}
            <br />
            {h.title2}
          </h1>
          <p lang={other} className="other-lang" style={{ fontSize: 24 }}>
            {h.subtitleOther}
          </p>
          <p className="lead">{h.lead}</p>
          <div className="row gap-12">
            <Link href={href(locale, "/book")} className="btn btn-primary btn-lg">
              {h.ctaPrimary}
            </Link>
            <Link href={href(locale, "/courses")} className="btn btn-outline btn-lg">
              {h.ctaSecondary}
            </Link>
          </div>
          <p className="muted" style={{ fontSize: 14 }}>
            {h.reassurance}
          </p>
        </div>

        <div>
          <div className="card report-card">
            <div className="row" style={{ justifyContent: "space-between", alignItems: "center" }}>
              <div className="stack">
                <p className="muted" style={{ fontSize: 13, fontWeight: 600 }}>{h.report.label}</p>
                <p className="h3">{h.report.title}</p>
              </div>
              <span className="chip-success">{h.report.grade}</span>
            </div>
            <div className="bg-ink" style={{ borderRadius: 16, padding: 18, textAlign: "center" }}>
              <p lang="ar" className="quran">تَبَٰرَكَ ٱلَّذِى بِيَدِهِ ٱلْمُلْكُ</p>
              <p className="on-ink-muted" style={{ fontSize: 12 }}>{h.report.verseRef}</p>
            </div>
            <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div className="mini-stat">
                <p className="muted" style={{ fontSize: 12 }}>{h.report.memorizedLabel}</p>
                <p style={{ fontWeight: 700 }}>{h.report.memorized}</p>
              </div>
              <div className="mini-stat">
                <p className="muted" style={{ fontSize: 12 }}>{h.report.revisionLabel}</p>
                <p style={{ fontWeight: 700 }}>{h.report.revision}</p>
              </div>
            </div>
            <div className="stack gap-8">
              <p style={{ fontSize: 13, fontWeight: 600 }}>{h.report.noteLabel}</p>
              <p className="muted" style={{ fontSize: 14 }}>{h.report.note}</p>
            </div>
            <p className="muted" style={{ fontSize: 13, borderTop: "1px solid var(--mist)", paddingTop: 14 }}>{h.report.footer}</p>
          </div>
        </div>
      </section>

      <section className="bg-ink">
        <div className="container trust-strip">
          {h.trust.map((item, i) => (
            <div key={item}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C8913A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {trustIcons[i]}
              </svg>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="container section">
        <div className="section-head">
          <p className="eyebrow">{h.tracksEyebrow}</p>
          <h2 className="h2">{h.tracksTitle}</h2>
          <p className="lead">{h.tracksLead}</p>
        </div>
        <div className="grid grid-auto-210">
          {trackIds.map((id) => {
            const tr = t.tracks[id];
            return (
              <Link key={id} href={href(locale, `/courses#${id}`)} className="card track-card">
                <span lang={other} className="other-lang">{tr.other}</span>
                <span className="h3">{tr.name}</span>
                <span className="muted" style={{ fontSize: 14 }}>{tr.card}</span>
                <span className="muted" style={{ fontSize: 12, fontWeight: 600 }}>{tr.ages}</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-white">
        <div className="container section hero" style={{ paddingBlock: 88 }}>
          <div className="stack gap-16">
            <p className="eyebrow">{h.parentsEyebrow}</p>
            <h2 className="h2">{h.parentsTitle}</h2>
            <p className="lead">{h.parentsLead}</p>
            <ul style={{ margin: 0, paddingInlineStart: 20, lineHeight: 2 }}>
              {h.parentsPoints.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
          <div className="stack gap-16" style={{ background: "var(--paper)", borderRadius: 24, padding: 28 }}>
            <p className="h3">{h.mapTitle}</p>
            <div className="juz-grid" aria-hidden="true">
              {Array.from({ length: 30 }, (_, i) => i + 1).map((n) => (
                <div key={n} className={`juz ${n >= 29 ? "juz-done" : n === 28 ? "juz-active" : "juz-todo"}`}>{n}</div>
              ))}
            </div>
            <div className="legend">
              <span><i style={{ background: "var(--teal)" }} />{h.legend.done}</span>
              <span><i style={{ background: "var(--saffron)" }} />{h.legend.active}</span>
              <span><i style={{ background: "var(--mist)", border: "1px solid #c9cfd3" }} />{h.legend.todo}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="container section">
        <h2 className="h2" style={{ marginBottom: 40 }}>{h.stepsTitle}</h2>
        <ol className="grid grid-auto-260" style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {h.steps.map((s, i) => (
            <li key={s.title} className="card stack gap-12" style={{ padding: 28 }}>
              <span className="step-num">{i + 1}</span>
              <p className="h3">{s.title}</p>
              <p className="muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="container section" style={{ paddingTop: 0 }}>
        <div className="stack gap-12" style={{ alignItems: "center", textAlign: "center", marginBottom: 40 }}>
          <span className="badge">{h.pricingBadge}</span>
          <h2 className="h2">
            {formatMoney(hourlyRate.USD, "USD", locale)} {h.perHour}. {h.pricingTitle}
          </h2>
          <p className="lead">{h.pricingLead}</p>
        </div>
        <div className="grid grid-auto-260">
          {h.plans.map((plan) => {
            const price = monthlyPrice({ minutes: 30, perWeek: plan.perWeek, students: 1, currency: "USD" });
            const featured = "popular" in plan && plan.popular;
            return (
              <div key={plan.name} className={`plan${featured ? " plan-featured" : ""}`}>
                <div className="row" style={{ justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                  <p style={{ fontSize: 18, fontWeight: 700 }}>{plan.name}</p>
                  {featured ? <span className="badge" style={{ fontSize: 12 }}>{h.mostPopular}</span> : null}
                </div>
                <p>
                  <span className="price">{formatMoney(price.total, "USD", locale)}</span>{" "}
                  <span className={featured ? "on-ink-muted" : "muted"}>{h.perMonth}</span>
                </p>
                <p className={featured ? "on-ink-muted" : "muted"}>{fill(h.classesAWeek, { n: plan.perWeek, m: plan.perWeek * 4 })}</p>
                <Link href={href(locale, "/book")} className={`btn ${featured ? "btn-light" : "btn-outline"}`} style={{ marginTop: "auto" }}>
                  {h.startFree}
                </Link>
              </div>
            );
          })}
        </div>
        <p className="muted" style={{ textAlign: "center", marginTop: 20, fontSize: 14 }}>
          {h.pricingNote} · <Link href={href(locale, "/pricing")}>{t.nav.pricing}</Link>
        </p>
      </section>

      {testimonials.length > 0 ? (
        <section className="bg-white">
          <div className="container section">
            <h2 className="h2" style={{ marginBottom: 40 }}>{h.testimonialsTitle}</h2>
            <div className="grid grid-auto-300">
              {testimonials.map((q) => (
                <figure key={q.name} className="card stack gap-16" style={{ margin: 0, background: "var(--paper)" }}>
                  <blockquote style={{ margin: 0, fontSize: 17 }}>“{q.quote[locale]}”</blockquote>
                  <figcaption className="muted" style={{ fontSize: 14 }}>{q.name} · {q.place}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="container section">
        <div className="cta-band">
          <div className="stack gap-12" style={{ flex: "1 1 420px" }}>
            <h2 className="h2">{h.ctaTitle}</h2>
            <p style={{ fontSize: 17, color: "#E3EFEE" }}>{h.ctaLead}</p>
          </div>
          <Link href={href(locale, "/book")} className="btn btn-light btn-lg">
            {t.nav.book}
          </Link>
        </div>
      </section>
    </>
  );
}
