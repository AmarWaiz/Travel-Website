import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { PageBanner } from "@/components/PageBanner";
import { Reveal } from "@/components/Reveal";
import { TourCard } from "@/components/TourCard";
import { destinations, getDestination } from "@/data/destinations";
import { trips } from "@/data/trips";

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const d = getDestination(slug);
  if (!d) return {};
  return {
    title: `${d.name}, ${d.country}`,
    description: d.blurb,
  };
}

const DEST_TO_COUNTRY: Record<string, string> = {
  karakoram: "Pakistan",
  oman: "Oman",
  amalfi: "Italy",
  delhi: "India",
  balkans: "Serbia and Montenegro",
  lapland: "Finland",
};

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const d = getDestination(slug);
  if (!d) notFound();
  const country = DEST_TO_COUNTRY[d.slug] ?? d.country;
  const tours = trips.filter((t) => t.country === country);

  return (
    <div>
      <PageBanner
        title={`${d.name}, ${d.country}`}
        image={d.hero}
        imageAlt={d.heroAlt}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Destinations", href: "/destinations" },
          { label: d.name },
        ]}
      />
      <section className="container-x section-pad">
        <Reveal className="mx-auto max-w-[68ch] text-center">
          <p className="script-subtitle">Destination guide</p>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-[15px] font-medium text-body">
            <MapPin size={18} weight="duotone" className="text-coral" />
            {d.coordinates}
          </p>
          <p className="body-lg mt-4 text-body">{d.blurb}</p>
        </Reveal>

        <div className="mt-14">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="h2-section">Tours in {d.name}</h2>
            <Link href="/tours" className="btn-outline-dark hidden sm:inline-flex">
              All Tours <ArrowRight size={18} weight="bold" className="btn-arrow" />
            </Link>
          </div>
          {tours.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {tours.map((t, i) => (
                <Reveal key={t.slug} delay={(i % 3) * 0.08}>
                  <TourCard trip={t} />
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="text-body">
              New departures for {d.name} are being planned —{" "}
              <Link href="/enquire" className="font-semibold text-primary-600 underline underline-offset-4">
                ask us
              </Link>{" "}
              and we will tell you first.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
