"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";
import { SectionIntro } from "@/components/marketing/section-intro";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "Does Velora ever move money or approve anything on its own?",
    a: "Never. Velora is a control system, not an agent. It flags and holds — a named person on your team approves, dismisses, or releases every action. Nothing is auto-executed.",
  },
  {
    q: "How long does it take to set up?",
    a: "Most teams are up and running in under an afternoon. You import a CSV of your invoices and payments, set your rules, and Velora starts scanning. No IT project required.",
  },
  {
    q: "What tools does it connect to?",
    a: "Today Velora works via CSV import from QuickBooks, Xero, NetSuite, Stripe, and any accounting tool that exports data. Direct API integrations for QuickBooks, Gmail, Slack, and Stripe are on the roadmap.",
  },
  {
    q: "What if Velora flags something that isn't actually a mistake?",
    a: "A human reviews every flag. If your team dismisses a flag, it's logged and you can adjust the rule that triggered it. False positives become feedback that sharpens your rule set.",
  },
  {
    q: "Is my financial data safe?",
    a: "Yes. Data is encrypted in transit and at rest. Velora never shares your data with third parties and never trains on your data. You can request deletion at any time.",
  },
  {
    q: "What's the difference between Starter and Growth?",
    a: "Starter covers one finance team and up to 3 connected systems — duplicate payments and pricing errors. Growth covers up to 8 systems, adds discount and wire controls, and includes Slack notifications to the named owner.",
  },
  {
    q: "Can I cancel any time?",
    a: "Yes. No contracts, no cancellation fees. Cancel from your dashboard and your subscription ends at the billing period.",
  },
  {
    q: "What does the 14-day free trial include?",
    a: "Full access to the plan you sign up for — all features, real data, real flags. No credit card required to start.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  const reduce = useReducedMotion();

  return (
    <section id="faq" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
      <SectionIntro
        eyebrow="FAQ"
        title="Questions finance teams ask before they sign up."
      />
      <div className="mt-12 flex flex-col gap-2">
        {faqs.map((faq, i) => (
          <div key={i} className="glass rounded-[1.2rem] overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="text-[15px] font-medium text-foreground">{faq.q}</span>
              <Plus
                className={cn(
                  "size-4 shrink-0 text-muted-foreground transition-transform duration-200",
                  open === i && "rotate-45"
                )}
              />
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div
                  key="body"
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduce ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-5 text-sm leading-7 text-muted-foreground">{faq.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
