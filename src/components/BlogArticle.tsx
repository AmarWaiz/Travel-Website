"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarBlank,
  Clock,
  FacebookLogo,
  Link as LinkIcon,
  MapPin,
  TwitterLogo,
} from "@phosphor-icons/react";
import { useState } from "react";
import { PageBanner } from "@/components/PageBanner";
import { Reveal } from "@/components/Reveal";
import { getPost, journalPosts, type JournalBlock } from "@/data/journal";

function Block({ block }: { block: JournalBlock }) {
  if (block.type === "p")
    return <p className="text-[17px] leading-[1.8] text-body">{block.text}</p>;
  if (block.type === "h2")
    return (
      <h2 className="font-display text-[26px] font-bold text-ink">{block.text}</h2>
    );
  return (
    <figure className="overflow-hidden rounded-[20px]">
      <span className="relative block aspect-[16/10]">
        <Image
          src={block.image.src}
          alt={block.image.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 800px"
          loading="lazy"
          className="photo-rich h-full w-full object-cover"
        />
      </span>
      <figcaption className="bg-sand px-5 py-3 text-[13.5px] font-medium text-body">
        {block.caption}
      </figcaption>
    </figure>
  );
}

export function BlogArticle({ slug }: { slug: string }) {
  const post = getPost(slug);
  const [copied, setCopied] = useState(false);
  if (!post) return null;

  const related = journalPosts.filter((p) => p.slug !== slug).slice(0, 2);

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <PageBanner
        title={post.title}
        image={post.hero.src}
        imageAlt={post.hero.alt}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
      />
      <article className="container-x section-pad max-w-[820px]">
        <Reveal className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[14.5px] font-medium text-body">
          <span className="flex items-center gap-1.5">
            <CalendarBlank size={17} weight="duotone" className="text-primary-600" />
            {post.date}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin size={17} weight="duotone" className="text-coral" />
            {post.place}, {post.country}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={17} weight="duotone" className="text-primary-600" />
            {post.readingMinutes} min read
          </span>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="body-lg mt-6 border-l-4 border-accent pl-5 font-medium text-ink">
            {post.excerpt}
          </p>
        </Reveal>

        <div className="mt-8 space-y-7">
          {post.body.map((b, i) => (
            <Block key={i} block={b} />
          ))}
        </div>

        {/* Share */}
        <div className="mt-10 flex items-center gap-3 border-t border-line pt-8">
          <span className="text-[14.5px] font-bold uppercase tracking-wider text-body">
            Share
          </span>
          {[
            { label: "Facebook", Icon: FacebookLogo },
            { label: "Twitter", Icon: TwitterLogo },
          ].map(({ label, Icon }) => (
            <a
              key={label}
              href="#"
              aria-label={`Share on ${label}`}
              onClick={(e) => e.preventDefault()}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-sand text-ink transition-colors hover:bg-accent"
            >
              <Icon size={19} weight="duotone" />
            </a>
          ))}
          <button
            type="button"
            onClick={copyLink}
            className="flex h-11 items-center gap-2 rounded-full bg-sand px-5 text-[14.5px] font-bold text-ink transition-colors hover:bg-accent"
          >
            <LinkIcon size={18} weight="duotone" />
            {copied ? "Copied!" : "Copy link"}
          </button>
        </div>

        {/* Author box */}
        <div className="mt-8 flex flex-col gap-5 rounded-[20px] bg-primary p-7 sm:flex-row sm:items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://i.pravatar.cc/160?img=47"
            alt="Mara Ellison"
            loading="lazy"
            className="h-20 w-20 shrink-0 rounded-full object-cover"
          />
          <div>
            <p className="text-[13px] font-bold uppercase tracking-wider text-accent">
              Written by
            </p>
            <p className="font-display text-[20px] font-bold text-white">
              Mara Ellison
            </p>
            <p className="mt-1 text-[15px] text-white/75">
              Founder of Travle. Has walked every route on this site — most of
              them twice.
            </p>
          </div>
        </div>

        {/* Related */}
        <div className="mt-14">
          <h2 className="h3-card !text-[24px]">Related posts</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="card-lift group overflow-hidden rounded-[20px] bg-white shadow-[0_10px_30px_-12px_rgba(11,59,54,0.18)]"
              >
                <span className="img-zoom relative block aspect-[16/10] overflow-hidden">
                  <Image
                    src={p.hero.src}
                    alt={p.hero.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 400px"
                    loading="lazy"
                    className="photo-rich h-full w-full object-cover"
                  />
                </span>
                <span className="block p-5">
                  <span className="block font-display text-[17px] font-bold text-ink transition-colors group-hover:text-primary-600">
                    {p.title}
                  </span>
                  <span className="mt-2 inline-flex items-center gap-1.5 text-[14px] font-bold text-primary-600">
                    Read More <ArrowRight size={15} weight="bold" />
                  </span>
                </span>
              </Link>
            ))}
          </div>
          <Link href="/blog" className="btn-outline-dark mt-8">
            <ArrowLeft size={18} weight="bold" /> All Posts
          </Link>
        </div>
      </article>
    </div>
  );
}
