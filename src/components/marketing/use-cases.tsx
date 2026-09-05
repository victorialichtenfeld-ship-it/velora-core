"use client";

import { motion, useReducedMotion } from "motion/react";
import { SectionIntro } from "@/components/marketing/section-intro";

const cases = [
  { team: "Sales discounts", result: "A 16% quote waits for finance.", amount: "$28,750" },
  { team: "Purchase limits", result: "A PO over $25,000 waits for a named approver.", amount: "$31,200" },
  { team: "Operations billing", result: "A shipment overage is prompted before the window closes.", amount: "$9,840" },
  { team: "Vendor master", result: "A wire to an unknown payee waits for treasury.", amount: "$18,400" },
];

export function UseCases() {
  const reduce = useReducedMotion();
  return (
    <section id="also-covers" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
      <SectionIntro
        eyebrow="Also on the roadmap"
        title="Adjacent checks. Not why you buy."
        body="The walkthrough includes these so finance can see the control layer expand. They are not the reason to start a trial today."
      />
      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {cases.map((item, index) => (
          <motion.div
            key={item.team}
            className="lift-card rounded-2xl border border-border bg-card px-5 py-8 sm:px-8"
            initial={reduce ? false : { y: 18 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            whileHover={reduce ? undefined : { y: -5 }}
          >
            <p className="text-[13px] font-medium text-gold">{item.team}</p>
            <p className="font-figure mt-3 text-4xl tracking-[-0.04em] text-gold">{item.amount}</p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.result}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
