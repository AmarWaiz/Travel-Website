import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { PageBanner } from "@/components/PageBanner";
import { SectionTitle } from "@/components/SectionTitle";
import { Reveal } from "@/components/Reveal";
import { destinations } from "@/data/destinations";

export const metadata: Metadata = {
  title: "Destinations",
  description:
    "Where Travle goes: the Karakoram, the Empty Quarter, the Amalfi Coast, Delhi, the Balkans and Lapland.",
};

const spans = [
  "col-span-2 row-span-2",
  "col-span-2",
  "",
  "",
  "col-span-2",
  "col-span-2",
];

export default function DestinationsPage() {
  return (
    <div>
      <PageBanner
        title="Destinations"
        image="https://images.unsplash.com/photo-1501785888041-af3ef285b470"
        imageAlt="Evening light on a still mountain lake"
        crumbs={[{ label: "Home", href: "/" }, { label: "Destinations" }]}
      />
      <section className="container-x section-pad">
        <SectionTitle
          eyebrow="Where we go"
          title="Destinations"
          text="Six regions we know street by street, trail by trail. Every one is led by guides from the place itself."
        />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:auto-rows-[240px] auto-rows-[190px]">
          {destinations.map((d, i) => (
            <Reveal key={d.slug} delay={(i % 4) * 0.08} className={spans[i % spans.length]}>
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
                  className="photo-rich h-full w-full object-cover"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-primary-900/85 via-primary-900/10 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 p-5 lg:p-6">
                  <span className="block font-display text-[20px] font-bold text-white lg:text-[24px]">
                    {d.name}
                  </span>
                  <span className="mt-0.5 block text-[13.5px] font-medium text-white/80">
                    {d.country} · {d.tourCount} tour{d.tourCount === 1 ? "" : "s"}
                  </span>
                </span>
                <span className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <ArrowUpRight size={20} weight="bold" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
