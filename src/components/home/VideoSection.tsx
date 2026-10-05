"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Play, X } from "@phosphor-icons/react";
import { VIDEO_BG } from "@/data/images";

const VIDEO_ID = "LXb3EKWsInQ";

export function VideoSection() {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  return (
    <section id="video" className="section-pad">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[28px] aspect-[16/9] lg:aspect-[21/9]">
          <Image
            src={VIDEO_BG.src}
                alt={VIDEO_BG.alt}
            fill
            sizes="100vw"
            loading="lazy"
            className="photo-rich h-full w-full object-cover"
          />
          <div
            className="absolute inset-0 bg-primary-900/50"
            aria-hidden="true"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 text-center">
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Play the Travle brand film"
              className="group relative"
            >
              <span
                className="absolute inset-0 animate-pulse-ring rounded-full bg-accent/60"
                aria-hidden="true"
              />
              <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-accent text-ink transition-transform duration-300 group-hover:scale-105">
                <Play size={30} weight="fill" />
              </span>
            </button>
            <p className="script-subtitle text-accent">Watch our story</p>
            <h2 className="font-display text-4xl font-bold text-white lg:text-5xl">
              Two minutes in the Karakoram
            </h2>
          </div>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[95] flex items-center justify-center bg-primary-900/85 p-6 backdrop-blur"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Travle brand film"
        >
          <div
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close video"
              className="absolute -top-12 right-0 flex h-11 w-11 items-center justify-center text-white transition-colors hover:text-accent"
            >
              <X size={28} weight="bold" />
            </button>
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1`}
                title="Travle brand film"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
