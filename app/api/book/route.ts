import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { trackIds } from "@/lib/content";

type Booking = {
  locale: "en" | "ar";
  who: "self" | "child" | "children";
  ageGroup: "5-8" | "9-12" | "13-17" | "adult";
  track: string;
  teacherPreference: "male" | "female" | "any";
  slotUtc: string | null;
  timeZone: string;
  name: string;
  student: string;
  email: string;
  whatsapp: string;
  notes: string;
  website?: string;
};

const oneOf = <T extends string>(v: unknown, list: readonly T[]): v is T => typeof v === "string" && (list as readonly string[]).includes(v);
const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  let body: Partial<Booking>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: bots fill the hidden "website" field.
  if (body.website) return NextResponse.json({ ok: true });

  const booking = {
    locale: oneOf(body.locale, ["en", "ar"] as const) ? body.locale : "en",
    who: oneOf(body.who, ["self", "child", "children"] as const) ? body.who : null,
    age_group: oneOf(body.ageGroup, ["5-8", "9-12", "13-17", "adult"] as const) ? body.ageGroup : null,
    track: oneOf(body.track, trackIds) ? body.track : null,
    teacher_preference: oneOf(body.teacherPreference, ["male", "female", "any"] as const) ? body.teacherPreference : null,
    slot_utc: typeof body.slotUtc === "string" && !Number.isNaN(Date.parse(body.slotUtc)) ? new Date(body.slotUtc).toISOString() : null,
    time_zone: clean(body.timeZone, 64),
    parent_name: clean(body.name, 120),
    student_name: clean(body.student, 120),
    email: clean(body.email, 200).toLowerCase(),
    whatsapp: clean(body.whatsapp, 40),
    notes: clean(body.notes, 2000),
  };

  if (!booking.parent_name || !booking.whatsapp || !/^\S+@\S+\.\S+$/.test(booking.email) || !booking.slot_utc || !booking.track) {
    return NextResponse.json({ error: "missing_fields" }, { status: 422 });
  }

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const resendKey = process.env.RESEND_API_KEY;
  const adminEmail = process.env.ADMIN_NOTIFY_EMAIL;

  if (!url || !key) {
    if (process.env.NODE_ENV !== "production") {
      console.log("[book] Supabase not configured — booking (dev only):", booking);
      return NextResponse.json({ ok: true, stored: false });
    }
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const supabase = createClient(url, key, { auth: { persistSession: false } });
  const { error } = await supabase.from("trial_bookings").insert(booking);
  if (error) {
    console.error("[book] insert failed", error);
    return NextResponse.json({ error: "store_failed" }, { status: 500 });
  }

  if (resendKey && adminEmail) {
    const when = new Date(booking.slot_utc).toLocaleString("en-GB", { timeZone: "Africa/Cairo", dateStyle: "full", timeStyle: "short" });
    const lines = [
      `New free trial booking`,
      ``,
      `When (Cairo): ${when}`,
      `Visitor time zone: ${booking.time_zone}`,
      `Track: ${booking.track} · Teacher: ${booking.teacher_preference}`,
      `For: ${booking.who} · Age: ${booking.age_group}`,
      `Parent / student: ${booking.parent_name} / ${booking.student_name || "-"}`,
      `Email: ${booking.email}`,
      `WhatsApp: ${booking.whatsapp} → https://wa.me/${booking.whatsapp.replace(/\D/g, "")}`,
      `Notes: ${booking.notes || "-"}`,
    ];
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.BOOKING_FROM_EMAIL || "Midad Institute <onboarding@resend.dev>",
        to: [adminEmail],
        reply_to: booking.email,
        subject: `Free trial: ${booking.parent_name} — ${when}`,
        text: lines.join("\n"),
      }),
    }).catch((e) => console.error("[book] email failed", e));
  }

  return NextResponse.json({ ok: true, stored: true });
}
