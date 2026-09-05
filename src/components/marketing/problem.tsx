"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { SectionIntro } from "@/components/marketing/section-intro";

const cases = [
  {
    id: "dup",
    title: "Duplicate vendor payments",
    line: "Apex billed twice in 15 hours.",
    detail:
      "ACH-4418 matched ACH-4410: same vendor, same $11,240. Velora held the second payment before it reached the bank.",
    impact: "$11,240",
  },
  {
    id: "price",
    title: "Invoice pricing mismatches",
    line: "Harborline billed $84 instead of $102.",
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
    <section id="product" className="mx-auto w-full max-w-4xl px-4 py-20 sm:px-6 sm:py-24">
      <SectionIntro
        eyebrow="What it catches"
        title="Two mistakes. Quiet six figures."
        body="Repeat vendor payments and invoices that ignore the contracted unit price. That is the product. Everything else is secondary."
      />
      <div className="mt-10 flex gap-6 border-b border-gold/20">
        {cases.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActive(item.id)}
            className={`pb-3 text-sm tracking-[0.01em] transition ${
              active === item.id ? "border-b border-gold text-gold" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
          className="pt-8"
        >
          <h3 className="font-figure text-2xl leading-snug tracking-[-0.02em] sm:text-3xl">{current.line}</h3>
          <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">{current.detail}</p>
          <p className="money-sheen mt-8 font-figure text-7xl tracking-[-0.05em] sm:text-8xl">{current.impact}</p>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
