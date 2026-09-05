"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { buttonVariants } from "@/components/ui/button-variants";
import { CashScene } from "@/components/marketing/hero-visual";
import { SampleDataBadge } from "@/components/sample-data-badge";
import { cn } from "@/lib/utils";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px gold-hairline opacity-70" />
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8 lg:py-16">
        <div className="order-2 lg:order-1">
          <motion.p
            initial={reduce ? false : { y: 8 }}
            animate={{ y: 0 }}
            className="mb-6 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.32em] text-gold"
          >
            <span className="size-1.5 rounded-full bg-gold animate-flash" />
            Live model · ACH-4418 · 15 hours later
          </motion.p>
          <motion.h1
            initial={reduce ? false : { y: 12 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-figure max-w-xl text-[2.9rem] leading-[0.98] tracking-[-0.04em] text-balance sm:text-5xl lg:text-[4.05rem]"
          >
            That second payment was about to <span className="money-sheen">clear</span>.
          </motion.h1>
          <motion.p
            initial={reduce ? false : { y: 10 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mt-6 max-w-md text-[16px] leading-8 text-muted-foreground"
          >
            Apex already got paid. The same $11,240 hit the rail again. Velora inferred the duplicate in flight and held it before the bank. Start a trial and put this hold on your AP.
          </motion.p>
          <motion.div
            initial={reduce ? false : { y: 10 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, delay: 0.14 }}
            className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <Link href="/signup" className={cn(buttonVariants(), "h-12 px-8 text-[13px] tracking-[0.08em] uppercase")}>
              Start free trial
              <motion.span
                animate={reduce ? undefined : { x: [0, 5, 0] }}
                transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
                className="inline-flex"
              >
                <ArrowRight className="size-4" />
              </motion.span>
            </Link>
            <a href="#demo" className="text-[13px] tracking-[0.08em] text-gold hover:underline">
              Watch the hold →
            </a>
          </motion.div>
          <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-gold/20 pt-5 text-[12px] tracking-[0.04em] text-gold/75">
            <SampleDataBadge />
            <p className="font-figure text-lg text-gold">$184,320 held this month</p>
            <p>47 payments stopped</p>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <CashScene />
        </div>
      </div>
    </section>
  );
}
