import { AirplaneTilt } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/Reveal";

interface SectionTitleProps {
  eyebrow: string;
  title: string;
  text?: string;
  align?: "center" | "left";
  dark?: boolean;
}

/**
 * Standard section title: coral script subtitle with a small plane icon,
 * bold display H2, optional paragraph. Centered for listing sections,
 * left-aligned in split sections.
 */
export function SectionTitle({
  eyebrow,
  title,
  text,
  align = "center",
  dark = false,
}: SectionTitleProps) {
  return (
    <Reveal
      className={cn(
        "mb-12 lg:mb-16",
        align === "center" ? "text-center" : "text-left"
      )}
    >
      <p
        className={cn(
          "script-subtitle flex items-center gap-2",
          align === "center" && "justify-center"
        )}
      >
        <AirplaneTilt size={26} weight="duotone" className="text-coral" />
        {eyebrow}
      </p>
      <h2
        className={cn(
          "h2-section mt-3",
          dark ? "text-white" : "text-ink",
          align === "center" && "mx-auto max-w-[20ch]"
        )}
      >
        {title}
      </h2>
      {text && (
        <p
          className={cn(
            "body-lg mt-4",
            dark ? "text-white/75" : "text-body",
            align === "center" && "mx-auto max-w-[58ch]"
          )}
        >
          {text}
        </p>
      )}
    </Reveal>
  );
}
