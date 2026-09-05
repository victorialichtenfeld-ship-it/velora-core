"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { buttonVariants } from "@/components/ui/button-variants";
import { CashScene } from "@/components/marketing/hero-visual";
import { SampleDataBadge } from "@/components/sample-data-badge";
import { AnimatedNumber } from "@/components/animated-number";
import { holdCopy, useHoldLoop } from "@/lib/hold-loop";
import { cn } from "@/lib/utils";

export function Hero() {
  const { stage, cycle, reduce } = useHoldLoop();
  const line = holdCopy[stage];
  const active = stage === "send" ? 0 : stage === "match" ? 1 : 2;
  const fill = stage === "held" ? "100%" : stage === "match" ? "66%" : "33%";

  return (
    <section className="relative overflow-hidden">
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:py-24">
        <div className="order-2 lg:order-1">
          <p className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/6 px-3 py-1.5 text-[13px] text-gold backdrop-blur-md">
            <span className="relative flex size-2">
              <span className={reduce ? "hidden" : "animate-pulse-ring absolute inset-0 rounded-full bg-gold"} />
              <span className="relative size-2 rounded-full bg-gold" />
            </span>
            AI safety layer for finance and ops
          </p>
          <h1 className="max-w-xl text-[2.55rem] font-semibold leading-[1.04] tracking-[-0.045em] text-balance text-foreground sm:text-5xl lg:text-[3.45rem]">
            Catch costly mistakes before they{" "}
            <span className="relative inline-block">
              <motion.span
                className="gradient-text inline-block"
                animate={reduce ? undefined : { opacity: stage === "held" ? 1 : 0.82 }}
              >
                cost you money
              </motion.span>
              <motion.span
                className="absolute top-[58%] left-0 h-[2px] origin-left bg-gold"
                initial={false}
                animate={{ scaleX: stage === "held" ? 1 : 0 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                style={{ width: "100%" }}
              />
            </span>
            .
          </h1>
          <AnimatePresence mode="wait">
            <motion.p
              key={line}
              initial={reduce ? false : { y: 12 }}
              animate={{ y: 0 }}
              exit={reduce ? undefined : { y: -12 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 text-[15px] font-medium text-gold"
            >
              {line}
            </motion.p>
          </AnimatePresence>
          <p className="mt-4 max-w-lg text-[16px] leading-8 text-muted-foreground">
            Velora watches the tools you already use — email, accounting, CRM, payments, and files — and flags anything that breaks your rules. It is not a chatbot. A person always makes the final call. Nothing is auto-executed.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link href="/signup" className={cn(buttonVariants(), "h-12 px-6 text-[14px]")}>
              Start free trial
              <motion.span
                className="inline-flex"
                animate={reduce ? undefined : { x: [0, 4, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight className="size-4" />
              </motion.span>
            </Link>
            <a href="#demo" className="text-[14px] text-gold underline-offset-4 hover:text-foreground hover:underline">
              See a flag, then you decide
            </a>
          </div>
          <div className="mt-10 max-w-md">
            <div className="flex items-center justify-between text-[11px] font-medium text-muted-foreground">
              {(["In flight", "Flagged", "You decide"] as const).map((label, index) => (
                <motion.span
                  key={label}
                  className={index <= active ? "text-gold" : ""}
                >
                  {label}
                </motion.span>
              ))}
            </div>
            <div className="relative mt-2 h-[3px] overflow-hidden rounded-full bg-white/8">
              <motion.div
                className="h-full bg-gold"
                animate={{ width: fill }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              />
              {reduce ? null : (
                <motion.span
                  className="absolute top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-gold"
                  animate={{ left: fill }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
            </div>
          </div>
          <div className="mt-12 grid max-w-md grid-cols-2 gap-4">
            <div className="glass rounded-2xl px-4 py-4">
              <p className="font-figure text-2xl tracking-tight text-gold">
                <AnimatedNumber value={184320} prefix="$" duration={1400} />
              </p>
              <p className="mt-1 text-[12px] text-muted-foreground">Mistakes stopped this month</p>
            </div>
            <div className="glass rounded-2xl px-4 py-4">
              <p className="font-figure text-2xl tracking-tight text-foreground">
                <AnimatedNumber value={47} duration={1100} />
              </p>
              <p className="mt-1 flex items-center gap-2 text-[12px] text-muted-foreground">
                <SampleDataBadge />
                flags, all human-reviewed
              </p>
            </div>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <CashScene stage={stage} cycle={cycle} reduce={reduce} />
        </div>
      </div>
    </section>
  );
}
