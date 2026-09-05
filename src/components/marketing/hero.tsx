"use client";

import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { buttonVariants } from "@/components/ui/button-variants";
import { HeroVisual } from "@/components/marketing/hero-visual";
import { SampleDataBadge } from "@/components/sample-data-badge";
import { AnimatedNumber } from "@/components/animated-number";
import { cn } from "@/lib/utils";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px gold-hairline" />
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-20">
        <div>
          <motion.p
            initial={reduce ? false : { y: 10 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-primary"
          >
            For finance and operations teams
          </motion.p>
          <motion.h1
            initial={reduce ? false : { y: 14 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl leading-[1.1] font-semibold tracking-tight text-balance text-foreground sm:text-5xl lg:text-[3.25rem]"
          >
            Stop the{" "}
            <span className="relative inline-block">
              <span className="text-shimmer">second payment</span>
              <motion.span
                className="absolute -bottom-1 left-0 h-px bg-primary"
                initial={reduce ? { width: "100%" } : { width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.45, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
            </span>{" "}
            before it clears.
          </motion.h1>
          <motion.p
            initial={reduce ? false : { y: 12 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg"
          >
            Velora sits in accounts payable for mid-size companies. It holds duplicate vendor payments and invoice pricing mismatches so cash does not leave on a bad bill.
          </motion.p>
          <motion.div
            initial={reduce ? false : { y: 12 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, delay: 0.14 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <a href="#demo" className={cn(buttonVariants(), "h-11 px-5 text-sm")}>
              See it work
              <motion.span
                animate={reduce ? undefined : { x: [0, 4, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                className="inline-flex"
              >
                <ArrowRight className="size-4" />
              </motion.span>
            </a>
            <a href="#how" className={cn(buttonVariants({ variant: "outline" }), "h-11 px-5 text-sm")}>
              How it works
            </a>
          </motion.div>
          <div className="mt-10 border-t border-border pt-6">
            <div className="mb-4 flex items-center gap-2">
              <SampleDataBadge />
              <p className="text-xs text-muted-foreground">Meridian Supply walkthrough — not live customer activity</p>
            </div>
            <dl className="grid max-w-lg grid-cols-3 gap-4">
              <Stat value={184320} prefix="$" label="Held this month" tone="protect" delay={0.2} />
              <Stat value={47} label="Payments stopped" tone="protect" delay={0.32} />
              <Stat value={2} label="Core checks" delay={0.44} />
            </dl>
          </div>
        </div>
        <HeroVisual />
      </div>
    </section>
  );
}

function Stat({
  value,
  label,
  prefix,
  tone,
  delay,
}: {
  value: number;
  label: string;
  prefix?: string;
  tone?: "protect";
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { y: 10 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <dt className="text-[11px] text-muted-foreground">{label}</dt>
      <dd
        className={`mt-1 font-mono text-2xl tabular tracking-tight sm:text-[1.65rem] ${
          tone === "protect" ? "text-protect" : "text-foreground"
        }`}
      >
        <AnimatedNumber value={value} prefix={prefix} />
      </dd>
      <span className="mt-2 block h-px w-8 bg-primary/50" />
    </motion.div>
  );
}
