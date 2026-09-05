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
    <section id="trust" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <SectionIntro
        eyebrow="Trust"
        title="A hold only belongs in the payment path if it is boring and auditable."
      />
      <div className="mt-12 flex gap-8 overflow-x-auto pb-2">
        {pillars.map((pillar) => (
          <div key={pillar.title} className="min-w-[13rem] shrink-0">
            <div className="mb-4 size-16 rounded-full border border-gold/40 bg-[radial-gradient(circle,rgb(176_137_58_/_0.18),transparent_70%)] animate-gold-breathe" />
            <p className="font-figure text-xl text-gold">{pillar.title}</p>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">{pillar.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
