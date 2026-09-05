"use client";

import { AnimatePresence, motion } from "motion/react";
import { Lock } from "lucide-react";
import { SampleDataBadge } from "@/components/sample-data-badge";
import { holdCopy, type HoldStage } from "@/lib/hold-loop";

function StatusChip({ stage }: { stage: HoldStage }) {
  if (stage === "held") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-2.5 py-1 text-[11px] font-medium text-foreground">
        <Lock className="size-3" />
        Held
      </span>
    );
  }
  if (stage === "match") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-[11px] font-medium text-foreground">
        Duplicate · 99.4%
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
      In flight
    </span>
  );
}

export function CashScene({
  stage,
  cycle,
  reduce,
}: {
  stage: HoldStage;
  cycle: number;
  reduce: boolean | null;
}) {
  const held = stage === "held";
  const matching = stage === "match";
  const progress = held ? 100 : matching ? 74 : 24;

  return (
    <div className="relative mx-auto w-full max-w-[540px]">
      <div className="product-panel">
        <div className="flex items-center justify-between border-b border-border px-6 py-3">
          <p className="text-[12px] font-medium">Velora · Meridian Supply</p>
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-gold" />
            <span className="text-[11px] text-muted-foreground">Live review</span>
            <SampleDataBadge />
          </div>
        </div>

        <div className="p-6 sm:p-7">
          <p className="text-[12px] text-muted-foreground">Apex Logistics</p>
          <p className="font-figure mt-1 text-[2.85rem] leading-none tracking-[-0.045em] text-foreground sm:text-[3.3rem]">
            $11,240
          </p>

          <div className="mt-8">
            <div className="flex items-center justify-between gap-3 border-b border-border py-3.5">
              <div>
                <p className="text-[13px] font-medium">ACH-4410</p>
                <p className="mt-0.5 text-[12px] text-muted-foreground">Yesterday, 4:12 PM</p>
              </div>
              <span className="text-[12px] text-muted-foreground">Settled</span>
            </div>

            <div
              className={`flex items-center justify-between gap-3 py-3.5 ${
                matching || held ? "rounded-lg bg-muted px-3" : ""
              }`}
            >
              <div>
                <p className="text-[13px] font-medium">ACH-4418</p>
                <p className="mt-0.5 text-[12px] text-muted-foreground">15 hours later · same amount</p>
              </div>
              <AnimatePresence mode="wait">
                <motion.span
                  key={stage}
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduce ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="inline-flex"
                >
                  <StatusChip stage={stage} />
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-6 h-px overflow-hidden bg-border">
            <motion.div
              className="h-full bg-gold"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          <p className="mt-4 text-[13px] leading-6 text-muted-foreground">{holdCopy[stage]}</p>
        </div>

        <AnimatePresence>
          {held ? (
            <motion.div
              key={`banner-${cycle}`}
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-between gap-3 border-t border-border px-6 py-3.5"
            >
              <p className="text-[13px] font-medium">Held before the bank</p>
              <p className="text-[12px] text-muted-foreground">Will not leave the account</p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
