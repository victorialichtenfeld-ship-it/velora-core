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
    if (reduce || !inView) return;
    const id = window.setInterval(() => setActive((n) => (n + 1) % 5), 2800);
    return () => window.clearInterval(id);
  }, [reduce, inView]);

  return (
    <section id="integrations" ref={ref} className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
      <SectionIntro
        eyebrow="Your existing tools"
        title="Export from the tools finance already runs."
        body="Live QuickBooks, Gmail, bank, and Slack connect is not built. Today you export a CSV of bills and payments (or add rows by hand). Velora scans those rows with the same hold path: flag the mistake, wait for a person."
      />
      <p className="mt-10 text-[13px] font-medium text-gold">Import from these today</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {["QuickBooks", "Xero", "NetSuite", "Stripe", "CSV / Excel"].map((item, index) => (
          <motion.span
            key={item}
            className={cn(
              "glass rounded-full px-4 py-2 text-sm font-medium",
              index === active % 5 ? "border-gold/40 text-gold" : "text-muted-foreground"
            )}
            animate={reduce ? undefined : { scale: index === active % 5 ? 1.04 : 1 }}
            transition={{ duration: 0.28 }}
          >
            {item}
          </motion.span>
        ))}
      </div>
      <p className="mt-8 text-[13px] font-medium text-muted-foreground">Live API connections — coming soon</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {["Gmail", "Slack", "HubSpot", "Salesforce", "Bill.com", "Ramp", "Brex", "Gusto"].map((item) => (
          <span key={item} className="rounded-full border border-white/8 px-4 py-2 text-sm text-muted-foreground">
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
