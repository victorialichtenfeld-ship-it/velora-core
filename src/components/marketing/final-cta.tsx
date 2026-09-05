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
        className="mx-auto w-full max-w-5xl overflow-hidden rounded-[1.6rem] bg-primary px-8 py-16 text-center text-primary-foreground sm:px-16 sm:py-20"
        initial={reduce ? false : { y: 20 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-[13px] font-medium text-primary-foreground/70">Start today</p>
        <h2 className="font-figure mt-3 text-[2.2rem] leading-[1.12] tracking-[-0.03em] sm:text-[2.9rem]">
          Hold the next duplicate before it <span className="italic">clears</span>.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-[15px] leading-7 text-primary-foreground/70">
          Free trial. No bank connection required to walk the sample. Put Velora on the cash rail when AP is ready.
        </p>
        <Link
          href="/signup"
          className={cn(buttonVariants({ variant: "secondary" }), "btn-shine mt-8 inline-flex h-12 px-7 text-[15px]")}
        >
          Start free trial
        </Link>
      </motion.div>
    </section>
  );
}
