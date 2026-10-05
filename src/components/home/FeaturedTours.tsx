"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import { SectionTitle } from "@/components/SectionTitle";
import { Reveal } from "@/components/Reveal";
import { TourCard } from "@/components/TourCard";
import { trips, type TripCategory } from "@/data/trips";
import { cn } from "@/lib/cn";

const TABS: Array<"All" | TripCategory> = [
  "All",
  "Adventure",
  "Beach",
  "Mountains",
  "City",
  "Rail",
  "Winter",
];

export function FeaturedTours() {
  const [active, setActive] = useState<(typeof TABS)[number]>("All");
  const filtered = (
    active === "All" ? trips : trips.filter((t) => t.category === active)
  ).slice(0, 6);

  return (
    <section className="section-pad">
      <div className="container-x">
        <SectionTitle
          eyebrow="Featured tours"
          title="Popular tours"
          text="Our most-booked small-group departures, led by guides who know every route by heart."
        />

        <Reveal className="mb-10 flex flex-wrap justify-center gap-3">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActive(tab)}
              aria-pressed={active === tab}
              className={cn(
                "rounded-full px-5 py-3 text-[15px] font-semibold transition-colors",
                active === tab
                  ? "bg-primary text-white"
                  : "bg-sand text-ink hover:bg-line"
              )}
            >
              {tab}
            </button>
          ))}
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((trip, i) => (
            <Reveal key={trip.slug} delay={(i % 3) * 0.08}>
              <TourCard trip={trip} />
            </Reveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/tours" className="btn-primary">
            View All Tours
            <ArrowRight size={20} weight="bold" className="btn-arrow" />
          </Link>
        </div>
      </div>
    </section>
  );
}
