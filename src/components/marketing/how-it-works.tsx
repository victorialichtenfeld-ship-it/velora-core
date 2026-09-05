"use client";

import { motion, useReducedMotion } from "motion/react";
import { SectionIntro } from "@/components/marketing/section-intro";

const steps = [
  {
    n: "01",
    title: "Ingest the rail",
    body: "Email, QuickBooks, and payment rails stream bills and ACH into Velora. This walkthrough uses simulated adapters.",
  },
  {
    n: "02",
    title: "Infer the match",
    body: "The model compares vendor, amount, and contract unit price. Duplicate ACH or invoice ≠ MSA gets flagged in flight.",
  },
  {
    n: "03",
    title: "Hold the cash",
    body: "Risky payments stop before they leave. A named finance owner holds, approves, or dismisses with an audit trail.",
  },
];

export function HowItWorks() {
  const reduce = useReducedMotion();

  return (
    <section id="how" className="mx-auto w-full max-w-4xl px-4 py-20 sm:px-6 sm:py-24">
      <SectionIntro
        eyebrow="How it works"
        title="A hold in the payment path."
        body="Velora does not ask AP to re-key data. It watches the tools they already run and infers holds in the payment path."
      />
      <ol className="relative mt-14 space-y-12">
        <span className="absolute top-3 bottom-3 left-[1.15rem] hidden w-px bg-border sm:block">
          {reduce ? null : (
            <span className="animate-bead absolute left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-gold shadow-[0_0_10px_rgb(196_163_90)]" />
          )}
        </span>
        {steps.map((step, index) => (
          <motion.li
            key={step.n}
            initial={reduce ? false : { y: 16 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: index * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-2 sm:grid-cols-[4.5rem_1fr] sm:gap-8"
          >
            <p className={`font-figure text-3xl ${index === 0 ? "text-dusk" : index === 1 ? "text-gold" : "text-protect"}`}>
              {step.n}
            </p>
            <div>
              <h3 className="font-figure text-2xl tracking-[-0.03em]">{step.title}</h3>
              <p className="mt-2 max-w-xl text-sm leading-7 text-muted-foreground">{step.body}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
