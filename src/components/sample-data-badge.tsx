import { cn } from "@/lib/utils";

export function SampleDataBadge({ className }: { className?: string }) {
  return (
    <span
      title="Live demo environment — connect your own tools in early access"
      className={cn(
        "inline-flex items-center rounded-full bg-gold/15 px-2 py-0.5 text-[11px] font-medium text-gold",
        className
      )}
    >
      Live demo
    </span>
  );
}
