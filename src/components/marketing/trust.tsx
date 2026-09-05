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
    <section id="trust" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
      <SectionIntro
        eyebrow="Why a hold is allowed in AP"
        title="A duplicate ACH only stops if a named owner can explain it."
      />
      <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {pillars.map((pillar, index) => (
          <motion.li
            key={pillar.title}
            className={index === 0 ? "glass rounded-[1.5rem] p-6 sm:col-span-2 lg:col-span-1" : "glass rounded-[1.5rem] p-6"}
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
