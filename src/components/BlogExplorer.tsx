"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MagnifyingGlass } from "@phosphor-icons/react";
import { useMemo, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { journalPosts } from "@/data/journal";
import { cn } from "@/lib/cn";

const POST_CATEGORIES: Record<string, string> = {
  "breakfast-at-2900-metres": "Guides",
  "belgrade-bar-sleeper-annotated": "Rail journeys",
  "sand-gets-everywhere": "Packing lists",
};

const TAGS = ["Mountains", "Desert", "Rail", "Food", "Packing", "Coast"];

function badgeParts(date: string) {
  const m = date.match(/(\d+)\s+(\w+)\s+(\d+)/);
  return { day: m?.[1] ?? "", month: (m?.[2] ?? "").slice(0, 3) };
}

export function BlogExplorer() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string | null>(null);

  const categories = useMemo(
    () => Array.from(new Set(Object.values(POST_CATEGORIES))),
    []
  );

  const filtered = journalPosts.filter((p) => {
    if (cat && POST_CATEGORIES[p.slug] !== cat) return false;
    if (q && !`${p.title} ${p.place}`.toLowerCase().includes(q.toLowerCase()))
      return false;
    return true;
  });

  return (
    <div className="container-x section-pad grid gap-10 lg:grid-cols-[1fr_340px]">
        <div className="grid gap-8 sm:grid-cols-2">
          {filtered.map((post, i) => {
            const { day, month } = badgeParts(post.date);
            return (
              <Reveal key={post.slug} delay={(i % 2) * 0.08}>
                <article className="card-lift group overflow-hidden rounded-[20px] bg-white shadow-[0_10px_30px_-12px_rgba(11,59,54,0.18)]">
                  <div className="img-zoom relative aspect-[16/10] overflow-hidden">
                    <Link href={`/blog/${post.slug}`} aria-label={post.title} className="absolute inset-0">
                      <Image
                        src={post.hero.src}
                        alt={post.hero.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        loading="lazy"
                        className="photo-rich h-full w-full object-cover"
                      />
                    </Link>
                    <span className="absolute left-4 top-4 rounded-xl bg-accent px-3 py-1.5 text-center">
                      <span className="block font-display text-[18px] font-extrabold leading-none text-ink">{day}</span>
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-ink">{month}</span>
                    </span>
                  </div>
                  <div className="p-6">
                    <p className="text-[12.5px] font-bold uppercase tracking-[0.14em] text-coral">
                      {POST_CATEGORIES[post.slug] ?? "Field notes"} · {post.place}
                    </p>
                    <h2 className="h3-card mt-2">
                      <Link href={`/blog/${post.slug}`} className="transition-colors group-hover:text-primary-600">
                        {post.title}
                      </Link>
                    </h2>
                    <p className="mt-2 line-clamp-2 text-[15px] text-body">{post.excerpt}</p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="mt-4 inline-flex items-center gap-2 text-[15px] font-bold text-primary-600"
                    >
                      Read More
                      <ArrowRight size={17} weight="bold" className="transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            );
          })}
          {filtered.length === 0 && (
            <p className="text-body sm:col-span-2">
              No posts match.{" "}
              <button type="button" onClick={() => { setQ(""); setCat(null); }} className="font-bold text-primary-600 underline underline-offset-4">
                Reset
              </button>
            </p>
          )}
        </div>

        <aside className="space-y-8">
          <div className="rounded-[20px] bg-sand p-6">
            <h3 className="font-display text-[18px] font-bold text-ink">Search</h3>
            <label className="mt-3 flex items-center gap-2 rounded-xl border border-line bg-white px-4 focus-within:border-primary-600">
              <MagnifyingGlass size={18} weight="duotone" className="text-primary-600" />
              <span className="sr-only">Search posts</span>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search articles…"
                className="h-12 w-full bg-transparent text-[15px] focus:outline-none"
              />
            </label>
          </div>
          <div className="rounded-[20px] bg-sand p-6">
            <h3 className="font-display text-[18px] font-bold text-ink">Categories</h3>
            <ul className="mt-3 space-y-2">
              {categories.map((c) => (
                <li key={c}>
                  <button
                    type="button"
                    onClick={() => setCat(cat === c ? null : c)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-[15px] font-medium transition-colors",
                      cat === c ? "bg-primary text-white" : "text-ink hover:bg-white"
                    )}
                  >
                    {c}
                    <span className={cn("text-[13px]", cat === c ? "text-white/70" : "text-body")}>
                      {journalPosts.filter((p) => POST_CATEGORIES[p.slug] === c).length}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[20px] bg-sand p-6">
            <h3 className="font-display text-[18px] font-bold text-ink">Recent Posts</h3>
            <ul className="mt-4 space-y-4">
              {journalPosts.slice(0, 3).map((p) => (
                <li key={p.slug}>
                  <Link href={`/blog/${p.slug}`} className="group flex gap-4">
                    <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                      <Image src={p.hero.src} alt="" fill sizes="64px" loading="lazy" className="object-cover" />
                    </span>
                    <span>
                      <span className="block text-[12.5px] font-medium text-body">{p.date}</span>
                      <span className="block text-[14.5px] font-bold leading-snug text-ink group-hover:text-primary-600">
                        {p.title}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[20px] bg-sand p-6">
            <h3 className="font-display text-[18px] font-bold text-ink">Tags</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {TAGS.map((t) => (
                <span key={t} className="rounded-full border border-line bg-white px-3.5 py-1.5 text-[13.5px] font-medium text-body">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
  );
}
