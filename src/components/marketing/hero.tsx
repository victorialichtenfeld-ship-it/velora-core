"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { buttonVariants } from "@/components/ui/button-variants";
import { HeroVisual } from "@/components/marketing/hero-visual";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-24">
        <div>
          <motion.p
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full bg-gold/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-gold ring-1 ring-gold/30"
          >
            <span className="relative flex size-2">
              <span className="absolute inset-0 rounded-full bg-protect animate-pulse-ring" />
              <span className="relative size-2 rounded-full bg-protect" />
            </span>
            Intelligence before impact
          </motion.p>
          <motion.h1
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-4xl leading-[1.08] text-balance text-foreground sm:text-5xl lg:text-[3.6rem]"
          >
            Catch costly mistakes before they happen.
          </motion.h1>
          <motion.p
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.7 }}
            className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg"
          >
            Velora monitors business activity and detects financial, contractual, pricing, and operational mistakes before they become expensive.
          </motion.p>
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24, duration: 0.7 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Link href="/signup" className={cn(buttonVariants(), "h-12 rounded-full px-6 text-sm")}>
              Try Velora
              <ArrowRight className="size-4" />
            </Link>
            <a
              href="#how"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-12 rounded-full border-ink/15 bg-card/80 px-6 text-sm"
              )}
            >
              See how it works
            </a>
          </motion.div>
          <motion.dl
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-ink/10 pt-6"
          >
            <Stat value="$184k" label="Protected this month" />
            <Stat value="47" label="Mistakes prevented" />
            <Stat value="8" label="Systems watched" />
          </motion.dl>
        </div>
        <motion.div
          initial={{ opacity: 1, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.18, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <HeroVisual />
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{label}</dt>
      <dd className="mt-1 font-mono text-lg text-foreground">{value}</dd>
    </div>
  );
}
