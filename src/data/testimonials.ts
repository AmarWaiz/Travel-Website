import { AVATARS } from "./images";

export interface Testimonial {
  name: string;
  trip: string;
  rating: number;
  text: string;
  avatar: string;
}

/**
 * PLACEHOLDER: replace with real data — every testimonial below is sample
 * copy written for layout purposes.
 */
export const testimonials: Testimonial[] = [
  {
    name: "Sarah Mitchell",
    trip: "Hunza to Skardu, March 2026",
    rating: 5,
    text: "Our guide grew up in Karimabad and knew every trail and teahouse. The Deosai day alone was worth the flight, and the group of eleven felt like old friends by day three.",
    avatar: AVATARS[0].src,
  },
  {
    name: "David Chen",
    trip: "Empty Quarter, February 2026",
    rating: 5,
    text: "The dunes go on past the horizon in every direction. Camp logistics were flawless — hot food, cold nights, zero hassle. I have never slept better than under those stars.",
    avatar: AVATARS[1].src,
  },
  {
    name: "Claire Dubois",
    trip: "Amalfi Coast, May 2026",
    rating: 5,
    text: "We walked the Path of the Gods on a clear morning with the whole coast below us. Mornings on the trails, afternoons in the sea — the formula just works.",
    avatar: AVATARS[2].src,
  },
  {
    name: "Henrik Larsen",
    trip: "Belgrade to Bar, June 2026",
    rating: 5,
    text: "Waking up as the train crossed the Morača canyon is a memory I will keep forever. The sleeper compartments were comfortable and the dining car dinners a delight.",
    avatar: AVATARS[3].src,
  },
  {
    name: "Emma Wilson",
    trip: "Lapland, February 2026",
    rating: 5,
    text: "The guides chase clear skies relentlessly — we drove two hours one night and were rewarded with the best aurora display of my life. The thermal suits really do work at −25.",
    avatar: AVATARS[4].src,
  },
  {
    name: "Priya Sharma",
    trip: "Delhi, November 2025",
    rating: 5,
    text: "I have visited Delhi three times and never understood it until this trip. The layering of eras is extraordinary with the right guide — and the food walk is unmissable.",
    avatar: AVATARS[5].src,
  },
];
