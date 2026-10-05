"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useInView, useReducedMotion } from "motion/react";
import { stats, type Stat } from "@/data/stats";
import { STATS_BG } from "@/data/images";

function useCountUp(target: number, start: boolean, duration = 1600): number {
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    if (reduce) {
      setValue(target);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration, reduce]);

  return value;
}

function StatItem({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const value = useCountUp(stat.value, inView);

  return (
    <div ref={ref} className="text-center">
      <p className="font-display text-5xl font-extrabold text-white">
        {value.toFixed(stat.decimals ?? 0)}
        {stat.suffix}
      </p>
      <p className="mt-2 text-[16px] text-white/75">{stat.label}</p>
    </div>
  );
}

export function StatsBand() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={STATS_BG.src}
                alt={STATS_BG.alt}
          fill
          sizes="100vw"
          loading="lazy"
          className="photo-rich h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/85" />
      </div>

      <div className="container-x relative">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatItem key={stat.label} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
