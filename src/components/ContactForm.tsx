"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react";

const SUBJECTS = [
  "General enquiry",
  "Booking question",
  "Private group",
  "Press",
] as const;

/**
 * Contact form: two-column name/email, subject select, message.
 * On submit shows a success panel (no backend wired yet).
 */
export function ContactForm() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center rounded-[24px] border border-line bg-white p-8 text-center">
        <CheckCircle
          size={56}
          weight="duotone"
          className="text-primary"
          aria-hidden="true"
        />
        <h2 className="h3-card mt-5 text-ink">Message sent</h2>
        <p className="mt-3 max-w-[36ch] text-[16px] leading-[1.7] text-body">
          We reply within one working day. If it is urgent, call us on
          +44 20 4577 1900.
        </p>
      </div>
    );
  }

  const inputClass =
    "h-[52px] w-full rounded-[12px] border border-line bg-white px-4 text-[16px] text-ink placeholder:text-body/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-[24px] border border-line bg-white p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="mb-2 block text-[15px] font-semibold text-ink"
          >
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Jane Smith"
            className={inputClass}
          />
        </div>
        <div>
          <label
            htmlFor="contact-email"
            className="mb-2 block text-[15px] font-semibold text-ink"
          >
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="jane@example.com"
            className={inputClass}
          />
        </div>
      </div>
      <div className="mt-5">
        <label
          htmlFor="contact-subject"
          className="mb-2 block text-[15px] font-semibold text-ink"
        >
          Subject
        </label>
        <select
          id="contact-subject"
          name="subject"
          required
          defaultValue={SUBJECTS[0]}
          className={inputClass}
        >
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-5">
        <label
          htmlFor="contact-message"
          className="mb-2 block text-[15px] font-semibold text-ink"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          placeholder="Tell us which trip you have in mind and when you would like to travel."
          className="w-full rounded-[12px] border border-line bg-white px-4 py-3 text-[16px] text-ink placeholder:text-body/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>
      <button type="submit" className="btn-amber mt-6 w-full">
        Send Message
        <ArrowRight size={20} weight="bold" className="btn-arrow" aria-hidden="true" />
      </button>
    </form>
  );
}
