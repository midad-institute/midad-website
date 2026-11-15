import { notFound } from "next/navigation";
import { PricingCalculator } from "@/components/PricingCalculator";
import { dictionaries } from "@/lib/content";
import { href, isLocale } from "@/lib/i18n";
import { formatMoney, hourlyRate } from "@/lib/pricing";

export default async function Pricing({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = dictionaries[locale];
  const p = t.pricing;

  return (
    <>
      <section className="container stack gap-16" style={{ paddingBlock: "72px 40px", alignItems: "center", textAlign: "center" }}>
        <span className="badge">{p.badge}</span>
        <h1 className="h1" style={{ fontSize: "clamp(36px, 5vw, 56px)" }}>
          {formatMoney(hourlyRate.USD, "USD", locale)} {p.title1}
          <br />
          {p.title2}
        </h1>
        <p className="lead">{p.lead}</p>
      </section>

      <section className="container" style={{ paddingBottom: 72 }}>
        <PricingCalculator locale={locale} t={p} bookHref={href(locale, "/book")} />
      </section>

      <section className="container" style={{ paddingBottom: 72 }}>
        <h2 className="h2" style={{ fontSize: 32, marginBottom: 24 }}>{p.includedTitle}</h2>
        <div className="grid grid-auto-260">
          {p.included.map(([title, text]) => (
            <div key={title} className="card stack gap-8">
              <p style={{ fontWeight: 700, fontSize: 17 }}>{title}</p>
              <p className="muted" style={{ fontSize: 15 }}>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="container stack gap-12" style={{ maxWidth: 860, paddingBlock: 72 }}>
          <h2 className="h2" style={{ fontSize: 32, marginBottom: 16 }}>{p.faqTitle}</h2>
          {p.faq.map(([q, a]) => (
            <details key={q} className="faq">
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
