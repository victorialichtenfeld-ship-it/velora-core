"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { GoldSeal } from "@/components/marketing/gold-seal";
import { AnimatedNumber } from "@/components/animated-number";

const cases = [
  {
    id: "dup",
    title: "Duplicate ACH",
    line: "Apex billed twice in 15 hours.",
    detail: "ACH-4418 matched ACH-4410. Same vendor. Same $11,240. Held before the bank.",
    amount: 11240,
    caption: "Locked duplicate",
    chips: [
      { id: "4410", label: "ACH-4410", state: "Paid" },
      { id: "4418", label: "ACH-4418", state: "Held" },
    ],
  },
  {
    id: "price",
    title: "Under contract",
    line: "Harborline billed $84 instead of $102.",
    detail: "820 units were about to leave at the wrong rate. $14,760 stopped on the draft invoice.",
    amount: 14760,
    caption: "Pricing gap held",
    chips: [
      { id: "inv", label: "$84 / unit", state: "Invoice" },
      { id: "msa", label: "$102 / unit", state: "MSA" },
    ],
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
    <section id="product" className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="pointer-events-none absolute top-1/2 right-0 size-[28rem] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(176_137_58_/_0.12),transparent_68%)]" />
      <div className="grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr]">
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
                className={`flex items-center justify-between border-l-2 px-4 py-3 text-left transition ${
                  active === item.id
                    ? "border-gold bg-gold/8 text-gold"
                    : "border-gold/20 text-muted-foreground hover:border-gold/50 hover:text-foreground"
                }`}
              >
                <span className="text-sm tracking-[0.02em]">{item.title}</span>
                <span className="font-figure text-lg">
                  ${item.amount.toLocaleString("en-US")}
                </span>
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.p
              key={current.id}
              initial={reduce ? false : { y: 10 }}
              animate={{ y: 0 }}
              className="mt-6 max-w-md text-sm leading-7 text-gold/80"
            >
              {current.detail}
            </motion.p>
          </AnimatePresence>
        </div>
        <div className="relative">
          <GoldSeal caption={current.caption}>
            <p className="font-figure money-sheen text-[2.5rem] leading-none tracking-[-0.06em] sm:text-[3.2rem]">
              <AnimatedNumber value={current.amount} prefix="$" duration={900} />
            </p>
          </GoldSeal>
          <div className="pointer-events-none absolute inset-x-0 top-[8%] flex justify-between px-2 sm:px-6">
            {current.chips.map((chip, index) => (
              <motion.div
                key={`${current.id}-${chip.id}`}
                initial={reduce ? false : { y: index === 0 ? -8 : 8 }}
                animate={reduce ? undefined : { y: index === 0 ? [-6, 6, -6] : [8, -4, 8] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                className="gold-chip"
              >
                <p className="font-figure text-sm text-gold">{chip.label}</p>
                <p className="mt-1 text-[8px] uppercase tracking-[0.18em] text-gold/70">{chip.state}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
