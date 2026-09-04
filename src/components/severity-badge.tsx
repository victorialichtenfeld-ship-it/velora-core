import { cn } from "@/lib/utils";
import type { Severity } from "@/lib/types";

const styles: Record<Severity, string> = {
  critical: "bg-risk/15 text-risk ring-risk/30",
  high: "bg-orange-400/12 text-orange-200 ring-orange-400/25",
  medium: "bg-warn/12 text-warn ring-warn/25",
  low: "bg-protect/12 text-protect ring-protect/25",
};

export function SeverityBadge({ severity }: { severity: Severity }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium uppercase tracking-[0.12em] ring-1",
        styles[severity]
      )}
    >
      {severity}
    </span>
  );
}
