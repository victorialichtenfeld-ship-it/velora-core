"use client";

import { motion, useReducedMotion } from "motion/react";
import { buttonVariants } from "@/components/ui/button-variants";
import { EarlyAccessCta } from "@/components/validation/ctas";
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
        <p className="relative text-[13px] font-medium text-gold">Get early access</p>
        <h2 className="relative mt-3 text-[2.15rem] font-semibold leading-[1.12] tracking-[-0.04em] sm:text-[2.8rem]">
          Catch the next costly mistake before it{" "}
          <motion.span
            className="gradient-text inline-block"
            animate={reduce ? undefined : { opacity: [0.78, 1, 0.78] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          >
            costs you
          </motion.span>
          .
        </h2>
        <p className="relative mx-auto mt-4 max-w-md text-[15px] leading-7 text-muted-foreground">
          Walk flags with evidence. You decide hold, approve, or dismiss. Live demo environment — connect your own tools in early access.
        </p>
        <EarlyAccessCta cta="try_velora" source="final_cta" className={cn(buttonVariants(), "relative mt-8 inline-flex h-12 px-6 text-[14px]")}>
          Try Velora
        </EarlyAccessCta>
      </motion.div>
    </section>
  );
}
