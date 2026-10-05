"use client";

import { useState } from "react";
import { CaretDown } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/Reveal";

export interface FaqItem {
  q: string;
  a: string;
}

interface FaqAccordionProps {
  heading: string;
  items: FaqItem[];
}

/**
 * Single FAQ column: only one answer open at a time.
 * Answers expand with a grid-rows animation.
 */
export function FaqAccordion({ heading, items }: FaqAccordionProps) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <Reveal>
      <h3 className="h3-card mb-6 text-ink">{heading}</h3>
      <div className="space-y-4">
        {items.map((item, i) => {
          const isOpen = open === i;
          return (
            <div
              key={item.q}
              className={cn(
                "rounded-2xl border bg-white transition-colors",
                isOpen ? "border-primary/40" : "border-line"
              )}
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex min-h-[44px] w-full cursor-pointer items-center justify-between gap-4 px-6 py-4 text-left"
              >
                <span className="font-display text-[17px] font-bold text-ink">
                  {item.q}
                </span>
                <CaretDown
                  size={20}
                  weight="bold"
                  aria-hidden="true"
                  className={cn(
                    "shrink-0 text-primary transition-transform duration-300",
                    isOpen && "rotate-180"
                  )}
                />
              </button>
              <div
                className={cn(
                  "grid transition-[grid-template-rows] duration-300 ease-out",
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                )}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pb-5 text-[16px] leading-[1.7] text-body">
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Reveal>
  );
}
