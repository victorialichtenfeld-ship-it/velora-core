"use client";

import { motion, useReducedMotion } from "motion/react";
import { SectionIntro } from "@/components/marketing/section-intro";

const pillars = [
  { title: "Human approval", body: "A named finance owner decides." },
  { title: "Audit logs", body: "Every hold and override is recorded." },
  { title: "Least privilege", body: "People see only the payments they can act on." },
  { title: "Encryption", body: "Invoices and contracts encrypted in transit." },
  { title: "Rules", body: "If the rule is off, the hold is off." },
];

export function TrustSection() {
  const reduce = useReducedMotion();
  return (
    <section id="trust" className="mx-auto w-full max-w-4xl px-4 py-20 sm:px-6 sm:py-24">
      <SectionIntro
        eyebrow="Trust"
        title="A hold only belongs in the payment path if it is boring and auditable."
      />
      <ul className="mt-12 divide-y divide-border border-y border-border">
        {pillars.map((pillar, index) => (
          <motion.li
            key={pillar.title}
            className="grid gap-2 py-5 sm:grid-cols-[14rem_1fr] sm:gap-8"
            initial={reduce ? false : { x: -12 }}
            whileInView={{ x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: index * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-figure text-xl">{pillar.title}</p>
            <p className="text-sm leading-7 text-muted-foreground">{pillar.body}</p>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
