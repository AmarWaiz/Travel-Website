import type { Metadata } from "next";
import { PageBanner } from "@/components/PageBanner";
import { BlogExplorer } from "@/components/BlogExplorer";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Field notes from our guides — packing lists, night trains, and what breakfast looks like at 2,900 metres.",
};

export default function BlogPage() {
  return (
    <div>
      <PageBanner
        title="Blog"
        image="https://images.unsplash.com/photo-1458668383970-8ddd3927deed"
        imageAlt="Morning light over a mountain valley"
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
      />
      <BlogExplorer />
    </div>
  );
}
