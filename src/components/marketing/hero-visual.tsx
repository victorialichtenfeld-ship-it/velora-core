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
          animate={reduce ? undefined : { rotate: [0, -18, 12, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 0.45 }}
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
  const sending = stage === "send";
  const progress = held ? 100 : matching ? 74 : 28;
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-180, 180], [14, -14]), { stiffness: 220, damping: 14 });
  const rotateY = useSpring(useTransform(mx, [-180, 180], [-14, 14]), { stiffness: 220, damping: 14 });

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
      <div className="hero-glow animate-well pointer-events-none absolute inset-6 -z-10" />
      {!reduce ? (
        <>
          <motion.div
            className="glass absolute -left-3 top-16 z-20 hidden rounded-full px-3 py-1.5 text-[11px] font-medium text-gold lg:block"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            Duplicate ACH · 99.4%
          </motion.div>
          <motion.div
            className="glass absolute -right-2 bottom-28 z-20 hidden rounded-full px-3 py-1.5 text-[11px] font-medium text-gold lg:block"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.55, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
          >
            Flagged · $11,240
          </motion.div>
        </>
      ) : null}
      <motion.div
        animate={reduce ? undefined : { y: [0, -34, 0], rotate: [0, 1.1, 0, -1.1, 0] }}
        transition={{ duration: 1.45, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="product-panel relative">
          {!reduce ? (
            <>
              <span className="animate-rail pointer-events-none absolute top-0 z-20 h-px w-1/3 bg-gold" />
              <span className="animate-rail pointer-events-none absolute bottom-0 z-20 h-px w-1/3 bg-gold [animation-delay:0.18s]" />
              <span className="animate-scan pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gold/70" />
              <span className="animate-scan pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gold/40 [animation-delay:0.3s]" />
              <span className="pointer-events-none absolute inset-y-0 left-0 z-20 w-px overflow-hidden">
                <span className="animate-bead absolute left-0 size-1.5 rounded-full bg-gold" />
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 z-20 w-px overflow-hidden">
                <span className="animate-bead absolute right-0 size-1.5 rounded-full bg-gold [animation-delay:0.25s]" />
              </span>
            </>
          ) : null}

          {!reduce && matching ? (
            <motion.div
              key={`flash-${cycle}`}
              className="pointer-events-none absolute inset-0 z-10 bg-gold/14"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.42 }}
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
              animate={
                reduce
                  ? undefined
                  : matching
                    ? { scale: [1, 1.07, 1] }
                    : sending
                      ? { scale: [1, 1.015, 1] }
                      : { scale: 1 }
              }
              transition={{ duration: sending ? 1.1 : 0.32, repeat: sending ? Infinity : 0 }}
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
                        x: reduce ? 0 : [0, -12, 12, -8, 8, -4, 4, 0],
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
                animate={
                  sending && !reduce
                    ? { width: ["18%", "34%", "18%"] }
                    : { width: `${progress}%` }
                }
                transition={
                  sending && !reduce
                    ? { duration: 0.9, repeat: Infinity, ease: "easeInOut" }
                    : { duration: 0.28, ease: [0.22, 1, 0.36, 1] }
                }
              />
              {!reduce && !held ? (
                <span className="animate-rail pointer-events-none absolute top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-gold" />
              ) : null}
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
