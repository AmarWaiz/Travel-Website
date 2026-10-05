"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { SectionTitle } from "@/components/SectionTitle";
import { Reveal } from "@/components/Reveal";
import { destinations } from "@/data/destinations";

const SPANS = [
  "col-span-2 row-span-2",
  "col-span-2",
  "",
  "",
  "col-span-2",
];

export function Destinations() {
  const tiles = destinations.slice(0, 5);

  return (
    <section className="section-pad topo-bg bg-sand">
      <div className="container-x">
        <SectionTitle
          eyebrow="Top destinations"
          title="Popular destinations"
          text="The places our travellers ask about most."
        />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:auto-rows-[230px] auto-rows-[200px]">
          {tiles.map((d, i) => (
            <Reveal key={d.slug} delay={i * 0.08} className={SPANS[i]}>
              <Link
                href={`/destinations/${d.slug}`}
                className="img-zoom group relative block h-full w-full overflow-hidden rounded-[20px]"
              >
                <Image
                  src={d.hero}
                  alt={d.heroAlt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  loading="lazy"
                  className="photo-rich object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-5">
                  <p className="font-display text-xl font-bold text-white">
                    {d.name}
                  </p>
                  <p className="mt-1 text-sm text-white/75">
                    {d.tourCount} tour{d.tourCount === 1 ? "" : "s"}
                  </p>
                </div>
                <span className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <ArrowUpRight weight="bold" size={20} className="text-primary-600" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/destinations" className="btn-primary">
            View All Destinations
            <ArrowRight weight="bold" size={18} className="btn-arrow" />
          </Link>
        </div>
      </div>
    </section>
  );
}
