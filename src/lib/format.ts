import { trips, type Departure, type Trip } from "@/data/trips";

const dateFmt = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

const monthYearFmt = new Intl.DateTimeFormat("en-GB", {
  month: "long",
  year: "numeric",
});

export function formatDate(iso: string): string {
  return dateFmt.format(new Date(iso + "T12:00:00"));
}

export function formatMonthYear(iso: string): string {
  return monthYearFmt.format(new Date(iso + "T12:00:00"));
}

export function formatPrice(usd: number): string {
  return "$" + usd.toLocaleString("en-US");
}

export function padDay(n: number): string {
  return "DAY " + String(n).padStart(2, "0");
}

export interface NextDeparture {
  trip: Trip;
  departure: Departure;
}

/** The earliest upcoming departure across all trips. */
export function getNextDeparture(): NextDeparture {
  let best: NextDeparture | null = null;
  for (const trip of trips) {
    for (const departure of trip.departures) {
      if (!best || departure.date < best.departure.date) {
        best = { trip, departure };
      }
    }
  }
  if (!best) throw new Error("No departures in trip data");
  return best;
}

/** Month options for the enquiry form: next 12 months from today. */
export function getMonthOptions(): { value: string; label: string }[] {
  const out: { value: string; label: string }[] = [];
  const d = new Date();
  d.setDate(1);
  for (let i = 0; i < 12; i++) {
    const iso = d.toISOString().slice(0, 7);
    out.push({
      value: iso,
      label: monthYearFmt.format(d),
    });
    d.setMonth(d.getMonth() + 1);
  }
  return out;
}
