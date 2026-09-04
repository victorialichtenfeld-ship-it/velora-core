"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { GlassPanel } from "@/components/glass-panel";

const mistakes = [
  {
    id: "dup",
    title: "Duplicate vendor payments",
    line: "Apex Logistics billed twice in 15 hours.",
    detail: "ACH-4418 matched ACH-4410: same vendor, same $11,240. Velora held the second payment.",
    impact: "$11,240",
  },
  {
    id: "price",
    title: "Incorrect invoice pricing",
    line: "Harborline was billed $84 instead of $102.",
    detail: "820 units went out under contract. Potential leakage: $14,760 — blocked before send.",
    impact: "$14,760",
  },
  {
    id: "discount",
    title: "Unauthorized discounts",
    line: "A 16% discount was applied with no Finance approval.",
    detail: "Policy caps discounts at 15%. HubSpot deal notes had no exception on file.",
    impact: "$4,275",
  },
  {
    id: "contract",
    title: "Contract conflicts",
    line: "Cinder & Co. invoice ignored addendum 4.2.",
    detail: "The pricing addendum locks $102/unit. The draft invoice used $94.",
    impact: "$6,480",
  },
  {
    id: "billing",
    title: "Missed billing opportunities",
    line: "Usage overage never made it onto the invoice.",
    detail: "Operations logged extra handling fees that billing never pulled into QuickBooks.",
    impact: "$2,180",
  },
  {
    id: "suspicious",
    title: "Suspicious transactions",
    line: "A first-time vendor received a $9,875.01 wire.",
    detail: "Nimbus Facilities is not on the vendor master. No matching PO exists.",
    impact: "$2,875",
  },
  {
    id: "po",
    title: "Incorrect purchase orders",
    line: "PO-2201 exceeded the $25,000 approval limit.",
    detail: "Velora paused the order and routed it to Finance before it reached the vendor.",
    impact: "$1,760",
  },
  {
    id: "sensitive",
    title: "Sensitive information sent incorrectly",
    line: "A rate card was attached to the wrong customer thread.",
    detail: "Gmail draft included Harborline pricing destined for a prospect mailbox. Send was blocked.",
    impact: "Confidential",
  },
];

export function ProblemSection() {
  const [active, setActive] = useState(mistakes[0].id);
  const current = mistakes.find((item) => item.id === active) ?? mistakes[0];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((id) => {
        const index = mistakes.findIndex((item) => item.id === id);
        return mistakes[(index + 1) % mistakes.length].id;
      });
    }, 4200);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="product" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
      <p className="text-xs uppercase tracking-[0.2em] text-gold">The cost of a quiet mistake</p>
      <h2 className="mt-3 max-w-2xl font-serif text-3xl text-balance sm:text-4xl">
        Most expensive errors do not look like fraud. They look like Tuesday.
      </h2>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Duplicate payments, wrong unit prices, off-policy discounts, and contract mismatches move through email, CRM, and accounting every day. Velora watches those flows and stops the ones that cost money.
      </p>
      <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
          {mistakes.map((item) => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`rounded-xl px-4 py-3 text-left text-sm ring-1 transition ${
                active === item.id
                  ? "bg-gold/12 text-foreground ring-gold/40"
                  : "bg-card/80 text-muted-foreground ring-ink/10 hover:bg-card hover:text-foreground"
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>
        <GlassPanel glow="risk" className="min-h-[280px] p-6 sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
            >
              <p className="text-[11px] uppercase tracking-[0.16em] text-risk">Live example</p>
              <h3 className="mt-2 font-serif text-2xl">{current.line}</h3>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">{current.detail}</p>
              <div className="mt-8 flex items-end justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Amount at risk</p>
                  <p className="mt-1 font-mono text-3xl text-foreground">{current.impact}</p>
                </div>
                <span className="rounded-full bg-risk/15 px-3 py-1 text-xs text-risk">Held by Velora</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </GlassPanel>
      </div>
    </section>
  );
}
