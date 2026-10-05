import Image from "next/image";
import type { ItineraryDay } from "@/data/trips";
import { padDay } from "@/lib/format";

/**
 * Day-by-day itinerary. Uses native details/summary: no animation,
 * fully keyboard accessible.
 */
export function ItineraryAccordion({ days }: { days: ItineraryDay[] }) {
  return (
    <div>
      {days.map((d, i) => (
        <details
          key={d.day}
          open={i === 0}
          className="group border-t border-rule last:border-b"
        >
          <summary className="flex cursor-pointer list-none items-baseline gap-5 py-5 md:gap-8 [&::-webkit-details-marker]:hidden">
            <span className="mono-label w-[64px] shrink-0 text-ink-soft">
              {padDay(d.day)}
            </span>
            <span className="font-display flex-1 text-[22px] leading-[1.2] md:text-[26px]">
              {d.title}
            </span>
            <span
              aria-hidden="true"
              className="mono-label text-ink-soft group-open:hidden"
            >
              OPEN
            </span>
            <span
              aria-hidden="true"
              className="mono-label hidden text-ink-soft group-open:inline"
            >
              SHUT
            </span>
          </summary>
          <div className="max-w-[66ch] pb-10 md:pl-[96px]">
            <p className="body-lg text-ink-soft">{d.text}</p>
            {d.image && (
              <figure className="mt-6">
                <div className="relative aspect-[16/9] overflow-hidden rounded-[2px]">
                  <Image
                    src={d.image.src}
                    alt={d.image.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 640px"
                    className="photo-grade h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </figure>
            )}
          </div>
        </details>
      ))}
    </div>
  );
}
