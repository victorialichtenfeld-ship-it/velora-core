"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const ticks = Array.from({ length: 48 }, (_, i) => i);

export function GoldSeal({
  children,
  caption,
  className,
  size = "lg",
}: {
  children: ReactNode;
  caption: string;
  className?: string;
  size?: "sm" | "lg";
}) {
  const large = size === "lg";
  return (
    <div className={cn("relative mx-auto aspect-square w-full", large ? "max-w-[400px]" : "max-w-[220px]", className)}>
      <div className="absolute inset-[-20%] rounded-full vault-halo animate-gold-breathe" />
      <div className="vault-rim absolute inset-0">
        <div className={cn("vault-face absolute flex flex-col items-center justify-center text-center", large ? "inset-[14px]" : "inset-[10px]")}>
          <svg viewBox="0 0 200 200" className="pointer-events-none absolute inset-0 animate-spin-rev" aria-hidden="true">
            {ticks.map((i) => {
              const a = (i / 48) * Math.PI * 2 - Math.PI / 2;
              const major = i % 6 === 0;
              return (
                <line
                  key={i}
                  x1={100 + Math.cos(a) * (major ? 84 : 90)}
                  y1={100 + Math.sin(a) * (major ? 84 : 90)}
                  x2={100 + Math.cos(a) * 95}
                  y2={100 + Math.sin(a) * 95}
                  stroke="#B0893A"
                  strokeWidth={major ? 1.5 : 0.55}
                  opacity={major ? 0.75 : 0.28}
                />
              );
            })}
          </svg>
          <div className="absolute inset-[12%] rounded-full border border-dashed border-gold/35 animate-spin-slow" />
          <div className="vault-well absolute inset-[24%] flex flex-col items-center justify-center px-3">
            {children}
            <p className="mt-2 text-[9px] uppercase tracking-[0.26em] text-gold/75 sm:text-[10px]">{caption}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
