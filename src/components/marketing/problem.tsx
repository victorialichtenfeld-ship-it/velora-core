"use client";

import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { SectionIntro } from "@/components/marketing/section-intro";

const cases = [
  {
    id: "dup",
    title: "Duplicate vendor payments",
    line: "Apex Logistics billed twice in 15 hours.",
    detail:
      "ACH-4418 matched ACH-4410: same vendor, same $11,240. Velora held the second payment before it reached the bank.",
    impact: "$11,240",
  },
  {
    id: "price",
    title: "Invoice pricing mismatches",
    line: "Harborline was billed $84 instead of the $102 contract rate.",
    detail:
      "820 units were about to go out under the MSA. The $14,760 gap was blocked on the draft invoice, before billing sent it.",
    impact: "$14,760",
  },
];

export function ProblemSection() {
  const [active, setActive] = useState(cases[0].id);
  const current = cases.find((item) => item.id === active) ?? cases[0];
  const reduce = useReducedMotion();

  return (
    <section id="product" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
      <SectionIntro
        eyebrow="What Velora checks first"
        title="Two AP mistakes that quietly move six figures."
        body="Finance teams at mid-size companies lose the most money on repeat vendor payments and invoices that ignore the contracted unit price. Velora is built around those two checks. Everything else is secondary."
      />
      <div className="mt-12 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <LayoutGroup>
          <div className="grid gap-2">
            {cases.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(item.id)}
                className={`relative overflow-hidden rounded-md px-4 py-4 text-left text-sm tracking-[0.01em] ring-1 transition ${
                  active === item.id
                    ? "bg-secondary text-foreground ring-gold/35"
                    : "bg-card text-muted-foreground ring-bronze/25 hover:text-foreground"
                }`}
              >
                {active === item.id ? (
                  <motion.span
                    layoutId="problem-active"
                    className="absolute inset-y-0 left-0 w-px bg-gold"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                ) : null}
                {item.title}
              </button>
            ))}
          </div>
        </LayoutGroup>
        <div className="min-h-[260px] overflow-hidden rounded-lg bg-card p-7 ring-1 ring-gold/20 shadow-[0_16px_40px_rgb(8_8_14_/_0.28)] sm:p-9">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-protect">Held in the walkthrough</p>
              <h3 className="mt-3 font-figure text-2xl leading-snug tracking-[-0.02em] sm:text-[1.85rem]">{current.line}</h3>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">{current.detail}</p>
              <div className="mt-10">
                <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Amount at risk</p>
                <p className="money-sheen mt-2 font-figure text-5xl tracking-[-0.03em]">{current.impact}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
