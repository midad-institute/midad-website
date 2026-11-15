"use client";

import Link from "next/link";
import { useState } from "react";
import { fill, type Dict } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { teachers, type Teacher } from "@/lib/teachers";

type Filter = keyof Dict["teachers"]["filters"];

function matches(t: Teacher, f: Filter) {
  if (f === "all") return true;
  if (f === "male" || f === "female") return t.gender === f;
  return t.tags.includes(f);
}

export function TeacherGrid({ locale, t, bookHref }: { locale: Locale; t: Dict["teachers"]; bookHref: string }) {
  const [filter, setFilter] = useState<Filter>("all");
  const shown = teachers.filter((x) => matches(x, filter));
  const filters = Object.keys(t.filters) as Filter[];

  return (
    <div className="stack gap-24">
      <div role="group" aria-label={t.eyebrow} className="row gap-8">
        {filters.map((f) => (
          <button key={f} type="button" className="pill-choice" aria-pressed={filter === f} onClick={() => setFilter(f)}>
            {t.filters[f]}
          </button>
        ))}
      </div>
      <p className="muted" aria-live="polite" style={{ fontSize: 14 }}>{fill(t.showing, { n: shown.length })}</p>
      <div className="grid grid-auto-300">
        {shown.map((x) => (
          <article key={x.id} className="card stack gap-16">
            <div className="row gap-12" style={{ alignItems: "center" }}>
              {x.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={x.photo} alt="" width={72} height={72} style={{ borderRadius: 999, objectFit: "cover", width: 72, height: 72 }} />
              ) : (
                <div aria-hidden="true" style={{ width: 72, height: 72, borderRadius: 999, background: "var(--mist)" }} />
              )}
              <div className="stack">
                <p style={{ fontSize: 19, fontWeight: 700 }}>{x.name[locale]}</p>
                <p className="muted" style={{ fontSize: 14 }}>{x.role[locale]}</p>
              </div>
            </div>
            <div style={{ background: "var(--paper)", borderRadius: 14, padding: 14 }}>
              <p className="eyebrow" style={{ fontSize: 12 }}>{t.sanad}</p>
              <p className="muted" style={{ fontSize: 14 }}>{x.sanad[locale]}</p>
            </div>
            {x.recitation ? <audio controls preload="none" src={x.recitation} style={{ width: "100%" }} aria-label={t.listen} /> : null}
            <Link href={bookHref} className="btn btn-primary" style={{ marginTop: "auto" }}>
              {t.trial}
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
