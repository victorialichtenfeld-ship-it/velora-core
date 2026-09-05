"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { integrationsCatalog } from "@/lib/data/demo";
import { SectionIntro } from "@/components/marketing/section-intro";

export function IntegrationsSection() {
  const liveNow = integrationsCatalog.filter((item) => item.status === "connected");
  const comingSoon = integrationsCatalog.filter((item) => item.status !== "connected");
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduce || liveNow.length === 0) return;
    const id = window.setInterval(() => setActive((n) => (n + 1) % liveNow.length), 900);
    return () => window.clearInterval(id);
  }, [reduce, liveNow.length]);

  return (
    <section id="integrations" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
      <SectionIntro
        eyebrow="Integrations"
        title="Wired to the systems AP already uses."
        body="Live now connectors are simulated here. Coming-soon adapters share the same interface."
      />
      <p className="mt-10 text-[13px] font-medium text-gold">Live now</p>
      <p className="font-figure mt-3 text-3xl leading-snug tracking-[-0.03em] sm:text-4xl sm:leading-[1.2]">
        {liveNow.map((item, index) => (
          <motion.span
            key={item.name}
            className={index === active ? "text-gold" : "text-muted-foreground"}
            animate={reduce || index !== active ? { scale: 1 } : { scale: [1, 1.04, 1] }}
            transition={{ duration: 0.7, repeat: index === active ? Infinity : 0 }}
          >
            {item.name}
            {index < liveNow.length - 1 ? "  ·  " : ""}
          </motion.span>
        ))}
      </p>
      <p className="mt-8 text-[13px] font-medium text-muted-foreground">Coming soon</p>
      <p className="mt-2 font-figure text-xl leading-9 text-muted-foreground sm:text-2xl">
        {comingSoon.map((item) => item.name).join("  ·  ")}
      </p>
    </section>
  );
}
