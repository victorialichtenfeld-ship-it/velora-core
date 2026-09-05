"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Lock } from "lucide-react";
import { SampleDataBadge } from "@/components/sample-data-badge";
import { holdCopy, holdLoopMs, holdSequence, type HoldStage } from "@/lib/hold-loop";

function StatusChip({ stage }: { stage: HoldStage }) {
  if (stage === "held") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-protect px-2.5 py-1 text-[11px] font-medium text-protect-foreground">
        <Lock className="size-3" />
        Held
      </span>
    );
  }
  if (stage === "match") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/12 px-2.5 py-1 text-[11px] font-medium text-gold">
        <span className="size-1.5 rounded-full bg-gold animate-pulse" />
        Duplicate
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-foreground">
      <span className="size-1.5 rounded-full bg-foreground/70 animate-pulse" />
      In flight
    </span>
  );
}

export function CashScene() {
  const [stage, setStage] = useState<HoldStage>("send");
  const [cycle, setCycle] = useState(0);
  const reduce = useReducedMotion();
  const view = reduce ? "held" : stage;
  const held = view === "held";
  const matching = view === "match";
  const progress = held ? 100 : matching ? 74 : 24;

  useEffect(() => {
    if (reduce) return;
    let timers: number[] = [];
    const run = () => {
      timers.forEach(clearTimeout);
      timers = holdSequence.map(({ stage: next, at }) => window.setTimeout(() => setStage(next), at));
    };
    run();
    const loop = window.setInterval(() => {
      setCycle((n) => n + 1);
      run();
    }, holdLoopMs);
    return () => {
      timers.forEach(clearTimeout);
      clearInterval(loop);
    };
  }, [reduce]);

  return (
    <div className="relative mx-auto w-full max-w-[540px]">
      <div className="absolute inset-4 translate-x-4 translate-y-5 rounded-[1.2rem] bg-foreground/10" />
      <div className={`product-panel relative overflow-hidden ${reduce ? "" : "animate-float"}`}>
        <div className="flex items-center justify-between border-b border-border bg-muted/45 px-6 py-3">
          <p className="text-[12px] font-medium">Velora · Meridian Supply</p>
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-protect" />
            <span className="text-[11px] text-muted-foreground">Live review</span>
            <SampleDataBadge />
          </div>
        </div>

        <div className="p-6 sm:p-7">
          <p className="text-[12px] text-muted-foreground">Apex Logistics</p>
          <p className="font-figure money-sheen mt-1 text-[2.85rem] leading-none tracking-[-0.045em] sm:text-[3.3rem]">
            $11,240
          </p>

          <div className="relative mt-8">
            <div className="flex items-center justify-between gap-3 border-b border-border py-3.5">
              <div>
                <p className="text-[13px] font-medium">ACH-4410</p>
                <p className="mt-0.5 text-[12px] text-muted-foreground">Yesterday, 4:12 PM</p>
              </div>
              <span className="text-[12px] text-muted-foreground">Settled</span>
            </div>

            {!reduce && matching ? (
              <span className="pointer-events-none absolute left-[4.6rem] top-[3.15rem] h-8 w-px overflow-hidden">
                <span className="absolute inset-x-0 h-full origin-top bg-gold animate-line-grow" />
              </span>
            ) : null}

            <AnimatePresence mode="wait">
            <motion.div
                key={`row-${cycle}`}
                initial={reduce ? false : { y: 10 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 120, damping: 18 }}
                className={`flex items-center justify-between gap-3 py-3.5 ${
                  matching || held ? "rounded-xl bg-muted/80 px-3 -mx-1" : ""
                }`}
              >
                <div>
                  <p className="text-[13px] font-medium">ACH-4418</p>
                  <p className="mt-0.5 text-[12px] text-muted-foreground">15 hours later · same amount</p>
                </div>
                <StatusChip stage={view} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-6 h-[3px] overflow-hidden rounded-full bg-muted">
            <div
              className="h-full bg-foreground transition-[width] duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.p
              key={view}
              initial={reduce ? false : { y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={reduce ? undefined : { y: -6, opacity: 0 }}
              transition={{ duration: 0.28 }}
              className="mt-4 text-[13px] leading-6 text-muted-foreground"
            >
              {holdCopy[view]}
            </motion.p>
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {held ? (
            <motion.div
              key={`banner-${cycle}`}
              initial={reduce ? false : { y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={reduce ? undefined : { y: 12, opacity: 0 }}
              className="flex items-center justify-between gap-3 border-t border-border bg-foreground px-6 py-3.5 text-primary-foreground"
            >
              <p className="text-[13px] font-medium">Held before the bank</p>
              <p className="text-[12px] text-primary-foreground/70">Will not leave the account</p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function HeroVisual() {
  return <CashScene />;
}
