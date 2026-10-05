import type { Metadata } from "next";
import { Envelope, MapPin, Phone } from "@phosphor-icons/react/dist/ssr";
import { PageBanner } from "@/components/PageBanner";
import { SectionTitle } from "@/components/SectionTitle";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the Travle team about bookings, private groups, press, or anything else. We reply within one working day.",
};

const INFO_CARDS = [
  {
    icon: Phone,
    title: "Call us",
    lines: ["+44 20 4577 1900", "Mon–Fri, 9:00–18:00 GMT"],
  },
  {
    icon: Envelope,
    title: "Email us",
    lines: ["hello@travle.travel", "We reply within one working day"],
  },
  {
    icon: MapPin,
    title: "Visit us",
    lines: ["14 Tanner Street", "London SE1 3LE"],
  },
];

export default function ContactPage() {
  return (
    <div>
      <PageBanner
        title="Contact Us"
        image="https://images.unsplash.com/photo-1488646953014-85cb44e25828"
        imageAlt="Traveller with map"
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <section className="section-pad">
        <div className="container-x">
          <SectionTitle
            eyebrow="Say hello"
            title="How to reach us"
            text="Questions about a trip, a booking, or a private group? Pick whichever channel suits you."
          />

          <div className="grid gap-6 md:grid-cols-3">
            {INFO_CARDS.map((card, i) => (
              <Reveal key={card.title} delay={i * 0.08}>
                <div className="rounded-[20px] bg-white p-7 text-center shadow-[0_10px_30px_-12px_rgba(11,59,54,0.18)]">
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent text-ink">
                    <card.icon size={28} weight="duotone" aria-hidden="true" />
                  </span>
                  <h3 className="h3-card mt-5 text-ink">{card.title}</h3>
                  {card.lines.map((line) => (
                    <p
                      key={line}
                      className="mt-1 text-[16px] leading-[1.7] text-body"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-14 grid gap-10 lg:grid-cols-2">
            <Reveal>
              <ContactForm />
            </Reveal>
            <Reveal delay={0.12}>
              <iframe
                title="Map of the Travle office, 14 Tanner Street, London"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-0.12%2C51.49%2C-0.06%2C51.53&layer=mapnik&marker=51.51%2C-0.09"
                loading="lazy"
                className="h-full min-h-[420px] w-full rounded-[24px] border border-line"
              />
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
