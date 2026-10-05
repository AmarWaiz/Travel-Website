"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AirplaneTilt, ArrowRight, MagnifyingGlass } from "@phosphor-icons/react";

const QUICK_LINKS = [
  { label: "Tours", href: "/tours" },
  { label: "Destinations", href: "/destinations" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

/**
 * 404 page: oversized display numeral with a floating plane,
 * search that routes to /tours, home CTA and quick links.
 */
export default function NotFound() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const onSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/tours?q=${encodeURIComponent(q)}` : "/tours");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-sand px-6 pt-[96px] text-center">
      <div className="relative">
        <p
          aria-hidden="true"
          className="font-display text-[120px] font-extrabold leading-none text-primary lg:text-[180px]"
        >
          404
        </p>
        <AirplaneTilt
          size={52}
          weight="duotone"
          aria-hidden="true"
          className="absolute -right-8 -top-4 animate-float text-coral lg:-right-12"
        />
      </div>

      <p className="script-subtitle mt-6">Lost on the trail?</p>
      <h1 className="h2-section mt-3 text-ink">This page wandered off.</h1>
      <p className="mt-4 max-w-[46ch] text-[17px] leading-[1.7] text-body">
        The page you are looking for has moved or never existed. Search our
        tours, or head back to the start.
      </p>

      <form
        onSubmit={onSearch}
        role="search"
        className="mt-8 flex w-full max-w-[480px] items-center gap-2 rounded-full border border-line bg-white p-2 pl-5 shadow-[0_10px_30px_-12px_rgba(11,59,54,0.18)]"
      >
        <MagnifyingGlass
          size={20}
          weight="duotone"
          className="shrink-0 text-primary"
          aria-hidden="true"
        />
        <label htmlFor="notfound-search" className="sr-only">
          Search tours
        </label>
        <input
          id="notfound-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tours, e.g. Amalfi"
          className="h-[44px] w-full bg-transparent text-[16px] text-ink placeholder:text-body/50 focus:outline-none"
        />
        <button type="submit" className="btn-amber shrink-0 !h-[48px]">
          Search
          <ArrowRight size={20} weight="bold" className="btn-arrow" aria-hidden="true" />
        </button>
      </form>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
        <Link href="/" className="btn-primary">
          Back to Home
          <ArrowRight size={20} weight="bold" className="btn-arrow" aria-hidden="true" />
        </Link>
      </div>

      <nav aria-label="Quick links" className="mt-10">
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {QUICK_LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-[15px] font-semibold text-primary-600 underline-offset-4 hover:underline"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}
