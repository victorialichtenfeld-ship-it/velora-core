"use client";

import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";

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
    <section id="product" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">What Velora checks first</p>
      <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
        Two AP mistakes that quietly move six figures.
      </h2>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Finance teams at mid-size companies lose the most money on repeat vendor payments and invoices that ignore the contracted unit price. Velora is built around those two checks. Everything else is secondary.
      </p>
      <div className="mt-10 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <LayoutGroup>
          <div className="grid gap-2">
            {cases.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(item.id)}
                className={`relative overflow-hidden rounded-md px-4 py-3 text-left text-sm ring-1 transition ${
                  active === item.id
                    ? "bg-secondary text-foreground ring-primary/40"
                    : "bg-card text-muted-foreground ring-border hover:text-foreground"
                }`}
              >
                {active === item.id ? (
                  <motion.span
                    layoutId="problem-active"
                    className="absolute inset-y-0 left-0 w-0.5 bg-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                ) : null}
                {item.title}
              </button>
            ))}
          </div>
        </LayoutGroup>
        <div className="min-h-[240px] overflow-hidden rounded-xl bg-card p-6 ring-1 ring-border sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-protect">Held in the walkthrough</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight">{current.line}</h3>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">{current.detail}</p>
              <div className="mt-8">
                <p className="text-[11px] text-muted-foreground">Amount at risk</p>
                <p className="mt-1 font-figure text-4xl tracking-tight text-risk">{current.impact}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
