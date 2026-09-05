"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { SectionIntro } from "@/components/marketing/section-intro";
import { cn } from "@/lib/utils";

const steps = [
  {
    n: "01",
    title: "Connects to your tools",
    body: "Email, accounting, CRM, payments, and file storage. Velora watches invoices, payments, discounts, and purchase orders as they move. You do not re-key data. This walkthrough uses simulated connectors.",
  },
  {
    n: "02",
    title: "Learns your company rules",
    body: "Duplicate payments, pricing errors, over-limit discounts, contract mismatches, unauthorized wires — flags are your policies, not a generic AI guess.",
  },
  {
    n: "03",
    title: "Warns or holds. You decide.",
    body: "Risky actions pause before they go through. Every flag has evidence and a recommended action. A named person holds, approves, or dismisses. Nothing is auto-executed.",
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
        title="Connect your tools. Learn your rules. Stop the costly ones."
        body="Velora is a control system sitting in the path of invoices and payments. It is not a chatbot you have to ask questions to, and it is not an agent that spends money on its own."
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
