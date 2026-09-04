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
      { stage: "scan", at: 800 },
      { stage: "detect", at: 2400 },
      { stage: "alert", at: 3400 },
      { stage: "blocked", at: 5200 },
    ];
    let timers: number[] = [];
    const run = () => {
      timers.forEach(clearTimeout);
      timers = sequence.map(({ stage: next, at }) =>
        window.setTimeout(() => setStage(next), at)
      );
    };
    run();
    const loop = window.setInterval(run, 8500);
    return () => {
      timers.forEach(clearTimeout);
      clearInterval(loop);
    };
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-[540px]">
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="product-frame relative overflow-hidden rounded-[28px] p-5 ring-1 ring-white/15 sm:p-6"
      >
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <svg className="h-full w-full" viewBox="0 0 500 420">
            <defs>
              <linearGradient id="beam" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#7EC8BC" stopOpacity="0" />
                <stop offset="0.5" stopColor="#7EC8BC" stopOpacity="0.7" />
                <stop offset="1" stopColor="#7EC8BC" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M40 40 C 180 90, 220 200, 460 120"
              fill="none"
              stroke="url(#beam)"
              strokeWidth="1.2"
              strokeDasharray="6 10"
              className="[animation:dashMove_6s_linear_infinite]"
            />
            <path
              d="M30 300 C 160 240, 280 340, 470 280"
              fill="none"
              stroke="url(#beam)"
              strokeWidth="1.2"
              strokeDasharray="5 12"
              className="[animation:dashMove_8s_linear_infinite]"
            />
          </svg>
        </div>

        <div className="relative mb-4 flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-white/55">
          <span>Outbound invoice</span>
          <span className="flex items-center gap-2 text-[#7EC8BC]">
            <span className="relative flex size-2">
              <span className="absolute inset-0 rounded-full bg-[#7EC8BC] animate-pulse-ring" />
              <span className="relative size-2 rounded-full bg-[#7EC8BC]" />
            </span>
            Live monitor
          </span>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-black/25 p-4 ring-1 ring-white/10">
          {(stage === "scan" || stage === "detect") && (
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-protect/0 via-[#7EC8BC]/50 to-protect/0 animate-scan" />
          )}
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs text-white/55">Harborline Retail · INV-10482</p>
              <p className="mt-1 font-serif text-2xl text-white">VL-THERM-440</p>
            </div>
            <span className="rounded-full bg-white/8 px-2 py-1 text-[10px] uppercase tracking-wider text-white/60">
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
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative mt-3 rounded-2xl bg-[#7EC8BC]/12 p-4 ring-1 ring-[#7EC8BC]/35"
            >
              <p className="text-[11px] uppercase tracking-[0.16em] text-[#9ED9CF]">Velora detects</p>
              <p className="mt-1 text-sm text-white">
                Contract rate: <span className="font-mono text-[#9ED9CF]">$102/unit</span>
              </p>
              <p className="mt-1 text-xs text-white/55">Harborline MSA · Google Drive</p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {(stage === "alert" || stage === "blocked") && (
            <motion.div
              key="alert"
              initial={{ opacity: 0, y: 18, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="relative mt-3 rounded-2xl bg-[#C45A4A]/15 p-4 ring-1 ring-[#C45A4A]/40"
            >
              <p className="text-[11px] uppercase tracking-[0.16em] text-[#F0A39A]">Potential revenue loss detected</p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-1 font-mono text-2xl text-white sm:text-3xl"
              >
                $14,760
              </motion.p>
              <p className="mt-1 text-xs text-white/55">820 units × $18 under contract</p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {stage === "blocked" && (
            <motion.div
              key="blocked"
              initial={{ opacity: 0, scale: 0.86, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              className="relative mt-3 flex items-center gap-3 rounded-2xl bg-[#7EC8BC]/14 px-4 py-3 ring-1 ring-[#7EC8BC]/35"
            >
              <ShieldCheck className="size-5 text-[#9ED9CF]" />
              <div>
                <p className="text-sm font-medium text-[#9ED9CF]">Blocked before sending</p>
                <p className="text-xs text-white/55">Human approval required · Finance notified</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
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
    <div className="rounded-xl bg-white/6 px-3 py-2 ring-1 ring-white/10">
      <p className="text-[10px] uppercase tracking-[0.14em] text-white/50">{label}</p>
      <p className={`mt-1 font-mono text-sm ${warn ? "text-[#F0A39A]" : "text-white"}`}>{value}</p>
    </div>
  );
}
