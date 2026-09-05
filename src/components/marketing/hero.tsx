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
    <section className="relative">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:py-24">
        <div>
          <motion.p
            initial={reduce ? false : { y: 8 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mb-5 text-[11px] font-medium uppercase tracking-[0.22em] text-gold"
          >
            For finance and operations teams
          </motion.p>
          <motion.h1
            initial={reduce ? false : { y: 12 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-figure max-w-xl text-[2.7rem] leading-[1.12] tracking-[-0.025em] text-balance text-foreground sm:text-5xl lg:text-[3.45rem]"
          >
            Stop the <span className="money-sheen">second payment</span> before it clears.
          </motion.h1>
          <motion.p
            initial={reduce ? false : { y: 10 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mt-6 max-w-md text-[15px] leading-7 text-muted-foreground sm:text-base"
          >
            Velora sits in accounts payable for mid-size companies. It holds duplicate vendor payments and invoice pricing mismatches so cash does not leave on a bad bill.
          </motion.p>
          <motion.div
            initial={reduce ? false : { y: 10 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, delay: 0.14 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <a href="#demo" className={cn(buttonVariants(), "h-12 px-6 text-[13px] tracking-[0.02em]")}>
              See it work
              <motion.span
                animate={reduce ? undefined : { x: [0, 5, 0] }}
                transition={{ duration: 1.15, repeat: Infinity, ease: "easeInOut" }}
                className="inline-flex"
              >
                <ArrowRight className="size-4" />
              </motion.span>
            </a>
            <a href="#how" className={cn(buttonVariants({ variant: "outline" }), "h-12 px-6 text-[13px] tracking-[0.02em]")}>
              How it works
            </a>
          </motion.div>
          <div className="mt-12 border-t border-bronze/30 pt-7">
            <div className="mb-5 flex items-center gap-2">
              <SampleDataBadge />
              <p className="text-[11px] tracking-[0.02em] text-muted-foreground">
                Meridian Supply walkthrough — not live customer activity
              </p>
            </div>
            <dl className="grid max-w-lg grid-cols-3 gap-6">
              <Stat value={184320} prefix="$" label="Held this month" sheen delay={0.15} />
              <Stat value={47} label="Payments stopped" delay={0.28} />
              <Stat value={2} label="Core checks" delay={0.4} />
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
  sheen,
  delay,
}: {
  value: number;
  label: string;
  prefix?: string;
  sheen?: boolean;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { y: 8 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <dt className="text-[10px] uppercase tracking-[0.16em] text-gold/70">{label}</dt>
      <dd className="mt-2 font-figure text-[1.85rem] tracking-[-0.03em] text-gold sm:text-[2rem]">
        <AnimatedNumber value={value} prefix={prefix} duration={1600} className={sheen ? "money-sheen" : undefined} />
      </dd>
    </motion.div>
  );
}
