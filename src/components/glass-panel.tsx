import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function GlassPanel({
  className,
  children,
  glow,
}: {
  className?: string;
  children: ReactNode;
  glow?: "gold" | "protect" | "risk" | "none";
}) {
  return (
    <div
      className={cn(
        "glass relative overflow-hidden rounded-[1.5rem]",
        glow === "gold" && "gold-glow",
        glow === "protect" && "protect-glow",
        glow === "risk" && "risk-glow",
        className
      )}
    >
      {children}
    </div>
  );
}
