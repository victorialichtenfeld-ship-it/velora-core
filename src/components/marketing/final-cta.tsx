"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export function FinalCta() {
  const reduce = useReducedMotion();
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6">
      <motion.div
        className="gold-glow relative overflow-hidden rounded-xl bg-card px-6 py-12 text-center ring-1 ring-primary/25 sm:px-16"
        initial={reduce ? false : { y: 16, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px gold-hairline" />
        <div className="animate-gold-breathe pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgb(226_194_120_/_0.12),transparent_60%)]" />
        <div className="relative">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-primary">Next step</p>
          <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Hold the next duplicate before it clears.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Walk the Meridian Supply sample alerts, or start a trial if AP wants this in the payment path.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a href="#demo" className={cn(buttonVariants(), "h-11 px-5")}>
              See it work
            </a>
            <Link href="/book" className={cn(buttonVariants({ variant: "outline" }), "h-11 px-5")}>
              Book a call
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
