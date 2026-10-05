import type { MetadataRoute } from "next";
import { trips } from "@/data/trips";
import { destinations } from "@/data/destinations";
import { journalPosts } from "@/data/journal";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/tours",
    "/destinations",
    "/about",
    "/blog",
    "/contact",
    "/faq",
    "/enquire",
  ];
  return [
    ...staticRoutes.map((r) => ({
      url: `${SITE_URL}${r}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: r === "" ? 1 : 0.8,
    })),
    ...trips.map((t) => ({
      url: `${SITE_URL}/tours/${t.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...destinations.map((d) => ({
      url: `${SITE_URL}/destinations/${d.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...journalPosts.map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
