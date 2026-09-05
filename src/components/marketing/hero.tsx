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
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:py-20">
        <div>
          <motion.p
            initial={reduce ? false : { y: 8 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mb-5 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.24em] text-gold"
          >
            <span className="size-1.5 rounded-full bg-gold shadow-[0_0_12px_rgb(212_175_55_/_1)] animate-flash" />
            Cash desk · New York · live holds
          </motion.p>
          <motion.h1
            initial={reduce ? false : { y: 12 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-figure max-w-xl text-[2.85rem] leading-[1.08] tracking-[-0.03em] text-balance text-foreground sm:text-5xl lg:text-[3.65rem]"
          >
            Stop the <span className="money-sheen">second payment</span> before it clears.
          </motion.h1>
          <motion.p
            initial={reduce ? false : { y: 10 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mt-6 max-w-md text-[15px] leading-7 text-muted-foreground sm:text-base"
          >
            Velora sits on the cash rail for mid-size AP. Duplicate vendor payments and invoice pricing mismatches get locked in the vault before the bank sees them.
          </motion.p>
          <motion.div
            initial={reduce ? false : { y: 10 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, delay: 0.14 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <a href="#demo" className={cn(buttonVariants(), "h-12 px-6 text-[13px] tracking-[0.04em] uppercase")}>
              Open the desk
              <motion.span
                animate={reduce ? undefined : { x: [0, 6, 0] }}
                transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
                className="inline-flex"
              >
                <ArrowRight className="size-4" />
              </motion.span>
            </a>
            <a href="#how" className={cn(buttonVariants({ variant: "outline" }), "h-12 px-6 text-[13px] tracking-[0.04em] uppercase")}>
              How the gate works
            </a>
          </motion.div>
          <div className="mt-11 grid max-w-lg grid-cols-3 gap-2">
            <QuoteTile label="Held MTD" value={184320} prefix="$" sheen delay={0.12} tick="▲ 12.4%" />
            <QuoteTile label="Stopped" value={47} delay={0.22} tick="▲ 8" />
            <QuoteTile label="Checks" value={2} delay={0.32} tick="LIVE" />
          </div>
          <div className="mt-4 flex items-center gap-2">
            <SampleDataBadge />
            <p className="text-[11px] tracking-[0.04em] text-gold/70">Meridian Supply blotter — not a live feed</p>
          </div>
        </div>
        <HeroVisual />
      </div>
    </section>
  );
}

function QuoteTile({
  value,
  label,
  prefix,
  sheen,
  delay,
  tick,
}: {
  value: number;
  label: string;
  prefix?: string;
  sheen?: boolean;
  delay?: number;
  tick: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { y: 8 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="rounded-sm bg-card/80 px-3 py-3 ring-1 ring-gold/35"
    >
      <dt className="flex items-center justify-between text-[9px] uppercase tracking-[0.16em] text-gold/70">
        {label}
        <span className="animate-status text-gold">{tick}</span>
      </dt>
      <dd className="mt-1.5 font-figure text-[1.45rem] tracking-[-0.03em] text-gold sm:text-[1.7rem]">
        <AnimatedNumber value={value} prefix={prefix} duration={1800} className={sheen ? "money-sheen" : undefined} />
      </dd>
    </motion.div>
  );
}
