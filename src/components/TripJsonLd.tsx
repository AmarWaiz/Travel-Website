import type { Trip } from "@/data/trips";
import { SITE_URL } from "@/lib/site";

export function TripJsonLd({ trip }: { trip: Trip }) {
  const json = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: trip.title,
    description: trip.summary,
    url: `${SITE_URL}/trips/${trip.slug}`,
    touristType: "Small group travellers",
    itinerary: {
      "@type": "ItemList",
      itemListElement: trip.itinerary.map((d, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: `Day ${d.day}: ${d.title}`,
        description: d.text,
      })),
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: trip.priceFrom,
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/trips/${trip.slug}`,
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
