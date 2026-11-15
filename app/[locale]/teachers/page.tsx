import Link from "next/link";
import { notFound } from "next/navigation";
import { TeacherGrid } from "@/components/TeacherGrid";
import { dictionaries } from "@/lib/content";
import { href, isLocale } from "@/lib/i18n";
import { teachers } from "@/lib/teachers";

export default async function Teachers({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = dictionaries[locale];
  const tt = t.teachers;

  return (
    <>
      <section className="container" style={{ paddingBlock: "72px 32px" }}>
        <div className="section-head" style={{ marginBottom: 0 }}>
          <p className="eyebrow">{tt.eyebrow}</p>
          <h1 className="h1" style={{ fontSize: "clamp(36px, 5vw, 52px)" }}>{tt.title}</h1>
          <p className="lead">{tt.lead}</p>
        </div>
      </section>

      <section className="container" style={{ paddingBottom: 80 }}>
        {teachers.length > 0 ? (
          <TeacherGrid locale={locale} t={tt} bookHref={href(locale, "/book")} />
        ) : (
          <div className="card row gap-16" style={{ alignItems: "center", justifyContent: "space-between" }}>
            <p style={{ flex: "1 1 360px" }}>{tt.comingSoon}</p>
            <Link href={href(locale, "/book")} className="btn btn-primary">
              {t.nav.book}
            </Link>
          </div>
        )}
      </section>

      <section className="bg-ink">
        <div className="container section">
          <h2 className="h2" style={{ marginBottom: 32 }}>{tt.howTitle}</h2>
          <ol className="grid grid-auto-210" style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {tt.how.map(([title, text], i) => (
              <li key={title} className="stack gap-8" style={{ background: "var(--ink-2)", borderRadius: 20, padding: 24 }}>
                <span className="step-num" style={{ fontSize: 32 }}>{i + 1}</span>
                <p style={{ fontWeight: 700, fontSize: 17 }}>{title}</p>
                <p className="on-ink-muted" style={{ fontSize: 14 }}>{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
