import type { Metadata } from "next";
import { Suspense } from "react";
import { PageBanner } from "@/components/PageBanner";
import { ToursExplorer } from "@/components/ToursExplorer";

export const metadata: Metadata = {
  title: "Tours",
  description:
    "Browse all Travle small-group tours — mountains, deserts, coasts, cities and rail journeys, 8 to 14 people per departure.",
};

export default function ToursPage() {
  return (
    <div>
      <PageBanner
        title="Tours"
        image="https://images.unsplash.com/photo-1469474968028-56623f02e42e"
        imageAlt="Sunrise over a high mountain valley"
        crumbs={[{ label: "Home", href: "/" }, { label: "Tours" }]}
      />
      <Suspense
        fallback={
          <div className="container-x section-pad">
            <p className="text-body">Loading tours…</p>
          </div>
        }
      >
        <ToursExplorer />
      </Suspense>
    </div>
  );
}
