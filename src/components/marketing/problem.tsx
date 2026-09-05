"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { AnimatedNumber } from "@/components/animated-number";

const cases = [
  {
    id: "dup",
    title: "Duplicate ACH",
    detail: "Same vendor. Same amount. Fifteen hours apart. The second instruction never reaches the bank.",
    amount: 11240,
    caption: "Duplicate held",
    left: { kicker: "Already paid", name: "ACH-4410", meta: "Apex Logistics" },
    right: { kicker: "Queued again", name: "ACH-4418", meta: "Apex Logistics" },
  },
  {
    id: "price",
    title: "Under contract",
    detail: "820 units were about to leave at $84. The MSA is $102. The draft invoice is stopped.",
    amount: 14760,
    caption: "Pricing gap held",
    left: { kicker: "Invoice", name: "$84 / unit", meta: "Harborline" },
    right: { kicker: "MSA", name: "$102 / unit", meta: "Contract rate" },
  },
];

export function ProblemSection() {
  const [active, setActive] = useState(cases[1].id);
  const current = cases.find((item) => item.id === active) ?? cases[0];
  const reduce = useReducedMotion();
  const pauseUntil = useRef(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      if (Date.now() < pauseUntil.current) return;
      setActive((prev) => (prev === "dup" ? "price" : "dup"));
    }, 6200);
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <section id="product" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <div>
          <p className="text-[13px] font-medium text-muted-foreground">What it catches</p>
          <h2 className="font-figure mt-3 text-[2.4rem] leading-[1.08] tracking-[-0.035em] sm:text-[3.15rem]">
            Two mistakes. Quiet six figures.
          </h2>
          <p className="mt-5 max-w-md text-[16px] leading-8 text-muted-foreground">
            Duplicate vendor payments and invoices that ignore the contracted unit price. That is the product.
          </p>
          <div className="mt-8 flex flex-col gap-1">
            {cases.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  pauseUntil.current = Date.now() + 8000;
                  setActive(item.id);
                }}
                className={`border-l-2 px-4 py-3 text-left text-sm transition ${
                  active === item.id
                    ? "border-foreground bg-white text-foreground"
                    : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={reduce ? false : { y: 12 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="product-panel p-7"
          >
            <MatchRow side={current.left} />
            <div className="relative py-4">
              <span className="absolute inset-x-6 top-1/2 h-px bg-border" />
              {reduce ? null : (
                <span className="animate-rail absolute top-1/2 left-6 size-1.5 -translate-y-1/2 rounded-full bg-foreground" />
              )}
              <p className="relative text-center text-[12px] font-medium">Match</p>
            </div>
            <MatchRow side={current.right} emphasis />
            <p className="font-figure mt-8 text-5xl tracking-[-0.045em] text-foreground sm:text-6xl">
              <AnimatedNumber value={current.amount} prefix="$" duration={900} />
            </p>
            <p className="mt-3 text-[13px] font-medium">{current.caption}</p>
            <p className="mt-2 max-w-sm text-sm leading-7 text-muted-foreground">{current.detail}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function MatchRow({
  side,
  emphasis = false,
}: {
  side: { kicker: string; name: string; meta: string };
  emphasis?: boolean;
}) {
  return (
    <div className={`flex items-end justify-between gap-4 border-b pb-4 ${emphasis ? "border-foreground/20" : "border-border"}`}>
      <div>
        <p className="text-[12px] text-muted-foreground">{side.kicker}</p>
        <p className="font-figure mt-1 text-2xl tracking-[-0.03em] sm:text-[1.85rem]">{side.name}</p>
        <p className="mt-1 text-sm text-muted-foreground">{side.meta}</p>
      </div>
    </div>
  );
}
