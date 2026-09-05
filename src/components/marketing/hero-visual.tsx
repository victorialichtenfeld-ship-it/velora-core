"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { SampleDataBadge } from "@/components/sample-data-badge";

const stages = ["draft", "scan", "detect", "alert", "held"] as const;
type Stage = (typeof stages)[number];

const statusCopy: Record<Stage, string> = {
  draft: "Payable draft in the queue",
  scan: "Matching vendor, amount, and window",
  detect: "Same vendor · same $11,240 · 15 hours",
  alert: "Duplicate flagged before release",
  held: "Held before it left the account",
};

export function HeroVisual() {
  const [stage, setStage] = useState<Stage>("draft");
  const reduce = useReducedMotion();
  const viewStage = reduce ? "held" : stage;

  useEffect(() => {
    if (reduce) return;
    const sequence: { stage: Stage; at: number }[] = [
      { stage: "draft", at: 0 },
      { stage: "scan", at: 700 },
      { stage: "detect", at: 2200 },
      { stage: "alert", at: 3400 },
      { stage: "held", at: 5000 },
    ];
    let timers: number[] = [];
    const run = () => {
      timers.forEach(clearTimeout);
      timers = sequence.map(({ stage: next, at }) => window.setTimeout(() => setStage(next), at));
    };
    run();
    const loop = window.setInterval(run, 7800);
    return () => {
      timers.forEach(clearTimeout);
      clearInterval(loop);
    };
  }, [reduce]);

  const flagged = viewStage === "detect" || viewStage === "alert" || viewStage === "held";
  const scanning = viewStage === "scan" || viewStage === "detect";

  return (
    <motion.a
      href="#demo"
      className={`product-frame gold-glow relative mx-auto block w-full max-w-[540px] rounded-xl p-4 ring-1 ring-gold/25 sm:p-5 ${
        reduce ? "" : "animate-float"
      }`}
      whileHover={reduce ? undefined : { y: -2 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px gold-hairline" />
      <div className="relative mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            Accounts payable
          </p>
          <p className="mt-1 text-sm text-foreground">Meridian Supply walkthrough</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex size-2">
            <span className="absolute inset-0 rounded-full bg-primary animate-pulse-ring" />
            <span className="relative size-2 rounded-full bg-primary" />
          </span>
          <SampleDataBadge />
        </div>
      </div>

      <div className="relative mb-3 flex gap-1">
        {stages.map((item) => (
          <span
            key={item}
            className={`h-0.5 flex-1 rounded-full transition-colors duration-500 ${
              stages.indexOf(item) <= stages.indexOf(viewStage) ? "bg-primary" : "bg-border"
            }`}
          />
        ))}
      </div>

      <div
        className={`relative overflow-hidden rounded-lg bg-background p-4 ring-1 transition-shadow duration-500 ${
          viewStage === "held" ? "ring-primary/50 protect-glow" : flagged ? "ring-risk/40" : "ring-border"
        }`}
      >
        {scanning ? (
          <>
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 scan-wash animate-scan" />
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 scan-beam animate-scan" />
          </>
        ) : null}
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs text-muted-foreground">Apex Logistics · ACH-4418</p>
            <p className="mt-1 text-lg font-medium">Duplicate vendor payment</p>
          </div>
          <AnimatePresence mode="wait">
            <motion.span
              key={viewStage === "held" ? "held" : flagged ? "dup" : "scan"}
              initial={reduce ? false : { scale: 0.86, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`rounded-md px-2 py-1 text-[11px] font-medium ${
                viewStage === "held"
                  ? "bg-protect/15 text-protect"
                  : flagged
                    ? "bg-risk/15 text-risk"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {viewStage === "held" ? "Held" : flagged ? "Duplicate" : "Scanning"}
            </motion.span>
          </AnimatePresence>
        </div>
        <dl className="mt-4 grid grid-cols-3 gap-2 text-sm">
          <Metric label="First ACH" value="$11,240" />
          <Metric label="Second ACH" value="$11,240" warn={flagged} pulse={viewStage === "detect" || viewStage === "alert"} />
          <Metric label="Window" value="15 hrs" />
        </dl>
        <p className="mt-3 text-[11px] text-muted-foreground">{statusCopy[viewStage]}</p>
      </div>

      <AnimatePresence>
        {flagged ? (
          <motion.div
            key="match"
            initial={reduce ? false : { opacity: 0, y: 10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 overflow-hidden rounded-lg bg-background p-4 ring-1 ring-border"
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">Match</p>
            <p className="mt-1 text-sm">Same vendor, same amount, already cleared as ACH-4410.</p>
            <motion.p
              key={viewStage}
              initial={reduce ? false : { opacity: 0.5, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-3 font-figure text-2xl ${
                viewStage === "held" ? "text-protect" : "text-risk"
              }`}
            >
              $11,240
            </motion.p>
            <p className="mt-1 text-xs text-muted-foreground">{statusCopy[viewStage]}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <p className="mt-3 text-xs text-primary">Walk this alert from evidence to decision →</p>
    </motion.a>
  );
}

function Metric({
  label,
  value,
  warn,
  pulse,
}: {
  label: string;
  value: string;
  warn?: boolean;
  pulse?: boolean;
}) {
  return (
    <div
      className={`rounded-md bg-card px-2.5 py-2 ring-1 transition-colors duration-500 ${
        warn ? "ring-risk/40 bg-risk/10" : "ring-border"
      } ${pulse ? "animate-gold-breathe" : ""}`}
    >
      <p className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground">{label}</p>
      <p className={`mt-1 font-figure text-sm ${warn ? "text-risk" : "text-foreground"}`}>{value}</p>
    </div>
  );
}
