import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TourDetail } from "@/components/TourDetail";
import { getTrip, trips } from "@/data/trips";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return trips.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const trip = getTrip(slug);
  if (!trip) return {};
  const price = trip.discount
    ? Math.round(trip.priceFrom * (1 - trip.discount / 100))
    : trip.priceFrom;
  return {
    title: trip.title,
    description: `${trip.days}-day ${trip.category.toLowerCase()} tour in ${trip.country}. From $${price.toLocaleString()} per person. ${trip.summary.slice(0, 120)}…`,
    openGraph: {
      title: `${trip.title} · Travle`,
      description: trip.summary,
      url: `${SITE_URL}/tours/${trip.slug}`,
      type: "article",
      images: [{ url: trip.images[0]?.src ?? "", alt: trip.images[0]?.alt ?? trip.title }],
    },
  };
}

export default async function TourPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const trip = getTrip(slug);
  if (!trip) notFound();
  return <TourDetail trip={trip} />;
}
