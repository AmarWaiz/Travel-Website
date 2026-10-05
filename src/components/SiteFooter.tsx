"use client";

import Link from "next/link";
import {
  AirplaneTilt,
  ArrowRight,
  Clock,
  Envelope,
  FacebookLogo,
  InstagramLogo,
  MapPin,
  Phone,
  TwitterLogo,
  YoutubeLogo,
} from "@phosphor-icons/react/dist/ssr";
import { destinations } from "@/data/destinations";
import { trips } from "@/data/trips";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "Tours", href: "/tours" },
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
];

const socials = [
  { label: "Facebook", href: "https://facebook.com", Icon: FacebookLogo },
  { label: "Instagram", href: "https://instagram.com", Icon: InstagramLogo },
  { label: "Twitter", href: "https://twitter.com", Icon: TwitterLogo },
  { label: "YouTube", href: "https://youtube.com", Icon: YoutubeLogo },
];

const galleryImages = trips.slice(0, 6).map((t) => ({
  src: t.images[0]?.src ?? "",
  alt: t.images[0]?.alt ?? t.title,
  href: `/tours/${t.slug}`,
}));

const payments = ["VISA", "Mastercard", "AMEX", "PayPal", "Stripe"];

export function SiteFooter() {
  return (
    <footer className="relative bg-primary text-white">
      {/* Decorative wave on top */}
      <svg
        className="absolute -top-[1px] left-0 h-[56px] w-full text-white"
        viewBox="0 0 1440 56"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,0 L1440,0 L1440,12 C1200,52 960,52 720,28 C480,4 240,4 0,32 Z"
          fill="currentColor"
        />
      </svg>

      <div className="container-x pt-24 lg:pt-28">
        {/* Newsletter row */}
        <div className="flex flex-col items-start justify-between gap-6 border-b border-white/15 pb-12 lg:flex-row lg:items-center">
          <div>
            <p className="script-subtitle !text-accent">Get travel deals first</p>
            <h2 className="h2-section mt-2 !text-white">
              Subscribe to our newsletter
            </h2>
          </div>
          <form
            className="flex w-full max-w-[480px] items-center gap-2 rounded-full bg-white/10 p-2 pl-6 backdrop-blur"
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor="footer-email" className="sr-only">
              Email address
            </label>
            <input
              id="footer-email"
              type="email"
              required
              placeholder="Your email address"
              className="h-11 w-full bg-transparent text-[15.5px] text-white placeholder:text-white/50 focus:outline-none"
            />
            <button type="submit" className="btn-amber !h-[48px] shrink-0">
              Subscribe
              <ArrowRight size={18} weight="bold" className="btn-arrow" />
            </button>
          </form>
        </div>

        {/* 5 columns */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 py-14 md:grid-cols-3 lg:grid-cols-5">
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2.5"
              aria-label="Travle home"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent">
                <AirplaneTilt size={24} weight="duotone" className="text-ink" />
              </span>
              <span className="font-display text-[26px] font-extrabold tracking-tight text-white">
                travle<span className="text-accent">.</span>
              </span>
            </Link>
            <p className="mt-5 max-w-[30ch] text-[15px] leading-[1.7] text-white/70">
              Small-group guided tours of 8 to 14 people, led by guides who
              know every route by heart.
            </p>
            <div className="mt-6 flex gap-2">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all hover:bg-accent hover:text-ink"
                >
                  <Icon size={18} weight="duotone" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Quick links">
            <h3 className="font-display text-[18px] font-bold text-white">
              Quick Links
            </h3>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[15px] text-white/70 transition-colors hover:text-accent"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Destinations">
            <h3 className="font-display text-[18px] font-bold text-white">
              Destinations
            </h3>
            <ul className="mt-5 space-y-3">
              {destinations.map((d) => (
                <li key={d.slug}>
                  <Link
                    href={`/destinations/${d.slug}`}
                    className="text-[15px] text-white/70 transition-colors hover:text-accent"
                  >
                    {d.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="font-display text-[18px] font-bold text-white">
              Contact Info
            </h3>
            <ul className="mt-5 space-y-4 text-[15px] text-white/70">
              <li className="flex gap-3">
                <MapPin
                  size={19}
                  weight="duotone"
                  className="mt-0.5 shrink-0 text-accent"
                />
                14 Tanner Street,
                <br />
                London SE1 3LE
              </li>
              <li>
                <a
                  href="tel:+442045771900"
                  className="flex gap-3 transition-colors hover:text-accent"
                >
                  <Phone
                    size={19}
                    weight="duotone"
                    className="shrink-0 text-accent"
                  />
                  +44 20 4577 1900
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@travle.travel"
                  className="flex gap-3 transition-colors hover:text-accent"
                >
                  <Envelope
                    size={19}
                    weight="duotone"
                    className="shrink-0 text-accent"
                  />
                  hello@travle.travel
                </a>
              </li>
              <li className="flex gap-3">
                <Clock
                  size={19}
                  weight="duotone"
                  className="shrink-0 text-accent"
                />
                Mon–Fri, 9:00–18:00 GMT
              </li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <h3 className="font-display text-[18px] font-bold text-white">
              Gallery
            </h3>
            <div className="mt-5 grid grid-cols-3 gap-2">
              {galleryImages.map((g) => (
                <Link
                  key={g.href}
                  href={g.href}
                  className="group relative aspect-square overflow-hidden rounded-xl"
                  aria-label={g.alt}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={g.src}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <span className="absolute inset-0 bg-primary/0 transition-colors group-hover:bg-primary/30" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/15 py-7 md:flex-row">
          <p className="text-[14px] text-white/60">
            © {new Date().getFullYear()} Travle. All rights reserved.
          </p>
          <div
            className="flex items-center gap-2"
            aria-label="Accepted payment methods"
          >
            {payments.map((p) => (
              <span
                key={p}
                className="rounded-md bg-white/10 px-2.5 py-1 text-[11px] font-bold tracking-wide text-white/70"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
