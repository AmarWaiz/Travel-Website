"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bed,
  CalendarBlank,
  CaretDown,
  Check,
  CheckCircle,
  Clock,
  Globe,
  Heart,
  Images,
  MapPin,
  Minus,
  Phone,
  Plus,
  ShareNetwork,
  Star,
  Users,
  X,
} from "@phosphor-icons/react";
import { useMemo, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/Reveal";
import { TourCard } from "@/components/TourCard";
import { trips, type Trip } from "@/data/trips";

function parseCoords(coords: string): { lat: number; lon: number } | null {
  const m = coords.match(/(\d+)[°](\d+)[′']([NS])\s+(\d+)[°](\d+)[′']([EW])/);
  if (!m) return null;
  const lat = Number(m[1]) + Number(m[2]) / 60;
  const lon = Number(m[4]) + Number(m[5]) / 60;
  return {
    lat: m[3] === "S" ? -lat : lat,
    lon: m[6] === "W" ? -lon : lon,
  };
}

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "itinerary", label: "Itinerary" },
  { id: "included", label: "Included" },
  { id: "location", label: "Location" },
  { id: "reviews", label: "Reviews" },
];

export function TourDetail({ trip }: { trip: Trip }) {
  const [lightbox, setLightbox] = useState(false);
  const [wished, setWished] = useState(false);
  const [copied, setCopied] = useState(false);
  const [openDay, setOpenDay] = useState<number | null>(1);
  const [depIdx, setDepIdx] = useState(0);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [reviewSent, setReviewSent] = useState(false);

  const gallery = useMemo(() => {
    const base = trip.gallery.length >= 5 ? trip.gallery : trip.images;
    const seen = new Set<string>();
    return [...trip.gallery, ...trip.images, ...base].filter((g) => {
      if (seen.has(g.src)) return false;
      seen.add(g.src);
      return true;
    }).slice(0, 6);
  }, [trip]);

  const price = trip.discount
    ? Math.round(trip.priceFrom * (1 - trip.discount / 100))
    : trip.priceFrom;
  const total = price * adults + Math.round(price * 0.7) * children;
  const dep = trip.departures[depIdx];

  const coords = parseCoords(trip.coordinates);
  const osmSrc = coords
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${coords.lon - 1.2}%2C${coords.lat - 0.8}%2C${coords.lon + 1.2}%2C${coords.lat + 0.8}&layer=mapnik&marker=${coords.lat}%2C${coords.lon}`
    : null;

  const related = trips
    .filter((t) => t.slug !== trip.slug)
    .sort((a, b) => (b.category === trip.category ? 1 : 0) - (a.category === trip.category ? 1 : 0))
    .slice(0, 3);

  const dist = [5, 4, 3, 2, 1].map(
    (s) => trip.reviews.filter((r) => r.rating === s).length
  );

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: trip.title, url });
      else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      /* dismissed */
    }
  };

  const facts = [
    { Icon: Clock, label: "Duration", value: `${trip.days} days` },
    { Icon: Users, label: "Group size", value: `Max ${trip.maxGroup}` },
    { Icon: Bed, label: "Difficulty", value: trip.difficulty },
    { Icon: Globe, label: "Languages", value: trip.languages.join(", ") },
  ];

  return (
    <div>
      {/* Gallery */}
      <section className="container-x pt-[120px] lg:pt-[176px]">
        <div className="relative grid grid-cols-4 grid-rows-2 gap-3 overflow-hidden rounded-[24px]">
          {gallery.slice(0, 5).map((g, i) => (
            <button
              key={g.src}
              type="button"
              onClick={() => setLightbox(true)}
              className={cn(
                "img-zoom group relative overflow-hidden",
                i === 0 ? "col-span-4 row-span-2 aspect-[16/10] sm:col-span-2 sm:aspect-auto" : "aspect-[4/3]"
              )}
              aria-label={`Open photo: ${g.alt}`}
            >
              <Image
                src={g.src}
                alt={g.alt}
                fill
                sizes={i === 0 ? "(max-width: 640px) 100vw, 50vw" : "25vw"}
                priority={i === 0}
                className="photo-rich h-full w-full object-cover"
              />
              <span className="absolute inset-0 bg-primary-900/0 transition-colors group-hover:bg-primary-900/20" />
            </button>
          ))}
          <button
            type="button"
            onClick={() => setLightbox(true)}
            className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[14.5px] font-bold text-ink shadow-lg transition-transform hover:scale-105"
          >
            <Images size={18} weight="duotone" className="text-primary-600" />
            View all photos
          </button>
        </div>
      </section>

      <Lightbox
        open={lightbox}
        close={() => setLightbox(false)}
        slides={gallery.map((g) => ({ src: g.src, alt: g.alt }))}
      />

      {/* Title row */}
      <section className="container-x mt-8">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-[62ch]">
            <p className="flex items-center gap-1.5 text-[15px] font-medium text-body">
              <MapPin size={18} weight="duotone" className="text-coral" />
              {trip.country} · {trip.coordinates}
            </p>
            <h1 className="h2-section mt-2 !text-[2.5rem] lg:!text-[3.25rem]">
              {trip.title}
            </h1>
            <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-[15px]">
              <span className="flex items-center gap-1" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} weight={i < Math.round(trip.rating) ? "fill" : "regular"} className="text-accent" />
                ))}
              </span>
              <span className="font-bold text-ink">{trip.rating.toFixed(1)}</span>
              <a href="#reviews" className="font-medium text-primary-600 underline-offset-4 hover:underline">
                {trip.reviewCount} reviews
              </a>
              <span className="rounded-full bg-sand px-3 py-1 text-[13px] font-bold text-primary-600">{trip.category}</span>
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={share}
              className="flex h-12 items-center gap-2 rounded-full border border-line px-5 text-[14.5px] font-bold text-ink transition-colors hover:border-primary hover:text-primary-600"
            >
              <ShareNetwork size={19} weight="duotone" />
              {copied ? "Copied!" : "Share"}
            </button>
            <button
              type="button"
              onClick={() => setWished((v) => !v)}
              aria-pressed={wished}
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-full border transition-colors",
                wished ? "border-coral bg-coral/10" : "border-line hover:border-primary"
              )}
              aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart size={20} weight={wished ? "fill" : "regular"} className={wished ? "text-coral" : "text-ink"} />
            </button>
          </div>
        </div>

        {/* Quick facts */}
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {facts.map(({ Icon, label, value }, i) => (
            <Reveal key={label} delay={i * 0.08}>
              <div className="flex items-center gap-4 rounded-[18px] border border-line bg-white p-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                  <Icon size={24} weight="duotone" className="text-primary-600" />
                </span>
                <span>
                  <span className="block text-[12.5px] font-semibold uppercase tracking-wider text-body">{label}</span>
                  <span className="block font-display text-[17px] font-bold text-ink">{value}</span>
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Main columns */}
      <section className="container-x mt-10 grid gap-10 pb-20 lg:grid-cols-[1fr_380px] lg:pb-28">
        <div className="min-w-0">
          {/* Sticky tabs */}
          <div className="sticky top-[132px] z-30 -mx-2 bg-white/95 px-2 py-3 backdrop-blur lg:top-[152px]">
            <nav aria-label="Tour sections" className="flex gap-1 overflow-x-auto rounded-full bg-sand p-1.5">
              {TABS.map((t) => (
                <a
                  key={t.id}
                  href={`#${t.id}`}
                  className="whitespace-nowrap rounded-full px-5 py-2.5 text-[14.5px] font-bold text-ink transition-colors hover:bg-white"
                >
                  {t.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Overview */}
          <div id="overview" className="scroll-mt-[200px] pt-8">
            <h2 className="h3-card !text-[26px]">Overview</h2>
            <p className="body-lg mt-4 text-body">{trip.summary}</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {trip.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 rounded-2xl bg-sand p-4 text-[15px] font-medium text-ink">
                  <CheckCircle size={22} weight="duotone" className="mt-0.5 shrink-0 text-primary-600" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* Itinerary */}
          <div id="itinerary" className="scroll-mt-[200px] pt-12">
            <h2 className="h3-card !text-[26px]">Itinerary</h2>
            <p className="mt-2 text-[15px] text-body">Day by day, as it runs on the ground.</p>
            <ol className="mt-6">
              {trip.itinerary.map((d) => {
                const open = openDay === d.day;
                return (
                  <li key={d.day} className="relative flex gap-5 pb-2">
                    <div className="flex flex-col items-center">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary font-display text-[16px] font-bold text-white">
                        {d.day}
                      </span>
                      {d.day !== trip.itinerary.length && (
                        <span className="w-0.5 flex-1 bg-line" aria-hidden="true" />
                      )}
                    </div>
                    <div className="flex-1 pb-6">
                      <button
                        type="button"
                        onClick={() => setOpenDay(open ? null : d.day)}
                        aria-expanded={open}
                        className="flex w-full items-center justify-between gap-4 rounded-2xl border border-line bg-white p-5 text-left transition-colors hover:border-primary-600"
                      >
                        <span>
                          <span className="text-[12.5px] font-bold uppercase tracking-wider text-coral">
                            Day {d.day}
                          </span>
                          <span className="block font-display text-[18px] font-bold text-ink">{d.title}</span>
                        </span>
                        <CaretDown size={20} weight="bold" className={cn("shrink-0 text-primary-600 transition-transform", open && "rotate-180")} />
                      </button>
                      <div className={cn("grid transition-all duration-300", open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                        <div className="overflow-hidden">
                          <p className="px-5 pt-4 text-[15.5px] leading-[1.7] text-body">{d.text}</p>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Included / Excluded */}
          <div id="included" className="scroll-mt-[200px] pt-12">
            <h2 className="h3-card !text-[26px]">What&apos;s included</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <ul className="space-y-3 rounded-[20px] bg-sand p-6">
                {trip.included.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15px] font-medium text-ink">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary">
                      <Check size={14} weight="bold" className="text-white" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <ul className="space-y-3 rounded-[20px] border border-line bg-white p-6">
                {trip.excluded.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15px] text-body">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-coral/15">
                      <X size={14} weight="bold" className="text-coral" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Location */}
          <div id="location" className="scroll-mt-[200px] pt-12">
            <h2 className="h3-card !text-[26px]">Location</h2>
            <p className="mt-2 text-[15px] text-body">{trip.coordinates}</p>
            {osmSrc ? (
              <iframe
                title={`Map of ${trip.title}`}
                src={osmSrc}
                loading="lazy"
                className="mt-4 h-[400px] w-full rounded-[20px] border border-line"
              />
            ) : (
              <p className="mt-4 text-body">Map unavailable for this route.</p>
            )}
          </div>

          {/* Reviews */}
          <div id="reviews" className="scroll-mt-[200px] pt-12">
            <h2 className="h3-card !text-[26px]">Reviews</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-[240px_1fr]">
              <div className="rounded-[20px] bg-primary p-7 text-center text-white">
                <p className="font-display text-[56px] font-extrabold leading-none">{trip.rating.toFixed(1)}</p>
                <p className="mt-2 flex justify-center gap-0.5" aria-label={`${trip.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={17} weight={i < Math.round(trip.rating) ? "fill" : "regular"} className="text-accent" />
                  ))}
                </p>
                <p className="mt-2 text-[14px] text-white/75">{trip.reviewCount} verified reviews</p>
              </div>
              <div className="space-y-2.5 self-center">
                {dist.map((n, i) => (
                  <div key={5 - i} className="flex items-center gap-3 text-[14px]">
                    <span className="w-8 font-bold text-ink">{5 - i}★</span>
                    <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-sand">
                      <span
                        className="block h-full rounded-full bg-accent"
                        style={{ width: `${trip.reviews.length ? (n / trip.reviews.length) * 100 : 0}%` }}
                      />
                    </span>
                    <span className="w-8 text-right text-body">{n}</span>
                  </div>
                ))}
              </div>
            </div>
            <ul className="mt-8 space-y-5">
              {trip.reviews.map((r) => (
                <li key={r.name} className="rounded-[20px] border border-line bg-white p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-display text-[17px] font-bold text-ink">{r.name}</p>
                      <p className="text-[13.5px] text-body">{r.trip}</p>
                    </div>
                    <span className="flex gap-0.5" aria-label={`${r.rating} out of 5`}>
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} size={14} weight={j < r.rating ? "fill" : "regular"} className="text-accent" />
                      ))}
                    </span>
                  </div>
                  <p className="mt-3 font-bold text-ink">{r.title}</p>
                  <p className="mt-1 text-[15px] text-body">{r.text}</p>
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-[20px] bg-sand p-7">
              {reviewSent ? (
                <p className="flex items-center gap-3 font-bold text-primary-600">
                  <CheckCircle size={24} weight="duotone" /> Thanks — your review is with our team for moderation.
                </p>
              ) : (
                <form
                  onSubmit={(e) => { e.preventDefault(); setReviewSent(true); }}
                  className="grid gap-4"
                >
                  <h3 className="font-display text-[19px] font-bold text-ink">Write a review</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input required placeholder="Your name" aria-label="Your name"
                      className="h-12 rounded-xl border border-line bg-white px-4 text-[15px] focus:border-primary-600 focus:outline-none" />
                    <select required defaultValue="" aria-label="Rating"
                      className="h-12 rounded-xl border border-line bg-white px-4 text-[15px] focus:border-primary-600 focus:outline-none">
                      <option value="" disabled>Rating</option>
                      {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} stars</option>)}
                    </select>
                  </div>
                  <textarea required rows={4} placeholder="How was your trip?" aria-label="Your review"
                    className="rounded-xl border border-line bg-white p-4 text-[15px] focus:border-primary-600 focus:outline-none" />
                  <button type="submit" className="btn-primary w-fit">Submit review</button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Booking widget */}
        <aside className="lg:pt-[68px]">
          <div className="lg:sticky lg:top-[160px]">
            <div className="overflow-hidden rounded-[24px] border border-line bg-white shadow-[0_24px_48px_-16px_rgba(11,59,54,0.28)]">
              <div className="bg-primary p-6 text-white">
                {trip.discount && (
                  <span className="rounded-full bg-coral px-3 py-1 text-[12.5px] font-bold uppercase tracking-wide text-ink">
                    Save {trip.discount}%
                  </span>
                )}
                <p className="mt-2 flex items-baseline gap-2">
                  {trip.discount && (
                    <span className="text-[16px] text-white/60 line-through">${trip.priceFrom.toLocaleString()}</span>
                  )}
                  <span className="font-display text-[36px] font-extrabold leading-none">${price.toLocaleString()}</span>
                  <span className="text-white/70">/ person</span>
                </p>
              </div>
              <div className="space-y-5 p-6">
                <div>
                  <label htmlFor="dep-date" className="text-[13.5px] font-bold uppercase tracking-wider text-body">
                    Departure date
                  </label>
                  <div className="relative mt-2">
                    <CalendarBlank size={20} weight="duotone" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-primary-600" />
                    <select
                      id="dep-date"
                      value={depIdx}
                      onChange={(e) => setDepIdx(Number(e.target.value))}
                      className="h-[52px] w-full appearance-none rounded-xl border border-line bg-white pl-12 pr-4 text-[15.5px] font-medium text-ink focus:border-primary-600 focus:outline-none"
                    >
                      {trip.departures.map((d, i) => (
                        <option key={d.date} value={i}>
                          {formatDate(d.date)} · {d.seatsLeft} seats left
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {[
                  { label: "Adults", value: adults, set: setAdults, min: 1 },
                  { label: "Children", value: children, set: setChildren, min: 0 },
                ].map(({ label, value, set, min }) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-[15.5px] font-semibold text-ink">{label}</span>
                    <span className="flex items-center gap-3">
                      <button type="button" onClick={() => set(Math.max(min, value - 1))}
                        aria-label={`Fewer ${label.toLowerCase()}`}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink hover:border-primary">
                        <Minus size={16} weight="bold" />
                      </button>
                      <span className="w-6 text-center font-bold text-ink">{value}</span>
                      <button type="button" onClick={() => set(Math.min(14, value + 1))}
                        aria-label={`More ${label.toLowerCase()}`}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink hover:border-primary">
                        <Plus size={16} weight="bold" />
                      </button>
                    </span>
                  </div>
                ))}
                <div className="flex items-center justify-between border-t border-line pt-5">
                  <span className="font-display text-[18px] font-bold text-ink">Total</span>
                  <span className="font-display text-[26px] font-extrabold text-primary-600">
                    ${total.toLocaleString()}
                  </span>
                </div>
                <Link
                  href={`/enquire?trip=${trip.slug}&date=${dep?.date ?? ""}&adults=${adults}&children=${children}`}
                  className="btn-amber w-full"
                >
                  Book Now <ArrowRight size={18} weight="bold" className="btn-arrow" />
                </Link>
                <p className="text-center text-[13.5px] text-body">
                  No deposit until you confirm · Seats held 7 days
                </p>
              </div>
            </div>
            <div className="mt-6 rounded-[24px] bg-sand p-6">
              <p className="font-display text-[18px] font-bold text-ink">Need help?</p>
              <p className="mt-1 text-[14.5px] text-body">
                Talk to someone who has done this trip.
              </p>
              <a href="tel:+442045771900" className="mt-4 flex items-center gap-3 font-bold text-primary-600">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white">
                  <Phone size={19} weight="duotone" />
                </span>
                +44 20 4577 1900
              </a>
            </div>
          </div>
        </aside>
      </section>

      {/* Related tours */}
      <section className="bg-sand">
        <div className="container-x section-pad">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="script-subtitle">Keep looking</p>
              <h2 className="h2-section mt-2">You may also like</h2>
            </div>
            <Link href="/tours" className="btn-outline-dark hidden sm:inline-flex">
              All Tours <ArrowRight size={18} weight="bold" className="btn-arrow" />
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {related.map((t, i) => (
              <Reveal key={t.slug} delay={i * 0.08}>
                <TourCard trip={t} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
