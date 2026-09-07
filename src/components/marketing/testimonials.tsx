"use client";

import { motion, useReducedMotion } from "motion/react";
import { SectionIntro } from "@/components/marketing/section-intro";

const quotes = [
  {
    body: "We had a $11,000 duplicate ACH go out before we caught it — manually. Velora would have flagged it before it left. That's the whole pitch, and it's real.",
    name: "Marta R.",
    role: "Controller",
    company: "Series B SaaS, 140 employees",
  },
  {
    body: "Our sales team was giving discounts 30% over the cap without realizing it. Velora stopped the next three before they hit a contract.",
    name: "James T.",
    role: "VP Finance",
    company: "E-commerce, $40M ARR",
  },
  {
    body: "Setup took one afternoon. It found a pricing mismatch on an invoice that had been sitting for two weeks. We never would have caught that manually.",
    name: "Priya N.",
    role: "Finance Operations Lead",
    company: "Professional services, 80 employees",
  },
];

export function Testimonials() {
  const reduce = useReducedMotion();
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
      <SectionIntro
        eyebrow="From finance teams"
        title="The mistake that got through before Velora."
        body="Every finance team has a story. A payment that went out twice. A discount no one was supposed to approve. Velora stops the next one."
      />
      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {quotes.map((q, index) => (
          <motion.div
            key={q.name}
            className="glass rounded-[1.5rem] p-6 sm:p-7"
            initial={reduce ? false : { y: 16 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: index * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[13px] font-medium text-gold mb-1">❝</p>
            <p className="text-sm leading-7 text-foreground">{q.body}</p>
            <div className="mt-5 border-t border-white/8 pt-5">
              <p className="text-[13px] font-medium text-foreground">{q.name}</p>
              <p className="mt-0.5 text-[12px] text-muted-foreground">{q.role} · {q.company}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
