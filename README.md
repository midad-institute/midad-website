# Midad Institute — website

The public website of **Midad Institute | معهد مِداد** — live one-to-one Quran, Tajweed, Hifz, Arabic and Islamic studies for non-Arabic speakers. English and Arabic (right-to-left).

Built with Next.js (App Router). Hosted on Netlify. Bookings are stored in Supabase; email alerts go through Resend.

## Pages

| Path | Page |
| --- | --- |
| `/en`, `/ar` | Home |
| `/{locale}/courses` | The five learning tracks with their levels and outcomes |
| `/{locale}/teachers` | Teacher profiles (from `lib/teachers.ts`) and how teachers are chosen |
| `/{locale}/pricing` | Price calculator (USD / GBP / EUR), included features, FAQ |
| `/{locale}/book` | Free trial booking in four steps, times shown in the visitor's time zone |
| `/ar/admin` | Admin dashboard (Arabic): sign in, see bookings in Cairo time, set status, assign a teacher, message on WhatsApp. Not linked from the site and not indexed |

## Where to change things

| What | File |
| --- | --- |
| All page text, both languages | `lib/content.ts` |
| Hourly prices, sibling discount, cancellation notice | `lib/pricing.ts` |
| Trial booking hours (Cairo time), days off, notice period | `lib/availability.ts` |
| Teachers and testimonials | `lib/teachers.ts` (sections stay hidden while empty) |
| Colours, fonts, spacing | `app/globals.css` |

## Run locally

```bash
npm install
cp .env.example .env.local   # fill in what you have
npm run dev                  # http://localhost:3000
```

Without Supabase keys, bookings are only printed to the terminal in development. In production the booking form shows an error until Supabase is configured, so no booking is silently lost.

## Going live

1. **Supabase** — create a project, open *SQL Editor*, run `supabase/schema.sql`. Copy the project URL and the publishable key from *Project Settings › API Keys*. New bookings appear in *Table Editor › trial_bookings*.
2. **Netlify** — import this repository (Next.js is detected automatically), add the environment variables from `.env.example`, deploy.
3. **Admin** — add your email to `public.admins` (see the end of `supabase/schema.sql`), open `/ar/admin`, create a password once, then confirm the account (email link, or mark it confirmed in Supabase › Authentication).
4. **Resend** (optional) — verify your domain and add `RESEND_API_KEY`, `BOOKING_FROM_EMAIL` and `ADMIN_NOTIFY_EMAIL` to get an email for every new booking.
5. **WhatsApp alert** (optional) — get a free key from CallMeBot on the admin's phone, then add `CALLMEBOT_PHONE` (with country code, e.g. +2010…) and `CALLMEBOT_APIKEY`.
6. **Domain** — add it in Netlify › Domain management.

Fonts (Inter, Manrope, Reem Kufi, IBM Plex Sans Arabic, Amiri Quran) are self-hosted under the SIL Open Font License — see `app/fonts/OFL.txt`.
