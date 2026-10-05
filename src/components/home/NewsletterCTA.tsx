"use client";

import { useState } from "react";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";

export function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <section className="py-[72px] lg:py-[96px]">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] px-8 py-16 lg:p-20">
            <Image
              src="https://images.unsplash.com/photo-1548013146-72479768bada"
              alt="Sunrise over mountain valley"
              fill
              sizes="100vw"
              loading="lazy"
              className="photo-rich h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-primary/88" aria-hidden="true" />
            <div className="relative grid items-center gap-10 lg:grid-cols-2">
              <div>
                <p className="script-subtitle text-accent">
                  Join 12,000 travellers
                </p>
                <h2 className="h2-section mt-3 text-white">
                  Get travel deals in your inbox
                </h2>
                <p className="mt-4 max-w-[46ch] text-[17px] leading-[1.7] text-white/75">
                  One thoughtful email a month. New routes, last-minute seats,
                  no spam.
                </p>
              </div>
              <div>
                {done ? (
                  <p className="rounded-2xl bg-white/10 p-6 text-[17px] font-medium text-white">
                    You are on the list. The next email lands on the first
                    Monday of the month.
                  </p>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (email.trim()) setDone(true);
                    }}
                    className="flex items-center gap-2 rounded-full bg-white p-2 pl-6"
                  >
                    <label htmlFor="newsletter-email" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="newsletter-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="h-12 flex-1 bg-transparent text-ink placeholder:text-body/60 focus:outline-none"
                    />
                    <button type="submit" className="btn-amber shrink-0">
                      Subscribe
                    </button>
                  </form>
                )}
                <p className="mt-3 text-[13px] text-white/60">
                  Unsubscribe anytime.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
