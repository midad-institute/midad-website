import { notFound } from "next/navigation";
import { BookingFlow } from "@/components/BookingFlow";
import { dictionaries, trackIds, type TrackId } from "@/lib/content";
import { href, isLocale } from "@/lib/i18n";

export default async function Book({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<{ track?: string }> }) {
  const { locale } = await params;
  const { track } = await searchParams;
  if (!isLocale(locale)) notFound();
  const t = dictionaries[locale];
  const initialTrack = trackIds.includes(track as TrackId) ? (track as TrackId) : undefined;

  return (
    <section className="container stack gap-24" style={{ paddingBlock: "48px 88px" }}>
      <div className="stack gap-8">
        <span className="badge" style={{ alignSelf: "flex-start" }}>{t.book.badge}</span>
        <h1 className="h1" style={{ fontSize: "clamp(32px, 5vw, 44px)" }}>{t.book.title}</h1>
        <p className="lead">{t.book.lead}</p>
      </div>
      <BookingFlow locale={locale} t={t} initialTrack={initialTrack} homeHref={href(locale, "/")} />
    </section>
  );
}
