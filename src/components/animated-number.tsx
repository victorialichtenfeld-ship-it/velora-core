"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  duration = 1200,
  className,
  format = (n: number) => Math.round(n).toLocaleString("en-US"),
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
  format?: (n: number) => string;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, duration]);

  return (
    <span className={cn("font-mono tabular-nums", className)}>
      {prefix}
      {format(display)}
      {suffix}
    </span>
  );
}
