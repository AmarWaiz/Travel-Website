import Image from "next/image";
import Link from "next/link";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";

interface Crumb {
  label: string;
  href?: string;
}

interface PageBannerProps {
  title: string;
  image: string;
  imageAlt: string;
  crumbs: Crumb[];
}

/**
 * Inner page banner: 420px background image, dark overlay, centered white H1,
 * breadcrumb, wave at the bottom edge. Clears the fixed header.
 */
export function PageBanner({ title, image, imageAlt, crumbs }: PageBannerProps) {
  return (
    <section className="relative flex h-[420px] items-center justify-center overflow-hidden">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="photo-rich object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-primary-900/70 via-primary-900/45 to-primary-900/65" />
      <div className="relative px-6 pt-[96px] text-center lg:pt-[136px]">
        <h1 className="h1-hero text-white">{title}</h1>
        <nav aria-label="Breadcrumb" className="mt-4">
          <ol className="flex items-center justify-center gap-1.5 text-[15px] font-medium text-white/80">
            {crumbs.map((c, i) => (
              <li key={c.label} className="flex items-center gap-1.5">
                {i > 0 && (
                  <CaretRight size={14} weight="bold" aria-hidden="true" />
                )}
                {c.href ? (
                  <Link
                    href={c.href}
                    className="transition-colors hover:text-accent"
                  >
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-accent">
                    {c.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
      <svg
        className="absolute bottom-[-1px] left-0 h-[48px] w-full text-white"
        viewBox="0 0 1440 48"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,48 L0,24 C240,48 480,48 720,28 C960,8 1200,8 1440,30 L1440,48 Z"
          fill="currentColor"
        />
      </svg>
    </section>
  );
}
