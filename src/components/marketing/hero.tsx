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
      <div className="mx-auto w-full max-w-4xl px-4 pt-16 text-center sm:px-6 sm:pt-20 lg:pt-24">
        <motion.p
          initial={reduce ? false : { y: 8 }}
          animate={{ y: 0 }}
          className="mb-6 flex items-center justify-center gap-2 text-[11px] font-medium uppercase tracking-[0.28em] text-gold"
        >
          <span className="size-1.5 rounded-full bg-gold animate-flash" />
          Duplicate ACH · 15 hours later
        </motion.p>
        <motion.h1
          initial={reduce ? false : { y: 12 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-figure text-[2.9rem] leading-[1.06] tracking-[-0.035em] text-balance sm:text-6xl lg:text-[4.4rem]"
        >
          That second payment was about to <span className="money-sheen">clear</span>.
        </motion.h1>
        <motion.p
          initial={reduce ? false : { y: 10 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="mx-auto mt-6 max-w-lg text-[16px] leading-8 text-muted-foreground"
        >
          Apex already got paid. The same $11,240 hit the rail again. Velora locked it before the bank. Start a trial and put this hold on your AP.
        </motion.p>
        <motion.div
          initial={reduce ? false : { y: 10 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, delay: 0.14 }}
          className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
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
      </div>

      <CashScene />

      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 pb-10 text-[12px] tracking-[0.04em] text-gold/70 sm:px-6">
        <SampleDataBadge />
        <p>Meridian Supply walkthrough</p>
        <p className="font-figure text-gold">$184,320 held this month</p>
        <p>47 payments stopped</p>
      </div>
    </section>
  );
}
