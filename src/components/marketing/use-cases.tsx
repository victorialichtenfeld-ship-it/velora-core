"use client";

import { SectionIntro } from "@/components/marketing/section-intro";

const cases = [
  { team: "Sales discounts", result: "A 16% quote waits for finance.", amount: "$28,750" },
  { team: "Purchase limits", result: "A PO over $25,000 waits for a named approver.", amount: "$31,200" },
  { team: "Operations billing", result: "A shipment overage is prompted before the window closes.", amount: "$9,840" },
  { team: "Vendor master", result: "A wire to an unknown payee waits for treasury.", amount: "$18,400" },
];

export function UseCases() {
  return (
    <section id="also-covers" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <SectionIntro
        eyebrow="Also on the roadmap"
        title="Adjacent checks. Not why you buy."
        body="The walkthrough includes these so finance can see the control layer expand. They are not the reason to start a trial today."
      />
      <div className="mt-12 grid gap-px bg-gold/20 sm:grid-cols-2">
        {cases.map((item) => (
          <div key={item.team} className="bg-background px-5 py-7 sm:px-8">
            <p className="text-[11px] uppercase tracking-[0.2em] text-gold">{item.team}</p>
            <p className="font-figure money-sheen mt-3 text-4xl tracking-[-0.04em]">{item.amount}</p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.result}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
