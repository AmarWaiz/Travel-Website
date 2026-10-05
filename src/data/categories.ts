export interface Category {
  slug: string;
  name: string;
  /** Temporary image — replaced with a unique hunted photo after the image pass */
  image: string;
  count: number;
}

import { CATEGORY_IMG } from "./images";

const u = (id: string) => `https://images.unsplash.com/photo-${id}`; // TEMP: Rail category until hunt-2

export const categories: Category[] = [
  { slug: "adventure", name: "Adventure", image: CATEGORY_IMG.adventure.src, count: 1 },
  { slug: "beach", name: "Beach", image: CATEGORY_IMG.beach.src, count: 1 },
  { slug: "mountains", name: "Mountains", image: CATEGORY_IMG.mountains.src, count: 1 },
  { slug: "city", name: "City", image: CATEGORY_IMG.city.src, count: 1 },
  { slug: "rail", name: "Rail", image: CATEGORY_IMG.rail.src, count: 1 },
  { slug: "winter", name: "Winter", image: CATEGORY_IMG.winter.src, count: 1 },
];
