import { cn } from "@/lib/cn";

interface SectionHeadProps {
  kicker: string;
  index?: string;
  tone?: "light" | "dark";
  className?: string;
}

/**
 * Signature element: a monospace coordinate label, flush left,
 * sitting above a 1px rule. Opens every section.
 */
export function SectionHead({
  kicker,
  index,
  tone = "light",
  className,
}: SectionHeadProps) {
  const dark = tone === "dark";
  return (
    <div className={cn("mb-10 md:mb-14", className)}>
      <div className="flex items-baseline justify-between gap-6">
        <p className={cn("mono-label", dark ? "text-paper/70" : "text-ink-soft")}>
          {kicker}
        </p>
        {index && (
          <p className={cn("mono-label", dark ? "text-paper/70" : "text-ink-soft")}>
            SEC. {index}
          </p>
        )}
      </div>
      <div
        aria-hidden="true"
        className={cn(
          "mt-4 border-t",
          dark ? "border-paper/20" : "border-rule"
        )}
      />
    </div>
  );
}
