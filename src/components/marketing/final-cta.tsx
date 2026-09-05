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
        className="mx-auto w-full max-w-5xl rounded-2xl border border-gold/25 bg-card px-8 py-16 text-center sm:px-16 sm:py-20"
        initial={reduce ? false : { y: 18 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-[13px] font-medium text-gold">Start today</p>
        <h2 className="font-figure mt-3 text-[2.2rem] leading-[1.12] tracking-[-0.03em] sm:text-[2.9rem]">
          Hold the next duplicate before it <span className="italic text-gold">clears</span>.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-[15px] leading-7 text-muted-foreground">
          Free trial. No bank connection required to walk the sample. Put Velora on the cash rail when AP is ready.
        </p>
        <Link href="/signup" className={cn(buttonVariants(), "mt-8 inline-flex h-11 px-6 text-[14px]")}>
          Start free trial
        </Link>
      </motion.div>
    </section>
  );
}
