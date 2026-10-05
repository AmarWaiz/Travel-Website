"use client";

import { ArrowUp } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setVisible(y > 600);
      setProgress(max > 0 ? Math.min(1, y / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const r = 22;
  const c = 2 * Math.PI * r;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={cn(
        "fixed bottom-6 right-6 z-[85] flex h-[52px] w-[52px] items-center justify-center rounded-full bg-primary text-white shadow-[0_10px_30px_-12px_rgba(11,59,54,0.5)] transition-all duration-300 hover:bg-primary-600",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      )}
    >
      <svg
        className="absolute inset-0 h-full w-full -rotate-90"
        viewBox="0 0 52 52"
        aria-hidden="true"
      >
        <circle
          cx="26"
          cy="26"
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="3"
        />
        <circle
          cx="26"
          cy="26"
          r={r}
          fill="none"
          stroke="#F5B841"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - progress)}
        />
      </svg>
      <ArrowUp size={20} weight="bold" />
    </button>
  );
}
