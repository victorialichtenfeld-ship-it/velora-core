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
      <span className="relative grid size-8 place-items-center overflow-hidden rounded-xl bg-primary text-primary-foreground shadow-[0_8px_22px_rgb(124_108_255_/_0.4)]">
        <svg viewBox="0 0 36 36" className="size-[18px]" aria-hidden="true">
          <path
            d="M12.2 14.2L18 24.6L23.8 14.2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {wordmark ? (
        <span className="text-[1.02rem] font-semibold tracking-[-0.03em] text-foreground">Velora</span>
      ) : null}
    </span>
  );
}
