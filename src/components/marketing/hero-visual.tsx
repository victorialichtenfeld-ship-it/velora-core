"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Lock } from "lucide-react";
import { SampleDataBadge } from "@/components/sample-data-badge";

type Stage = "draft" | "scan" | "detect" | "alert" | "held";

const coins = [
  { left: "52%", delay: "0s" },
  { left: "64%", delay: "0.14s" },
  { left: "76%", delay: "0.28s" },
  { left: "58%", delay: "0.42s" },
];

export function HeroVisual() {
  const [stage, setStage] = useState<Stage>("draft");
  const [clock, setClock] = useState("09:17:04");
  const reduce = useReducedMotion();
  const viewStage = reduce ? "held" : stage;
  const flagged = viewStage === "detect" || viewStage === "alert" || viewStage === "held";
  const scanning = viewStage === "scan" || viewStage === "detect";
  const held = viewStage === "held";

  useEffect(() => {
    const id = window.setInterval(() => {
      setClock(
        new Date().toLocaleTimeString("en-US", {
          timeZone: "America/New_York",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    }, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (reduce) return;
    const sequence: { stage: Stage; at: number }[] = [
      { stage: "draft", at: 0 },
      { stage: "scan", at: 450 },
      { stage: "detect", at: 1400 },
      { stage: "alert", at: 2300 },
      { stage: "held", at: 3200 },
    ];
    let timers: number[] = [];
    const run = () => {
      timers.forEach(clearTimeout);
      timers = sequence.map(({ stage: next, at }) => window.setTimeout(() => setStage(next), at));
    };
    run();
    const loop = window.setInterval(run, 5400);
    return () => {
      timers.forEach(clearTimeout);
      clearInterval(loop);
    };
  }, [reduce]);

  return (
    <a
      href="#demo"
      className={`gold-run-border gold-glow desk-card relative mx-auto block w-full max-w-[540px] overflow-hidden rounded-sm p-5 sm:p-6 ${
        reduce ? "" : "animate-float"
      }`}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px gold-hairline" />
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.24em] text-gold">
            <span className="size-1.5 rounded-full bg-gold animate-flash" />
            Velora cash desk
          </p>
          <p className="mt-1 text-sm text-foreground">NY ACH gate · Meridian Supply</p>
        </div>
        <div className="text-right">
          <p className="font-figure text-[13px] tabular-nums text-gold">{clock} ET</p>
          <div className="mt-1.5 flex justify-end">
            <SampleDataBadge />
          </div>
        </div>
      </div>

      <div className="mb-4 overflow-hidden rounded-sm bg-background/70 ring-1 ring-gold/25">
        <div className="flex items-center justify-between px-3 pt-2">
          <p className="text-[9px] uppercase tracking-[0.18em] text-gold/70">Cash held · 6w</p>
          <p className="font-figure text-[11px] text-gold">▲ $184,320</p>
        </div>
        <svg viewBox="0 0 240 46" className="h-12 w-full" aria-hidden="true">
          <polyline
            fill="none"
            stroke="#B0893A"
            strokeWidth="1.7"
            points="0,40 18,38 36,36 54,30 72,32 90,24 108,26 126,16 144,18 162,10 180,12 198,7 216,8 240,4"
            className={reduce ? "" : "animate-spark"}
          />
        </svg>
      </div>

      <div className="relative space-y-2">
        <svg className="pointer-events-none absolute top-5 left-3 right-16 h-[88px] overflow-visible" aria-hidden="true">
          <line
            x1="0"
            y1="8"
            x2="100%"
            y2="8"
            stroke="#B0893A"
            strokeWidth="1.2"
            className={scanning || flagged ? "animate-wire" : ""}
            strokeDasharray="6 6"
            opacity="0.55"
          />
          <line
            x1="0"
            y1="52"
            x2={held ? "62%" : "100%"}
            y2="52"
            stroke="#B0893A"
            strokeWidth="1.5"
            className={scanning || !held ? "animate-wire" : ""}
            strokeDasharray="6 6"
            opacity="0.9"
          />
        </svg>

        <BlotterRow label="ACH-4410" amount="$11,240" status="Cleared" dim x={reduce ? 0 : viewStage === "draft" ? 0 : 28} />
        <div className="relative">
          {scanning ? (
            <>
              <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-12 scan-wash animate-scan" />
              <div className="pointer-events-none absolute inset-x-0 top-0 z-10 scan-beam animate-scan" />
            </>
          ) : null}
          <BlotterRow
            label="ACH-4418"
            amount="$11,240"
            status={held ? "Held" : flagged ? "Duplicate" : scanning ? "Scanning" : "Queued"}
            hot={flagged && !held}
            held={held}
            pulse
            x={held ? 0 : flagged ? 18 : scanning ? 10 : 0}
          />
        </div>
        <BlotterRow label="WIRE-2204" amount="$8,400" status="Queued" dim />

        <AnimatePresence>
          {held ? (
            <motion.div
              key="gate"
              initial={reduce ? false : { scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="animate-vault absolute top-[46px] right-3 z-20 flex size-11 items-center justify-center rounded-full bg-gold text-primary-foreground"
            >
              <span className="absolute inset-0 rounded-full bg-gold animate-pulse-ring" />
              <Lock className="relative size-4" />
              {coins.map((coin) => (
                <span
                  key={coin.left}
                  className="animate-coin pointer-events-none absolute font-figure text-gold"
                  style={{ left: coin.left, top: "-10px", animationDelay: coin.delay }}
                >
                  $
                </span>
              ))}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <div className="mt-5 border-t border-gold/30 pt-4">
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-gold/80">
          {held ? "Locked in the vault" : flagged ? "Same vendor · same dollars · 15 hrs" : "Matching paid history"}
        </p>
        <motion.p
          key={viewStage}
          initial={reduce ? false : { scale: 0.96 }}
          animate={{ scale: 1 }}
          className="money-sheen mt-1 font-figure text-5xl tracking-[-0.05em]"
        >
          $11,240
        </motion.p>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-gold/20">
          <motion.div
            className="h-full bg-gold shadow-[0_0_8px_rgb(176_137_58_/_0.4)]"
            animate={{ width: held ? "100%" : flagged ? "68%" : scanning ? "38%" : "12%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <AnimatePresence>
          {held ? (
            <motion.p
              key="stamp"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              className="animate-hold-stamp mt-2 inline-block rounded-sm border border-gold/50 bg-gold/10 px-2 py-0.5 text-[11px] font-medium tracking-[0.18em] text-gold uppercase"
            >
              Cash held
            </motion.p>
          ) : (
            <p className="mt-2 text-xs text-gold/75">
              {flagged ? "Would have hit the wire today." : "Second ACH is in the rail."}
            </p>
          )}
        </AnimatePresence>
      </div>

      <p className="mt-4 text-[11px] tracking-[0.08em] uppercase text-gold">Open the blotter →</p>
    </a>
  );
}

function BlotterRow({
  label,
  amount,
  status,
  dim,
  hot,
  held,
  pulse,
  x = 0,
}: {
  label: string;
  amount: string;
  status: string;
  dim?: boolean;
  hot?: boolean;
  held?: boolean;
  pulse?: boolean;
  x?: number;
}) {
  return (
    <motion.div
      animate={{ x }}
      transition={{ type: "spring", stiffness: 150, damping: 16 }}
      className={`relative z-10 flex items-center justify-between gap-3 rounded-sm px-3 py-2 ring-1 ${
        held
          ? "bg-gold/20 ring-gold/70"
          : hot
            ? "animate-blotter bg-gold/12 ring-gold/55"
            : dim
              ? "bg-background/70 ring-gold/25"
              : "bg-card ring-gold/35"
      } ${pulse && !held && !hot ? "animate-gold-breathe" : ""}`}
    >
      <p className="font-figure text-sm text-gold">{label}</p>
      <p className="money-sheen font-figure text-sm">{amount}</p>
      <p className="w-16 text-right text-[10px] tracking-[0.12em] uppercase text-gold">{status}</p>
    </motion.div>
  );
}
