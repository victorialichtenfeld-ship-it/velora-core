"use client";

import { motion, useReducedMotion } from "motion/react";
import { SectionIntro } from "@/components/marketing/section-intro";
import { cn } from "@/lib/utils";

const cases = [
  { team: "Invoices", result: "Watched as they move through email and accounting. Pricing and contract mismatches are flagged before they go out.", amount: "Bills" },
  { team: "Payments", result: "Duplicate ACH and unauthorized wires pause in the payment path. A named owner releases or holds.", amount: "Cash" },
  { team: "Discounts", result: "Quotes over the company cap wait for finance. Sales does not have to remember the rule.", amount: "Quotes" },
  { team: "Purchase orders", result: "A PO over the limit waits for the named approver. Velora does not place the order.", amount: "POs" },
];

export function UseCases() {
  const reduce = useReducedMotion();
  return (
    <section id="also-covers" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
      <SectionIntro
        eyebrow="Not a chatbot"
        title="It works quietly in the background. You don’t ask it questions."
        body="Velora sits in the path of invoices and payments. It watches what already moves through your systems and flags anything that breaks your rules — with evidence and a recommended action."
      />
      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {cases.map((item, index) => (
          <motion.div
            key={item.team}
            className={cn("glass lift-card rounded-[1.5rem] px-5 py-8 sm:px-6")}
            initial={reduce ? false : { y: 18 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            whileHover={reduce ? undefined : { y: -5 }}
          >
            <motion.div animate={reduce ? undefined : { y: [0, -8, 0] }} transition={{ duration: 1.7 + index * 0.2, repeat: Infinity, ease: "easeInOut" }}>
              <p className="text-[13px] font-medium text-gold">{item.amount}</p>
              <p className="mt-3 text-2xl font-semibold tracking-[-0.03em]">{item.team}</p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.result}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
