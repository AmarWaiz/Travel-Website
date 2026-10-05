"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Play } from "@phosphor-icons/react";
import "swiper/css";
import "swiper/css/effect-fade";

interface HeroSlide {
  img: string;
  alt: string;
  sub: string;
  title: string;
  text: string;
}

const SLIDES: HeroSlide[] = [
  {
    img: "1506905925346-21bda4d32df4",
    alt: "Karokoram peaks at dawn",
    sub: "Mountains of Pakistan",
    title: "Ten days in the Karakoram",
    text: "Small groups, family guesthouses, and glaciers you can walk to from the road.",
  },
  {
    img: "1542401886-65d6c61db217",
    alt: "Dunes of the Empty Quarter",
    sub: "Deserts of Oman",
    title: "Cross the Empty Quarter",
    text: "Six nights wild camping in the world's largest sand desert.",
  },
  {
    img: "1612698093158-e07ac200d44e", // HUNT2: genuine Amalfi town from the sea
    alt: "Amalfi town with pastel cliff houses seen from the sea",
    sub: "Coasts of Italy",
    title: "Walk the Amalfi Coast",
    text: "Clifftop trails by morning, swimming coves every afternoon.",
  },
];

const u = (id: string) => `https://images.unsplash.com/photo-${id}`;

export function HeroSlider() {
  const [active, setActive] = useState(0);
  const barRef = useRef<HTMLSpanElement>(null);
  const slide = SLIDES[active];

  return (
    <section className="relative h-[100svh] min-h-[720px] overflow-hidden bg-primary-900">
      <Swiper
        modules={[EffectFade, Autoplay]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={900}
        loop
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        onSlideChange={(s) => setActive(s.realIndex)}
        onAutoplayTimeLeft={(_s, _time, progress) => {
          if (barRef.current) {
            barRef.current.style.width = `${(1 - progress) * 100}%`;
          }
        }}
        className="h-full w-full"
        style={{ position: "absolute", inset: 0 }}
      >
        {SLIDES.map((s, i) => (
          <SwiperSlide key={s.img} className="h-full">
            <div className="relative h-full w-full">
              <Image
                src={u(s.img)}
                alt={s.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                className="animate-kenburns photo-rich object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary-900/85 via-primary-900/40 to-transparent" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Content */}
      <div className="container-x relative z-10 flex h-full flex-col justify-center pt-[140px] lg:pt-[180px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-[640px]"
          >
            <p className="script-subtitle text-coral">{slide.sub}</p>
            <h1 className="h1-hero mt-4 text-white">{slide.title}</h1>
            <p className="mt-6 max-w-[52ch] text-[17px] leading-[1.7] text-white/80">
              {slide.text}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link href="/tours" className="btn-amber">
                Explore Tours
                <ArrowRight weight="bold" className="btn-arrow" size={18} />
              </Link>
              <Link href="#video" className="btn-outline-white">
                <Play weight="duotone" size={18} />
                Watch Video
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide counter + progress */}
      <div className="absolute bottom-10 right-6 z-10 lg:right-12">
        <p className="text-right font-sans text-sm font-semibold tracking-[0.2em] text-white">
          {String(active + 1).padStart(2, "0")}
          <span className="text-white/50"> / {String(SLIDES.length).padStart(2, "0")}</span>
        </p>
        <div className="mt-3 h-[3px] w-24 overflow-hidden rounded-full bg-white/25">
          <span ref={barRef} className="block h-full w-0 bg-accent" />
        </div>
      </div>
    </section>
  );
}
