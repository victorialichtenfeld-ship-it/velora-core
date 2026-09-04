import { cn } from "@/lib/utils";

export function SampleDataBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground ring-1 ring-border",
        className
      )}
    >
      Sample data
    </span>
  );
}
