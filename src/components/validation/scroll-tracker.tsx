"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { oncePerSession, track } from "@/lib/analytics-client";

const depths = [25, 50, 75, 100] as const;

export function ScrollTracker() {
  const pathname = usePathname();
  useEffect(() => {
    if (oncePerSession("page_view")) {
      track({ event: "page_view" });
    }

    const onScroll = () => {
      const root = document.documentElement;
      const max = root.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const percent = Math.round((window.scrollY / max) * 100);
      for (const depth of depths) {
        if (percent >= depth && oncePerSession(`scroll_${depth}`)) {
          track({ event: "scroll_depth", depth });
        }
      }
    };

    const pricing = document.getElementById("pricing");
    const observer = pricing
      ? new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting && oncePerSession("reached_pricing")) {
              track({ event: "reached_pricing", location: "pricing" });
            }
          },
          { threshold: 0.28 }
        )
      : null;
    if (pricing && observer) observer.observe(pricing);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer?.disconnect();
    };
  }, [pathname]);

  return null;
}
