"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ShieldCheck } from "lucide-react";

const stages = ["draft", "scan", "detect", "alert", "blocked"] as const;
type Stage = (typeof stages)[number];

export function HeroVisual() {
  const [stage, setStage] = useState<Stage>("draft");

  useEffect(() => {
    const sequence: { stage: Stage; at: number }[] = [
      { stage: "draft", at: 0 },
      { stage: "scan", at: 900 },
      { stage: "detect", at: 2800 },
      { stage: "alert", at: 3800 },
      { stage: "blocked", at: 5600 },
    ];
    let timers: number[] = [];
    const run = () => {
      timers.forEach(clearTimeout);
      timers = sequence.map(({ stage: next, at }) =>
        window.setTimeout(() => setStage(next), at)
      );
    };
    run();
    const loop = window.setInterval(run, 9000);
    return () => {
      timers.forEach(clearTimeout);
      clearInterval(loop);
    };
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-[540px]">
      <div className="absolute -inset-8 -z-10 rounded-[40px] bg-gradient-to-br from-gold/20 via-transparent to-protect/20 blur-2xl animate-glow" />
      <div className="animate-float glass-strong relative overflow-hidden rounded-[28px] p-5 ring-1 ring-white/10 sm:p-6">
        <div className="mb-4 flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          <span>Outbound invoice</span>
          <span className="text-gold">Live monitor</span>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-black/30 p-4 ring-1 ring-white/8">
          {(stage === "scan" || stage === "detect") && (
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-protect/0 via-protect/40 to-protect/0 animate-scan" />
          )}
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs text-muted-foreground">Harborline Retail · INV-10482</p>
              <p className="mt-1 font-serif text-2xl text-foreground">VL-THERM-440</p>
            </div>
            <span className="rounded-full bg-white/5 px-2 py-1 text-[10px] uppercase tracking-wider text-muted-foreground">
              Draft
            </span>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3 text-sm">
            <Metric label="Qty" value="820" />
            <Metric
              label="Unit price"
              value="$84"
              warn={stage === "detect" || stage === "alert" || stage === "blocked"}
            />
            <Metric label="Total" value="$68,880" />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {(stage === "detect" || stage === "alert" || stage === "blocked") && (
            <motion.div
              key="contract"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 rounded-2xl bg-protect/8 p-4 ring-1 ring-protect/25"
            >
              <p className="text-[11px] uppercase tracking-[0.16em] text-protect">Velora detects</p>
              <p className="mt-1 text-sm text-foreground">
                Contract rate: <span className="font-mono text-protect">$102/unit</span>
              </p>
              <p className="mt-1 text-xs text-muted-foreground">Harborline MSA · Google Drive</p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {(stage === "alert" || stage === "blocked") && (
            <motion.div
              key="alert"
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="risk-glow mt-3 rounded-2xl bg-risk/10 p-4"
            >
              <p className="text-[11px] uppercase tracking-[0.16em] text-risk">Potential revenue loss detected</p>
              <p className="mt-1 font-mono text-2xl text-foreground sm:text-3xl">$14,760</p>
              <p className="mt-1 text-xs text-muted-foreground">
                820 units × $18 under contract
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {stage === "blocked" && (
            <motion.div
              key="blocked"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="protect-glow mt-3 flex items-center gap-3 rounded-2xl bg-protect/10 px-4 py-3"
            >
              <ShieldCheck className="size-5 text-protect" />
              <div>
                <p className="text-sm font-medium text-protect">Blocked before sending</p>
                <p className="text-xs text-muted-foreground">Human approval required · Finance notified</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
  warn,
}: {
  label: string;
  value: string;
  warn?: boolean;
}) {
  return (
    <div className="rounded-xl bg-white/4 px-3 py-2 ring-1 ring-white/6">
      <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
      <p className={`mt-1 font-mono text-sm ${warn ? "text-risk" : "text-foreground"}`}>{value}</p>
    </div>
  );
}
