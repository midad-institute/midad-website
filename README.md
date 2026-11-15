# Midad Institute — website

The public website of **Midad Institute | معهد مِداد** — live one-to-one Quran, Tajweed, Hifz, Arabic and Islamic studies for non-Arabic speakers. English and Arabic (right-to-left).

Built with Next.js (App Router). Bookings are stored in Supabase; email alerts go through Resend.

## Pages

| Path | Page |
| --- | --- |
| `/en`, `/ar` | Home |
| `/{locale}/courses` | The five learning tracks with their levels and outcomes |
| `/{locale}/teachers` | Teacher profiles (from `lib/teachers.ts`) and how teachers are chosen |
| `/{locale}/pricing` | Price calculator (USD / GBP / EUR), included features, FAQ |
| `/{locale}/book` | Free trial booking in four steps, times shown in the visitor's time zone |

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

1. **Supabase** — create a project, open *SQL Editor*, run `supabase/schema.sql`. Copy the project URL and the `service_role` key from *Project Settings › API*.
2. **Vercel** — import this repository, add the environment variables from `.env.example`, deploy.
3. **Resend** (optional) — verify your domain and add `RESEND_API_KEY`, `BOOKING_FROM_EMAIL` and `ADMIN_NOTIFY_EMAIL` to get an email for every new booking.
4. **Domain** — add it in Vercel › Settings › Domains.

Fonts (Inter, Manrope, Reem Kufi, IBM Plex Sans Arabic, Amiri Quran) are self-hosted under the SIL Open Font License — see `app/fonts/OFL.txt`.
