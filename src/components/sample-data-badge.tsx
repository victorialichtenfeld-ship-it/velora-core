import { cn } from "@/lib/utils";

export function SampleDataBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground",
        className
      )}
    >
      Sample data
    </span>
  );
}
