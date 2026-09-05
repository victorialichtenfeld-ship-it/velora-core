"use client";

import { SectionIntro } from "@/components/marketing/section-intro";

const pillars = [
  { title: "Human approval", body: "A named finance owner decides." },
  { title: "Audit logs", body: "Every hold and override is recorded." },
  { title: "Least privilege", body: "People see only the payments they can act on." },
  { title: "Encryption", body: "Invoices and contracts encrypted in transit." },
  { title: "Rules", body: "If the rule is off, the hold is off." },
];

export function TrustSection() {
  return (
    <section id="trust" className="mx-auto w-full max-w-4xl px-4 py-20 sm:px-6 sm:py-24">
      <SectionIntro
        eyebrow="Trust"
        title="A hold only belongs in the payment path if it is boring and auditable."
      />
      <ul className="mt-12 divide-y divide-border border-y border-border">
        {pillars.map((pillar) => (
          <li key={pillar.title} className="grid gap-2 py-5 sm:grid-cols-[14rem_1fr] sm:gap-8">
            <p className="font-figure text-xl text-dusk">{pillar.title}</p>
            <p className="text-sm leading-7 text-muted-foreground">{pillar.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
