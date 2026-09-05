"use client";

import { Cable, Lock, ScanSearch } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { SectionIntro } from "@/components/marketing/section-intro";

const steps = [
  {
    n: "01",
    title: "Connect AP",
    body: "Email, QuickBooks, and payment rails stream bills and ACH in.",
    icon: Cable,
  },
  {
    n: "02",
    title: "Match policy",
    body: "Same vendor + amount, or invoice price ≠ contract, gets flagged.",
    icon: ScanSearch,
  },
  {
    n: "03",
    title: "Hold cash",
    body: "A named finance owner holds, approves, or dismisses with an audit trail.",
    icon: Lock,
  },
];

export function HowItWorks() {
  const reduce = useReducedMotion();

  return (
    <section id="how" className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <SectionIntro
        eyebrow="How it works"
        title="A hold in the payment path."
        body="Velora does not ask AP to re-key data. It watches the tools they already run."
      />
      <div className="relative mt-14">
        <div className="pointer-events-none absolute top-[88px] right-[16%] left-[16%] hidden h-px bg-gold/25 lg:block">
          {reduce ? null : (
            <span className="absolute top-1/2 left-0 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold shadow-[0_0_14px_rgb(176_137_58)] animate-rail" />
          )}
        </div>
        <div className="grid gap-10 lg:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.n} className="text-center">
                <div className="relative mx-auto aspect-square w-full max-w-[200px]">
                  <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgb(176_137_58_/_0.16),transparent_68%)] animate-gold-breathe" />
                  <div className="absolute inset-0 rounded-full border border-gold/35" />
                  <div className="absolute inset-[10px] rounded-full border border-dashed border-gold/40 animate-spin-slow" />
                  <div className="vault-well absolute inset-[28%] flex flex-col items-center justify-center">
                    <Icon className="size-6 text-gold" />
                    <p className="font-figure mt-1 text-xl text-gold">{step.n}</p>
                  </div>
                </div>
                <h3 className="mt-6 font-figure text-2xl tracking-[-0.03em]">{step.title}</h3>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-7 text-muted-foreground">{step.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
