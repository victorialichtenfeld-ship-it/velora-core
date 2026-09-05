"use client";

import { motion, useReducedMotion } from "motion/react";
import { SectionIntro } from "@/components/marketing/section-intro";
import { Stagger, StaggerItem } from "@/components/reveal";

const steps = [
  {
    n: "01",
    title: "Connect AP systems",
    body: "Email, QuickBooks, and payment rails stream bills and ACH into Velora. This walkthrough uses simulated adapters.",
  },
  {
    n: "02",
    title: "Match against policy",
    body: "Vendor masters, paid invoices, and contract unit prices. Duplicate amount + vendor, or invoice price ≠ contract, gets flagged.",
  },
  {
    n: "03",
    title: "Hold for a named person",
    body: "Risky payments stop before they leave. A finance owner holds, approves, or dismisses with an audit trail.",
  },
];

export function HowItWorks() {
  const reduce = useReducedMotion();

  return (
    <section id="how" className="mx-auto w-full max-w-4xl px-4 py-20 sm:px-6 sm:py-24">
      <SectionIntro
        eyebrow="How it works"
        title="A hold in the payment path."
        body="Velora does not ask AP to re-key data. It watches the tools they already run."
      />
      <Stagger className="relative mt-12 space-y-10">
        <span className="absolute top-3 bottom-3 left-[1.15rem] hidden w-px overflow-hidden bg-gold/20 sm:block">
          <motion.span
            initial={reduce ? false : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 origin-top bg-gold/45"
          />
          {reduce ? null : (
            <span className="animate-bead absolute left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-gold shadow-[0_0_10px_rgb(176_137_58)]" />
          )}
        </span>
        {steps.map((step) => (
          <StaggerItem key={step.n} className="grid gap-2 sm:grid-cols-[4.5rem_1fr] sm:gap-8">
            <p className="font-figure text-2xl text-gold">{step.n}</p>
            <div>
              <h3 className="text-lg font-medium tracking-tight">{step.title}</h3>
              <p className="mt-2 max-w-xl text-sm leading-7 text-muted-foreground">{step.body}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
