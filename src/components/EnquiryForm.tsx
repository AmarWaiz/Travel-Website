"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown } from "lucide-react";
import { enquirySchema, type EnquiryInput } from "@/lib/enquiry-schema";
import { trips } from "@/data/trips";
import { formatDate, getMonthOptions } from "@/lib/format";
import { submitEnquiry } from "@/app/enquire/actions";
import { cn } from "@/lib/cn";

interface EnquiryFormProps {
  defaultValues?: Partial<EnquiryInput>;
}

const inputClass =
  "mt-2 block w-full border-b border-rule bg-transparent py-3 text-[17px] leading-[1.5] placeholder:text-ink-soft/50 focus:border-terracotta";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="mt-2 text-[15px] text-terracotta">
      {message}
    </p>
  );
}

export function EnquiryForm({ defaultValues }: EnquiryFormProps) {
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [travellerName, setTravellerName] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      name: "",
      email: "",
      trip: "",
      departureDate: "",
      month: "",
      groupSize: 2,
      message: "",
      ...defaultValues,
    },
  });

  const chosenTrip = watch("trip");
  const tripDepartures =
    trips.find((t) => t.slug === chosenTrip)?.departures ?? [];
  const monthOptions = getMonthOptions();

  const onSubmit = async (data: EnquiryInput) => {
    setServerError(null);
    const result = await submitEnquiry(data);
    if (result.ok) {
      setTravellerName(data.name.split(" ")[0] ?? data.name);
      setSent(true);
    } else {
      setServerError(result.message);
    }
  };

  if (sent) {
    return (
      <div className="border border-rule p-8 md:p-12">
        <p className="mono-label text-terracotta">ENQUIRY RECEIVED</p>
        <h3 className="h3 mt-4">Thanks{travellerName && `, ${travellerName}`}.</h3>
        <p className="body-lg mt-4 max-w-[52ch] text-ink-soft">
          Your enquiry is with us. We reply within one working day, from a
          real person who has been on the trip. If you asked about specific
          dates, we hold your seats for 7 days while you decide.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2">
        <label className="block">
          <span className="mono-label text-ink-soft">Full name</span>
          <input
            {...register("name")}
            autoComplete="name"
            placeholder="Jane Appleseed"
            className={inputClass}
          />
          <FieldError message={errors.name?.message} />
        </label>

        <label className="block">
          <span className="mono-label text-ink-soft">Email</span>
          <input
            {...register("email")}
            type="email"
            autoComplete="email"
            placeholder="jane@example.com"
            className={inputClass}
          />
          <FieldError message={errors.email?.message} />
        </label>

        <label className="relative block">
          <span className="mono-label text-ink-soft">Trip</span>
          <select {...register("trip")} className={cn(inputClass, "appearance-none pr-10")}>
            <option value="">Select a trip</option>
            {trips.map((t) => (
              <option key={t.slug} value={t.slug}>
                {t.title}
              </option>
            ))}
            <option value="undecided">Not sure yet, advise me</option>
          </select>
          <ChevronDown
            size={16}
            strokeWidth={1.5}
            aria-hidden="true"
            className="pointer-events-none absolute bottom-4 right-1 text-ink-soft"
          />
          <FieldError message={errors.trip?.message} />
        </label>

        <label className="relative block">
          <span className="mono-label text-ink-soft">
            Departure date <span className="normal-case tracking-normal">(optional)</span>
          </span>
          <select
            {...register("departureDate")}
            className={cn(inputClass, "appearance-none pr-10")}
            disabled={tripDepartures.length === 0}
          >
            <option value="">
              {tripDepartures.length === 0
                ? "Choose a trip first"
                : "Any departure"}
            </option>
            {tripDepartures.map((dep) => (
              <option key={dep.date} value={dep.date}>
                {formatDate(dep.date)} · {dep.seatsLeft} seats left
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            strokeWidth={1.5}
            aria-hidden="true"
            className="pointer-events-none absolute bottom-4 right-1 text-ink-soft"
          />
          <FieldError message={errors.departureDate?.message} />
        </label>

        <label className="relative block">
          <span className="mono-label text-ink-soft">Preferred month</span>
          <select {...register("month")} className={cn(inputClass, "appearance-none pr-10")}>
            <option value="">Select a month</option>
            {monthOptions.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            strokeWidth={1.5}
            aria-hidden="true"
            className="pointer-events-none absolute bottom-4 right-1 text-ink-soft"
          />
          <FieldError message={errors.month?.message} />
        </label>

        <label className="block">
          <span className="mono-label text-ink-soft">Group size</span>
          <input
            {...register("groupSize")}
            type="number"
            min={1}
            max={30}
            inputMode="numeric"
            className={inputClass}
          />
          <FieldError message={errors.groupSize?.message} />
        </label>

        <label className="block md:col-span-2">
          <span className="mono-label text-ink-soft">
            Message <span className="normal-case tracking-normal">(optional)</span>
          </span>
          <textarea
            {...register("message")}
            rows={4}
            placeholder="Anything we should know: fitness, food, dates that do not move."
            className={cn(inputClass, "resize-y")}
          />
          <FieldError message={errors.message?.message} />
        </label>
      </div>

      {serverError && (
        <p role="alert" className="mt-6 text-[15px] text-terracotta">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-10 inline-flex h-[52px] min-w-[200px] items-center justify-center rounded-[2px] bg-forest px-8 text-[15px] font-medium text-paper transition-opacity disabled:opacity-60"
      >
        {isSubmitting ? "Sending…" : "Send enquiry"}
      </button>
      <p className="mono-label mt-4 text-ink-soft">
        NO PAYMENT TAKEN · REPLY WITHIN 1 WORKING DAY
      </p>
    </form>
  );
}
