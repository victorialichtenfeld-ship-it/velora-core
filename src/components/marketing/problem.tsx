"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { AnimatedNumber } from "@/components/animated-number";

const cases = [
  {
    id: "dup",
    title: "Duplicate payments",
    detail: "Same vendor. Same amount. Fifteen hours apart. The second payment is flagged before it reaches the bank.",
    amount: 11240,
    caption: "Duplicate flagged",
    left: { kicker: "Already paid", name: "ACH-4410", meta: "Apex Logistics" },
    right: { kicker: "Queued again", name: "ACH-4418", meta: "Apex Logistics" },
  },
  {
    id: "price",
    title: "Pricing errors",
    detail: "820 Harborline units were about to invoice at $84. The contract is $102. The draft invoice is flagged.",
    amount: 14760,
    caption: "Pricing error flagged",
    left: { kicker: "Invoice", name: "$84 / unit", meta: "Harborline" },
    right: { kicker: "Contract", name: "$102 / unit", meta: "Agreed rate" },
  },
  {
    id: "discount",
    title: "Over-limit discounts",
    detail: "Sales quoted 16% off. Company policy caps it at 10% without finance. The quote waits for a person.",
    amount: 28750,
    caption: "Discount waiting on finance",
    left: { kicker: "Quote", name: "16% off", meta: "Sales" },
    right: { kicker: "Policy", name: "10% max", meta: "Finance rule" },
  },
  {
    id: "contract",
    title: "Contract mismatches",
    detail: "An invoice ignores the MSA unit price. Velora flags it with the contract line next to the bill.",
    amount: 14760,
    caption: "Contract mismatch flagged",
    left: { kicker: "Bill", name: "Wrong rate", meta: "Invoice file" },
    right: { kicker: "MSA", name: "Signed price", meta: "File storage" },
  },
  {
    id: "wire",
    title: "Unauthorized wires",
    detail: "A wire to a payee not on the vendor master waits for treasury. Velora does not send it.",
    amount: 18400,
    caption: "Wire waiting on treasury",
    left: { kicker: "Wire", name: "Unknown payee", meta: "Nimbus" },
    right: { kicker: "Master", name: "Not approved", meta: "Vendor list" },
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
      setActive((prev) => {
        const index = cases.findIndex((item) => item.id === prev);
        return cases[(index + 1) % cases.length].id;
      });
    }, 4000);
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <section id="product" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <div>
          <p className="text-[13px] font-medium text-muted-foreground">What it catches</p>
          <h2 className="mt-3 text-[2.3rem] font-semibold leading-[1.08] tracking-[-0.04em] sm:text-[3.05rem]">
            Anything that breaks your own rules.
          </h2>
          <p className="mt-5 max-w-md text-[16px] leading-8 text-muted-foreground">
            Duplicate payments, pricing errors, over-limit discounts, contract mismatches, unauthorized wires. Each flag includes evidence and a recommended action. A human still decides.
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
                className={`rounded-2xl px-4 py-3 text-left text-sm transition ${
                  active === item.id
                    ? "bg-gold/12 text-foreground"
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
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
            exit={reduce ? undefined : { y: -12 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="glass relative rounded-[1.6rem] p-7"
          >
            <div className="relative">
            <MatchRow side={current.left} />
            <div className="relative py-4">
              <span className="absolute inset-x-6 top-1/2 h-px bg-border" />
              <p className="relative text-center text-[12px] font-medium">Company rule</p>
            </div>
            <MatchRow side={current.right} emphasis reduce={reduce} />
            <p className="font-figure mt-8 text-5xl tracking-[-0.045em] text-gold sm:text-6xl">
              <AnimatedNumber value={current.amount} prefix="$" duration={900} />
            </p>
            <p className="mt-3 text-[13px] font-medium text-gold">{current.caption}</p>
            <p className="relative mt-2 max-w-sm text-sm leading-7 text-muted-foreground">{current.detail}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function MatchRow({
  side,
  emphasis = false,
  reduce = false,
}: {
  side: { kicker: string; name: string; meta: string };
  emphasis?: boolean;
  reduce?: boolean | null;
}) {
  return (
    <motion.div
      className={`flex items-end justify-between gap-4 border-b pb-4 ${emphasis ? "border-foreground/20" : "border-border"}`}
      animate={emphasis && !reduce ? { x: [0, -3, 3, 0] } : { x: 0 }}
      transition={{ duration: 0.38 }}
    >
      <div>
        <p className="text-[12px] text-muted-foreground">{side.kicker}</p>
        <p className="font-figure mt-1 text-2xl tracking-[-0.03em] sm:text-[1.85rem]">{side.name}</p>
        <p className="mt-1 text-sm text-muted-foreground">{side.meta}</p>
      </div>
    </motion.div>
  );
}
