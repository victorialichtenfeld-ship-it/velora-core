import { cn } from "@/lib/utils";

export function SampleDataBadge({ className }: { className?: string }) {
  return (
    <span
      title="Meridian Supply sample data. Import a CSV on Integrations to watch a company’s invoices. Live QuickBooks/Gmail connect is not built."
      className={cn(
        "inline-flex items-center rounded-full bg-gold/15 px-2 py-0.5 text-[11px] font-medium text-gold",
        className
      )}
    >
      Live demo
    </span>
  );
}
