"use client";

import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button-variants";
import { HeroVisual } from "@/components/marketing/hero-visual";
import { SampleDataBadge } from "@/components/sample-data-badge";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-20">
        <div>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            For finance and operations teams
          </p>
          <h1 className="text-4xl leading-[1.1] font-semibold tracking-tight text-balance text-foreground sm:text-5xl lg:text-[3.25rem]">
            Stop the second payment before it clears.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
            Velora sits in accounts payable for mid-size companies. It holds duplicate vendor payments and invoice pricing mismatches so cash does not leave on a bad bill.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#demo" className={cn(buttonVariants(), "h-11 px-5 text-sm")}>
              See it work
              <ArrowRight className="size-4" />
            </a>
            <a href="#how" className={cn(buttonVariants({ variant: "outline" }), "h-11 px-5 text-sm")}>
              How it works
            </a>
          </div>
          <div className="mt-10 border-t border-border pt-6">
            <div className="mb-4 flex items-center gap-2">
              <SampleDataBadge />
              <p className="text-xs text-muted-foreground">Meridian Supply walkthrough — not live customer activity</p>
            </div>
            <dl className="grid max-w-lg grid-cols-3 gap-4">
              <Stat value="$184,320" label="Held this month" />
              <Stat value="47" label="Payments stopped" />
              <Stat value="2" label="Core checks" />
            </dl>
          </div>
        </div>
        <HeroVisual />
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dt className="text-[11px] text-muted-foreground">{label}</dt>
      <dd className="mt-1 font-mono text-2xl tabular tracking-tight text-foreground sm:text-[1.65rem]">{value}</dd>
    </div>
  );
}
