"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

interface ClipImageProps {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
}

/**
 * Clip-reveal on large images: bottom to top, 700ms, ease [0.2, 0.7, 0.2, 1],
 * the first time the image enters the viewport. One of three allowed motions.
 *
 * Visible-first: the server renders the image revealed, so a failed or slow
 * hydration can never leave a blank frame. On mount (before first paint) an
 * image already in view hides and re-reveals to play the animation; an image
 * below the fold hides until it scrolls into view.
 */
export function ClipImage({
  src,
  alt,
  sizes,
  className,
  imgClassName,
  priority = false,
}: ClipImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(true);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    let alive = true;

    const play = () => {
      // Hide now (before first paint), reveal on the frame after.
      setRevealed(false);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (alive) setRevealed(true);
        });
      });
    };

    const rect = el.getBoundingClientRect();
    const inView =
      rect.top < window.innerHeight - 60 && rect.bottom > 60;

    if (inView) {
      play();
      return () => {
        alive = false;
      };
    }

    setRevealed(false);
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true);
            io.disconnect();
          }
        }
      },
      { rootMargin: "-60px" }
    );
    io.observe(el);
    return () => {
      alive = false;
      io.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn("overflow-hidden", className)}
      style={{
        clipPath: revealed
          ? "inset(0% 0px 0px 0px)"
          : "inset(100% 0px 0px 0px)",
        transition: "clip-path 700ms cubic-bezier(0.2, 0.7, 0.2, 1)",
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("photo-grade h-full w-full object-cover", imgClassName)}
      />
    </div>
  );
}
