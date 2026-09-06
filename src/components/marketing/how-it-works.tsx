"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { SectionIntro } from "@/components/marketing/section-intro";
import { cn } from "@/lib/utils";

const steps = [
  {
    n: "01",
    title: "Watches invoices and payments",
    body: "Export a CSV from QuickBooks or your bank, or add bills by hand. Live OAuth into QuickBooks, Gmail, bank, and Slack is not built. The risk engine still runs on the rows you give it.",
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
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.2 });

  useEffect(() => {
    if (reduce || !inView) return;
    const id = window.setInterval(() => setActive((n) => (n + 1) % steps.length), 2200);
    return () => window.clearInterval(id);
  }, [reduce, inView]);

  return (
    <section id="how" ref={ref} className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
      <SectionIntro
        eyebrow="How it works"
        title="Import the books. Learn your rules. Stop the costly ones."
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
            animate={reduce ? undefined : { y: active === index ? -6 : 0 }}
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
