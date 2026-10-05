"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin } from "@phosphor-icons/react";
import { SectionTitle } from "@/components/SectionTitle";
import { Reveal } from "@/components/Reveal";
import { trips, type Trip } from "@/data/trips";
import { PROMO_TALL } from "@/data/images";

const pad = (n: number) => String(n).padStart(2, "0");

function useCountdown(target: number) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const ms = Math.max(0, target - now);
  return {
    hours: pad(Math.floor(ms / 3_600_000)),
    mins: pad(Math.floor((ms % 3_600_000) / 60_000)),
    secs: pad(Math.floor((ms % 60_000) / 1000)),
  };
}

type DiscountedTrip = Trip & { discount: number };

function DealCard({ trip, index }: { trip: DiscountedTrip; index: number }) {
  // Target: ~9 days and 14 hours from first render; ticks every second.
  const target = useMemo(
    () => Date.now() + 9 * 24 * 3_600_000 + 14 * 3_600_000,
    []
  );
  const { hours, mins, secs } = useCountdown(target);
  const dealPrice = Math.round(trip.priceFrom * (1 - trip.discount / 100));
  const units: Array<[string, string]> = [
    ["Hours", hours],
    ["Mins", mins],
    ["Secs", secs],
  ];

  return (
    <Reveal delay={index * 0.08} className="h-full">
      <article className="card-lift flex h-full flex-col overflow-hidden rounded-[20px] bg-white shadow-[0_10px_30px_-12px_rgba(11,59,54,0.18)]">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={trip.images[0].src}
            alt={trip.images[0].alt}
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            loading="lazy"
            className="photo-rich h-full w-full object-cover"
          />
          <span className="absolute left-4 top-4 rounded-full bg-coral px-4 py-2 text-[13px] font-bold uppercase tracking-wide text-ink">
            -{trip.discount}% today
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <p className="flex items-center gap-1.5 text-[13px] font-semibold uppercase tracking-wider text-body">
            <MapPin size={16} weight="duotone" className="text-coral" />
            {trip.country}
          </p>
          <h3 className="h3-card mt-2">{trip.title}</h3>

          <div className="mt-5 grid grid-cols-3 gap-3" aria-label="Offer ends in">
            {units.map(([label, value]) => (
              <div
                key={label}
                className="rounded-xl bg-sand px-2 py-3 text-center"
              >
                <p className="font-display text-2xl font-bold tabular-nums text-primary-600">
                  {value}
                </p>
                <p className="mt-1 text-[12px] font-semibold uppercase tracking-wider text-body">
                  {label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-baseline gap-3 border-t border-line pt-5">
            <p className="text-[16px] text-body line-through">
              ${trip.priceFrom.toLocaleString()}
            </p>
            <p className="text-[22px] font-bold text-primary-600">
              ${dealPrice.toLocaleString()}
            </p>
            <p className="text-[14px] text-body">/ person</p>
          </div>

          <Link
            href={`/tours/${trip.slug}`}
            className="btn-amber mt-5 w-full"
          >
            Grab This Deal
            <ArrowRight size={20} weight="bold" className="btn-arrow" />
          </Link>
        </div>
      </article>
    </Reveal>
  );
}

export function Deals() {
  const deals: DiscountedTrip[] = trips
    .filter((t): t is DiscountedTrip => t.discount !== undefined)
    .slice(0, 2);

  return (
    <section className="section-pad">
      <div className="container-x">
        <SectionTitle
          eyebrow="Limited offers"
          title="Last-minute deals"
          text="Discounted seats on departures leaving soon."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {deals.map((trip, i) => (
            <DealCard key={trip.slug} trip={trip} index={i} />
          ))}

          {/* Tall winter promo card */}
          <Reveal delay={0.16} className="h-full">
            <article className="relative min-h-[420px] overflow-hidden rounded-[20px] lg:h-full">
              <Image
                src={PROMO_TALL.src}
                alt={PROMO_TALL.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                loading="lazy"
                className="photo-rich h-full w-full object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-900/30 to-transparent"
                aria-hidden="true"
              />
              <div className="absolute inset-x-0 bottom-0 p-8">
                <p className="script-subtitle text-accent">Special offer</p>
                <h3 className="mt-2 font-display text-3xl font-bold leading-tight text-white">
                  Up to 40% off winter departures
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/80">
                  Northern lights, empty trails and fireside nights. Winter
                  seats go first.
                </p>
                <Link href="/tours?category=Winter" className="btn-amber mt-6">
                  See Details
                  <ArrowRight size={20} weight="bold" className="btn-arrow" />
                </Link>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
