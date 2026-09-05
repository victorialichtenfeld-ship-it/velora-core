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
    }, 5600);
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <section id="product" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.28em] text-gold">
            <span className="size-1.5 rounded-full bg-gold animate-flash" />
            What it catches
          </p>
          <h2 className="font-figure mt-4 text-[2.6rem] leading-[1.02] tracking-[-0.04em] sm:text-[3.4rem]">
            Two mistakes. Quiet <span className="money-sheen">six figures</span>.
          </h2>
          <p className="mt-5 max-w-md text-[16px] leading-8 text-muted-foreground">
            Duplicate vendor payments and invoices that ignore the contracted unit price. That is the product.
          </p>
          <div className="mt-8 flex flex-col gap-2">
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
                    ? "border-gold bg-gold/8 text-gold"
                    : "border-gold/20 text-muted-foreground hover:border-gold/50 hover:text-foreground"
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
            initial={reduce ? false : { y: 16 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="pointer-events-none absolute inset-x-0 top-1/3 h-16 overflow-hidden">
              <div className="scan-wash animate-scan absolute inset-x-0 top-0 h-16" />
            </div>
            <MatchRow side={current.left} />
            <div className="relative py-5">
              <span className="absolute inset-x-8 top-1/2 h-px bg-gold/25" />
              <span className="absolute inset-x-8 top-1/2 h-px overflow-hidden">
                <span className="absolute inset-y-0 w-1/3 bg-gold animate-gold-wash" />
              </span>
              <p className="relative text-center text-[11px] font-medium uppercase tracking-[0.32em] text-gold">
                Model match
              </p>
            </div>
            <MatchRow side={current.right} emphasis />
            <p className="money-sheen mt-10 font-figure text-6xl tracking-[-0.05em] sm:text-7xl">
              <AnimatedNumber value={current.amount} prefix="$" duration={900} />
            </p>
            <p className="mt-3 text-[11px] uppercase tracking-[0.22em] text-gold/75">{current.caption}</p>
            <p className="mt-3 max-w-sm text-sm leading-7 text-muted-foreground">{current.detail}</p>
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
    <div className={`flex items-end justify-between gap-4 border-b pb-4 ${emphasis ? "border-gold/45" : "border-gold/20"}`}>
      <div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-gold/65">{side.kicker}</p>
        <p className="font-figure mt-1 text-2xl tracking-[-0.03em] sm:text-3xl">{side.name}</p>
        <p className="mt-1 text-sm text-muted-foreground">{side.meta}</p>
      </div>
    </div>
  );
}
