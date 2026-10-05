"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import type { Trip } from "@/data/trips";
import { formatDate, formatPrice } from "@/lib/format";

interface DeparturesListProps {
  trips: Trip[];
}

/**
 * Timetable-style departures list. On desktop, hovering a row shifts the
 * text 8px right and a 280px 4:5 thumbnail follows the cursor.
 * One of three allowed motions.
 */
export function DeparturesList({ trips }: DeparturesListProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<Trip | null>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 160, damping: 22, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 160, damping: 22, mass: 0.6 });

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    // Keep the 280px thumbnail inside the list: flip it to the left
    // of the cursor when the cursor is near the right edge.
    mx.set(x > rect.width - 340 ? x - 308 : x + 28);
    my.set(e.clientY - rect.top - 175);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setActive(null)}
      className="relative"
    >
      <div
        aria-hidden="true"
        className="mono-label mb-2 hidden grid-cols-12 gap-6 text-ink-soft md:grid"
      >
        <p className="col-span-5">Trip</p>
        <p className="col-span-2">Region</p>
        <p className="col-span-2">Dates</p>
        <p className="col-span-1">Days</p>
        <p className="col-span-1">Group</p>
        <p className="col-span-1 text-right">From</p>
      </div>

      <ul>
        {trips.map((trip) => {
          const first = trip.departures[0];
          return (
            <li key={trip.slug} onMouseEnter={() => setActive(trip)}>
              <Link
                href={`/trips/${trip.slug}`}
                className="group block border-t border-rule last:border-b"
                aria-label={`${trip.title}, ${trip.days} days, from ${formatPrice(trip.priceFrom)}`}
              >
                <div className="grid grid-cols-1 gap-y-2 py-6 transition-transform duration-300 ease-out md:min-h-[88px] md:grid-cols-12 md:items-center md:gap-6 md:py-0 md:group-hover:translate-x-2">
                  <div className="md:col-span-5">
                    <p className="font-display text-[24px] leading-[1.15] md:text-[28px]">
                      {trip.title}
                    </p>
                  </div>
                  <p className="mono-label text-ink-soft md:col-span-2">
                    {trip.region} · {trip.country}
                  </p>
                  <p className="mono-label text-ink-soft md:col-span-2">
                    {formatDate(first.date)}
                    {trip.departures.length > 1 && (
                      <span> +{trip.departures.length - 1}</span>
                    )}
                  </p>
                  <p className="mono-label text-ink-soft md:col-span-1">
                    {trip.days} DAYS
                  </p>
                  <p className="mono-label text-ink-soft md:col-span-1">
                    MAX {trip.maxGroup}
                  </p>
                  <p className="mono-label md:col-span-1 md:text-right">
                    {formatPrice(trip.priceFrom)}
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      {active && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 z-20 hidden lg:block"
          style={{ x: sx, y: sy }}
        >
          <div className="relative h-[350px] w-[280px] overflow-hidden rounded-[2px]">
            <Image
              src={active.images[0].src}
              alt=""
              fill
              sizes="280px"
              className="photo-grade h-full w-full object-cover"
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}
