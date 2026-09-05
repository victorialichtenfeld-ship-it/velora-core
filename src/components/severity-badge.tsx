import { cn } from "@/lib/utils";
import type { Severity } from "@/lib/types";

const styles: Record<Severity, string> = {
  critical: "bg-gold/20 text-gold ring-gold/45",
  high: "bg-gold/15 text-gold ring-gold/35",
  medium: "bg-gold/10 text-gold ring-gold/25",
  low: "bg-gold/8 text-gold/80 ring-gold/20",
};

export function SeverityBadge({ severity }: { severity: Severity }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-1.5 py-0.5 text-[11px] font-medium capitalize ring-1",
        styles[severity]
      )}
    >
      {severity}
    </span>
  );
}
