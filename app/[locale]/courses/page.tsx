import Link from "next/link";
import { notFound } from "next/navigation";
import { dictionaries, trackIds } from "@/lib/content";
import { href, isLocale, otherLocale } from "@/lib/i18n";

export default async function Courses({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = dictionaries[locale];
  const c = t.courses;
  const other = otherLocale(locale);

  return (
    <>
      <section className="container" style={{ paddingBlock: "72px 24px" }}>
        <div className="section-head" style={{ marginBottom: 24 }}>
          <p className="eyebrow">{c.eyebrow}</p>
          <h1 className="h1" style={{ fontSize: "clamp(36px, 5vw, 52px)" }}>{c.title}</h1>
          <p className="lead">{c.lead}</p>
        </div>
        <nav aria-label={c.eyebrow} className="row gap-8">
          {trackIds.map((id) => (
            <a key={id} href={`#${id}`} className="pill-choice" style={{ textDecoration: "none" }}>
              {t.tracks[id].name}
            </a>
          ))}
        </nav>
      </section>

      {trackIds.map((id, i) => {
        const tr = t.tracks[id];
        return (
          <section key={id} id={id} className={i % 2 === 0 ? "" : "bg-white"} style={{ scrollMarginTop: 90 }}>
            <div className="container section-tight row gap-40" style={{ alignItems: "flex-start" }}>
              <div className="stack gap-16" style={{ flex: "1 1 320px", minWidth: 0 }}>
                <h2 className="h2">{tr.name}</h2>
                <p lang={other} className="other-lang" style={{ fontSize: 20 }}>{tr.other}</p>
                <p className="muted">{tr.about}</p>
                <div className="card stack gap-8" style={{ padding: 18, fontSize: 14, background: i % 2 === 0 ? "var(--white)" : "var(--paper)" }}>
                  <div className="summary-row"><span className="muted">{c.who}</span><b>{tr.who}</b></div>
                  <div className="summary-row"><span className="muted">{c.pace}</span><b>{tr.pace}</b></div>
                  <div className="summary-row"><span className="muted">{c.award}</span><b>{tr.award}</b></div>
                </div>
                <Link href={href(locale, `/book?track=${id}`)} className="btn btn-primary" style={{ alignSelf: "flex-start" }}>
                  {c.cta}
                </Link>
              </div>
              <ol className="stack gap-12" style={{ flex: "2 1 520px", minWidth: 0, listStyle: "none", padding: 0, margin: 0 }}>
                {tr.levels.map(([title, covers, outcome], n) => (
                  <li key={title} className="card level" style={{ background: i % 2 === 0 ? "var(--white)" : "var(--paper)" }}>
                    <span className="level-num" aria-label={`${c.level} ${n + 1}`}>{n + 1}</span>
                    <div className="stack gap-8" style={{ minWidth: 0 }}>
                      <p style={{ fontSize: 18, fontWeight: 700 }}>{title}</p>
                      <p className="muted" style={{ fontSize: 15 }}>{covers}</p>
                      <p style={{ fontSize: 14, color: "var(--teal)", fontWeight: 600 }}>
                        {c.outcome} {outcome}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        );
      })}
    </>
  );
}
