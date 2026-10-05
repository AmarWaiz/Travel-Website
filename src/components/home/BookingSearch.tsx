"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarBlank,
  CaretDown,
  Compass,
  MagnifyingGlass,
  MapPin,
  Minus,
  Plus,
  Users,
} from "@phosphor-icons/react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

const DESTINATIONS = [
  { slug: "karakoram", name: "Hunza Valley, Pakistan" },
  { slug: "oman", name: "Empty Quarter, Oman" },
  { slug: "amalfi", name: "Amalfi Coast, Italy" },
  { slug: "delhi", name: "Delhi, India" },
  { slug: "balkans", name: "Montenegro, Balkans" },
  { slug: "lapland", name: "Lapland, Finland" },
];

const TRAVEL_TYPES = ["Adventure", "Beach", "Mountains", "City", "Rail", "Winter"];

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function Stepper({
  label,
  value,
  onChange,
  min,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
}) {
  return (
    <div className="flex items-center justify-between py-3">
      <p className="font-sans text-[15px] font-medium text-ink">{label}</p>
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label={`Decrease ${label}`}
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition hover:border-primary disabled:opacity-40"
        >
          <Minus size={14} weight="bold" />
        </button>
        <span className="w-6 text-center font-sans text-[15px] font-semibold text-ink">
          {value}
        </span>
        <button
          type="button"
          aria-label={`Increase ${label}`}
          onClick={() => onChange(value + 1)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition hover:border-primary"
        >
          <Plus size={14} weight="bold" />
        </button>
      </div>
    </div>
  );
}

export function BookingSearch() {
  const router = useRouter();
  const rootRef = useRef<HTMLFormElement>(null);
  const [destination, setDestination] = useState("");
  const [travelType, setTravelType] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [open, setOpen] = useState<"date" | "guests" | null>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(null);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (destination) params.set("destination", destination);
    if (travelType) params.set("category", travelType.toLowerCase());
    if (date) params.set("date", date.toISOString().slice(0, 10));
    const guests = adults + children;
    if (guests > 0) params.set("guests", String(guests));
    const qs = params.toString();
    router.push(qs ? `/tours?${qs}` : "/tours");
  }

  const labelCls =
    "flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-body";

  return (
    <section className="relative z-20">
      <div className="container-x">
        <form
          ref={rootRef}
          onSubmit={onSubmit}
          className="-mt-[60px] rounded-[20px] bg-white p-3 shadow-[0_24px_48px_-16px_rgba(11,59,54,0.28)]"
        >
          <div className="grid gap-2 lg:grid-cols-[1fr_1fr_1fr_1fr_auto] lg:divide-x lg:divide-line">
            {/* Destination */}
            <div className="relative px-4 py-3">
              <label htmlFor="bs-destination" className={labelCls}>
                <MapPin weight="duotone" size={18} className="text-primary-600" />
                Destination
              </label>
              <div className="relative mt-1">
                <select
                  id="bs-destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full appearance-none bg-transparent pr-8 font-sans text-[15px] font-medium text-ink outline-none"
                >
                  <option value="">Anywhere</option>
                  {DESTINATIONS.map((d) => (
                    <option key={d.slug} value={d.slug}>
                      {d.name}
                    </option>
                  ))}
                </select>
                <CaretDown
                  size={16}
                  weight="bold"
                  className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-body"
                />
              </div>
            </div>

            {/* Travel type */}
            <div className="relative px-4 py-3">
              <label htmlFor="bs-type" className={labelCls}>
                <Compass weight="duotone" size={18} className="text-primary-600" />
                Travel Type
              </label>
              <div className="relative mt-1">
                <select
                  id="bs-type"
                  value={travelType}
                  onChange={(e) => setTravelType(e.target.value)}
                  className="w-full appearance-none bg-transparent pr-8 font-sans text-[15px] font-medium text-ink outline-none"
                >
                  <option value="">All types</option>
                  {TRAVEL_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <CaretDown
                  size={16}
                  weight="bold"
                  className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-body"
                />
              </div>
            </div>

            {/* Date */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setOpen(open === "date" ? null : "date")}
                aria-expanded={open === "date"}
                className="flex min-h-[72px] w-full flex-col justify-center gap-1 px-4 py-3 text-left outline-none transition-colors hover:bg-sand/60 focus-visible:ring-2 focus-visible:ring-accent"
              >
                <span className={labelCls}>
                  <CalendarBlank weight="duotone" size={18} className="text-primary-600" />
                  Date
                </span>
                <span className="font-sans text-[15px] font-medium text-ink">
                  {date ? formatDate(date) : "Select date"}
                </span>
              </button>
              {open === "date" && (
                <div className="absolute left-0 top-full z-30 mt-2 rounded-2xl border border-line bg-white p-3 shadow-[0_24px_48px_-16px_rgba(11,59,54,0.28)]">
                  <DayPicker
                    mode="single"
                    selected={date}
                    onSelect={(d) => {
                      setDate(d);
                      setOpen(null);
                    }}
                    disabled={{ before: new Date() }}
                  />
                </div>
              )}
            </div>

            {/* Guests */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setOpen(open === "guests" ? null : "guests")}
                aria-expanded={open === "guests"}
                className="flex min-h-[72px] w-full flex-col justify-center gap-1 px-4 py-3 text-left outline-none transition-colors hover:bg-sand/60 focus-visible:ring-2 focus-visible:ring-accent"
              >
                <span className={labelCls}>
                  <Users weight="duotone" size={18} className="text-primary-600" />
                  Guests
                </span>
                <span className="font-sans text-[15px] font-medium text-ink">
                  {adults + children} guest{adults + children === 1 ? "" : "s"}
                </span>
              </button>
              {open === "guests" && (
                <div className="absolute left-0 top-full z-30 mt-2 w-64 rounded-2xl border border-line bg-white px-5 py-2 shadow-[0_24px_48px_-16px_rgba(11,59,54,0.28)]">
                  <Stepper label="Adults" value={adults} onChange={setAdults} min={1} />
                  <div className="border-t border-line">
                    <Stepper label="Children" value={children} onChange={setChildren} min={0} />
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpen(null)}
                    className="btn-primary mb-4 mt-2 h-11! w-full text-[15px]"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>

            {/* Submit */}
            <div className="flex items-stretch px-1 py-1">
              <button type="submit" className="btn-amber w-full lg:w-auto">
                <MagnifyingGlass weight="bold" size={18} />
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
