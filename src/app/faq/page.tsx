import type { Metadata } from "next";
import { PageBanner } from "@/components/PageBanner";
import { SectionTitle } from "@/components/SectionTitle";
import { FaqAccordion, type FaqItem } from "@/components/FaqAccordion";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about booking a Travle trip, deposits, group sizes, fitness, and what is included.",
};

const BOOKING_FAQS: FaqItem[] = [
  {
    q: "How do I book a trip?",
    a: "Pick a departure on the trip page and send an enquiry, or call us on +44 20 4577 1900. We confirm availability within one working day and then take a 20% deposit to secure your seat.",
  },
  {
    q: "How much is the deposit, and when is the balance due?",
    a: "The deposit is 20% of the trip price, paid when you book. The remaining balance is due 60 days before departure. We send a reminder two weeks before it is due.",
  },
  {
    q: "Can I change my travel date for free?",
    a: "Yes, up to 30 days before departure you can move to any other departure of the same trip at no charge, subject to seat availability.",
  },
  {
    q: "Can I hold seats while I decide?",
    a: "We hold seats for 7 days with no payment and no obligation. After that they are released unless you pay the deposit.",
  },
  {
    q: "Is there a single supplement?",
    a: "Most trips have twin-share rooms as standard. If you want a room to yourself, a single supplement applies and is shown on the trip page before you book. We also offer a room-share option for solo travellers who are happy to be paired.",
  },
];

const ON_TRIP_FAQS: FaqItem[] = [
  {
    q: "How big are the groups?",
    a: "Between 8 and 14 travellers, plus your guide. Small enough to eat together at one table, large enough to find your people.",
  },
  {
    q: "How fit do I need to be?",
    a: "Every trip page lists a fitness grade from 1 to 5. Most trips are grade 2 or 3: comfortable with full days on your feet and, on walking trips, 4 to 6 hours of hiking with a day pack.",
  },
  {
    q: "What is included in the price?",
    a: "All accommodation, transport between stops, the guide, and the meals and activities listed under Included on each trip page. International flights to the start point are not included unless stated.",
  },
  {
    q: "Can you handle dietary requirements?",
    a: "Yes. Tell us when you book and we plan around it. Vegetarian, vegan, halal, and most allergies are easy on all our routes; we confirm the details with you before departure.",
  },
  {
    q: "Do I need travel insurance?",
    a: "Yes, it is required on every trip. Your policy must cover medical expenses and repatriation, and we recommend cover for cancellation and your activities, such as hiking or 4x4 travel.",
  },
];

export default function FaqPage() {
  return (
    <div>
      <PageBanner
        title="FAQs"
        image="https://images.unsplash.com/photo-1527295110-5145f6b148d0"
        imageAlt="Mountain lake"
        crumbs={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
      />

      <section className="section-pad">
        <div className="container-x">
          <SectionTitle
            eyebrow="Good to know"
            title="Frequently asked questions"
          />
          <div className="grid gap-6 lg:grid-cols-2">
            <FaqAccordion heading="Booking" items={BOOKING_FAQS} />
            <FaqAccordion heading="On the trip" items={ON_TRIP_FAQS} />
          </div>
        </div>
      </section>
    </div>
  );
}
