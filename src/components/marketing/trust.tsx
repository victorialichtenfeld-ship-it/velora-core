"use client";

import { motion, useReducedMotion } from "motion/react";
import { SectionIntro } from "@/components/marketing/section-intro";

const pillars = [
  {
    title: "A human always decides",
    body: "Velora never spends money, never sends a wire, and never approves an invoice on its own. A named owner holds, approves, or dismisses.",
  },
  {
    title: "Evidence on every flag",
    body: "Each alert shows why it broke a company rule, with the invoice, payment, contract, or quote next to the recommended action.",
  },
  {
    title: "Nothing is auto-executed",
    body: "This is a control system, not an autonomous agent. If nobody acts, the risky payment or invoice stays paused.",
  },
  {
    title: "Audit logs",
    body: "Every hold, override, and dismissal is recorded for finance and ops.",
  },
  {
    title: "Your rules, not ours",
    body: "If the rule is off, the flag is off. Velora enforces the policies your company already has.",
  },
];

export function TrustSection() {
  const reduce = useReducedMotion();
  return (
    <section id="trust" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
      <SectionIntro
        eyebrow="Human approval"
        title="Velora never makes the financial decision. A person does."
        body="That is the point. Finance and ops teams will not put an unsupervised agent in the path of invoices and payments. They will put a control that flags mistakes and waits."
      />
      <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {pillars.map((pillar, index) => (
          <motion.li
            key={pillar.title}
            className={index === 0 ? "glass rounded-[1.5rem] p-6 sm:col-span-2" : "glass rounded-[1.5rem] p-6"}
            initial={reduce ? false : { y: 16 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: index * 0.04, duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-lg font-semibold tracking-[-0.03em]">{pillar.title}</p>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">{pillar.body}</p>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
