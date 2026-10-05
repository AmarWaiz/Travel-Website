import Image from "next/image";
import { InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/Reveal";
import { INSTAGRAM } from "@/data/images";

const SHOTS = INSTAGRAM;

export function InstagramStrip() {
  return (
    <section className="pt-[72px] lg:pt-[120px]">
      <Reveal className="container-x mb-10 text-center lg:mb-12">
        <p className="script-subtitle justify-center text-coral">
          Follow along
        </p>
        <h3 className="font-display text-2xl font-bold text-ink lg:text-3xl">
          @travle.travel
        </h3>
      </Reveal>
      <div className="overflow-hidden">
        <div className="flex w-max animate-marquee gap-4 hover:[animation-play-state:paused]">
          {[...SHOTS, ...SHOTS].map((shot, i) => (
            <a
              key={`${shot.src}-${i}`}
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Travle on Instagram"
              className="group relative h-56 w-56 shrink-0 overflow-hidden rounded-[20px] lg:h-64 lg:w-64"
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                sizes="256px"
                loading="lazy"
                className="photo-rich h-full w-full object-cover"
              />
              <span
                className="absolute inset-0 flex items-center justify-center bg-primary/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden="true"
              >
                <InstagramLogo size={30} weight="duotone" className="text-white" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
