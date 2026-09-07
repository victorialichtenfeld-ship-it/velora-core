"use client";

import { useState } from "react";
import { SectionIntro } from "@/components/marketing/section-intro";
import { EarlyAccessCta } from "@/components/validation/ctas";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

function fmt(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

const presets = [
  { label: "Under $500K/mo", value: 250000 },
  { label: "$500K–$2M/mo", value: 1000000 },
  { label: "$2M–$10M/mo", value: 5000000 },
  { label: "Over $10M/mo", value: 15000000 },
];

export function RoiCalculator() {
  const [selected, setSelected] = useState(1);
  const volume = presets[selected].value;
  const duplicateRate = 0.0015;
  const pricingErrorRate = 0.0008;
  const duplicateSavings = Math.round(volume * duplicateRate);
  const pricingErrorSavings = Math.round(volume * pricingErrorRate);
  const total = duplicateSavings + pricingErrorSavings;
  const velora = 249;
  const roi = Math.round((total - velora) / velora * 100);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
      <SectionIntro
        eyebrow="ROI calculator"
        title="See what one missed mistake actually costs."
        body="Industry data: 0.15% of B2B payments are duplicates. Pricing errors average 0.08% of invoice volume. Velora catches both before they go through."
      />
      <div className="mt-12 glass rounded-[1.8rem] p-8 sm:p-10">
        <p className="text-[13px] font-medium text-muted-foreground mb-4">Your monthly payment volume</p>
        <div className="flex flex-wrap gap-2 mb-10">
          {presets.map((p, i) => (
            <button
              key={p.label}
              onClick={() => setSelected(i)}
              className={cn(
                "rounded-full px-4 py-2 text-sm transition-colors border",
                selected === i
                  ? "border-gold/50 bg-gold/10 text-gold"
                  : "border-white/10 bg-white/5 text-muted-foreground hover:text-foreground"
              )}
            >
              {p.label}
            </button>
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-[1.2rem] border border-white/8 bg-white/3 p-6">
            <p className="text-[12px] text-muted-foreground">Duplicate payments stopped</p>
            <p className="mt-2 font-mono text-2xl text-gold">{fmt(duplicateSavings)}</p>
            <p className="mt-1 text-[11px] text-muted-foreground">per month, on average</p>
          </div>
          <div className="rounded-[1.2rem] border border-white/8 bg-white/3 p-6">
            <p className="text-[12px] text-muted-foreground">Pricing errors caught</p>
            <p className="mt-2 font-mono text-2xl text-gold">{fmt(pricingErrorSavings)}</p>
            <p className="mt-1 text-[11px] text-muted-foreground">per month, on average</p>
          </div>
          <div className="rounded-[1.2rem] border border-gold/20 bg-gold/8 p-6">
            <p className="text-[12px] text-muted-foreground">Total protected</p>
            <p className="mt-2 font-mono text-2xl text-gold">{fmt(total)}</p>
            <p className="mt-1 text-[11px] text-muted-foreground">vs {fmt(velora)}/mo for Velora Growth</p>
          </div>
        </div>
        <p className="mt-6 text-[13px] text-muted-foreground">
          Estimated ROI: <span className="text-gold font-medium">{roi}x</span> return on your Velora subscription.
        </p>
        <EarlyAccessCta
          cta="try_velora"
          plan="growth"
          source="roi_calculator"
          className={cn(buttonVariants(), "mt-6 h-11 px-5 text-[14px]")}
        >
          Start free trial — no card needed
        </EarlyAccessCta>
      </div>
    </section>
  );
}
