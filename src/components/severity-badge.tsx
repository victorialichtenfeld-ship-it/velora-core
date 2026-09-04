import { cn } from "@/lib/utils";
import type { Severity } from "@/lib/types";

const styles: Record<Severity, string> = {
  critical: "bg-risk/15 text-risk ring-risk/30",
  high: "bg-risk/10 text-risk ring-risk/25",
  medium: "bg-muted text-muted-foreground ring-border",
  low: "bg-protect/12 text-protect ring-protect/25",
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
