"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export function FinalCta() {
  const reduce = useReducedMotion();
  return (
    <section className="relative overflow-hidden px-4 pb-28 pt-8 text-center sm:px-6">
      <div className="pointer-events-none absolute top-1/2 left-1/2 size-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/20 sm:size-[28rem]" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 size-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-gold/25 animate-spin-slow sm:size-[36rem]" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 size-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/10 animate-spin-rev sm:size-[44rem]" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 size-[16rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(176_137_58_/_0.14),transparent_70%)] animate-gold-breathe" />
      <motion.div
        className="relative mx-auto w-full max-w-3xl"
        initial={reduce ? false : { y: 14 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-gold">Start today</p>
        <h2 className="font-figure mt-4 text-[2.4rem] leading-[1.1] tracking-[-0.03em] sm:text-[3rem]">
          Hold the next duplicate before it <span className="money-sheen">clears</span>.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-[15px] leading-7 text-muted-foreground">
          Free trial. No bank connection required to walk the sample. Put Velora on the cash rail when AP is ready.
        </p>
        <Link href="/signup" className={cn(buttonVariants(), "mt-9 inline-flex h-12 px-8 text-[13px] tracking-[0.08em] uppercase")}>
          Start free trial
        </Link>
      </motion.div>
    </section>
  );
}
