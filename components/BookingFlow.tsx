"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Dict, TrackId } from "@/lib/content";
import { fill, trackIds } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { trialDays, type Day } from "@/lib/availability";
import { legal, legalUi } from "@/lib/legal";
import { href } from "@/lib/i18n";

type Props = { locale: Locale; t: Dict; initialTrack?: TrackId; homeHref: string };

export function BookingFlow({ locale, t, initialTrack, homeHref }: Props) {
  const b = t.book;
  const intlLocale = locale === "ar" ? "ar-EG-u-nu-latn" : "en";
  const [step, setStep] = useState(1);
  const [who, setWho] = useState(1);
  const [age, setAge] = useState(1);
  const [track, setTrack] = useState<TrackId>(initialTrack ?? "tajweed");
  const [teacher, setTeacher] = useState(2);
  const [timeZone, setTimeZone] = useState("UTC");
  const [days, setDays] = useState<Day[]>([]);
  const [dayIndex, setDayIndex] = useState(0);
  const [slot, setSlot] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", student: "", email: "", whatsapp: "", notes: "", website: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
    setTimeZone(tz);
    setDays(trialDays(tz));
  }, []);

  const fmtTime = useMemo(() => new Intl.DateTimeFormat(intlLocale, { hour: "numeric", minute: "2-digit", timeZone }), [intlLocale, timeZone]);
  const fmtWeekday = useMemo(() => new Intl.DateTimeFormat(intlLocale, { weekday: "short", timeZone }), [intlLocale, timeZone]);
  const fmtDayNum = useMemo(() => new Intl.DateTimeFormat(intlLocale, { day: "numeric", timeZone }), [intlLocale, timeZone]);
  const fmtFull = useMemo(() => new Intl.DateTimeFormat(intlLocale, { weekday: "short", day: "numeric", month: "short", hour: "numeric", minute: "2-digit", timeZone }), [intlLocale, timeZone]);

  const day = days[dayIndex];
  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [k]: e.target.value });

  async function submit() {
    setError("");
    if (!form.name.trim() || !form.email.trim() || !form.whatsapp.trim()) return setError(b.required);
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) return setError(b.invalidEmail);
    setStatus("sending");
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locale,
          who: ["self", "child", "children"][who],
          ageGroup: ["5-8", "9-12", "13-17", "adult"][age],
          track,
          teacherPreference: ["male", "female", "any"][teacher],
          slotUtc: slot ? new Date(slot).toISOString() : null,
          timeZone,
          ...form,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("done");
    } catch {
      setStatus("idle");
      setError(b.error);
    }
  }

  if (status === "done") {
    return (
      <div className="card stack gap-16" style={{ alignItems: "center", textAlign: "center", padding: "56px 32px", borderRadius: 28 }}>
        <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="M7 12.5l3.2 3L17 9" />
        </svg>
        <h2 className="h2">{b.doneTitle}</h2>
        <p className="lead" style={{ marginInline: "auto" }}>
          {slot ? `${fmtFull.format(slot)} · ` : ""}
          {t.tracks[track].name}. {b.doneText}
        </p>
        <div className="row gap-12" style={{ justifyContent: "center" }}>
          <button type="button" className="btn btn-outline" onClick={() => { setStatus("idle"); setStep(1); setSlot(null); setForm({ ...form, student: "", notes: "" }); }}>
            {b.another}
          </button>
          <Link href={homeHref} className="btn btn-primary">{b.home}</Link>
        </div>
      </div>
    );
  }

  const canContinue = step !== 3 || slot !== null;

  return (
    <div className="stack gap-24">
      <ol className="progress" aria-label={b.title}>
        {b.steps.map((label, i) => (
          <li key={label} className={i < step ? "reached" : ""} aria-current={i + 1 === step ? "step" : undefined}>{label}</li>
        ))}
      </ol>

      <div className="row gap-24" style={{ alignItems: "flex-start" }}>
        <div className="card stack gap-24" style={{ flex: "2 1 560px", minWidth: 0, borderRadius: 28, padding: "clamp(22px, 4vw, 36px)" }}>
          {step === 1 && (
            <>
              <h2 className="h2" style={{ fontSize: 26 }}>{b.whoTitle}</h2>
              <div role="group" aria-label={b.whoTitle} className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 10 }}>
                {b.who.map((label, i) => (
                  <button key={label} type="button" className="choice" aria-pressed={who === i} onClick={() => setWho(i)} style={{ padding: 20 }}>{label}</button>
                ))}
              </div>
              <p style={{ fontWeight: 700 }}>{b.ageTitle}</p>
              <div role="group" aria-label={b.ageTitle} className="row gap-8">
                {b.ages.map((label, i) => (
                  <button key={label} type="button" className="pill-choice" aria-pressed={age === i} onClick={() => setAge(i)}>{label}</button>
                ))}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="h2" style={{ fontSize: 26 }}>{b.trackTitle}</h2>
              <div role="group" aria-label={b.trackTitle} className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10 }}>
                {trackIds.map((id) => (
                  <button key={id} type="button" className="choice" aria-pressed={track === id} onClick={() => setTrack(id)}>{t.tracks[id].name}</button>
                ))}
              </div>
              <p style={{ fontWeight: 700 }}>{b.teacherTitle}</p>
              <div role="group" aria-label={b.teacherTitle} className="row gap-8">
                {b.teacher.map((label, i) => (
                  <button key={label} type="button" className="pill-choice" aria-pressed={teacher === i} onClick={() => setTeacher(i)}>{label}</button>
                ))}
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="h2" style={{ fontSize: 26 }}>{b.timeTitle}</h2>
              <p className="muted" style={{ background: "var(--paper)", borderRadius: 12, padding: "12px 14px", fontSize: 14 }}>{fill(b.timeZone, { tz: timeZone.replace(/_/g, " ") })}</p>
              <div role="group" aria-label={b.timeTitle} className="grid" style={{ gridTemplateColumns: "repeat(7, minmax(0, 1fr))", gap: 8 }}>
                {days.map((d, i) => (
                  <button key={d.key} type="button" className="choice choice-solid" aria-pressed={dayIndex === i} onClick={() => { setDayIndex(i); setSlot(null); }} style={{ padding: "10px 2px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <span style={{ fontSize: 12 }}>{fmtWeekday.format(d.slots[0].utc)}</span>
                    <span style={{ fontSize: 20, fontWeight: 800 }}>{fmtDayNum.format(d.slots[0].utc)}</span>
                  </button>
                ))}
              </div>
              {day && day.slots.length > 0 ? (
                <div role="group" aria-label={b.timeTitle} className="grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))", gap: 8 }}>
                  {day.slots.map((s) => (
                    <button key={s.utc} type="button" className="choice" aria-pressed={slot === s.utc} onClick={() => setSlot(s.utc)} style={{ textAlign: "center" }} dir="ltr">
                      {fmtTime.format(s.utc)}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="muted">{b.noSlots}</p>
              )}
            </>
          )}

          {step === 4 && (
            <form className="stack gap-16" onSubmit={(e) => { e.preventDefault(); submit(); }} noValidate>
              <h2 className="h2" style={{ fontSize: 26 }}>{b.detailsTitle}</h2>
              <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
                <div className="field"><label htmlFor="bk-name">{b.name}</label><input id="bk-name" className="input" autoComplete="name" required value={form.name} onChange={update("name")} /></div>
                <div className="field"><label htmlFor="bk-student">{b.student}</label><input id="bk-student" className="input" value={form.student} onChange={update("student")} /></div>
                <div className="field"><label htmlFor="bk-email">{b.email}</label><input id="bk-email" className="input" type="email" dir="ltr" autoComplete="email" required value={form.email} onChange={update("email")} /></div>
                <div className="field"><label htmlFor="bk-wa">{b.whatsapp}</label><input id="bk-wa" className="input" type="tel" dir="ltr" autoComplete="tel" required placeholder="+1 555 123 4567" value={form.whatsapp} onChange={update("whatsapp")} /></div>
              </div>
              <div className="field"><label htmlFor="bk-notes">{b.notes}</label><textarea id="bk-notes" className="input" rows={3} value={form.notes} onChange={update("notes")} /></div>
              <div className="visually-hidden" aria-hidden="true">
                <label htmlFor="bk-website">Website</label>
                <input id="bk-website" tabIndex={-1} autoComplete="off" value={form.website} onChange={update("website")} />
              </div>
              <p className="booking-agree">
                {legalUi[locale].agree.split(/(\{terms\}|\{privacy\})/).map((part, i) =>
                  part === "{terms}" ? <Link key={i} href={href(locale, "/terms")} target="_blank">{legal[locale].terms.title}</Link>
                  : part === "{privacy}" ? <Link key={i} href={href(locale, "/privacy")} target="_blank">{legal[locale].privacy.title}</Link>
                  : part,
                )}
              </p>
              {error ? <p className="error" role="alert">{error}</p> : null}
              <button type="submit" hidden />
            </form>
          )}

          <div className="row" style={{ justifyContent: "space-between", gap: 12, borderTop: "1px solid var(--mist)", paddingTop: 22 }}>
            {step > 1 ? <button type="button" className="btn btn-outline" onClick={() => setStep(step - 1)}>{b.back}</button> : <span />}
            {step < 4 ? (
              <button type="button" className="btn btn-primary" disabled={!canContinue} onClick={() => setStep(step + 1)}>{b.next}</button>
            ) : (
              <button type="button" className="btn btn-primary" disabled={status === "sending"} onClick={submit}>{status === "sending" ? b.sending : b.submit}</button>
            )}
          </div>
        </div>

        <aside aria-label={b.summaryTitle} className="bg-ink stack gap-16" style={{ flex: "1 1 280px", minWidth: 0, borderRadius: 28, padding: 28 }}>
          <p className="eyebrow">{b.summaryTitle}</p>
          <div className="stack gap-12" style={{ fontSize: 15 }}>
            <div className="summary-row"><span className="on-ink-muted">{b.summary.for}</span><b>{b.who[who]} · {b.ages[age]}</b></div>
            <div className="summary-row"><span className="on-ink-muted">{b.summary.track}</span><b>{t.tracks[track].name}</b></div>
            <div className="summary-row"><span className="on-ink-muted">{b.summary.teacher}</span><b>{b.teacher[teacher]}</b></div>
            <div className="summary-row"><span className="on-ink-muted">{b.summary.when}</span><b>{slot ? fmtFull.format(slot) : b.notChosen}</b></div>
            <div className="summary-row"><span className="on-ink-muted">{b.summary.length}</span><b>{b.length}</b></div>
          </div>
          <ul className="on-ink-muted" style={{ margin: 0, paddingInlineStart: 20, fontSize: 14, lineHeight: 1.9 }}>
            {b.includes.map((x) => <li key={x}>{x}</li>)}
          </ul>
        </aside>
      </div>
    </div>
  );
}
