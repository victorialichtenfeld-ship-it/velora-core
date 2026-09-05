"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

type Stage = "send" | "scan" | "match" | "held";

const nodes = [
  { x: 36, y: 210, r: 3 },
  { x: 88, y: 74, r: 2.2 },
  { x: 96, y: 338, r: 2.3 },
  { x: 128, y: 168, r: 2.6 },
  { x: 136, y: 268, r: 2.4 },
  { x: 188, y: 108, r: 2.5 },
  { x: 196, y: 312, r: 2.3 },
  { x: 240, y: 210, r: 6.2, core: true },
  { x: 284, y: 96, r: 2.5 },
  { x: 292, y: 324, r: 2.4 },
  { x: 336, y: 160, r: 2.6 },
  { x: 348, y: 268, r: 2.3 },
  { x: 392, y: 64, r: 3.2, paid: true },
  { x: 444, y: 210, r: 3.4, bank: true },
  { x: 400, y: 360, r: 2.1 },
];

const traces: [number, number, number, number][] = [
  [36, 210, 128, 168],
  [36, 210, 136, 268],
  [88, 74, 128, 168],
  [88, 74, 188, 108],
  [96, 338, 136, 268],
  [96, 338, 196, 312],
  [128, 168, 240, 210],
  [136, 268, 240, 210],
  [188, 108, 240, 210],
  [196, 312, 240, 210],
  [240, 210, 284, 96],
  [240, 210, 292, 324],
  [240, 210, 336, 160],
  [240, 210, 348, 268],
  [240, 210, 444, 210],
  [284, 96, 392, 64],
  [336, 160, 392, 64],
  [336, 160, 444, 210],
  [348, 268, 444, 210],
  [292, 324, 400, 360],
];

const pulses = traces.filter((_, i) => i % 2 === 0).slice(0, 8);

const thoughts = [
  "vendor == Apex Logistics",
  "amount == $11,240",
  "window == 15h",
  "ACH-4418 ≈ ACH-4410",
  "duplicate = 0.994",
];

const stream = ["ACH", "4418", "11240", "APEX", "QBK", "STRIPE", "DUP", "HOLD", "0.994", "15H"];

export function CashScene() {
  const [stage, setStage] = useState<Stage>("send");
  const [cycle, setCycle] = useState(0);
  const [thought, setThought] = useState(0);
  const reduce = useReducedMotion();
  const view = reduce ? "held" : stage;
  const held = view === "held";
  const scanning = view === "scan" || view === "match";
  const packetX = held ? 50 : view === "match" ? 40 : scanning ? 22 : 5;
  const score = held || view === "match" ? 99.4 : scanning ? 64.1 : 18.6;

  useEffect(() => {
    if (reduce) return;
    const sequence: { stage: Stage; at: number }[] = [
      { stage: "send", at: 0 },
      { stage: "scan", at: 700 },
      { stage: "match", at: 2000 },
      { stage: "held", at: 3300 },
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
    }, 6400);
    return () => {
      timers.forEach(clearTimeout);
      clearInterval(loop);
    };
  }, [reduce]);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setThought((n) => (n + 1) % thoughts.length), 900);
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <div className="ai-field relative mx-auto aspect-[6/5] w-full max-w-[560px] overflow-hidden">
      <div className="ai-floor" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgb(176_137_58_/_0.2),transparent_60%)] animate-gold-breathe" />

      {!reduce ? (
        <div className="pointer-events-none absolute top-4 left-3 flex flex-col gap-1 font-mono text-[8px] leading-none text-gold/35">
          {stream.map((token, i) => (
            <span key={token} className="animate-data-fall" style={{ animationDelay: `${i * 0.18}s` }}>
              {token}
            </span>
          ))}
        </div>
      ) : null}

      <svg viewBox="0 0 480 420" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id="traceGold" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7A6328" stopOpacity="0.12" />
            <stop offset="50%" stopColor="#B0893A" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#7A6328" stopOpacity="0.12" />
          </linearGradient>
          <filter id="nodeGlow">
            <feGaussianBlur stdDeviation="1.6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {traces.map(([x1, y1, x2, y2], i) => (
          <line
            key={`${x1}-${y1}-${x2}-${y2}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="url(#traceGold)"
            strokeWidth={held && i === 14 ? 1.2 : 1.05}
            className={reduce ? "" : "animate-wire"}
            style={{ animationDelay: `${i * 0.07}s` }}
            opacity={held && i === 14 ? 0.2 : 0.95}
          />
        ))}
        {!reduce
          ? pulses.map(([x1, y1, x2, y2], i) => (
              <circle key={`p-${i}`} r="2.1" fill="#C4A86A" opacity="0.9">
                <animateMotion
                  dur={`${1.6 + (i % 4) * 0.35}s`}
                  repeatCount="indefinite"
                  path={`M${x1},${y1} L${x2},${y2}`}
                />
              </circle>
            ))
          : null}
        {nodes.map((node) => (
          <g key={`${node.x}-${node.y}`}>
            {node.core ? (
              <circle
                cx={node.x}
                cy={node.y}
                r="18"
                fill="none"
                stroke="#B0893A"
                strokeWidth="0.7"
                className={reduce ? undefined : "animate-core-ping"}
                opacity="0.45"
              />
            ) : null}
            <circle
              cx={node.x}
              cy={node.y}
              r={node.r}
              fill={node.core ? "#B0893A" : "#C4A86A"}
              filter="url(#nodeGlow)"
              className={reduce ? undefined : "animate-node"}
              opacity={node.bank && held ? 0.22 : 1}
              style={{ animationDelay: `${node.x / 480}s` }}
            />
          </g>
        ))}
        <circle cx="392" cy="64" r="16" fill="none" stroke="#B0893A" strokeWidth="0.7" opacity="0.4" />
        {view === "match" || held ? (
          <path
            d="M240 210 Q 316 90 392 64"
            fill="none"
            stroke="#C4A86A"
            strokeWidth="1.4"
            className={reduce ? "" : "animate-wire"}
            opacity="0.85"
          />
        ) : null}
      </svg>

      {!reduce ? (
        <>
          <div className="ai-scan" />
          {scanning ? <div className="ai-scan-y" /> : null}
        </>
      ) : null}

      <p className="absolute top-[10%] right-[7%] text-right">
        <span className="block text-[8px] uppercase tracking-[0.2em] text-gold/50">Settled</span>
        <span className="font-figure text-sm text-gold">ACH-4410</span>
      </p>
      <p className="absolute right-[5%] top-[48%] text-[8px] uppercase tracking-[0.22em] text-gold/40">
        {held ? "Bank closed" : "Bank"}
      </p>

      <AnimatePresence>
        {!held ? (
          <motion.div
            key={`pkt-${cycle}`}
            className="absolute top-[46%] -translate-y-1/2"
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
        <p className="text-[9px] uppercase tracking-[0.28em] text-gold/75">
          {held ? "Held before the bank" : scanning ? "Matching Apex ACH-4410" : "Apex Logistics"}
        </p>
        <p className="font-figure money-sheen mt-2 text-[2.85rem] leading-none tracking-[-0.055em] sm:text-[3.45rem]">
          $11,240
        </p>
        <p className="mt-3 font-mono text-[10px] tracking-[0.12em] text-gold/55">
          conf {score.toFixed(1)} · {held ? "hold" : scanning ? "infer" : "watch"}
        </p>
      </div>

      <div className="absolute right-3 bottom-3 left-3 flex items-end justify-between gap-3">
        <p className="font-mono text-[9px] tracking-[0.08em] text-gold/50">
          {reduce ? thoughts[3] : thoughts[thought]}
        </p>
        <p className="font-mono text-[9px] text-gold/40">velora.model</p>
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
