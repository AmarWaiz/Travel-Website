"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  Heart,
  MapPin,
  Star,
  Users,
} from "@phosphor-icons/react";
import { useState } from "react";
import { cn } from "@/lib/cn";
import type { Trip } from "@/data/trips";

export function TourCard({ trip }: { trip: Trip }) {
  const [wished, setWished] = useState(false);
  const price = trip.discount
    ? Math.round(trip.priceFrom * (1 - trip.discount / 100))
    : trip.priceFrom;

  return (
    <article className="card-lift group flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_10px_30px_-12px_rgba(11,59,54,0.18)]">
      <div className="img-zoom relative aspect-[4/3] overflow-hidden">
        <Link
          href={`/tours/${trip.slug}`}
          aria-label={trip.title}
          className="absolute inset-0"
        >
          <Image
            src={trip.images[0]?.src ?? ""}
            alt={trip.images[0]?.alt ?? trip.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            loading="lazy"
            className="photo-rich h-full w-full object-cover"
          />
        </Link>
        <div className="absolute left-4 top-4 flex gap-2">
          {trip.discount ? (
            <span className="rounded-full bg-coral px-3.5 py-1.5 text-[12.5px] font-bold uppercase tracking-wide text-ink">
              −{trip.discount}%
            </span>
          ) : trip.badge ? (
            <span className="rounded-full bg-primary px-3.5 py-1.5 text-[12.5px] font-bold uppercase tracking-wide text-white">
              {trip.badge}
            </span>
          ) : null}
        </div>
        <button
          type="button"
          onClick={() => setWished((v) => !v)}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wished}
          className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md transition-transform hover:scale-110"
        >
          <Heart
            size={19}
            weight={wished ? "fill" : "regular"}
            className={wished ? "text-coral" : "text-ink"}
          />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="flex items-center gap-1.5 text-[13.5px] font-medium text-body">
          <MapPin size={16} weight="duotone" className="text-coral" />
          {trip.country}
        </p>
        <h3 className="h3-card mt-2 line-clamp-2">
          <Link
            href={`/tours/${trip.slug}`}
            className="transition-colors group-hover:text-primary-600"
          >
            {trip.title}
          </Link>
        </h3>
        <p className="mt-2.5 flex items-center gap-1.5 text-[14px]">
          <span className="flex items-center gap-0.5" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={15}
                weight={i < Math.round(trip.rating) ? "fill" : "regular"}
                className="text-accent"
              />
            ))}
          </span>
          <span className="font-semibold text-ink">
            {trip.rating.toFixed(1)}
          </span>
          <span className="text-body">({trip.reviewCount} reviews)</span>
        </p>
        <p className="mt-2.5 flex items-center gap-4 text-[14px] font-medium text-body">
          <span className="flex items-center gap-1.5">
            <Clock size={16} weight="duotone" className="text-primary-600" />
            {trip.days} days
          </span>
          <span className="flex items-center gap-1.5">
            <Users size={16} weight="duotone" className="text-primary-600" />
            {trip.maxGroup} people
          </span>
        </p>

        <div className="mt-4 border-t border-line pt-4">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[12.5px] font-medium uppercase tracking-wide text-body">
                From
              </p>
              <p className="flex items-baseline gap-2">
                {trip.discount && (
                  <span className="text-[15px] font-medium text-body line-through">
                    ${trip.priceFrom.toLocaleString()}
                  </span>
                )}
                <span className="text-[22px] font-extrabold text-primary-600">
                  ${price.toLocaleString()}
                </span>
                <span className="text-[13.5px] text-body">/ person</span>
              </p>
            </div>
            <Link
              href={`/tours/${trip.slug}`}
              aria-label={`View ${trip.title}`}
              className={cn(
                "flex h-11 w-11 shrink-0 items-center justify-center rounded-full",
                "bg-primary text-white transition-all hover:bg-accent hover:text-ink"
              )}
            >
              <ArrowRight size={19} weight="bold" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
