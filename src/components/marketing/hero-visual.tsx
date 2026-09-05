"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Lock } from "lucide-react";

type Stage = "send" | "scan" | "match" | "held";

const ticks = Array.from({ length: 48 }, (_, i) => i);

export function CashScene() {
  const [stage, setStage] = useState<Stage>("send");
  const reduce = useReducedMotion();
  const view = reduce ? "held" : stage;
  const held = view === "held";
  const scanning = view === "scan" || view === "match";
  const orbit = held ? 198 : view === "match" ? 150 : scanning ? 95 : 28;

  useEffect(() => {
    if (reduce) return;
    const sequence: { stage: Stage; at: number }[] = [
      { stage: "send", at: 0 },
      { stage: "scan", at: 800 },
      { stage: "match", at: 2100 },
      { stage: "held", at: 3300 },
    ];
    let timers: number[] = [];
    const run = () => {
      timers.forEach(clearTimeout);
      timers = sequence.map(({ stage: next, at }) => window.setTimeout(() => setStage(next), at));
    };
    run();
    const loop = window.setInterval(run, 6400);
    return () => {
      timers.forEach(clearTimeout);
      clearInterval(loop);
    };
  }, [reduce]);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[440px]">
      <div className="absolute inset-[-12%] rounded-full bg-[radial-gradient(circle,rgb(176_137_58_/_0.16),transparent_62%)] animate-gold-breathe" />

      <div className="absolute inset-0 rounded-full border border-gold/25" />
      <div className="absolute inset-[18px] rounded-full border border-dashed border-gold/35 animate-spin-slow" />
      <div className="absolute inset-[52px] rounded-full border border-gold/15" />

      <svg viewBox="0 0 200 200" className="absolute inset-0 animate-spin-rev" aria-hidden="true">
        {ticks.map((i) => {
          const a = (i / 48) * Math.PI * 2 - Math.PI / 2;
          const major = i % 6 === 0;
          const inner = major ? 84 : 90;
          const outer = 96;
          return (
            <line
              key={i}
              x1={100 + Math.cos(a) * inner}
              y1={100 + Math.sin(a) * inner}
              x2={100 + Math.cos(a) * outer}
              y2={100 + Math.sin(a) * outer}
              stroke="#B0893A"
              strokeWidth={major ? 1.5 : 0.6}
              opacity={major ? 0.75 : 0.28}
            />
          );
        })}
      </svg>

      <svg viewBox="0 0 200 200" className="absolute inset-[36px]" aria-hidden="true">
        <circle
          cx="100"
          cy="100"
          r="78"
          fill="none"
          stroke="#B0893A"
          strokeWidth="1.2"
          opacity="0.45"
          className={reduce ? "" : "animate-ring-draw"}
        />
      </svg>

      {scanning ? (
        <div className="pointer-events-none absolute inset-[40px] overflow-hidden rounded-full">
          <div className="scan-wash animate-scan absolute inset-x-0 top-0 h-16" />
        </div>
      ) : null}

      {!held ? (
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: orbit }}
          transition={{ type: "spring", stiffness: 60, damping: 16 }}
        >
          <div className="absolute top-[6%] left-1/2 -translate-x-1/2 text-center">
            <p className="font-figure text-sm text-gold sm:text-base">ACH-4418</p>
            <p className="text-[9px] uppercase tracking-[0.16em] text-gold/70">
              {view === "match" ? "Duplicate" : scanning ? "Scan" : "Queued"}
            </p>
          </div>
        </motion.div>
      ) : null}

      <div className="absolute inset-[28%] flex flex-col items-center justify-center text-center">
        <AnimatePresence>
          {held ? (
            <motion.div
              key="lock"
              initial={reduce ? false : { scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative mb-3 flex size-12 items-center justify-center rounded-full bg-gold text-primary-foreground"
            >
              <span className="absolute size-12 rounded-full bg-gold animate-pulse-ring" />
              <Lock className="relative size-5" />
            </motion.div>
          ) : null}
        </AnimatePresence>
        <p className="font-figure money-sheen text-[2.6rem] leading-none tracking-[-0.05em] sm:text-[3.15rem]">
          $11,240
        </p>
        <p className="mt-3 text-[10px] uppercase tracking-[0.22em] text-gold/75">
          {held ? "Locked before the bank" : "Apex Logistics"}
        </p>
      </div>
    </div>
  );
}

export function HeroVisual() {
  return <CashScene />;
}
