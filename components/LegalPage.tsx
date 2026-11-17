import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { legal, legalUi, LEGAL_UPDATED, type LegalSlug } from "@/lib/legal";

export async function LegalPage({ params, slug }: { params: Promise<{ locale: string }>; slug: LegalSlug }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const doc = legal[locale][slug];
  return (
    <article className="container legal" style={{ paddingBlock: "72px 96px", maxWidth: 780 }}>
      <p className="eyebrow">{legalUi[locale].legal}</p>
      <h1 className="h1" style={{ fontSize: "clamp(34px, 5vw, 48px)", marginBlock: "8px 12px" }}>{doc.title}</h1>
      <p className="muted" style={{ fontSize: 14 }}>
        {legalUi[locale].updated}: {LEGAL_UPDATED[locale]}
      </p>
      <p className="lead" style={{ marginTop: 20 }}>{doc.lead}</p>
      {doc.sections.map((s) => (
        <section key={s.h}>
          <h2>{s.h}</h2>
          {s.body?.map((p) => <p key={p}>{p}</p>)}
          {s.list ? (
            <ul>
              {s.list.map((li) => <li key={li}>{li}</li>)}
            </ul>
          ) : null}
        </section>
      ))}
    </article>
  );
}

export function legalMetadata(slug: LegalSlug) {
  return async ({ params }: { params: Promise<{ locale: string }> }) => {
    const { locale } = await params;
    if (!isLocale(locale)) return {};
    return { title: `${legal[locale][slug].title} — Midad Institute` };
  };
}
