"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Lock } from "lucide-react";
import { SampleDataBadge } from "@/components/sample-data-badge";

type Stage = "send" | "match" | "held";

function StatusChip({ stage }: { stage: Stage }) {
  const label = stage === "held" ? "Held" : stage === "match" ? "Duplicate" : "In flight";
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-foreground">
      {stage === "held" ? <Lock className="size-3" /> : <span className="size-1.5 rounded-full bg-foreground/70" />}
      {label}
    </span>
  );
}

export function CashScene() {
  const [stage, setStage] = useState<Stage>("send");
  const reduce = useReducedMotion();
  const view = reduce ? "held" : stage;
  const held = view === "held";
  const matching = view === "match";
  const progress = held ? 100 : matching ? 72 : 22;

  useEffect(() => {
    if (reduce) return;
    const sequence: { stage: Stage; at: number }[] = [
      { stage: "send", at: 0 },
      { stage: "match", at: 1600 },
      { stage: "held", at: 3600 },
    ];
    let timers: number[] = [];
    const run = () => {
      timers.forEach(clearTimeout);
      timers = sequence.map(({ stage: next, at }) => window.setTimeout(() => setStage(next), at));
    };
    run();
    const loop = window.setInterval(run, 8200);
    return () => {
      timers.forEach(clearTimeout);
      clearInterval(loop);
    };
  }, [reduce]);

  return (
    <div className="product-panel mx-auto w-full max-w-[520px] p-6 sm:p-7">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[13px] font-medium text-foreground">Payment review</p>
          <p className="mt-0.5 text-[12px] text-muted-foreground">Meridian Supply · ACH rail</p>
        </div>
        <SampleDataBadge />
      </div>

      <p className="mt-8 text-[12px] tracking-[0.04em] text-muted-foreground">Apex Logistics</p>
      <p className="font-figure mt-1 text-[2.7rem] leading-none tracking-[-0.04em] text-foreground sm:text-[3.15rem]">
        $11,240
      </p>

      <div className="mt-8 divide-y divide-border border-y border-border">
        <div className="flex items-center justify-between gap-3 py-3.5">
          <div>
            <p className="text-[13px] font-medium">ACH-4410</p>
            <p className="mt-0.5 text-[12px] text-muted-foreground">Yesterday, 4:12 PM</p>
          </div>
          <span className="text-[12px] text-muted-foreground">Settled</span>
        </div>
        <motion.div
          layout
          className={`flex items-center justify-between gap-3 py-3.5 ${held || matching ? "bg-muted/70 -mx-2 rounded-lg px-2" : ""}`}
        >
          <div>
            <p className="text-[13px] font-medium">ACH-4418</p>
            <p className="mt-0.5 text-[12px] text-muted-foreground">15 hours later · same amount</p>
          </div>
          <StatusChip stage={view} />
        </motion.div>
      </div>

      <div className="mt-6 h-[3px] overflow-hidden rounded-full bg-muted">
        <div
          className="h-full bg-foreground transition-[width] duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={view}
          initial={reduce ? false : { y: 6, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduce ? undefined : { y: -6, opacity: 0 }}
          transition={{ duration: 0.28 }}
          className="mt-4 text-[13px] leading-6 text-muted-foreground"
        >
          {held
            ? "Held before the bank. This payment will not leave the account."
            : matching
              ? "Same vendor, same amount, inside 15 hours. Duplicate match at 99.4%."
              : "Second instruction is on the rail to the bank."}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

export function HeroVisual() {
  return <CashScene />;
}
