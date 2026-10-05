"use client";

import { useState } from "react";
import Link from "next/link";
import type { Trip } from "@/data/trips";
import { formatDate, formatPrice } from "@/lib/format";
import { cn } from "@/lib/cn";

export function BookingRail({ trip }: { trip: Trip }) {
  const [selected, setSelected] = useState(trip.departures[0].date);

  return (
    <aside
      aria-label="Book this trip"
      className="border border-rule bg-paper lg:sticky lg:top-24"
    >
      <p className="mono-label px-5 pb-4 pt-5 text-ink-soft">Departures</p>
      <div role="radiogroup" aria-label="Choose a departure date">
        {trip.departures.map((dep) => {
          const isSelected = dep.date === selected;
          return (
            <button
              key={dep.date}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => setSelected(dep.date)}
              className={cn(
                "flex w-full items-center justify-between gap-4 border-t border-rule px-5 py-4 text-left",
                "border-l-2",
                isSelected ? "border-l-terracotta" : "border-l-transparent"
              )}
            >
              <span>
                <span className="mono-label block">{formatDate(dep.date)}</span>
                <span className="mt-1 block text-[15px] text-ink-soft">
                  {dep.seatsLeft} seats left
                </span>
              </span>
              <span className="font-display text-[20px]">
                {formatPrice(trip.priceFrom)}
              </span>
            </button>
          );
        })}
      </div>
      <div className="p-5">
        <Link
          href={`/enquire?trip=${trip.slug}&date=${selected}`}
          className="flex h-[52px] items-center justify-center rounded-[2px] bg-forest text-[15px] font-medium text-paper"
        >
          Enquire about this trip
        </Link>
        <p className="mono-label mt-4 text-ink-soft">NO PAYMENT TAKEN NOW</p>
      </div>
    </aside>
  );
}
