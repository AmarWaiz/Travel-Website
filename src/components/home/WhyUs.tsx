import Link from "next/link";
import Image from "next/image";
import {
  AirplaneTilt,
  ArrowRight,
  CalendarCheck,
  MapPin,
  ShieldCheck,
  Users,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { SectionTitle } from "@/components/SectionTitle";
import { Reveal } from "@/components/Reveal";
import { WHY_US } from "@/data/images";

interface Feature {
  icon: Icon;
  title: string;
  text: string;
}

const FEATURES: Feature[] = [
  {
    icon: Users,
    title: "Small groups",
    text: "Never more than 14 travellers",
  },
  {
    icon: MapPin,
    title: "Local guides",
    text: "Guides from the places we visit",
  },
  {
    icon: CalendarCheck,
    title: "Flexible booking",
    text: "Free date changes to 30 days",
  },
  {
    icon: ShieldCheck,
    title: "Best price promise",
    text: "Find it cheaper and we refund double",
  },
];

export function WhyUs() {
  return (
    <section className="section-pad topo-bg relative overflow-hidden bg-sand">
      <div className="container-x grid items-center gap-16 lg:grid-cols-2">
        {/* Layered image composition */}
        <Reveal className="relative mx-auto w-full max-w-[520px] pb-12">
          {/* Dotted flight path */}
          <svg
            viewBox="0 0 260 140"
            fill="none"
            aria-hidden="true"
            className="absolute -top-4 right-2 z-10 w-52 text-coral sm:w-64"
          >
            <path
              d="M10,120 C80,20 160,180 250,60"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeDasharray="6 6"
              strokeLinecap="round"
            />
          </svg>
          <AirplaneTilt
            size={30}
            weight="duotone"
            aria-hidden="true"
            className="absolute right-4 top-8 z-10 rotate-[38deg] text-coral"
          />

          <div className="relative aspect-[4/5] w-full max-w-[420px] overflow-hidden rounded-[24px] shadow-[0_24px_48px_-16px_rgba(11,59,54,0.28)]">
            <Image
              src={WHY_US[0].src}
              alt={WHY_US[0].alt}
              fill
              sizes="(max-width: 1024px) 80vw, 420px"
              loading="lazy"
              className="photo-rich h-full w-full object-cover"
            />
          </div>

          <div className="absolute -right-2 top-10 aspect-square w-44 overflow-hidden rounded-[20px] shadow-[0_24px_48px_-16px_rgba(11,59,54,0.28)] sm:-right-6 sm:w-56">
            <Image
              src={WHY_US[1].src}
              alt={WHY_US[1].alt}
              fill
              sizes="(max-width: 1024px) 45vw, 224px"
              loading="lazy"
              className="photo-rich h-full w-full object-cover"
            />
          </div>

          <div className="absolute -left-2 bottom-16 aspect-[4/3] w-52 overflow-hidden rounded-[20px] shadow-[0_24px_48px_-16px_rgba(11,59,54,0.28)] sm:-left-4 sm:w-64">
            <Image
              src={WHY_US[2].src}
              alt={WHY_US[2].alt}
              fill
              sizes="(max-width: 1024px) 50vw, 256px"
              loading="lazy"
              className="photo-rich h-full w-full object-cover"
            />
          </div>

          {/* Floating experience badge */}
          <div className="animate-float absolute -bottom-2 right-4 rounded-2xl bg-white p-4 shadow-[0_10px_30px_-12px_rgba(11,59,54,0.18)]">
            <p className="font-display text-4xl font-extrabold text-primary-600">
              12+
            </p>
            <p className="mt-1 text-[13px] font-medium text-body">
              years experience
            </p>
          </div>
        </Reveal>

        {/* Copy */}
        <div>
          <SectionTitle
            align="left"
            eyebrow="Why choose us"
            title="We plan trips we'd take ourselves"
            text="Every route is walked by our team before it carries a group. No coaches, no queues, no tourist menus."
          />

          <Reveal delay={0.1}>
            <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2">
              {FEATURES.map((feature) => (
                <div key={feature.title} className="flex gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary-600">
                    <feature.icon size={28} weight="duotone" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-[17px] font-bold text-ink">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-body">
                      {feature.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.18} className="mt-10 flex flex-wrap items-center gap-8">
            <Link href="/about" className="btn-primary">
              More About Us
              <ArrowRight size={20} weight="bold" className="btn-arrow" />
            </Link>
            <p className="font-script text-2xl text-ink/70">
              Mara Ellison, Founder
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
