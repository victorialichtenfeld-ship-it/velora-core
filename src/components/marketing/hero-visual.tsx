"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SampleDataBadge } from "@/components/sample-data-badge";

const stages = ["draft", "scan", "detect", "alert", "held"] as const;
type Stage = (typeof stages)[number];

export function HeroVisual() {
  const [stage, setStage] = useState<Stage>("draft");

  useEffect(() => {
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
  }, []);

  const flagged = stage === "detect" || stage === "alert" || stage === "held";

  return (
    <a
      href="#demo"
      className="product-frame mx-auto block w-full max-w-[540px] rounded-xl p-4 ring-1 ring-border sm:p-5"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
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

      <div className="relative overflow-hidden rounded-lg bg-background p-4 ring-1 ring-border">
        {(stage === "scan" || stage === "detect") && (
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-10 bg-primary/35 animate-scan" />
        )}
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs text-muted-foreground">Apex Logistics · ACH-4418</p>
            <p className="mt-1 text-lg font-medium">Duplicate vendor payment</p>
          </div>
          {stage === "held" ? (
            <span className="rounded-md bg-protect/15 px-2 py-1 text-[11px] font-medium text-protect">Held</span>
          ) : flagged ? (
            <span className="rounded-md bg-risk/15 px-2 py-1 text-[11px] font-medium text-risk">Duplicate</span>
          ) : (
            <span className="rounded-md bg-muted px-2 py-1 text-[11px] font-medium text-muted-foreground">Scanning</span>
          )}
        </div>
        <dl className="mt-4 grid grid-cols-3 gap-2 text-sm">
          <Metric label="First ACH" value="$11,240" />
          <Metric label="Second ACH" value="$11,240" warn={flagged} />
          <Metric label="Window" value="15 hrs" />
        </dl>
      </div>

      <AnimatePresence>
        {flagged ? (
          <motion.div
            key="match"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-3 rounded-lg bg-background p-4 ring-1 ring-border"
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">Match</p>
            <p className="mt-1 text-sm">Same vendor, same amount, already cleared as ACH-4410.</p>
            <p
              className={`mt-3 font-mono text-2xl tabular ${
                stage === "held" ? "text-protect" : "text-risk"
              }`}
            >
              $11,240
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {stage === "held" ? "Held before it left the account" : "Would have left the account today"}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <p className="mt-3 text-xs text-primary">Walk this alert from evidence to decision →</p>
    </a>
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
    <div className="rounded-md bg-card px-2.5 py-2 ring-1 ring-border">
      <p className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground">{label}</p>
      <p className={`mt-1 font-mono text-sm tabular ${warn ? "text-risk" : "text-foreground"}`}>{value}</p>
    </div>
  );
}
