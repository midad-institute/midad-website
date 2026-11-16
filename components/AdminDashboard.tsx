"use client";

import type { Session } from "@supabase/supabase-js";
import { useCallback, useEffect, useMemo, useState } from "react";
import { dictionaries, type TrackId } from "@/lib/content";
import { supabaseBrowser } from "@/lib/supabase-browser";

type Status = "new" | "confirmed" | "done" | "no_show" | "subscribed" | "cancelled";
type Booking = {
  id: string;
  created_at: string;
  status: Status;
  locale: string;
  who: string | null;
  age_group: string | null;
  track: TrackId;
  teacher_preference: string | null;
  slot_utc: string;
  time_zone: string | null;
  parent_name: string;
  student_name: string | null;
  email: string;
  whatsapp: string;
  notes: string | null;
  assigned_teacher: string | null;
};

const STATUS: Record<Status, { label: string; bg: string; fg: string }> = {
  new: { label: "جديد", bg: "#F9EEDA", fg: "#8A5A12" },
  confirmed: { label: "مؤكَّد", bg: "#E7F1FB", fg: "#1D4E89" },
  done: { label: "تمت الحصة", bg: "#E5F4E4", fg: "#1D5B2A" },
  subscribed: { label: "اشترك ✓", bg: "#1F6F6B", fg: "#FFFFFF" },
  no_show: { label: "لم يحضر", bg: "#FBEBEB", fg: "#9B1C1C" },
  cancelled: { label: "أُلغي", bg: "#E3E8EA", fg: "#4A5560" },
};
const ORDER: Status[] = ["new", "confirmed", "done", "subscribed", "no_show", "cancelled"];
const WHO: Record<string, string> = { self: "لنفسه", child: "لطفل", children: "لأكثر من طفل" };
const TEACHER: Record<string, string> = { male: "معلم", female: "معلمة", any: "لا يهم" };
const AGE: Record<string, string> = { "5-8": "5–8 سنوات", "9-12": "9–12 سنة", "13-17": "13–17 سنة", adult: "بالغ" };

const cairo = new Intl.DateTimeFormat("ar-EG-u-nu-latn", { timeZone: "Africa/Cairo", weekday: "long", day: "numeric", month: "long", hour: "numeric", minute: "2-digit" });
const short = new Intl.DateTimeFormat("ar-EG-u-nu-latn", { timeZone: "Africa/Cairo", day: "numeric", month: "short", hour: "numeric", minute: "2-digit" });

function localTime(utc: string, tz: string | null) {
  if (!tz) return "";
  try {
    return new Intl.DateTimeFormat("en-GB", { timeZone: tz, weekday: "short", hour: "2-digit", minute: "2-digit" }).format(new Date(utc));
  } catch {
    return "";
  }
}

export function AdminDashboard() {
  const supabase = useMemo(() => supabaseBrowser(), []);
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!supabase) return setReady(true);
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, [supabase]);

  if (!supabase) return <p className="error">لوحة الإدارة غير مفعّلة بعد: متغيّرات Supabase العامة غير مضبوطة.</p>;
  if (!ready) return <p className="muted">جارٍ التحميل…</p>;
  if (!session) return <Login />;
  return <Bookings email={session.user.email ?? ""} />;
}

function Login() {
  const supabase = supabaseBrowser()!;
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<{ kind: "error" | "ok"; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setBusy(true);
    const creds = { email: email.trim().toLowerCase(), password };
    const { error } = mode === "in" ? await supabase.auth.signInWithPassword(creds) : await supabase.auth.signUp(creds);
    setBusy(false);
    if (error) {
      const text = /confirm/i.test(error.message)
        ? "الحساب لم يُفعَّل بعد. أخبر Claude ليفعّله، أو افتح رابط التفعيل من بريدك."
        : /invalid/i.test(error.message)
          ? "البريد أو كلمة المرور غير صحيحة."
          : error.message;
      return setMsg({ kind: "error", text });
    }
    if (mode === "up") setMsg({ kind: "ok", text: "تم إنشاء الحساب. بعد تفعيله سجّل الدخول بنفس البيانات." });
  }

  return (
    <div className="card stack gap-16" style={{ maxWidth: 440, marginInline: "auto", padding: 32, borderRadius: 24 }}>
      <h1 className="h2" style={{ fontSize: 28 }}>لوحة الإدارة</h1>
      <p className="muted">{mode === "in" ? "سجّل الدخول لعرض الحجوزات." : "أنشئ كلمة مرور لحساب الإدارة (مرة واحدة فقط)."}</p>
      <form className="stack gap-12" onSubmit={submit}>
        <div className="field">
          <label htmlFor="ad-email">البريد الإلكتروني</label>
          <input id="ad-email" className="input" type="email" dir="ltr" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="ad-pass">كلمة المرور</label>
          <input id="ad-pass" className="input" type="password" dir="ltr" autoComplete={mode === "in" ? "current-password" : "new-password"} minLength={8} required value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {msg ? <p className={msg.kind === "error" ? "error" : "chip-success"} role="alert" style={{ borderRadius: 12, padding: "12px 14px" }}>{msg.text}</p> : null}
        <button type="submit" className="btn btn-primary" disabled={busy}>{busy ? "…" : mode === "in" ? "دخول" : "إنشاء الحساب"}</button>
      </form>
      <button type="button" className="btn btn-outline" onClick={() => { setMode(mode === "in" ? "up" : "in"); setMsg(null); }}>
        {mode === "in" ? "أول مرة؟ أنشئ كلمة مرور" : "لديّ حساب — تسجيل الدخول"}
      </button>
    </div>
  );
}

function Bookings({ email }: { email: string }) {
  const supabase = supabaseBrowser()!;
  const t = dictionaries.ar;
  const [rows, setRows] = useState<Booking[]>([]);
  const [admin, setAdmin] = useState<boolean | null>(null);
  const [filter, setFilter] = useState<"upcoming" | Status | "all">("upcoming");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    const [{ data: isAdmin }, { data, error: err }] = await Promise.all([
      supabase.rpc("is_admin"),
      supabase.from("trial_bookings").select("*").order("slot_utc", { ascending: true }).limit(500),
    ]);
    setAdmin(Boolean(isAdmin));
    if (err) setError(err.message);
    setRows((data as Booking[]) ?? []);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    load();
  }, [load]);

  async function update(id: string, patch: Partial<Booking>) {
    setRows((r) => r.map((b) => (b.id === id ? { ...b, ...patch } : b)));
    const { error: err } = await supabase.from("trial_bookings").update(patch).eq("id", id);
    if (err) {
      setError(err.message);
      load();
    }
  }

  const now = Date.now();
  const counts = useMemo(() => {
    const c: Record<string, number> = { upcoming: 0, all: rows.length };
    for (const b of rows) {
      c[b.status] = (c[b.status] ?? 0) + 1;
      if ((b.status === "new" || b.status === "confirmed") && Date.parse(b.slot_utc) > now - 3600_000) c.upcoming++;
    }
    return c;
  }, [rows, now]);

  const shown = rows.filter((b) => {
    if (filter === "all") return true;
    if (filter === "upcoming") return (b.status === "new" || b.status === "confirmed") && Date.parse(b.slot_utc) > now - 3600_000;
    return b.status === filter;
  });
  if (filter !== "upcoming") shown.reverse();

  if (admin === false) {
    return (
      <div className="card stack gap-12" style={{ maxWidth: 520, marginInline: "auto" }}>
        <p>الحساب <b dir="ltr">{email}</b> ليس من حسابات الإدارة.</p>
        <button type="button" className="btn btn-outline" onClick={() => supabase.auth.signOut()}>تسجيل الخروج</button>
      </div>
    );
  }

  return (
    <div className="stack gap-24">
      <div className="row" style={{ justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <div className="stack">
          <h1 className="h2" style={{ fontSize: 32 }}>حجوزات الحصة المجانية</h1>
          <p className="muted" style={{ fontSize: 14 }}>كل المواعيد بتوقيت القاهرة · <span dir="ltr">{email}</span></p>
        </div>
        <div className="row gap-8">
          <button type="button" className="btn btn-outline" onClick={load} disabled={loading}>{loading ? "…" : "تحديث"}</button>
          <button type="button" className="btn btn-outline" onClick={() => supabase.auth.signOut()}>خروج</button>
        </div>
      </div>

      <div role="group" aria-label="تصفية" className="row gap-8">
        {(["upcoming", ...ORDER, "all"] as const).map((f) => (
          <button key={f} type="button" className="pill-choice" aria-pressed={filter === f} onClick={() => setFilter(f)}>
            {f === "upcoming" ? "القادمة" : f === "all" ? "الكل" : STATUS[f].label} ({counts[f] ?? 0})
          </button>
        ))}
      </div>

      {error ? <p className="error" role="alert">{error}</p> : null}
      {!loading && shown.length === 0 ? <p className="card muted">لا توجد حجوزات هنا.</p> : null}

      <div className="stack gap-12">
        {shown.map((b) => {
          const st = STATUS[b.status];
          const wa = b.whatsapp.replace(/\D/g, "");
          const local = localTime(b.slot_utc, b.time_zone);
          const greeting = `السلام عليكم ${b.parent_name}، معكم معهد مِداد. نؤكد موعد الحصة التجريبية المجانية: ${cairo.format(new Date(b.slot_utc))} بتوقيت القاهرة.`;
          return (
            <article key={b.id} className="card stack gap-12" style={{ borderInlineStart: `6px solid ${st.bg === "#FFFFFF" ? st.fg : st.bg}` }}>
              <div className="row" style={{ justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
                <div className="stack gap-8" style={{ minWidth: 0 }}>
                  <p style={{ fontSize: 19, fontWeight: 800 }}>{cairo.format(new Date(b.slot_utc))}</p>
                  {local && b.time_zone !== "Africa/Cairo" ? (
                    <p className="muted" style={{ fontSize: 13 }} dir="ltr">Student time: {local} · {b.time_zone}</p>
                  ) : null}
                </div>
                <span style={{ background: st.bg, color: st.fg, borderRadius: 999, padding: "6px 12px", fontSize: 13, fontWeight: 700 }}>{st.label}</span>
              </div>

              <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 8, fontSize: 15 }}>
                <p><span className="muted">ولي الأمر/الطالب: </span><b>{b.parent_name}</b>{b.student_name ? ` · ${b.student_name}` : ""}</p>
                <p><span className="muted">المسار: </span><b>{t.tracks[b.track]?.name ?? b.track}</b></p>
                <p><span className="muted">لمن: </span>{WHO[b.who ?? ""] ?? "—"} · {AGE[b.age_group ?? ""] ?? "—"}</p>
                <p><span className="muted">تفضيل المعلم: </span>{TEACHER[b.teacher_preference ?? ""] ?? "—"}</p>
                <p dir="ltr" style={{ textAlign: "end" }}><a href={`mailto:${b.email}`}>{b.email}</a></p>
                <p className="muted" style={{ fontSize: 13 }}>حُجز في {short.format(new Date(b.created_at))} · {b.locale === "ar" ? "من الموقع العربي" : "من الموقع الإنجليزي"}</p>
              </div>
              {b.notes ? <p style={{ background: "var(--paper)", borderRadius: 12, padding: "10px 14px", fontSize: 14 }}>{b.notes}</p> : null}

              <div className="row gap-8" style={{ alignItems: "center" }}>
                <a className="btn btn-primary" href={`https://wa.me/${wa}?text=${encodeURIComponent(greeting)}`} target="_blank" rel="noopener noreferrer">واتساب</a>
                <label className="visually-hidden" htmlFor={`st-${b.id}`}>الحالة</label>
                <select id={`st-${b.id}`} className="input" style={{ width: "auto", paddingBlock: 10 }} value={b.status} onChange={(e) => update(b.id, { status: e.target.value as Status })}>
                  {ORDER.map((s) => <option key={s} value={s}>{STATUS[s].label}</option>)}
                </select>
                <label className="visually-hidden" htmlFor={`tch-${b.id}`}>المعلم</label>
                <input
                  id={`tch-${b.id}`}
                  className="input"
                  style={{ width: 200, paddingBlock: 10 }}
                  placeholder="اسم المعلم المسؤول"
                  defaultValue={b.assigned_teacher ?? ""}
                  onBlur={(e) => {
                    const v = e.target.value.trim() || null;
                    if (v !== b.assigned_teacher) update(b.id, { assigned_teacher: v });
                  }}
                />
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
