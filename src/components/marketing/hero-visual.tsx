"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Lock } from "lucide-react";

type Stage = "send" | "scan" | "match" | "held";

const bolts = Array.from({ length: 20 }, (_, i) => (i / 20) * Math.PI * 2 - Math.PI / 2);
const ticks = Array.from({ length: 60 }, (_, i) => i);
const dust = [
  { x: "6%", y: "18%", d: "0s", s: 1 },
  { x: "92%", y: "22%", d: "1.1s", s: 1.4 },
  { x: "10%", y: "72%", d: "0.4s", s: 0.8 },
  { x: "88%", y: "68%", d: "1.8s", s: 1.2 },
  { x: "48%", y: "4%", d: "0.9s", s: 1 },
  { x: "70%", y: "90%", d: "2.2s", s: 0.9 },
  { x: "28%", y: "92%", d: "1.5s", s: 1.1 },
];

function VaultWheel({ turning }: { turning: boolean }) {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="spokeGold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C4A86A" />
          <stop offset="45%" stopColor="#B0893A" />
          <stop offset="100%" stopColor="#7A6328" />
        </linearGradient>
      </defs>
      {[0, 120, 240].map((deg) => (
        <g key={deg} transform={`rotate(${deg} 100 100)`}>
          <rect x="91" y="12" width="18" height="40" rx="9" fill="url(#spokeGold)" opacity="0.92" />
          <rect x="96" y="16" width="8" height="32" rx="4" fill="#0a0907" opacity="0.35" />
        </g>
      ))}
      <circle cx="100" cy="100" r="54" fill="none" stroke="#B0893A" strokeWidth="2.6" opacity={turning ? 0.9 : 0.55} />
      <circle cx="100" cy="100" r="48" fill="none" stroke="#7A6328" strokeWidth="1" opacity="0.75" />
    </svg>
  );
}

export function CashScene() {
  const [stage, setStage] = useState<Stage>("send");
  const [cycle, setCycle] = useState(0);
  const reduce = useReducedMotion();
  const view = reduce ? "held" : stage;
  const held = view === "held";
  const scanning = view === "scan" || view === "match";
  const orbit = held ? 210 : view === "match" ? 158 : scanning ? 98 : 18;
  const wheel = held ? 28 : scanning ? 110 : view === "send" ? 8 : 55;

  useEffect(() => {
    if (reduce) return;
    const sequence: { stage: Stage; at: number }[] = [
      { stage: "send", at: 0 },
      { stage: "scan", at: 900 },
      { stage: "match", at: 2300 },
      { stage: "held", at: 3600 },
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
    }, 7200);
    return () => {
      timers.forEach(clearTimeout);
      clearInterval(loop);
    };
  }, [reduce]);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[540px]">
      <div className="absolute inset-[-22%] rounded-full vault-halo animate-gold-breathe" />
      <div className="absolute inset-[-8%] rounded-full vault-halo-core" />

      {dust.map((speck) => (
        <span
          key={`${speck.x}-${speck.y}`}
          className="animate-mote absolute rounded-full bg-gold"
          style={{
            left: speck.x,
            top: speck.y,
            width: speck.s * 3,
            height: speck.s * 3,
            animationDelay: speck.d,
            boxShadow: "0 0 10px rgb(176 137 58 / 0.55)",
          }}
        />
      ))}

      <div className="vault-rim absolute inset-0">
        <div className="vault-face absolute inset-[13px] sm:inset-[16px]">
          <svg viewBox="0 0 200 200" className="pointer-events-none absolute inset-0 animate-spin-rev" aria-hidden="true">
            {ticks.map((i) => {
              const a = (i / 60) * Math.PI * 2 - Math.PI / 2;
              const major = i % 5 === 0;
              const inner = major ? 82 : 88;
              return (
                <line
                  key={i}
                  x1={100 + Math.cos(a) * inner}
                  y1={100 + Math.sin(a) * inner}
                  x2={100 + Math.cos(a) * 94}
                  y2={100 + Math.sin(a) * 94}
                  stroke="#B0893A"
                  strokeWidth={major ? 1.6 : 0.55}
                  opacity={major ? 0.8 : 0.28}
                />
              );
            })}
          </svg>

          <svg viewBox="0 0 200 200" className="pointer-events-none absolute inset-[6%] animate-spin-slow" aria-hidden="true">
            <defs>
              <path id="vaultLegend" d="M100,16 A84,84 0 1 1 99.99,16" />
            </defs>
            <text fill="#B0893A" fontSize="6.2" letterSpacing="3.2" opacity="0.72">
              <textPath href="#vaultLegend">MERIDIAN SUPPLY · PRIVATE HOLD · VELORA CASH VAULT ·</textPath>
            </text>
          </svg>

          <motion.div
            className="absolute inset-[12%]"
            animate={{ rotate: reduce ? 28 : wheel }}
            transition={{ type: "spring", stiffness: 48, damping: 18 }}
          >
            <VaultWheel turning={scanning} />
          </motion.div>

          {scanning ? (
            <div className="pointer-events-none absolute inset-[10%] overflow-hidden rounded-full">
              <div className="scan-wash animate-scan absolute inset-x-0 top-0 h-20" />
            </div>
          ) : null}

          <div className="vault-well absolute inset-[32%] flex flex-col items-center justify-center text-center">
            <AnimatePresence>
              {held ? (
                <motion.div
                  key={`lock-${cycle}`}
                  initial={reduce ? false : { scale: 0.5, y: 8 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 16 }}
                  className="relative mb-2.5 flex size-12 items-center justify-center rounded-full bg-gold text-primary-foreground sm:mb-3 sm:size-14"
                >
                  <span className="absolute size-12 rounded-full bg-gold animate-pulse-ring sm:size-14" />
                  <Lock className="relative size-5 sm:size-6" />
                </motion.div>
              ) : null}
            </AnimatePresence>
            <p className="font-figure money-sheen text-[2.7rem] leading-none tracking-[-0.055em] sm:text-[3.35rem]">
              $11,240
            </p>
            <p className="mt-2.5 text-[9px] uppercase tracking-[0.28em] text-gold/80 sm:mt-3 sm:text-[10px]">
              {held ? "Locked before the bank" : scanning ? "Matching Apex ACH-4410" : "Apex Logistics"}
            </p>
          </div>
        </div>

        <div className="absolute inset-[7px]">
          {bolts.map((angle, i) => (
            <span
              key={i}
              className="vault-bolt absolute"
              style={{
                left: `${50 + Math.cos(angle) * 50}%`,
                top: `${50 + Math.sin(angle) * 50}%`,
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}
        </div>
      </div>

      {held && !reduce ? (
        <motion.div
          key={`flash-${cycle}`}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.85, ease: "easeOut" }}
          className="pointer-events-none absolute inset-[-4%] rounded-full bg-[radial-gradient(circle,rgb(176_137_58_/_0.4),transparent_58%)]"
        />
      ) : null}

      <AnimatePresence>
        {!held ? (
          <motion.div
            key={`packet-${cycle}`}
            className="absolute inset-[2%]"
            initial={false}
            animate={{ rotate: orbit }}
            exit={{ scale: 0.2, rotate: orbit + 40 }}
            transition={{ type: "spring", stiffness: 55, damping: 16 }}
          >
            <div className="gold-chip absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="font-figure text-[13px] leading-none text-gold sm:text-[15px]">ACH-4418</p>
              <p className="mt-1 text-[8px] uppercase tracking-[0.18em] text-gold/70">
                {view === "match" ? "Duplicate" : scanning ? "Scanning" : "On the rail"}
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function HeroVisual() {
  return <CashScene />;
}
