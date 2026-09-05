"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Lock } from "lucide-react";
import { SampleDataBadge } from "@/components/sample-data-badge";

type Stage = "draft" | "scan" | "detect" | "alert" | "held";

const coins = [
  { left: "58%", delay: "0s" },
  { left: "66%", delay: "0.18s" },
  { left: "74%", delay: "0.32s" },
  { left: "62%", delay: "0.48s" },
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
        new Date().toLocaleTimeString("en-GB", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" })
      );
    }, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (reduce) return;
    const sequence: { stage: Stage; at: number }[] = [
      { stage: "draft", at: 0 },
      { stage: "scan", at: 550 },
      { stage: "detect", at: 1700 },
      { stage: "alert", at: 2700 },
      { stage: "held", at: 3800 },
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

  return (
    <a
      href="#demo"
      className={`gold-run-border gold-glow relative mx-auto block w-full max-w-[540px] overflow-hidden rounded-lg p-5 sm:p-6 ${
        reduce ? "" : "animate-float"
      }`}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px gold-hairline" />
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <p className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.22em] text-gold">
            <span className="size-1.5 rounded-full bg-gold shadow-[0_0_10px_rgb(201_168_106_/_1)] animate-gold-breathe" />
            Live cash rail
          </p>
          <p className="mt-1 text-sm text-foreground">Meridian Supply · outbound ACH</p>
        </div>
        <div className="text-right">
          <p className="font-figure text-[13px] tabular-nums text-gold">{clock}</p>
          <div className="mt-1.5 flex justify-end">
            <SampleDataBadge />
          </div>
        </div>
      </div>

      <div className="relative">
        <svg className="absolute top-[42px] left-4 right-16 h-16 overflow-visible" aria-hidden="true">
          <line
            x1="8"
            y1="8"
            x2="92%"
            y2="8"
            stroke="#C9A86A"
            strokeWidth="1.4"
            className={scanning || flagged ? "animate-wire" : ""}
            strokeDasharray="8 8"
            opacity="0.85"
          />
          <line
            x1="8"
            y1="56"
            x2={held ? "58%" : "92%"}
            y2="56"
            stroke="#C9A86A"
            strokeWidth="1.6"
            className={scanning || !held ? "animate-wire" : ""}
            strokeDasharray="8 8"
            opacity="0.95"
          />
        </svg>

        <PaymentChip
          label="ACH-4410"
          amount="$11,240"
          x={reduce ? 168 : viewStage === "draft" ? 0 : 168}
          status="Cleared"
          dim
        />
        <div className="relative mt-3">
          {scanning ? (
            <>
              <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 scan-wash animate-scan" />
              <div className="pointer-events-none absolute inset-x-0 top-0 z-10 scan-beam animate-scan" />
            </>
          ) : null}
          <PaymentChip
            label="ACH-4418"
            amount="$11,240"
            x={held ? 72 : flagged ? 118 : scanning ? 84 : 0}
            status={held ? "Held" : flagged ? "Duplicate" : scanning ? "Scanning" : "Queued"}
            danger={flagged && !held}
            held={held}
          />
        </div>

        <AnimatePresence>
          {held ? (
            <motion.div
              key="gate"
              initial={reduce ? false : { scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="animate-vault absolute top-[86px] right-6 z-20 flex size-11 items-center justify-center rounded-full bg-gold text-primary-foreground"
            >
              <span className="absolute inset-0 rounded-full bg-gold animate-pulse-ring" />
              <Lock className="relative size-4" />
              {coins.map((coin) => (
                <span
                  key={coin.left}
                  className="animate-coin pointer-events-none absolute font-figure text-gold"
                  style={{ left: coin.left, top: "-8px", animationDelay: coin.delay }}
                >
                  $
                </span>
              ))}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <div className="mt-6 border-t border-gold/30 pt-4">
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-gold/80">
          {held ? "Locked in the vault" : flagged ? "Same vendor · same dollars · 15 hrs" : "Matching paid history"}
        </p>
        <motion.p
          key={viewStage}
          initial={reduce ? false : { scale: 0.96 }}
          animate={{ scale: 1 }}
          className="money-sheen mt-2 font-figure text-4xl tracking-[-0.04em]"
        >
          $11,240
        </motion.p>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-gold/20">
          <motion.div
            className="h-full bg-gold shadow-[0_0_12px_rgb(201_168_106_/_0.8)]"
            animate={{ width: held ? "100%" : flagged ? "68%" : scanning ? "38%" : "12%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <AnimatePresence>
          {held ? (
            <motion.p
              key="stamp"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              className="animate-hold-stamp mt-2 inline-block rounded-sm border border-gold/60 bg-gold/10 px-2 py-0.5 text-[11px] font-medium tracking-[0.16em] text-gold uppercase"
            >
              Cash held
            </motion.p>
          ) : (
            <p className="mt-2 text-xs text-gold/70">
              {flagged ? "Would have left the account today." : "Second ACH is in the rail."}
            </p>
          )}
        </AnimatePresence>
      </div>

      <p className="mt-4 text-[11px] tracking-[0.06em] text-gold">Watch the hold from evidence to decision →</p>
    </a>
  );
}

function PaymentChip({
  label,
  amount,
  x,
  status,
  dim,
  danger,
  held,
}: {
  label: string;
  amount: string;
  x: number;
  status: string;
  dim?: boolean;
  danger?: boolean;
  held?: boolean;
}) {
  return (
    <motion.div
      animate={{ x }}
      transition={{ type: "spring", stiffness: 140, damping: 16 }}
      className={`relative z-10 w-[min(70%,220px)] rounded-md px-3 py-2 ring-1 ${
        held
          ? "bg-gold/25 ring-gold/70"
          : danger
            ? "bg-gold/15 ring-gold/55 animate-gold-breathe"
            : dim
              ? "bg-background/80 ring-gold/35"
              : "bg-card ring-gold/40"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="font-figure text-sm text-gold">{label}</p>
        <p className="text-[10px] tracking-[0.08em] uppercase text-gold">{status}</p>
      </div>
      <p className="money-sheen mt-1 font-figure text-lg tracking-[-0.03em]">{amount}</p>
    </motion.div>
  );
}
