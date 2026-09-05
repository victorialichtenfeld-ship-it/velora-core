"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { buttonVariants } from "@/components/ui/button-variants";
import { CashScene } from "@/components/marketing/hero-visual";
import { SampleDataBadge } from "@/components/sample-data-badge";
import { AnimatedNumber } from "@/components/animated-number";
import { holdCopy, useHoldLoop } from "@/lib/hold-loop";
import { cn } from "@/lib/utils";

export function Hero() {
  const { stage, cycle, reduce } = useHoldLoop();
  const line = holdCopy[stage];

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[8%] top-[-20%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgb(212_176_90_/_0.42),transparent_68%)]" />
        <div className="absolute right-[4%] top-[8%] h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgb(47_138_100_/_0.28),transparent_70%)]" />
        <div className="absolute bottom-[-18%] left-[28%] h-[18rem] w-[18rem] rounded-full bg-[radial-gradient(circle,rgb(74_111_168_/_0.22),transparent_70%)]" />
      </div>
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14 lg:py-24">
        <div className="order-2 lg:order-1">
          <motion.p
            initial={reduce ? false : { y: 8 }}
            animate={{ y: 0 }}
            className="mb-5 inline-flex items-center gap-2.5 rounded-full bg-protect/12 px-3 py-1.5 text-[13px] font-medium text-protect"
          >
            <span className="size-1.5 rounded-full bg-protect" />
            Live hold · Apex · 15 hours later
          </motion.p>
          <motion.h1
            initial={reduce ? false : { y: 14 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="font-figure max-w-xl text-[2.75rem] leading-[1.04] tracking-[-0.038em] text-balance text-foreground sm:text-5xl lg:text-[3.75rem]"
          >
            That second payment was about to{" "}
            <span className="money-sheen italic">clear</span>.
          </motion.h1>
          <motion.p
            key={line}
            initial={false}
            animate={{ y: 0 }}
            className={`mt-5 text-[15px] font-medium ${
              stage === "held" ? "text-protect" : stage === "match" ? "text-gold" : "text-dusk"
            }`}
          >
            {line}
          </motion.p>
          <motion.p
            initial={reduce ? false : { y: 10 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mt-4 max-w-md text-[16px] leading-8 text-muted-foreground"
          >
            Apex already got paid. The same $11,240 hit the rail again. Velora caught the duplicate in flight and held it before the bank.
          </motion.p>
          <motion.div
            initial={reduce ? false : { y: 10 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, delay: 0.14 }}
            className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <Link href="/signup" className={cn(buttonVariants(), "btn-shine h-12 px-7 text-[15px]")}>
              Start free trial
              <motion.span
                animate={reduce ? undefined : { x: [0, 4, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                className="inline-flex"
              >
                <ArrowRight className="size-4" />
              </motion.span>
            </Link>
            <a href="#demo" className="text-[15px] text-dusk underline-offset-4 hover:text-foreground hover:underline">
              Watch the hold
            </a>
          </motion.div>
          <div className="mt-12 grid max-w-md grid-cols-2 gap-6 border-t border-gold/25 pt-6">
            <div>
              <p className="font-figure money-sheen text-2xl tracking-tight">
                <AnimatedNumber value={184320} prefix="$" duration={1400} />
              </p>
              <p className="mt-1 text-[12px] text-muted-foreground">Held this month</p>
            </div>
            <div>
              <p className="font-figure text-2xl tracking-tight text-protect">
                <AnimatedNumber value={47} duration={1100} />
              </p>
              <p className="mt-1 flex items-center gap-2 text-[12px] text-muted-foreground">
                <SampleDataBadge />
                payments stopped
              </p>
            </div>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <CashScene stage={stage} cycle={cycle} reduce={reduce} />
        </div>
      </div>
    </section>
  );
}
