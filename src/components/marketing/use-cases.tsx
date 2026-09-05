"use client";

import { SectionIntro } from "@/components/marketing/section-intro";

const cases = [
  { team: "Sales discounts", result: "A 16% quote with no CRM exception waits for finance." },
  { team: "Purchase limits", result: "A PO over $25,000 waits for a named approver." },
  { team: "Operations billing", result: "A shipment overage is prompted before the window closes." },
  { team: "Vendor master", result: "A wire to an unknown payee waits for treasury." },
];

export function UseCases() {
  return (
    <section id="also-covers" className="mx-auto w-full max-w-4xl px-4 py-20 sm:px-6 sm:py-24">
      <SectionIntro
        eyebrow="Also on the roadmap"
        title="Adjacent checks. Not why you buy."
        body="The walkthrough includes these so finance can see the control layer expand. They are not the reason to start a trial today."
      />
      <dl className="mt-12 divide-y divide-gold/15 border-y border-gold/15">
        {cases.map((item) => (
          <div key={item.team} className="grid gap-2 py-5 sm:grid-cols-[11rem_1fr] sm:gap-8">
            <dt className="text-[12px] uppercase tracking-[0.16em] text-gold">{item.team}</dt>
            <dd className="text-sm leading-7 text-muted-foreground">{item.result}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
