"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AirplaneTilt,
  ArrowRight,
  CaretDown,
  Envelope,
  List,
  MapPin,
  Phone,
  X,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { destinations } from "@/data/destinations";

const NAV = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations", mega: true },
  { label: "Tours", href: "/tours" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

function Logo({ dark }: { dark: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="Travle home">
      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent">
        <AirplaneTilt size={24} weight="duotone" className="text-ink" />
      </span>
      <span
        className={cn(
          "font-display text-[26px] font-extrabold tracking-tight",
          dark ? "text-ink" : "text-white"
        )}
      >
        travle
        <span className="text-accent">.</span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDestOpen, setMobileDestOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const dark = scrolled;

  return (
    <>
      <header
        className={cn(
          "transition-all duration-300",
          dark
            ? "bg-white shadow-[0_10px_30px_-12px_rgba(11,59,54,0.18)]"
            : "bg-gradient-to-b from-black/45 to-transparent"
        )}
      >
        <div
          className={cn(
            "container-x flex items-center justify-between transition-all duration-300",
            dark ? "h-[76px]" : "h-[96px]"
          )}
        >
          <Logo dark={dark} />

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) =>
              item.mega ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setMegaOpen(true)}
                  onMouseLeave={() => setMegaOpen(false)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-1.5 rounded-full px-4 py-2.5 text-[15.5px] font-semibold transition-colors",
                      dark
                        ? "text-ink hover:text-primary-600"
                        : "text-white hover:text-accent",
                      pathname.startsWith("/destinations") &&
                        (dark ? "text-primary-600" : "text-accent")
                    )}
                  >
                    {item.label}
                    <CaretDown
                      size={14}
                      weight="bold"
                      className={cn(
                        "transition-transform duration-300",
                        megaOpen && "rotate-180"
                      )}
                    />
                  </Link>
                  <div
                    className={cn(
                      "absolute left-1/2 top-full w-[720px] -translate-x-1/2 pt-4 transition-all duration-300",
                      megaOpen
                        ? "visible translate-y-0 opacity-100"
                        : "invisible -translate-y-2 opacity-0"
                    )}
                  >
                    <div className="grid grid-cols-3 gap-4 rounded-[20px] bg-white p-5 shadow-[0_24px_48px_-16px_rgba(11,59,54,0.28)]">
                      {destinations.map((d) => (
                        <Link
                          key={d.slug}
                          href={`/destinations/${d.slug}`}
                          className="group relative overflow-hidden rounded-2xl"
                          onClick={() => setMegaOpen(false)}
                        >
                          <div className="relative aspect-[4/3] overflow-hidden">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={d.hero}
                              alt={d.name}
                              loading="lazy"
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <p className="font-display text-[17px] font-bold text-white">
                              {d.name}
                            </p>
                            <p className="text-[13px] font-medium text-white/80">
                              {d.tourCount} tours
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "rounded-full px-4 py-2.5 text-[15.5px] font-semibold transition-colors",
                    dark
                      ? "text-ink hover:text-primary-600"
                      : "text-white hover:text-accent",
                    (pathname === item.href ||
                      (item.href === "/tours" &&
                        pathname.startsWith("/tours"))) &&
                      (dark ? "text-primary-600" : "text-accent")
                  )}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/tours"
              className="btn-amber hidden !h-[48px] lg:inline-flex"
            >
              Book Now
              <ArrowRight size={18} weight="bold" className="btn-arrow" />
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-full transition-colors lg:hidden",
                dark
                  ? "bg-sand text-ink"
                  : "bg-white/15 text-white backdrop-blur"
              )}
            >
              <List size={22} weight="bold" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile off-canvas */}
      <div
        className={cn(
          "fixed inset-0 z-[90] overflow-hidden transition-opacity duration-300 lg:hidden",
          mobileOpen ? "visible opacity-100" : "invisible opacity-0"
        )}
        aria-hidden={!mobileOpen}
      >
        <div
          className="absolute inset-0 bg-primary-900/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        <aside
          className={cn(
            "absolute right-0 top-0 flex h-full w-[86%] max-w-[380px] flex-col bg-white shadow-2xl transition-transform duration-300",
            mobileOpen ? "translate-x-0" : "translate-x-full"
          )}
          role="dialog"
          aria-label="Menu"
        >
          <div className="flex h-[76px] items-center justify-between border-b border-line px-6">
            <Logo dark />
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-sand text-ink"
            >
              <X size={20} weight="bold" />
            </button>
          </div>
          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-6 py-6">
            <ul className="space-y-1">
              {NAV.map((item) =>
                item.mega ? (
                  <li key={item.label} className="border-b border-line">
                    <button
                      type="button"
                      onClick={() => setMobileDestOpen((v) => !v)}
                      aria-expanded={mobileDestOpen}
                      className="flex w-full items-center justify-between py-4 font-display text-[19px] font-bold text-ink"
                    >
                      {item.label}
                      <CaretDown
                        size={18}
                        weight="bold"
                        className={cn(
                          "text-primary-600 transition-transform",
                          mobileDestOpen && "rotate-180"
                        )}
                      />
                    </button>
                    <div
                      className={cn(
                        "grid transition-all duration-300",
                        mobileDestOpen
                          ? "grid-rows-[1fr] pb-4 opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      )}
                    >
                      <div className="overflow-hidden">
                        <ul className="space-y-1">
                          {destinations.map((d) => (
                            <li key={d.slug}>
                              <Link
                                href={`/destinations/${d.slug}`}
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-[15.5px] font-medium text-body hover:bg-sand"
                              >
                                <MapPin
                                  size={17}
                                  weight="duotone"
                                  className="text-coral"
                                />
                                {d.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </li>
                ) : (
                  <li key={item.label} className="border-b border-line">
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-4 font-display text-[19px] font-bold text-ink"
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
            <Link
              href="/tours"
              onClick={() => setMobileOpen(false)}
              className="btn-amber mt-6 w-full"
            >
              Book Now
              <ArrowRight size={18} weight="bold" className="btn-arrow" />
            </Link>
          </nav>
          <div className="border-t border-line bg-sand px-6 py-5 text-[14.5px]">
            <a
              href="tel:+442045771900"
              className="flex items-center gap-2.5 font-semibold text-ink"
            >
              <Phone size={17} weight="duotone" className="text-primary-600" />
              +44 20 4577 1900
            </a>
            <a
              href="mailto:hello@travle.travel"
              className="mt-2 flex items-center gap-2.5 font-medium text-body"
            >
              <Envelope size={17} weight="duotone" className="text-primary-600" />
              hello@travle.travel
            </a>
          </div>
        </aside>
      </div>
    </>
  );
}
