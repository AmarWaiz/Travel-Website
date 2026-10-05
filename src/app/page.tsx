import type { Metadata } from "next";
import { HeroSlider } from "@/components/home/HeroSlider";
import { BookingSearch } from "@/components/home/BookingSearch";
import { Categories } from "@/components/home/Categories";
import { Destinations } from "@/components/home/Destinations";
import { FeaturedTours } from "@/components/home/FeaturedTours";
import { WhyUs } from "@/components/home/WhyUs";
import { StatsBand } from "@/components/home/StatsBand";
import { Deals } from "@/components/home/Deals";
import { VideoSection } from "@/components/home/VideoSection";
import { Testimonials } from "@/components/home/Testimonials";
import { BlogPreview } from "@/components/home/BlogPreview";
import { NewsletterCTA } from "@/components/home/NewsletterCTA";
import { InstagramStrip } from "@/components/home/InstagramStrip";

export const metadata: Metadata = {
  title: "Travle · Small-group guided tours",
  description:
    "Small-group guided tours of 8 to 14 people — mountains, deserts, coasts, cities and rail journeys, led by guides who know every route by heart.",
};

export default function HomePage() {
  return (
    <div>
      <HeroSlider />
      <BookingSearch />
      <Categories />
      <Destinations />
      <FeaturedTours />
      <WhyUs />
      <StatsBand />
      <Deals />
      <VideoSection />
      <Testimonials />
      <BlogPreview />
      <NewsletterCTA />
      <InstagramStrip />
    </div>
  );
}
