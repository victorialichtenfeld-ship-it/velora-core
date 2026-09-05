"use client";

import { SectionIntro } from "@/components/marketing/section-intro";

const steps = [
  {
    n: "01",
    title: "Connect AP systems",
    body: "Email, QuickBooks, and payment rails stream bills and ACH into Velora. This walkthrough uses simulated adapters.",
  },
  {
    n: "02",
    title: "Match against policy",
    body: "Vendor masters, paid invoices, and contract unit prices. Duplicate amount + vendor, or invoice price ≠ contract, gets flagged.",
  },
  {
    n: "03",
    title: "Hold for a named person",
    body: "Risky payments stop before they leave. A finance owner holds, approves, or dismisses with an audit trail.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="mx-auto w-full max-w-4xl px-4 py-20 sm:px-6 sm:py-24">
      <SectionIntro
        eyebrow="How it works"
        title="A hold in the payment path."
        body="Velora does not ask AP to re-key data. It watches the tools they already run."
      />
      <ol className="mt-12 space-y-10">
        {steps.map((step) => (
          <li key={step.n} className="grid gap-2 sm:grid-cols-[4.5rem_1fr] sm:gap-8">
            <p className="font-figure text-2xl text-gold">{step.n}</p>
            <div>
              <h3 className="text-lg font-medium tracking-tight">{step.title}</h3>
              <p className="mt-2 max-w-xl text-sm leading-7 text-muted-foreground">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
