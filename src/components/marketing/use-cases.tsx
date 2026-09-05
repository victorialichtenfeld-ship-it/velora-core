"use client";

import { motion, useReducedMotion } from "motion/react";
import { SectionIntro } from "@/components/marketing/section-intro";
import { cn } from "@/lib/utils";

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
        eyebrow="Not what you buy today"
        title="Other AP checks can wait. Duplicates and contract price cannot."
        body="The walkthrough also shows discounts, POs, vendor master, and ops billing so finance can see the layer expand. You start a trial for duplicate vendor payments and invoice vs MSA."
      />
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cases.map((item, index) => (
          <motion.div
            key={item.team}
            className={cn(
              "glass lift-card rounded-[1.5rem] px-5 py-8 sm:px-6",
              index === 0 && "lg:col-span-2"
            )}
            initial={reduce ? false : { y: 18 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            whileHover={reduce ? undefined : { y: -5 }}
          >
            <motion.div animate={reduce ? undefined : { y: [0, -8, 0] }} transition={{ duration: 1.7 + index * 0.2, repeat: Infinity, ease: "easeInOut" }}>
              <p className="text-[13px] font-medium text-gold">{item.team}</p>
              <p className="font-figure mt-3 text-3xl tracking-[-0.04em] text-gold lg:text-4xl">{item.amount}</p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.result}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
