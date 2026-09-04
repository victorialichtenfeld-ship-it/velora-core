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
      <svg
        viewBox="0 0 36 36"
        className="size-8 shrink-0"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="velora-mark" x1="8" y1="4" x2="28" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E8BE5A" />
            <stop offset="1" stopColor="#3EB8A8" />
          </linearGradient>
        </defs>
        <path
          d="M18 3.5L31 10.2V21.8C31 27.1 25.4 31.6 18 33.5C10.6 31.6 5 27.1 5 21.8V10.2L18 3.5Z"
          fill="url(#velora-mark)"
          fillOpacity="0.16"
          stroke="url(#velora-mark)"
          strokeWidth="1.4"
        />
        <path
          d="M12.2 14.2L18 24.6L23.8 14.2"
          fill="none"
          stroke="url(#velora-mark)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="18" cy="12.4" r="1.35" fill="#E8BE5A" />
      </svg>
      {wordmark ? (
        <span className="text-[1.05rem] font-semibold tracking-[-0.03em] text-foreground">
          Velora
        </span>
      ) : null}
    </span>
  );
}
