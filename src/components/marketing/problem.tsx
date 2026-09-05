"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { SectionIntro } from "@/components/marketing/section-intro";
import { AnimatedNumber } from "@/components/animated-number";

const cases = [
  {
    id: "dup",
    title: "Duplicate vendor payments",
    line: "Apex billed twice in 15 hours.",
    detail:
      "ACH-4418 matched ACH-4410: same vendor, same $11,240. Velora held the second payment before it reached the bank.",
    amount: 11240,
  },
  {
    id: "price",
    title: "Invoice pricing mismatches",
    line: "Harborline billed $84 instead of $102.",
    detail:
      "820 units were about to go out under the MSA. The $14,760 gap was blocked on the draft invoice, before billing sent it.",
    amount: 14760,
  },
];

export function ProblemSection() {
  const [active, setActive] = useState(cases[0].id);
  const current = cases.find((item) => item.id === active) ?? cases[0];
  const reduce = useReducedMotion();
  const pauseUntil = useRef(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      if (Date.now() < pauseUntil.current) return;
      setActive((prev) => (prev === "dup" ? "price" : "dup"));
    }, 5600);
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <section id="product" className="mx-auto w-full max-w-4xl px-4 py-20 sm:px-6 sm:py-24">
      <SectionIntro
        eyebrow="What it catches"
        title="Two mistakes. Quiet six figures."
        body="Repeat vendor payments and invoices that ignore the contracted unit price. That is the product. Everything else is secondary."
      />
      <LayoutGroup>
        <div className="mt-10 flex gap-6 border-b border-gold/20">
          {cases.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                pauseUntil.current = Date.now() + 8000;
                setActive(item.id);
              }}
              className={`relative pb-3 text-sm tracking-[0.01em] transition ${
                active === item.id ? "text-gold" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {active === item.id ? (
                <motion.span
                  layoutId="catch-tab"
                  className="absolute inset-x-0 bottom-0 h-px bg-gold"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              ) : null}
              {item.title}
            </button>
          ))}
        </div>
      </LayoutGroup>
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={reduce ? false : { y: 14 }}
          animate={{ y: 0 }}
          exit={reduce ? undefined : { y: -10 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden pt-8"
        >
          <div className="pointer-events-none absolute inset-x-0 top-6 h-24 overflow-hidden">
            <div className="scan-wash animate-scan absolute inset-x-0 top-0 h-16" />
          </div>
          <h3 className="font-figure text-2xl leading-snug tracking-[-0.02em] sm:text-3xl">{current.line}</h3>
          <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">{current.detail}</p>
          <p className="money-sheen relative mt-8 font-figure text-7xl tracking-[-0.05em] sm:text-8xl">
            <AnimatedNumber value={current.amount} prefix="$" duration={1100} />
          </p>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
