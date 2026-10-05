import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { PageBanner } from "@/components/PageBanner";
import { Reveal } from "@/components/Reveal";
import { EnquiryForm } from "@/components/EnquiryForm";
import { getTrip } from "@/data/trips";
import { formatDate } from "@/lib/format";
import type { EnquiryInput } from "@/lib/enquiry-schema";

export const metadata: Metadata = {
  title: "Enquire",
  description:
    "Ask about a Travle trip. We reply within one working day, from a real person who has been on the trip.",
};

interface EnquirePageProps {
  searchParams: Promise<{ trip?: string; date?: string }>;
}

const PROMISES = [
  "Reply within one working day",
  "From a real person, not a queue",
  "No deposit until you confirm",
  "Seats held 7 days while you decide",
];

export default async function EnquirePage({ searchParams }: EnquirePageProps) {
  const params = await searchParams;
  const trip = params.trip ? getTrip(params.trip) : undefined;

  const defaultValues: Partial<EnquiryInput> = {};
  if (trip) {
    defaultValues.trip = trip.slug;
    if (
      params.date &&
      trip.departures.some((d) => d.date === params.date)
    ) {
      defaultValues.departureDate = params.date;
    }
  }

  return (
    <div>
      <PageBanner
        title="Enquire"
        image="https://images.unsplash.com/photo-1503220317375-aaad61436b1b"
        imageAlt="Traveller with backpack in a mountain landscape"
        crumbs={[{ label: "Home", href: "/" }, { label: "Enquire" }]}
      />
      <section className="container-x section-pad grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <p className="script-subtitle">Ask us anything</p>
          <h2 className="h2-section mt-3">
            Tell us where you want to go and when.
          </h2>
          <p className="body-lg mt-4 text-body">
            We reply within one working day, from a real person who has been
            on the trip.
          </p>

          {trip && (
            <Link
              href={`/tours/${trip.slug}`}
              className="card-lift mt-8 block rounded-[20px] bg-white p-6 shadow-[0_10px_30px_-12px_rgba(11,59,54,0.18)]"
            >
              <p className="text-[12.5px] font-bold uppercase tracking-[0.14em] text-coral">
                Enquiring about
              </p>
              <p className="mt-2 font-display text-[22px] font-bold text-ink">
                {trip.title}
              </p>
              {defaultValues.departureDate && (
                <p className="mt-1 text-[14.5px] font-bold text-primary-600">
                  {formatDate(defaultValues.departureDate)}
                </p>
              )}
              <p className="mt-2 text-[14px] font-medium text-body underline underline-offset-4">
                View trip details
              </p>
            </Link>
          )}

          <ul className="mt-8 space-y-4">
            {PROMISES.map((item) => (
              <li key={item} className="flex items-center gap-3 text-[15.5px] font-medium text-ink">
                <CheckCircle size={22} weight="duotone" className="shrink-0 text-primary-600" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-[24px] border border-line bg-white p-7 shadow-[0_18px_44px_-18px_rgba(11,59,54,0.25)] lg:p-10">
            <EnquiryForm defaultValues={defaultValues} />
          </div>
        </Reveal>
      </section>
    </div>
  );
}
