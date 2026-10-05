import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  FacebookLogo,
  InstagramLogo,
  TwitterLogo,
} from "@phosphor-icons/react/dist/ssr";
import { PageBanner } from "@/components/PageBanner";
import { SectionTitle } from "@/components/SectionTitle";
import { Reveal } from "@/components/Reveal";
import { StatsBand } from "@/components/home/StatsBand";
import { Testimonials } from "@/components/home/Testimonials";
import { ABOUT_TRAIL } from "@/data/images";
import { team } from "@/data/team";

export const metadata: Metadata = {
  title: "About",
  description:
    "Travle is a small-group travel company running guided tours of 8 to 14 people, led by guides who know every route by heart.",
};

const PRINCIPLES = [
  {
    n: "01",
    title: "Walk it first",
    text: "No route carries paying travellers until someone on our team has walked, ridden or driven every kilometre of it.",
  },
  {
    n: "02",
    title: "Guides from the place",
    text: "Our guides were born where they guide. They set the pace, choose the teahouses, and know which viewpoint is worth the climb.",
  },
  {
    n: "03",
    title: "Small on purpose",
    text: "Eight to fourteen people fits in one minibus, one riad courtyard, one long dinner table. Bigger groups get a worse trip.",
  },
  {
    n: "04",
    title: "Money stays local",
    text: "Family guesthouses, neighbourhood restaurants, local drivers. Roughly 70p of every pound lands in the local economy.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <PageBanner
        title="About Travle"
        image="https://images.unsplash.com/photo-1454496522488-7a8e488e8606"
        imageAlt="Traveller looking over a mountain valley"
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      {/* Story split */}
      <section className="container-x section-pad grid items-center gap-14 lg:grid-cols-2">
        <Reveal className="relative">
          <div className="overflow-hidden rounded-[24px]">
            <Image
              src={ABOUT_TRAIL.src}
              alt={ABOUT_TRAIL.alt}
              width={800}
              height={1000}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="photo-rich aspect-[4/5] w-full object-cover"
            />
          </div>
          <div className="animate-float absolute -bottom-6 -right-2 rounded-[20px] bg-white p-5 shadow-[0_24px_48px_-16px_rgba(11,59,54,0.28)] lg:-right-6">
            <p className="font-display text-[34px] font-extrabold leading-none text-primary-600">
              2014
            </p>
            <p className="mt-1 text-[13.5px] font-medium text-body">
              guiding since
            </p>
          </div>
        </Reveal>
        <div>
          <SectionTitle
            align="left"
            eyebrow="Our story"
            title="A travel company built on foot"
          />
          <div className="-mt-6 space-y-5 text-[16.5px] leading-[1.75] text-body">
            <p>
              Travle started in 2014 with one secondhand minibus and a route
              through the Karakoram that our founder had walked three times
              before charging anyone for it. Twelve years later the principle
              hasn&apos;t changed: nobody leads a Travle trip anywhere they
              haven&apos;t been, slowly, on foot.
            </p>
            <p>
              Today we run small-group tours across six regions, but every
              departure still caps at fourteen travellers, every guide still
              comes from the place they guide in, and every itinerary still
              gets re-walked each season — because roads wash out, guesthouses
              change hands, and the best teahouse in a valley is worth finding
              again.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.08}>
                <div className="h-full rounded-[18px] bg-sand p-5">
                  <p className="font-display text-[15px] font-extrabold text-coral">
                    {p.n}
                  </p>
                  <p className="mt-1 font-display text-[17px] font-bold text-ink">
                    {p.title}
                  </p>
                  <p className="mt-1.5 text-[14.5px] leading-[1.65] text-body">
                    {p.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <StatsBand />

      {/* Team */}
      <section className="container-x section-pad">
        <SectionTitle
          eyebrow="The team"
          title="Who you travel with"
          text="Guides, planners and fixers — the people who answer the phone when you call."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={(i % 3) * 0.08}>
              <article className="card-lift group overflow-hidden rounded-[20px] bg-white shadow-[0_10px_30px_-12px_rgba(11,59,54,0.18)]">
                <div className="relative aspect-[4/4] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={m.photo}
                    alt={m.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 flex translate-y-3 justify-center gap-2 pb-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    {[
                      { label: "Facebook", Icon: FacebookLogo },
                      { label: "Instagram", Icon: InstagramLogo },
                      { label: "Twitter", Icon: TwitterLogo },
                    ].map(({ label, Icon }) => (
                      <a
                        key={label}
                        href="#"
                        aria-label={`${m.name} on ${label}`}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink shadow transition-colors hover:bg-accent"
                      >
                        <Icon size={18} weight="duotone" />
                      </a>
                    ))}
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="h3-card">{m.name}</h3>
                  <p className="mt-1 text-[14px] font-bold uppercase tracking-wider text-coral">
                    {m.role}
                  </p>
                  <p className="mt-3 text-[15px] text-body">{m.bio}</p>
                </div>
              </article>
            </Reveal>
          ))}
          <Reveal delay={0.16}>
            <Link
              href="/contact"
              className="group flex h-full min-h-[320px] flex-col items-center justify-center rounded-[20px] bg-primary p-8 text-center transition-colors hover:bg-primary-600"
            >
              <p className="script-subtitle !text-accent">Join us</p>
              <p className="mt-2 font-display text-[24px] font-bold text-white">
                Want to guide for Travle?
              </p>
              <p className="mt-2 text-[15px] text-white/75">
                We hire guides from the places we visit.
              </p>
              <span className="btn-amber mt-6">
                Get in touch
                <ArrowRight size={18} weight="bold" className="btn-arrow" />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      <Testimonials />

      {/* CTA band */}
      <section className="container-x pb-20 lg:pb-28">
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] bg-primary px-8 py-16 text-center lg:py-20">
            <div className="topo-bg absolute inset-0 opacity-100" aria-hidden="true" />
            <div className="relative">
              <p className="script-subtitle !text-accent">Ready when you are</p>
              <h2 className="h2-section mx-auto mt-3 max-w-[18ch] !text-white">
                Come and see how we travel
              </h2>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link href="/tours" className="btn-amber">
                  Browse Tours
                  <ArrowRight size={18} weight="bold" className="btn-arrow" />
                </Link>
                <Link href="/contact" className="btn-outline-white">
                  Talk to Us
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
