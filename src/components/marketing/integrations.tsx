"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { integrationsCatalog } from "@/lib/data/demo";
import { SectionIntro } from "@/components/marketing/section-intro";
import { cn } from "@/lib/utils";

export function IntegrationsSection() {
  const liveNow = integrationsCatalog.filter((item) => item.status === "connected");
  const comingSoon = integrationsCatalog.filter((item) => item.status !== "connected");
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.2 });

  useEffect(() => {
    if (reduce || liveNow.length === 0 || !inView) return;
    const id = window.setInterval(() => setActive((n) => (n + 1) % liveNow.length), 2800);
    return () => window.clearInterval(id);
  }, [reduce, liveNow.length, inView]);

  return (
    <section id="integrations" ref={ref} className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
      <SectionIntro
        eyebrow="Your existing tools"
        title="Email, accounting, CRM, payments, and files."
        body="Velora monitors the systems finance and ops already run. Live demo environment — connect your own tools in early access. The hold path is the same: flag the mistake, wait for a person."
      />
      <p className="mt-10 text-[13px] font-medium text-gold">Live now</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {liveNow.map((item, index) => (
          <motion.span
            key={item.name}
            className={cn(
              "glass rounded-full px-4 py-2 text-sm",
              index === active ? "border-gold/40 text-gold" : "text-muted-foreground"
            )}
            animate={reduce ? undefined : { scale: index === active ? 1.04 : 1 }}
            transition={{ duration: 0.28 }}
          >
            {item.name}
          </motion.span>
        ))}
      </div>
      <p className="mt-8 text-[13px] font-medium text-muted-foreground">Coming soon</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {comingSoon.map((item) => (
          <span key={item.name} className="rounded-full border border-white/8 px-4 py-2 text-sm text-muted-foreground">
            {item.name}
          </span>
        ))}
      </div>
    </section>
  );
}
