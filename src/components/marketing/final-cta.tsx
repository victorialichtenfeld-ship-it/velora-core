"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export function FinalCta() {
  const reduce = useReducedMotion();
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-24 sm:px-6">
      <motion.div
        className="gold-run-border gold-glow desk-card relative overflow-hidden rounded-sm px-6 py-16 text-center sm:px-16"
        initial={reduce ? false : { y: 14 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="pointer-events-none animate-gold-sweep absolute inset-y-0 left-0 w-1/2 bg-[linear-gradient(90deg,transparent,rgb(176_137_58_/_0.08),transparent)]" />
        <div className="pointer-events-none absolute inset-x-10 top-0 h-px gold-hairline" />
        <p className="flex items-center justify-center gap-2 text-[11px] font-medium uppercase tracking-[0.24em] text-gold">
          <span className="size-1.5 rounded-full bg-gold animate-flash" />
          Cash desk
        </p>
        <h2 className="font-figure money-sheen mx-auto mt-4 max-w-xl text-[2.25rem] leading-[1.12] tracking-[-0.03em] sm:text-[2.85rem]">
          Hold the next duplicate before it clears.
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-[15px] leading-7 text-muted-foreground">
          Walk the Meridian Supply blotter, or put Velora on the payment path.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <a href="#demo" className={cn(buttonVariants(), "h-12 px-6 text-[12px] tracking-[0.12em] uppercase")}>
            Open the desk
          </a>
          <Link href="/book" className={cn(buttonVariants({ variant: "outline" }), "h-12 px-6 text-[12px] tracking-[0.12em] uppercase")}>
            Book a call
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
