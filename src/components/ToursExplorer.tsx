"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowRight,
  CaretLeft,
  CaretRight,
  Clock,
  FunnelSimple,
  Heart,
  MagnifyingGlass,
  MapPin,
  SquaresFour,
  Star,
  Rows,
  Users,
  X,
} from "@phosphor-icons/react";
import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import { TourCard } from "@/components/TourCard";
import { Reveal } from "@/components/Reveal";
import { trips, type Trip, type TripCategory } from "@/data/trips";

const CATEGORIES: TripCategory[] = [
  "Adventure",
  "Beach",
  "Mountains",
  "City",
  "Rail",
  "Winter",
];

const DEST_TO_COUNTRY: Record<string, string> = {
  karakoram: "Pakistan",
  oman: "Oman",
  amalfi: "Italy",
  delhi: "India",
  balkans: "Serbia and Montenegro",
  lapland: "Finland",
};

const PAGE_SIZE = 6;

type SortKey = "recommended" | "price-asc" | "price-desc" | "rating" | "duration";

function priceOf(t: Trip) {
  return t.discount
    ? Math.round(t.priceFrom * (1 - t.discount / 100))
    : t.priceFrom;
}

function ListCard({ trip }: { trip: Trip }) {
  const [wished, setWished] = useState(false);
  const price = priceOf(trip);
  return (
    <article className="card-lift group flex flex-col overflow-hidden rounded-[20px] bg-white shadow-[0_10px_30px_-12px_rgba(11,59,54,0.18)] sm:flex-row">
      <div className="img-zoom relative aspect-[16/10] overflow-hidden sm:aspect-auto sm:w-[320px] sm:shrink-0">
        <Link href={`/tours/${trip.slug}`} aria-label={trip.title} className="absolute inset-0">
          <Image
            src={trip.images[0]?.src ?? ""}
            alt={trip.images[0]?.alt ?? trip.title}
            fill
            sizes="(max-width: 640px) 100vw, 320px"
            loading="lazy"
            className="photo-rich h-full w-full object-cover"
          />
        </Link>
        {trip.discount ? (
          <span className="absolute left-4 top-4 rounded-full bg-coral px-3.5 py-1.5 text-[12.5px] font-bold uppercase tracking-wide text-ink">
            −{trip.discount}%
          </span>
        ) : trip.badge ? (
          <span className="absolute left-4 top-4 rounded-full bg-primary px-3.5 py-1.5 text-[12.5px] font-bold uppercase tracking-wide text-white">
            {trip.badge}
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="flex items-center gap-1.5 text-[13.5px] font-medium text-body">
              <MapPin size={16} weight="duotone" className="text-coral" />
              {trip.country}
            </p>
            <h3 className="h3-card mt-2">
              <Link href={`/tours/${trip.slug}`} className="transition-colors group-hover:text-primary-600">
                {trip.title}
              </Link>
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setWished((v) => !v)}
            aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
            aria-pressed={wished}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sand transition-transform hover:scale-110"
          >
            <Heart size={19} weight={wished ? "fill" : "regular"} className={wished ? "text-coral" : "text-ink"} />
          </button>
        </div>
        <p className="mt-2 flex items-center gap-1.5 text-[14px]">
          <span className="flex items-center gap-0.5" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={15} weight={i < Math.round(trip.rating) ? "fill" : "regular"} className="text-accent" />
            ))}
          </span>
          <span className="font-semibold text-ink">{trip.rating.toFixed(1)}</span>
          <span className="text-body">({trip.reviewCount} reviews)</span>
        </p>
        <p className="mt-2 line-clamp-2 text-[15px] text-body">{trip.summary}</p>
        <div className="mt-4 flex items-end justify-between border-t border-line pt-4">
          <p className="flex items-center gap-4 text-[14px] font-medium text-body">
            <span className="flex items-center gap-1.5">
              <Clock size={16} weight="duotone" className="text-primary-600" />
              {trip.days} days
            </span>
            <span className="flex items-center gap-1.5">
              <Users size={16} weight="duotone" className="text-primary-600" />
              {trip.maxGroup} people
            </span>
          </p>
          <p className="flex items-baseline gap-1.5">
            <span className="text-[12.5px] font-medium uppercase tracking-wide text-body">From</span>
            <span className="text-[22px] font-extrabold text-primary-600">${price.toLocaleString()}</span>
          </p>
        </div>
      </div>
    </article>
  );
}

export function ToursExplorer() {
  const params = useSearchParams();
  const destParam = params.get("destination");
  const catParam = params.get("category") as TripCategory | null;

  const ABS_MIN = Math.min(...trips.map((t) => priceOf(t)));
  const ABS_MAX = Math.max(...trips.map((t) => priceOf(t)));

  const [query, setQuery] = useState("");
  const [lo, setLo] = useState(ABS_MIN);
  const [hi, setHi] = useState(ABS_MAX);
  const [cats, setCats] = useState<Set<TripCategory>>(
    () => new Set(catParam && CATEGORIES.includes(catParam) ? [catParam] : [])
  );
  const [duration, setDuration] = useState<string>("any");
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState<SortKey>("recommended");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);
  const [drawer, setDrawer] = useState(false);

  const filtered = useMemo(() => {
    let list = trips.filter((t) => {
      if (destParam && DEST_TO_COUNTRY[destParam] && t.country !== DEST_TO_COUNTRY[destParam]) return false;
      if (cats.size > 0 && !cats.has(t.category)) return false;
      if (query && !`${t.title} ${t.country}`.toLowerCase().includes(query.toLowerCase())) return false;
      const p = priceOf(t);
      if (p < lo || p > hi) return false;
      if (duration === "short" && t.days >= 7) return false;
      if (duration === "medium" && (t.days < 7 || t.days > 10)) return false;
      if (duration === "long" && t.days <= 10) return false;
      if (t.rating < minRating) return false;
      return true;
    });
    switch (sort) {
      case "price-asc": list = [...list].sort((a, b) => priceOf(a) - priceOf(b)); break;
      case "price-desc": list = [...list].sort((a, b) => priceOf(b) - priceOf(a)); break;
      case "rating": list = [...list].sort((a, b) => b.rating - a.rating); break;
      case "duration": list = [...list].sort((a, b) => a.days - b.days); break;
    }
    return list;
  }, [destParam, cats, query, lo, hi, duration, minRating, sort]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const shown = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleCat = (c: TripCategory) => {
    setPage(1);
    setCats((prev) => {
      const next = new Set(prev);
      if (next.has(c)) next.delete(c);
      else next.add(c);
      return next;
    });
  };

  const clearAll = () => {
    setQuery(""); setLo(ABS_MIN); setHi(ABS_MAX);
    setCats(new Set()); setDuration("any"); setMinRating(0); setPage(1);
  };

  const filters = (
    <div className="space-y-8">
      <div>
        <h3 className="font-display text-[17px] font-bold text-ink">Search</h3>
        <label className="mt-3 flex items-center gap-2 rounded-xl border border-line bg-white px-4 focus-within:border-primary-600">
          <MagnifyingGlass size={18} weight="duotone" className="shrink-0 text-primary-600" />
          <span className="sr-only">Search tours</span>
          <input
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1); }}
            placeholder="Tour name or country…"
            className="h-12 w-full bg-transparent text-[15px] text-ink placeholder:text-body/60 focus:outline-none"
          />
        </label>
      </div>

      <div>
        <h3 className="font-display text-[17px] font-bold text-ink">Price range</h3>
        <div className="mt-4 px-1">
          <div className="relative h-1.5 rounded-full bg-line">
            <div
              className="absolute h-full rounded-full bg-accent"
              style={{ left: `${((lo - ABS_MIN) / (ABS_MAX - ABS_MIN)) * 100}%`, right: `${100 - ((hi - ABS_MIN) / (ABS_MAX - ABS_MIN)) * 100}%` }}
            />
          </div>
          <div className="relative -mt-1.5">
            <input type="range" min={ABS_MIN} max={ABS_MAX} step={50} value={lo}
              onChange={(e) => { setLo(Math.min(Number(e.target.value), hi - 50)); setPage(1); }}
              aria-label="Minimum price"
              className="pointer-events-none absolute w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow" />
            <input type="range" min={ABS_MIN} max={ABS_MAX} step={50} value={hi}
              onChange={(e) => { setHi(Math.max(Number(e.target.value), lo + 50)); setPage(1); }}
              aria-label="Maximum price"
              className="pointer-events-none absolute w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow" />
          </div>
          <p className="mt-7 text-[14.5px] font-semibold text-ink">
            ${lo.toLocaleString()} – ${hi.toLocaleString()}
          </p>
        </div>
      </div>

      <div>
        <h3 className="font-display text-[17px] font-bold text-ink">Category</h3>
        <ul className="mt-3 space-y-2.5">
          {CATEGORIES.map((c) => {
            const count = trips.filter((t) => t.category === c).length;
            return (
              <li key={c}>
                <label className="flex cursor-pointer items-center gap-3 text-[15px]">
                  <input
                    type="checkbox"
                    checked={cats.has(c)}
                    onChange={() => toggleCat(c)}
                    className="h-5 w-5 rounded accent-[#0B3B36]"
                  />
                  <span className="flex-1 font-medium text-ink">{c}</span>
                  <span className="rounded-full bg-sand px-2.5 py-0.5 text-[12.5px] font-semibold text-body">{count}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        <h3 className="font-display text-[17px] font-bold text-ink">Duration</h3>
        <ul className="mt-3 space-y-2.5">
          {[["any", "Any length"], ["short", "Under 7 days"], ["medium", "7 – 10 days"], ["long", "Over 10 days"]].map(([v, label]) => (
            <li key={v}>
              <label className="flex cursor-pointer items-center gap-3 text-[15px]">
                <input type="radio" name="duration" checked={duration === v}
                  onChange={() => { setDuration(v); setPage(1); }}
                  className="h-5 w-5 accent-[#0B3B36]" />
                <span className="font-medium text-ink">{label}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-display text-[17px] font-bold text-ink">Rating</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {[0, 4.5, 4.8, 5].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => { setMinRating(r); setPage(1); }}
              className={cn(
                "rounded-full px-4 py-2.5 text-[14px] font-semibold transition-colors",
                minRating === r ? "bg-primary text-white" : "bg-sand text-ink hover:bg-line"
              )}
            >
              {r === 0 ? "Any" : `${r.toFixed(1)}+`}
            </button>
          ))}
        </div>
      </div>

      <button type="button" onClick={clearAll} className="text-[14.5px] font-semibold text-coral underline-offset-4 hover:underline">
        Clear all filters
      </button>
    </div>
  );

  return (
    <div className="container-x section-pad">
      <div className="grid gap-10 lg:grid-cols-[300px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-[160px] rounded-[20px] bg-sand p-7">{filters}</div>
        </aside>

        <div>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-[15.5px] font-medium text-body" role="status">
              <span className="font-bold text-ink">{filtered.length}</span> tour{filtered.length === 1 ? "" : "s"} found
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button type="button" onClick={() => setDrawer(true)}
                className="btn-outline-dark !h-[44px] !px-5 text-[14.5px] lg:hidden">
                <FunnelSimple size={18} weight="duotone" /> Filters
              </button>
              <label className="flex items-center gap-2 text-[14.5px] font-medium text-body">
                <span className="sr-only">Sort tours</span>
                <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)}
                  className="h-11 rounded-full border border-line bg-white px-4 text-ink focus:border-primary-600 focus:outline-none">
                  <option value="recommended">Recommended</option>
                  <option value="price-asc">Price: low to high</option>
                  <option value="price-desc">Price: high to low</option>
                  <option value="rating">Highest rated</option>
                  <option value="duration">Shortest first</option>
                </select>
              </label>
              <div className="flex rounded-full border border-line p-1" role="group" aria-label="View">
                <button type="button" onClick={() => setView("grid")} aria-label="Grid view" aria-pressed={view === "grid"}
                  className={cn("flex h-11 w-11 items-center justify-center rounded-full", view === "grid" ? "bg-primary text-white" : "text-body")}>
                  <SquaresFour size={18} weight="duotone" />
                </button>
                <button type="button" onClick={() => setView("list")} aria-label="List view" aria-pressed={view === "list"}
                  className={cn("flex h-11 w-11 items-center justify-center rounded-full", view === "list" ? "bg-primary text-white" : "text-body")}>
                  <Rows size={18} weight="duotone" />
                </button>
              </div>
            </div>
          </div>

          {shown.length > 0 ? (
            <div className={cn("mt-8", view === "grid" ? "grid gap-6 sm:grid-cols-2 xl:grid-cols-3" : "grid gap-6")}>
              {shown.map((t, i) => (
                <Reveal key={t.slug} delay={(i % 3) * 0.08}>
                  {view === "grid" ? <TourCard trip={t} /> : <ListCard trip={t} />}
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-[20px] bg-sand p-12 text-center">
              <p className="h3-card">No tours match those filters.</p>
              <p className="mt-2 text-body">Try widening the price range or clearing a category.</p>
              <button type="button" onClick={clearAll} className="btn-primary mt-6">Clear filters</button>
            </div>
          )}

          {pages > 1 && (
            <nav aria-label="Pagination" className="mt-12 flex items-center justify-center gap-2">
              <button type="button" disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}
                aria-label="Previous page"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink disabled:opacity-40">
                <CaretLeft size={18} weight="bold" />
              </button>
              {Array.from({ length: pages }).map((_, i) => (
                <button key={i} type="button" onClick={() => setPage(i + 1)}
                  aria-label={`Page ${i + 1}`} aria-current={page === i + 1 ? "page" : undefined}
                  className={cn("h-11 w-11 rounded-full text-[15px] font-bold",
                    page === i + 1 ? "bg-primary text-white" : "border border-line text-ink hover:border-primary")}>
                  {i + 1}
                </button>
              ))}
              <button type="button" disabled={page === pages} onClick={() => setPage((p) => Math.min(pages, p + 1))}
                aria-label="Next page"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink disabled:opacity-40">
                <CaretRight size={18} weight="bold" />
              </button>
            </nav>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      <div className={cn("fixed inset-0 z-[90] overflow-hidden transition-opacity lg:hidden", drawer ? "visible opacity-100" : "invisible opacity-0")}>
        <div className="absolute inset-0 bg-primary-900/60" onClick={() => setDrawer(false)} />
        <aside className={cn("absolute left-0 top-0 h-full w-[86%] max-w-[360px] overflow-y-auto bg-white p-7 shadow-2xl transition-transform",
          drawer ? "translate-x-0" : "-translate-x-full")} role="dialog" aria-label="Filters">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-display text-[20px] font-bold text-ink">Filters</h2>
            <button type="button" onClick={() => setDrawer(false)} aria-label="Close filters"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-sand text-ink">
              <X size={20} weight="bold" />
            </button>
          </div>
          {filters}
          <button type="button" onClick={() => setDrawer(false)} className="btn-amber mt-8 w-full">
            Show {filtered.length} tours <ArrowRight size={18} weight="bold" className="btn-arrow" />
          </button>
        </aside>
      </div>
    </div>
  );
}
