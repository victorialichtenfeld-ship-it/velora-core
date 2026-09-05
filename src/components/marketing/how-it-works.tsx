"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { SectionIntro } from "@/components/marketing/section-intro";
import { cn } from "@/lib/utils";

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
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setActive((n) => (n + 1) % steps.length), 850);
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <section id="how" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
      <SectionIntro
        eyebrow="How it works"
        title="A hold in the payment path."
        body="Velora does not ask AP to re-key data. It watches the tools they already run and infers holds in the payment path."
      />
      <ol className="mt-14 grid gap-4 md:grid-cols-3">
        {steps.map((step, index) => (
          <motion.li
            key={step.n}
            initial={reduce ? false : { y: 16 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: index * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            animate={reduce ? undefined : { y: active === index ? -8 : 0 }}
            className={cn(
              "glass rounded-[1.5rem] p-6 sm:p-7",
              active === index && "border-gold/40 bg-gold/[0.08]"
            )}
          >
            <p className={`font-figure text-3xl ${active === index ? "gradient-text" : "text-muted-foreground"}`}>{step.n}</p>
            <h3 className="mt-6 text-xl font-semibold tracking-[-0.03em]">{step.title}</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{step.body}</p>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
