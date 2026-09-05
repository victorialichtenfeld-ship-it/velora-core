"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export function FinalCta() {
  const reduce = useReducedMotion();
  return (
    <section className="px-4 pb-20 pt-8 sm:px-6">
      <motion.div
        className="glass relative mx-auto w-full max-w-5xl overflow-hidden rounded-[2rem] px-8 py-16 text-center sm:px-16 sm:py-20"
        initial={reduce ? false : { y: 18 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="hero-glow pointer-events-none absolute inset-x-16 top-0 h-40" />
        <p className="relative text-[13px] font-medium text-gold">Start today</p>
        <h2 className="relative mt-3 text-[2.15rem] font-semibold leading-[1.12] tracking-[-0.04em] sm:text-[2.8rem]">
          Hold the next duplicate before it{" "}
          <motion.span
            className="gradient-text inline-block"
            animate={reduce ? undefined : { scale: [1, 1.04, 1] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
          >
            clears
          </motion.span>
          .
        </h2>
        <p className="relative mx-auto mt-4 max-w-md text-[15px] leading-7 text-muted-foreground">
          Free trial. No bank connection required to walk the sample. Put Velora on the cash rail when AP is ready.
        </p>
        <Link href="/signup" className={cn(buttonVariants(), "relative mt-8 inline-flex h-12 px-6 text-[14px]")}>
          Start free trial
        </Link>
      </motion.div>
    </section>
  );
}
