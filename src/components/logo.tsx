import { cn } from "@/lib/utils";

export function Logo({
  className,
  wordmark = true,
}: {
  className?: string;
  wordmark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg viewBox="0 0 36 36" className="size-7 shrink-0" aria-hidden="true">
        <path
          d="M18 3.5L31 10.2V21.8C31 27.1 25.4 31.6 18 33.5C10.6 31.6 5 27.1 5 21.8V10.2L18 3.5Z"
          fill="#D4AF37"
          fillOpacity="0.16"
          stroke="#D4AF37"
          strokeWidth="1.4"
        />
        <path
          d="M12.2 14.2L18 24.6L23.8 14.2"
          fill="none"
          stroke="#D4AF37"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="18" cy="12.4" r="1.35" fill="#D4AF37" />
      </svg>
      {wordmark ? (
        <span className="text-[1.05rem] font-medium tracking-[0.08em] text-gold">
          Velora
        </span>
      ) : null}
    </span>
  );
}
