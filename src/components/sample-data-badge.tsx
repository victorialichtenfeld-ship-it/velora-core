import { cn } from "@/lib/utils";

export function SampleDataBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md bg-gold/15 px-2 py-0.5 text-[11px] font-medium text-gold ring-1 ring-gold/20",
        className
      )}
    >
      Sample data
    </span>
  );
}
