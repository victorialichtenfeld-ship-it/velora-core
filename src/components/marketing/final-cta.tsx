"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export function FinalCta() {
  const reduce = useReducedMotion();
  return (
    <section className="px-4 pb-28 pt-8 text-center sm:px-6">
      <motion.div
        className="mx-auto w-full max-w-3xl"
        initial={reduce ? false : { y: 16 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-[13px] font-medium text-muted-foreground">Start today</p>
        <h2 className="font-figure mt-3 text-[2.2rem] leading-[1.12] tracking-[-0.03em] sm:text-[2.9rem]">
          Hold the next duplicate before it clears.
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
