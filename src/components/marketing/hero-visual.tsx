"use client";

import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Lock } from "lucide-react";
import { SampleDataBadge } from "@/components/sample-data-badge";
import { holdCopy, type HoldStage } from "@/lib/hold-loop";

function StatusChip({ stage }: { stage: HoldStage }) {
  if (stage === "held") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-gold px-2.5 py-1 text-[11px] font-medium text-gold-foreground">
        <Lock className="size-3" />
        Held
      </span>
    );
  }
  if (stage === "match") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/18 px-2.5 py-1 text-[11px] font-medium text-gold">
        <span className="size-1.5 rounded-full bg-gold animate-pulse" />
        Duplicate · 99.4%
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/10 px-2.5 py-1 text-[11px] font-medium text-gold">
      <span className="size-1.5 rounded-full bg-gold animate-pulse" />
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
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-160, 160], [10, -10]), { stiffness: 170, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [-160, 160], [-10, 10]), { stiffness: 170, damping: 18 });

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
      <motion.div
        animate={reduce ? undefined : { y: [0, -20, 0] }}
        transition={{ duration: 3.1, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className={`absolute inset-2 rounded-[1.4rem] bg-gold/30 blur-2xl ${reduce ? "" : "animate-gold-breathe"}`} />
        <div
          className={`product-panel relative overflow-hidden ${held || matching ? "animate-card-glow" : ""}`}
        >
          <span className="animate-gold-wash pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
          {!reduce && matching ? (
            <motion.div
              key={`wash-${cycle}`}
              className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(108deg,transparent_28%,rgb(126_176_255_/_0.28)_50%,transparent_72%)]"
              initial={{ x: "-55%" }}
              animate={{ x: "120%" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          ) : null}

          <div className="relative z-[2] flex items-center justify-between border-b border-gold/20 bg-gold/[0.08] px-6 py-3">
            <p className="text-[12px] font-medium">Velora · Meridian Supply</p>
            <div className="flex items-center gap-2">
              <span className="relative flex size-2">
                <span className={reduce ? "hidden" : "animate-pulse-ring absolute inset-0 rounded-full bg-gold"} />
                <span className="relative size-2 rounded-full bg-gold" />
              </span>
              <span className="text-[11px] text-muted-foreground">Live review</span>
              <SampleDataBadge />
            </div>
          </div>

          <div className="relative z-[2] p-6 sm:p-7">
            <p className="text-[12px] text-muted-foreground">Apex Logistics</p>
            <motion.p
              className="font-figure money-sheen mt-1 text-[2.85rem] leading-none tracking-[-0.045em] sm:text-[3.3rem]"
              animate={reduce ? undefined : matching ? { scale: [1, 1.04, 1] } : { scale: 1 }}
              transition={{ duration: 0.45 }}
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

              {!reduce && matching ? (
                <span className="pointer-events-none absolute left-[4.6rem] top-[3.15rem] h-8 w-px overflow-hidden">
                  <span className="absolute inset-x-0 h-full origin-top bg-gold animate-line-grow shadow-[0_0_12px_rgb(126_176_255)]" />
                </span>
              ) : null}

              <motion.div
                className="flex items-center justify-between gap-3 py-3.5"
                animate={
                  matching
                    ? {
                        backgroundColor: "rgb(126 176 255 / 0.14)",
                        borderRadius: 12,
                        paddingLeft: 12,
                        paddingRight: 12,
                        x: reduce ? 0 : [0, -6, 6, -3, 3, 0],
                      }
                    : held
                      ? {
                          backgroundColor: "rgb(126 176 255 / 0.12)",
                          borderRadius: 12,
                          paddingLeft: 12,
                          paddingRight: 12,
                          x: 0,
                        }
                      : {
                          backgroundColor: "rgb(126 176 255 / 0)",
                          borderRadius: 0,
                          paddingLeft: 0,
                          paddingRight: 0,
                          x: 0,
                        }
                }
                transition={{ duration: 0.35 }}
              >
                <div>
                  <p className="text-[13px] font-medium">ACH-4418</p>
                  <p className="mt-0.5 text-[12px] text-muted-foreground">15 hours later · same amount</p>
                </div>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={stage}
                    initial={reduce ? false : { y: 8, scale: 0.88 }}
                    animate={{ y: 0, scale: 1 }}
                    exit={reduce ? undefined : { y: -8, scale: 0.88 }}
                    transition={{ duration: 0.18 }}
                    className="inline-flex"
                  >
                    <StatusChip stage={stage} />
                  </motion.span>
                </AnimatePresence>
              </motion.div>
            </div>

            <div className="relative mt-6 h-[3px] overflow-hidden rounded-full bg-muted">
              <motion.div
                className={`h-full ${reduce ? "bg-gold" : "progress-sheen"}`}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
              {!reduce && !held ? (
                <span className="animate-rail pointer-events-none absolute top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-gold shadow-[0_0_12px_rgb(126_176_255)]" />
              ) : null}
            </div>

            <p className="mt-4 text-[13px] leading-6 text-muted-foreground">{holdCopy[stage]}</p>
          </div>

          <AnimatePresence>
            {held ? (
              <motion.div
                key={`banner-${cycle}`}
                initial={reduce ? false : { y: 36 }}
                animate={{ y: 0 }}
                exit={reduce ? undefined : { y: 36 }}
                transition={{ type: "spring", stiffness: 420, damping: 20 }}
                className="relative z-[2] flex items-center justify-between gap-3 bg-primary px-6 py-3.5 text-primary-foreground"
              >
                <p className="text-[13px] font-medium">Held before the bank</p>
                <p className="text-[12px] text-primary-foreground/75">Will not leave the account</p>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
