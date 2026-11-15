/** Launch prices per hour, locked for early subscribers while their subscription stays active. */
export const hourlyRate = { USD: 8, GBP: 7, EUR: 7.5 } as const;
export type Currency = keyof typeof hourlyRate;
export const currencySymbol: Record<Currency, string> = { USD: "$", GBP: "£", EUR: "€" };

/** 10% off for every student after the first in the same family. */
export const siblingDiscount = 0.1;

/** Cancel at least this many hours before a class to get a make-up class. */
export const cancelNoticeHours = 4;

export const classLengths = [30, 45, 60] as const;
export const classesPerWeekOptions = [1, 2, 3, 4, 5] as const;

export function monthlyPrice(opts: { minutes: number; perWeek: number; students: number; currency: Currency }) {
  const classes = opts.perWeek * 4;
  const hours = (classes * opts.minutes) / 60;
  const each = hours * hourlyRate[opts.currency];
  const total = each + (opts.students - 1) * each * (1 - siblingDiscount);
  return { classes, hours, each: round(each), total: round(total) };
}

function round(n: number) {
  return Math.round(n * 100) / 100;
}

export function formatMoney(amount: number, currency: Currency, locale: string) {
  void locale;
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency,
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
