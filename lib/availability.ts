/**
 * Free-trial availability, defined in Cairo time (where the teachers are).
 * Visitors see the same slots converted to their own time zone.
 * Edit these values to change when trial classes can be booked.
 */
export const TEACHER_TIME_ZONE = "Africa/Cairo";
export const availability = {
  /** Days of the week with trial slots (0 = Sunday … 6 = Saturday), Cairo calendar. */
  days: [0, 1, 2, 3, 4, 6],
  /** First and last slot start, "HH:MM" in Cairo time. */
  firstSlot: "13:00",
  lastSlot: "23:00",
  slotMinutes: 30,
  /** Earliest bookable slot, in hours from now. */
  minNoticeHours: 12,
  /** How many bookable days to show. */
  daysToShow: 7,
  /** Hide slots that would fall outside these local hours for the visitor. */
  visitorEarliestHour: 6,
  visitorLatestHour: 23,
};

/** Offset (ms) of a time zone from UTC at a given instant. */
function tzOffsetMs(instant: number, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(new Date(instant));
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value);
  const asUtc = Date.UTC(get("year"), get("month") - 1, get("day"), get("hour"), get("minute"), get("second"));
  return asUtc - instant;
}

/** The UTC instant for a wall-clock time in a given time zone. */
export function zonedToUtc(y: number, m: number, d: number, hh: number, mm: number, timeZone: string) {
  const guess = Date.UTC(y, m - 1, d, hh, mm);
  let utc = guess - tzOffsetMs(guess, timeZone);
  utc = guess - tzOffsetMs(utc, timeZone);
  return utc;
}

function localParts(instant: number, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", weekday: "short" }).formatToParts(new Date(instant));
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return { key: `${get("year")}-${get("month")}-${get("day")}`, hour: Number(get("hour")), weekday: get("weekday") };
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export type Slot = { utc: number };
export type Day = { key: string; slots: Slot[] };

/** Bookable trial slots grouped by the visitor's local date. */
export function trialDays(visitorTimeZone: string, now = Date.now()): Day[] {
  const [fh, fm] = availability.firstSlot.split(":").map(Number);
  const [lh, lm] = availability.lastSlot.split(":").map(Number);
  const earliest = now + availability.minNoticeHours * 3600_000;
  const byDay = new Map<string, Slot[]>();

  for (let i = 0; i < availability.daysToShow + 4; i++) {
    const cairoDay = localParts(now + i * 86400_000, TEACHER_TIME_ZONE);
    const [y, m, d] = cairoDay.key.split("-").map(Number);
    if (!availability.days.includes(WEEKDAYS.indexOf(cairoDay.weekday))) continue;
    for (let mins = fh * 60 + fm; mins <= lh * 60 + lm; mins += availability.slotMinutes) {
      const utc = zonedToUtc(y, m, d, Math.floor(mins / 60), mins % 60, TEACHER_TIME_ZONE);
      if (utc < earliest) continue;
      const local = localParts(utc, visitorTimeZone);
      if (local.hour < availability.visitorEarliestHour || local.hour > availability.visitorLatestHour) continue;
      const list = byDay.get(local.key) ?? [];
      if (!list.some((s) => s.utc === utc)) list.push({ utc });
      byDay.set(local.key, list);
    }
  }

  return [...byDay.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(0, availability.daysToShow)
    .map(([key, slots]) => ({ key, slots: slots.sort((a, b) => a.utc - b.utc) }));
}
