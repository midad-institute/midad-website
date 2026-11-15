"use client";

import Link from "next/link";
import { useState } from "react";
import type { Dict } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { classesPerWeekOptions, classLengths, formatMoney, hourlyRate, monthlyPrice, type Currency } from "@/lib/pricing";

export function PricingCalculator({ locale, t, bookHref }: { locale: Locale; t: Dict["pricing"]; bookHref: string }) {
  const [currency, setCurrency] = useState<Currency>("USD");
  const [minutes, setMinutes] = useState<number>(30);
  const [perWeek, setPerWeek] = useState<number>(3);
  const [students, setStudents] = useState(1);
  const p = monthlyPrice({ minutes, perWeek, students, currency });
  const money = (n: number) => formatMoney(n, currency, locale);

  return (
    <div className="card row gap-40" style={{ borderRadius: 28, padding: "clamp(24px, 4vw, 40px)" }}>
      <div className="stack gap-24" style={{ flex: "1 1 480px", minWidth: 0 }}>
        <div className="stack gap-12">
          <p style={{ fontWeight: 700 }}>{t.currency}</p>
          <div role="group" aria-label={t.currency} className="row gap-8">
            {(Object.keys(hourlyRate) as Currency[]).map((c) => (
              <button key={c} type="button" className="pill-choice" aria-pressed={currency === c} onClick={() => setCurrency(c)} dir="ltr">
                {c} · {formatMoney(hourlyRate[c], c, locale)}
              </button>
            ))}
          </div>
        </div>
        <div className="stack gap-12">
          <p style={{ fontWeight: 700 }}>{t.step1}</p>
          <div role="group" aria-label={t.step1} className="row gap-8">
            {classLengths.map((m) => (
              <button key={m} type="button" className="choice choice-solid" style={{ minWidth: 110, textAlign: "center" }} aria-pressed={minutes === m} onClick={() => setMinutes(m)}>
                {m} {t.minutes}
              </button>
            ))}
          </div>
          <p className="muted" style={{ fontSize: 14 }}>{t.step1Hint}</p>
        </div>
        <div className="stack gap-12">
          <p style={{ fontWeight: 700 }}>{t.step2}</p>
          <div role="group" aria-label={t.step2} className="row gap-8">
            {classesPerWeekOptions.map((n) => (
              <button key={n} type="button" className="choice choice-solid" style={{ width: 60, height: 60, textAlign: "center", fontSize: 20 }} aria-pressed={perWeek === n} onClick={() => setPerWeek(n)}>
                {n}
              </button>
            ))}
          </div>
          <p className="muted" style={{ fontSize: 14 }}>{t.step2Hint}</p>
        </div>
        <div className="stack gap-12">
          <p style={{ fontWeight: 700 }}>{t.step3}</p>
          <div className="row gap-16" style={{ alignItems: "center" }}>
            <button type="button" className="round-btn" aria-label={t.fewer} onClick={() => setStudents(Math.max(1, students - 1))}>−</button>
            <p aria-live="polite" style={{ fontSize: 28, fontWeight: 800, minWidth: 32, textAlign: "center" }}>{students}</p>
            <button type="button" className="round-btn" aria-label={t.more} onClick={() => setStudents(Math.min(6, students + 1))}>+</button>
            <p className="muted" style={{ fontSize: 14 }}>{t.step3Hint}</p>
          </div>
        </div>
      </div>

      <div className="bg-ink stack gap-16" style={{ flex: "1 1 320px", minWidth: 0, borderRadius: 24, padding: 32 }}>
        <p className="eyebrow">{t.yourPlan}</p>
        <p aria-live="polite">
          <span className="price" style={{ fontSize: 56 }}>{money(p.total)}</span>{" "}
          <span className="on-ink-muted">{t.perMonth}</span>
        </p>
        <div className="stack gap-8 on-ink-muted" style={{ borderTop: "1px solid var(--ink-3)", paddingTop: 16 }}>
          <div className="summary-row"><span>{t.classesPerMonth}</span><b style={{ color: "var(--paper)" }}>{p.classes}</b></div>
          <div className="summary-row"><span>{t.hoursPerMonth}</span><b style={{ color: "var(--paper)" }}>{Number.isInteger(p.hours) ? p.hours : p.hours.toFixed(1)}</b></div>
          <div className="summary-row"><span>{t.rate}</span><b style={{ color: "var(--paper)" }}>{money(hourlyRate[currency])} {t.perHour}</b></div>
          <div className="summary-row"><span>{t.students}</span><b style={{ color: "var(--paper)" }}>{students}</b></div>
        </div>
        <Link href={bookHref} className="btn btn-light btn-lg">{t.startFree}</Link>
        <p className="on-ink-muted" style={{ fontSize: 13, textAlign: "center" }}>{t.planNote}</p>
      </div>
    </div>
  );
}
