"use client";

import { MotionCard } from "@/components/motion-card";
import { SectionIntro } from "@/components/marketing/section-intro";

const steps = [
  {
    n: "01",
    title: "Connect AP systems",
    body: "Email, QuickBooks, and payment rails stream bills and ACH instructions into Velora. This walkthrough uses simulated adapters.",
  },
  {
    n: "02",
    title: "Match against policy",
    body: "Vendor masters, paid invoices, and contract unit prices are the baseline. Duplicate amount + vendor, or invoice price ≠ contract, gets flagged.",
  },
  {
    n: "03",
    title: "Hold for a named person",
    body: "Risky payments and invoices stop before they leave. A finance owner holds, approves, or dismisses with an audit trail.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
      <SectionIntro
        eyebrow="How it works"
        title="A hold in the payment path, not another inbox."
        body="Velora does not ask AP to re-key data. It watches the tools they already run and blocks the two mistakes that cost the most."
      />
      <div className="relative mt-12 grid gap-4 md:grid-cols-3">
        <div className="pointer-events-none absolute top-9 right-10 left-10 hidden h-px bg-bronze/40 md:block" />
        {steps.map((step, index) => (
          <MotionCard key={step.n} delay={index * 0.08} className="relative">
            <p className="font-figure text-sm text-gold">{step.n}</p>
            <h3 className="mt-3 text-lg font-medium tracking-tight">{step.title}</h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">{step.body}</p>
          </MotionCard>
        ))}
      </div>
    </section>
  );
}
