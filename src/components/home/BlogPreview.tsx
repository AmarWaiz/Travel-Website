import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { SectionTitle } from "@/components/SectionTitle";
import { Reveal } from "@/components/Reveal";
import { journalPosts } from "@/data/journal";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function badgeParts(iso: string): { day: string; month: string } {
  const dt = new Date(iso + "T12:00:00");
  return { day: String(dt.getDate()), month: MONTHS[dt.getMonth()] };
}

export function BlogPreview() {
  return (
    <section className="section-pad">
      <div className="container-x">
        <div className="flex items-end justify-between gap-8">
          <SectionTitle
            align="left"
            eyebrow="From the journal"
            title="Latest blog posts"
          />
          <Link
            href="/blog"
            className="btn-outline-dark mb-12 hidden shrink-0 sm:inline-flex lg:mb-16"
          >
            View All Posts
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {journalPosts.slice(0, 3).map((post, i) => {
            const { day, month } = badgeParts(post.date);
            return (
              <Reveal key={post.slug} delay={i * 0.08}>
                <article className="card-lift h-full overflow-hidden rounded-[20px] bg-white shadow-[0_10px_30px_-12px_rgba(11,59,54,0.18)]">
                  <div className="img-zoom relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.hero.src}
                      alt={post.hero.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      loading="lazy"
                      className="photo-rich h-full w-full object-cover"
                    />
                    <div className="absolute left-4 top-4 rounded-xl bg-accent px-3 py-2 text-center text-ink">
                      <p className="font-display text-lg font-bold leading-none">
                        {day}
                      </p>
                      <p className="mt-1 text-[11px] font-bold uppercase tracking-wider">
                        {month}
                      </p>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-[12.5px] font-bold uppercase tracking-wider text-coral">
                      {post.place}
                    </p>
                    <h3 className="h3-card mt-2">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="transition-colors hover:text-primary-600"
                      >
                        {post.title}
                      </Link>
                    </h3>
                    <p className="mt-3 text-[15px] leading-[1.7] text-body line-clamp-2">
                      {post.excerpt}
                    </p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="mt-5 inline-flex items-center gap-2 font-semibold text-primary-600"
                    >
                      Read More
                      <ArrowRight size={18} weight="bold" className="btn-arrow" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
