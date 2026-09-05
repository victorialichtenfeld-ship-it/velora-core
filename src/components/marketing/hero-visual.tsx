"use client";

import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Lock } from "lucide-react";
import { SampleDataBadge } from "@/components/sample-data-badge";
import { holdCopy, type HoldStage } from "@/lib/hold-loop";

function LiveDot({ reduce }: { reduce: boolean | null }) {
  return (
    <span className="relative flex size-2">
      <span className={reduce ? "hidden" : "animate-pulse-ring absolute inset-0 rounded-full bg-gold"} />
      <span className="relative size-2 rounded-full bg-gold" />
    </span>
  );
}

function StatusChip({ stage, reduce }: { stage: HoldStage; reduce: boolean | null }) {
  if (stage === "held") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-gold px-2.5 py-1 text-[11px] font-medium text-gold-foreground">
        <motion.span
          animate={reduce ? undefined : { scale: [1, 1.08, 1] }}
          transition={{ duration: 0.35 }}
          className="inline-flex"
        >
          <Lock className="size-3" />
        </motion.span>
        Held
      </span>
    );
  }
  if (stage === "match") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-2.5 py-1 text-[11px] font-medium text-gold">
        <span className="size-1.5 rounded-full bg-gold animate-status" />
        Duplicate ACH · 99.4%
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
      <LiveDot reduce={reduce} />
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
  const progress = held ? 100 : matching ? 74 : 28;
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-180, 180], [6, -6]), { stiffness: 160, damping: 22 });
  const rotateY = useSpring(useTransform(mx, [-180, 180], [-6, 6]), { stiffness: 160, damping: 22 });

  return (
    <motion.div
      className="relative mx-auto w-full max-w-[540px]"
      style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 920 }}
      onMouseMove={(event) => {
        if (reduce) return;
        const box = event.currentTarget.getBoundingClientRect();
        mx.set(event.clientX - (box.left + box.width / 2));
        my.set(event.clientY - (box.top + box.height / 2));
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      <div className="hero-glow pointer-events-none absolute inset-8 -z-10" />
      <motion.div
        animate={reduce ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="product-panel relative">
          {!reduce ? (
            <span className="animate-rail pointer-events-none absolute top-0 z-20 h-px w-1/4 bg-gold/70" />
          ) : null}

          {!reduce && matching ? (
            <motion.div
              key={`flash-${cycle}`}
              className="pointer-events-none absolute inset-0 z-10 bg-gold/8"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.35 }}
            />
          ) : null}

          <div className="relative z-[2] flex items-center justify-between border-b border-gold/15 bg-gold/[0.06] px-6 py-3">
            <p className="text-[12px] font-medium">Velora · Meridian Supply</p>
            <div className="flex items-center gap-2">
              <LiveDot reduce={reduce} />
              <span className="text-[11px] text-muted-foreground">Payment review</span>
              <SampleDataBadge />
            </div>
          </div>

          <div className="relative z-[2] p-6 sm:p-7">
            <p className="text-[12px] text-muted-foreground">Apex Logistics</p>
            <motion.p
              className="font-figure mt-1 text-[2.85rem] leading-none tracking-[-0.045em] text-gold sm:text-[3.3rem]"
              animate={reduce ? undefined : matching ? { scale: [1, 1.03, 1] } : { scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              $11,240
            </motion.p>

            <div className="relative mt-8">
              <div className="flex items-center justify-between gap-3 border-b border-border py-3.5">
                <div>
                  <p className="text-[13px] font-medium">ACH-4410</p>
                  <p className="mt-0.5 text-[12px] text-muted-foreground">Yesterday, 4:12 PM</p>
                </div>
                <span className="text-[12px] text-muted-foreground">Settled</span>
              </div>

              <span className="pointer-events-none absolute left-[4.6rem] top-[3.15rem] h-8 w-px overflow-hidden">
                <motion.span
                  className="absolute inset-x-0 origin-top bg-gold"
                  initial={false}
                  animate={{ height: matching || held ? "100%" : "18%" }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                />
              </span>

              <motion.div
                className="flex items-center justify-between gap-3 py-3.5"
                animate={
                  matching
                    ? {
                          backgroundColor: "rgb(124 108 255 / 0.22)",
                        borderRadius: 12,
                        paddingLeft: 12,
                        paddingRight: 12,
                        x: reduce ? 0 : [0, -5, 5, 0],
                      }
                    : held
                      ? {
                          backgroundColor: "rgb(124 108 255 / 0.16)",
                          borderRadius: 12,
                          paddingLeft: 12,
                          paddingRight: 12,
                          x: 0,
                        }
                      : {
                          backgroundColor: "rgb(12 14 26 / 0)",
                          borderRadius: 0,
                          paddingLeft: 0,
                          paddingRight: 0,
                          x: 0,
                        }
                }
                transition={{ duration: 0.24 }}
              >
                <div>
                  <p className="text-[13px] font-medium">ACH-4418</p>
                  <p className="mt-0.5 text-[12px] text-muted-foreground">15 hours later · same amount</p>
                </div>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={stage}
                    initial={reduce ? false : { y: 12, scale: 0.88 }}
                    animate={{ y: 0, scale: 1 }}
                    exit={reduce ? undefined : { y: -12, scale: 0.88 }}
                    transition={{ duration: 0.12 }}
                    className="inline-flex"
                  >
                    <StatusChip stage={stage} reduce={reduce} />
                  </motion.span>
                </AnimatePresence>
              </motion.div>
            </div>

            <div className="relative mt-6 h-[3px] overflow-hidden rounded-full bg-muted">
              <motion.div
                className="h-full bg-gold"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>

            <AnimatePresence mode="wait">
              <motion.p
                key={stage}
                initial={reduce ? false : { y: 8 }}
                animate={{ y: 0 }}
                exit={reduce ? undefined : { y: -8 }}
                transition={{ duration: 0.14 }}
                className="mt-4 text-[13px] leading-6 text-gold/80"
              >
                {holdCopy[stage]}
              </motion.p>
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {held ? (
              <motion.div
                key={`banner-${cycle}`}
                initial={reduce ? false : { y: 48 }}
                animate={{ y: 0 }}
                exit={reduce ? undefined : { y: 48 }}
                transition={{ type: "spring", stiffness: 520, damping: 20 }}
                className="relative z-[2] flex items-center justify-between gap-3 border-t border-gold/20 bg-primary px-6 py-3.5 text-primary-foreground"
              >
                <p className="text-[13px] font-medium">Waiting on a person</p>
                <p className="text-[12px] text-primary-foreground/75">Nothing is auto-executed</p>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
