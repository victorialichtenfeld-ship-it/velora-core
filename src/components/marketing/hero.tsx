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
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
        <div>
          <motion.p
            initial={reduce ? false : { y: 8 }}
            animate={{ y: 0 }}
            className="mb-5 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.28em] text-gold"
          >
            <span className="size-1.5 rounded-full bg-gold animate-flash" />
            Duplicate ACH · 15 hours later
          </motion.p>
          <motion.h1
            initial={reduce ? false : { y: 12 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-figure max-w-xl text-[2.75rem] leading-[1.06] tracking-[-0.035em] text-balance sm:text-5xl lg:text-[3.7rem]"
          >
            That second payment was about to <span className="money-sheen">clear</span>.
          </motion.h1>
          <motion.p
            initial={reduce ? false : { y: 10 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mt-6 max-w-md text-[16px] leading-8 text-muted-foreground"
          >
            Apex already got paid. The same $11,240 hit the rail again. Velora locked it in the vault before the bank. Start a trial and put this hold on your AP.
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
            <a href="#demo" className="text-[13px] tracking-[0.06em] text-gold hover:underline">
              Watch the hold →
            </a>
          </motion.div>
          <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] tracking-[0.04em] text-gold/70">
            <SampleDataBadge />
            <p className="font-figure text-gold">$184,320 held this month</p>
            <p>47 payments stopped</p>
          </div>
        </div>
        <CashScene />
      </div>
    </section>
  );
}
