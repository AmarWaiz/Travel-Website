"use client";

import Image from "next/image";
import Link from "next/link";
import { SectionTitle } from "@/components/SectionTitle";
import { Reveal } from "@/components/Reveal";
import { categories } from "@/data/categories";

export function Categories() {
  return (
    <section className="section-pad">
      <div className="container-x">
        <SectionTitle
          eyebrow="Browse by style"
          title="Travel your way"
          text="Six ways to see the world — pick the pace that suits you."
        />
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.08}>
              <Link
                href={`/tours?category=${c.slug}`}
                className="group block text-center"
              >
                <div className="relative mx-auto aspect-square w-full max-w-[180px] overflow-hidden rounded-full transition group-hover:ring-4 group-hover:ring-accent">
                  <Image
                    src={c.image}
                    alt={`${c.name} travel`}
                    fill
                    sizes="(max-width: 640px) 40vw, (max-width: 1024px) 28vw, 180px"
                    loading="lazy"
                    className="photo-rich object-cover"
                  />
                </div>
                <p className="mt-4 font-display text-lg font-bold text-ink">
                  {c.name}
                </p>
                <p className="mt-1 text-sm text-body">
                  {c.count} tour{c.count === 1 ? "" : "s"}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
