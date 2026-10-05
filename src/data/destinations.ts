export interface Destination {
  slug: string;
  name: string;
  country: string;
  /** Hero image URL — replaced with unique hunted photos after the image pass */
  hero: string;
  heroAlt: string;
  tourCount: number;
  blurb: string;
  coordinates: string;
}

import { DESTINATION_HERO } from "./images";

const u = (id: string) => `https://images.unsplash.com/photo-${id}`; // TEMP: Delhi hero until hunt-2

export const destinations: Destination[] = [
  {
    slug: "karakoram",
    name: "Hunza Valley",
    country: "Pakistan",
    hero: DESTINATION_HERO.karakoram.src,
    heroAlt: DESTINATION_HERO.karakoram.alt,
    tourCount: 1,
    blurb:
      "Ten days on the old trade road between Hunza and Skardu, through apricot valleys and past walk-up glaciers.",
    coordinates: "36°19′N 74°39′E",
  },
  {
    slug: "oman",
    name: "Empty Quarter",
    country: "Oman",
    hero: DESTINATION_HERO.oman.src,
    heroAlt: DESTINATION_HERO.oman.alt,
    tourCount: 1,
    blurb:
      "Six nights wild camping in the world's largest sand desert, driven by Bedouin dune experts.",
    coordinates: "20°07′N 55°42′E",
  },
  {
    slug: "amalfi",
    name: "Amalfi Coast",
    country: "Italy",
    hero: DESTINATION_HERO.amalfi.src,
    heroAlt: DESTINATION_HERO.amalfi.alt,
    tourCount: 1,
    blurb:
      "Walk the Path of the Gods and swim every afternoon, with luggage transferred between family-run hotels.",
    coordinates: "40°38′N 14°36′E",
  },
  {
    slug: "delhi",
    name: "Delhi",
    country: "India",
    hero: u("1524492412937-b28074a5d7da"),
    heroAlt: "Mughal architecture in Delhi at golden hour",
    tourCount: 1,
    blurb:
      "Six days peeling back the capital's layers — Mughal tombs, Old Delhi food walks, and a family cooking day.",
    coordinates: "28°36′N 77°13′E",
  },
  {
    slug: "balkans",
    name: "Montenegro",
    country: "Montenegro",
    hero: DESTINATION_HERO.montenegro.src,
    heroAlt: DESTINATION_HERO.montenegro.alt,
    tourCount: 1,
    blurb:
      "Ride the Belgrade to Bar sleeper the length of the Dinaric Alps, then slow down inside Kotor's walls.",
    coordinates: "44°48′N 20°27′E",
  },
  {
    slug: "lapland",
    name: "Lapland",
    country: "Finland",
    hero: DESTINATION_HERO.lapland.src,
    heroAlt: DESTINATION_HERO.lapland.alt,
    tourCount: 1,
    blurb:
      "Aurora hunting with a photographer, your own husky team, and sauna nights at a wilderness cabin.",
    coordinates: "68°25′N 23°38′E",
  },
];

export function getDestination(slug: string) {
  return destinations.find((d) => d.slug === slug);
}
