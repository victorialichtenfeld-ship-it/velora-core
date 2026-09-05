"use client";

import { MotionCard } from "@/components/motion-card";

const cases = [
  {
    team: "Sales discounts",
    example: "A quote applies 16% off with no exception in the CRM.",
    result: "Finance reviews before margin is given away.",
  },
  {
    team: "Purchase limits",
    example: "A PO exceeds the $25,000 approval threshold.",
    result: "The order waits for a named approver.",
  },
  {
    team: "Operations billing",
    example: "A shipment overage is logged but never invoiced.",
    result: "Billing is prompted before the window closes.",
  },
  {
    team: "Vendor master",
    example: "A wire goes to a payee that is not on the approved vendor file.",
    result: "Treasury confirms the beneficiary before release.",
  },
];

export function UseCases() {
  return (
    <section id="also-covers" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">Also on the roadmap</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Adjacent checks, not the core product.</h2>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        The walkthrough includes these detectors so finance can see the control layer expand. They are not the reason to buy Velora today.
      </p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {cases.map((item, index) => (
          <MotionCard key={item.team} delay={index * 0.06}>
            <p className="text-sm font-medium">{item.team}</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.example}</p>
            <p className="mt-3 text-sm text-foreground">{item.result}</p>
          </MotionCard>
        ))}
      </div>
    </section>
  );
}
