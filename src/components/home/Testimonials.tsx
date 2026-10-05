"use client";

import { Quotes, Star } from "@phosphor-icons/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { SectionTitle } from "@/components/SectionTitle";
import { Reveal } from "@/components/Reveal";
import { testimonials } from "@/data/testimonials";

import "swiper/css";
import "swiper/css/pagination";

export function Testimonials() {
  return (
    <section className="section-pad bg-sand">
      <div className="container-x">
        <SectionTitle
          eyebrow="Testimonials"
          title="What travellers say"
        />
        <Reveal>
          <Swiper
            modules={[Pagination]}
            slidesPerView={1}
            spaceBetween={24}
            breakpoints={{
              768: { slidesPerView: 2 },
              1280: { slidesPerView: 3 },
            }}
            pagination={{ clickable: true }}
            className="pb-12"
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.name} className="h-auto">
                <article className="flex h-full flex-col rounded-[20px] bg-white p-7 shadow-[0_10px_30px_-12px_rgba(11,59,54,0.18)]">
                  <Quotes size={36} weight="fill" className="text-accent" />
                  <div
                    className="mt-4 flex items-center gap-1"
                    aria-label={`Rated ${t.rating} out of 5`}
                  >
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={15} weight="fill" className="text-accent" />
                    ))}
                  </div>
                  <p className="mt-4 flex-1 text-[15.5px] leading-[1.7] text-body line-clamp-5">
                    {t.text}
                  </p>
                  <footer className="mt-6 flex items-center gap-4 border-t border-line pt-6">
                    {/* Plain img: avoids the Unsplash loader mangling avatar URLs */}
                    <img
                      src={t.avatar}
                      alt=""
                      loading="lazy"
                      className="h-14 w-14 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-bold text-ink">{t.name}</p>
                      <p className="text-sm text-body">{t.trip}</p>
                    </div>
                  </footer>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </Reveal>
      </div>
    </section>
  );
}
