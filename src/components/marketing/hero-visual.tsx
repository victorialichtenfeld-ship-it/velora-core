"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

type Stage = "send" | "scan" | "match" | "held";

const nodes = [
  { x: 48, y: 210, r: 3.2 },
  { x: 118, y: 92, r: 2.4 },
  { x: 128, y: 318, r: 2.6 },
  { x: 188, y: 168, r: 2.8 },
  { x: 198, y: 262, r: 2.5 },
  { x: 252, y: 210, r: 5.5, core: true },
  { x: 318, y: 118, r: 2.7 },
  { x: 332, y: 292, r: 2.4 },
  { x: 392, y: 78, r: 3.4, paid: true },
  { x: 428, y: 210, r: 3.2, bank: true },
  { x: 372, y: 348, r: 2.2 },
];

const traces: [number, number, number, number][] = [
  [48, 210, 188, 168],
  [48, 210, 198, 262],
  [118, 92, 188, 168],
  [128, 318, 198, 262],
  [188, 168, 252, 210],
  [198, 262, 252, 210],
  [252, 210, 318, 118],
  [252, 210, 332, 292],
  [252, 210, 428, 210],
  [318, 118, 392, 78],
  [318, 118, 428, 210],
  [332, 292, 428, 210],
  [332, 292, 372, 348],
];

export function CashScene() {
  const [stage, setStage] = useState<Stage>("send");
  const [cycle, setCycle] = useState(0);
  const reduce = useReducedMotion();
  const view = reduce ? "held" : stage;
  const held = view === "held";
  const scanning = view === "scan" || view === "match";
  const packetX = held ? 52 : view === "match" ? 42 : scanning ? 24 : 6;

  useEffect(() => {
    if (reduce) return;
    const sequence: { stage: Stage; at: number }[] = [
      { stage: "send", at: 0 },
      { stage: "scan", at: 800 },
      { stage: "match", at: 2100 },
      { stage: "held", at: 3400 },
    ];
    let timers: number[] = [];
    const run = () => {
      timers.forEach(clearTimeout);
      timers = sequence.map(({ stage: next, at }) => window.setTimeout(() => setStage(next), at));
    };
    run();
    const loop = window.setInterval(() => {
      setCycle((n) => n + 1);
      run();
    }, 6800);
    return () => {
      timers.forEach(clearTimeout);
      clearInterval(loop);
    };
  }, [reduce]);

  return (
    <div className="ai-field relative mx-auto aspect-[6/5] w-full max-w-[560px] overflow-hidden">
      <div className="ai-floor" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgb(176_137_58_/_0.16),transparent_62%)] animate-gold-breathe" />

      <svg viewBox="0 0 480 420" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id="traceGold" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7A6328" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#B0893A" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#7A6328" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        {traces.map(([x1, y1, x2, y2], i) => (
          <line
            key={`${x1}-${y1}-${x2}-${y2}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="url(#traceGold)"
            strokeWidth={held && i === 8 ? 1.8 : 1}
            className={reduce ? "" : "animate-wire"}
            style={{ animationDelay: `${i * 0.12}s` }}
            opacity={held && i === 8 ? 0.25 : 0.9}
          />
        ))}
        {nodes.map((node) => (
          <circle
            key={`${node.x}-${node.y}`}
            cx={node.x}
            cy={node.y}
            r={node.r}
            fill={node.core ? "#B0893A" : "#C4A86A"}
            className={reduce ? undefined : "animate-node"}
            opacity={node.bank && held ? 0.25 : node.core ? 1 : 0.75}
            style={{ animationDelay: `${node.x / 400}s` }}
          />
        ))}
        <circle cx="392" cy="78" r="14" fill="none" stroke="#B0893A" strokeWidth="0.8" opacity="0.45" />
      </svg>

      {scanning && !reduce ? <div className="ai-scan" /> : null}

      <p className="absolute top-[12%] right-[8%] text-right">
        <span className="block text-[9px] uppercase tracking-[0.2em] text-gold/55">Settled</span>
        <span className="font-figure text-sm text-gold/80">ACH-4410</span>
      </p>
      <p className="absolute right-[6%] top-1/2 -translate-y-1/2 text-[9px] uppercase tracking-[0.2em] text-gold/40">
        {held ? "Bank closed" : "Bank"}
      </p>

      <AnimatePresence>
        {!held ? (
          <motion.div
            key={`pkt-${cycle}`}
            className="absolute top-1/2 -translate-y-1/2"
            initial={false}
            animate={{ left: `${packetX}%` }}
            style={{ left: `${packetX}%` }}
            transition={{ type: "spring", stiffness: 70, damping: 18 }}
          >
            <div className="gold-chip">
              <p className="font-figure text-[13px] leading-none text-gold">ACH-4418</p>
              <p className="mt-1 text-[8px] uppercase tracking-[0.16em] text-gold/70">
                {view === "match" ? "Duplicate 99.4" : scanning ? "Inferring" : "On the rail"}
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <p className="text-[9px] uppercase tracking-[0.28em] text-gold/70">
          {held ? "Held before the bank" : scanning ? "Matching Apex ACH-4410" : "Apex Logistics"}
        </p>
        <p className="font-figure money-sheen mt-2 text-[2.8rem] leading-none tracking-[-0.055em] sm:text-[3.4rem]">
          $11,240
        </p>
        {held ? (
          <motion.p
            key={`hold-${cycle}`}
            initial={reduce ? false : { y: 8 }}
            animate={{ y: 0 }}
            className="mt-3 text-[11px] uppercase tracking-[0.28em] text-gold"
          >
            Model hold · duplicate ACH
          </motion.p>
        ) : (
          <p className="mt-3 font-mono text-[10px] tracking-[0.14em] text-gold/50">
            {scanning ? "velora.infer · live" : "velora.watch · rail"}
          </p>
        )}
      </div>

      <span className="ai-corner left-3 top-3 border-t border-l" />
      <span className="ai-corner right-3 top-3 border-t border-r" />
      <span className="ai-corner bottom-3 left-3 border-b border-l" />
      <span className="ai-corner right-3 bottom-3 border-b border-r" />
    </div>
  );
}

export function HeroVisual() {
  return <CashScene />;
}
