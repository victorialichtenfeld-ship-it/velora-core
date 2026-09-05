"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

const motes = [
  { left: "18%", delay: "0s" },
  { left: "42%", delay: "1.2s" },
  { left: "68%", delay: "0.5s" },
  { left: "84%", delay: "1.8s" },
];

export function FinalCta() {
  const reduce = useReducedMotion();
  return (
    <section className="relative overflow-hidden px-4 pb-28 pt-8 text-center sm:px-6">
      <div className="pointer-events-none absolute top-1/2 left-1/2 size-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/20 sm:size-[28rem]" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 size-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-gold/25 animate-spin-slow sm:size-[36rem]" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 size-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/10 animate-spin-rev sm:size-[44rem]" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 size-[16rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(176_137_58_/_0.14),transparent_70%)] animate-gold-breathe" />
      {reduce
        ? null
        : motes.map((mote) => (
            <span
              key={mote.left}
              className="animate-mote pointer-events-none absolute bottom-[18%] h-1 w-1 rounded-full bg-gold"
              style={{ left: mote.left, animationDelay: mote.delay, boxShadow: "0 0 8px rgb(176 137 58 / 0.5)" }}
            />
          ))}
      <motion.div
        className="relative mx-auto w-full max-w-3xl"
        initial={reduce ? false : { y: 18 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="flex items-center justify-center gap-2 text-[11px] font-medium uppercase tracking-[0.24em] text-gold">
          <span className="size-1.5 rounded-full bg-gold animate-flash" />
          Start today
        </p>
        <h2 className="font-figure mt-4 text-[2.4rem] leading-[1.1] tracking-[-0.03em] sm:text-[3rem]">
          Hold the next duplicate before it <span className="money-sheen">clears</span>.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-[15px] leading-7 text-muted-foreground">
          Free trial. No bank connection required to walk the sample. Put Velora on the cash rail when AP is ready.
        </p>
        <span className="relative mt-9 inline-flex">
          {reduce ? null : <span className="absolute inset-0 rounded-md bg-gold/35 animate-pulse-ring" />}
          <Link href="/signup" className={cn(buttonVariants(), "relative inline-flex h-12 px-8 text-[13px] tracking-[0.08em] uppercase")}>
            Start free trial
          </Link>
        </span>
      </motion.div>
    </section>
  );
}
