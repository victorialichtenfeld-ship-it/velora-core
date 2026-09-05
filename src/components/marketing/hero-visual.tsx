"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Lock } from "lucide-react";

type Stage = "send" | "scan" | "match" | "held";

export function CashScene() {
  const [stage, setStage] = useState<Stage>("send");
  const reduce = useReducedMotion();
  const view = reduce ? "held" : stage;
  const held = view === "held";
  const scanning = view === "scan" || view === "match";

  useEffect(() => {
    if (reduce) return;
    const sequence: { stage: Stage; at: number }[] = [
      { stage: "send", at: 0 },
      { stage: "scan", at: 900 },
      { stage: "match", at: 2200 },
      { stage: "held", at: 3400 },
    ];
    let timers: number[] = [];
    const run = () => {
      timers.forEach(clearTimeout);
      timers = sequence.map(({ stage: next, at }) => window.setTimeout(() => setStage(next), at));
    };
    run();
    const loop = window.setInterval(run, 6200);
    return () => {
      timers.forEach(clearTimeout);
      clearInterval(loop);
    };
  }, [reduce]);

  const x = held ? "62%" : view === "match" ? "54%" : scanning ? "38%" : "8%";

  return (
    <div className="relative mx-auto mt-10 mb-8 w-full max-w-5xl px-4 sm:px-6">
      <p className="mb-6 text-center text-[11px] uppercase tracking-[0.22em] text-gold/70">
        {held
          ? "Locked before the bank"
          : view === "match"
            ? "Same vendor · same dollars · 15 hrs"
            : scanning
              ? "Matching paid history"
              : "ACH-4418 leaving the account"}
      </p>

      <div className="relative h-28 sm:h-32">
        <svg className="absolute top-1/2 right-8 left-8 h-2 -translate-y-1/2 overflow-visible" aria-hidden="true">
          <line
            x1="0"
            y1="4"
            x2="100%"
            y2="4"
            stroke="#B0893A"
            strokeWidth="1.2"
            strokeDasharray="8 8"
            className={scanning || !held ? "animate-wire" : ""}
            opacity="0.55"
          />
        </svg>

        {scanning ? <div className="pointer-events-none absolute inset-x-8 top-0 h-full scan-wash animate-scan" /> : null}

        <motion.div
          animate={{ left: x }}
          transition={{ type: "spring", stiffness: 90, damping: 18 }}
          className="absolute top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
        >
          <p className={`font-figure text-2xl tracking-[-0.04em] sm:text-3xl ${held ? "money-sheen" : "text-gold"}`}>
            $11,240
          </p>
          <p className="mt-1 text-center text-[10px] uppercase tracking-[0.18em] text-gold/70">
            {held ? "Held" : view === "match" ? "Duplicate" : scanning ? "Scanning" : "Queued"}
          </p>
        </motion.div>

        <AnimatePresence>
          {held ? (
            <motion.div
              key="lock"
              initial={reduce ? false : { scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute top-1/2 right-6 z-20 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-gold text-primary-foreground"
            >
              <span className="absolute inset-0 rounded-full bg-gold animate-pulse-ring" />
              <Lock className="relative size-5" />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <div className="mt-2 text-center">
        <AnimatePresence mode="wait">
          {held ? (
            <motion.p
              key="stamp"
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="animate-hold-stamp inline-block text-[12px] font-medium tracking-[0.22em] text-gold uppercase"
            >
              Cash held
            </motion.p>
          ) : (
            <p className="text-[12px] tracking-[0.08em] text-muted-foreground">Apex Logistics · ACH-4418</p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function HeroVisual() {
  return <CashScene />;
}
