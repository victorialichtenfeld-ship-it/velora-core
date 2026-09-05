"use client";

import { FileKey2, LockKeyhole, ShieldCheck, UserRoundCheck, ScrollText } from "lucide-react";
import { MotionCard } from "@/components/motion-card";
import { SectionIntro } from "@/components/marketing/section-intro";

const pillars = [
  {
    icon: UserRoundCheck,
    title: "Human approval",
    body: "Velora recommends. A named finance owner decides. Nothing irreversible happens without that person.",
  },
  {
    icon: ScrollText,
    title: "Audit logs",
    body: "Every hold, override, and dismiss is recorded with evidence, actor, and timestamp.",
  },
  {
    icon: FileKey2,
    title: "Least privilege",
    body: "AP, controllers, and treasury see the payments they are allowed to act on — nothing more.",
  },
  {
    icon: LockKeyhole,
    title: "Encryption",
    body: "Invoices, payments, and contracts are encrypted in transit and at rest when live connectors are enabled.",
  },
  {
    icon: ShieldCheck,
    title: "Rules, not improvisation",
    body: "Velora does not invent policy. If a duplicate or pricing rule is off, the hold is off.",
  },
];

export function TrustSection() {
  return (
    <section id="trust" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
      <SectionIntro
        eyebrow="Trust"
        title="Controls only belong in the payment path if they are boring and auditable."
      />
      <div className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {pillars.map((pillar, index) => (
          <MotionCard key={pillar.title} delay={index * 0.06}>
            <pillar.icon className="size-4 text-primary" />
            <h3 className="mt-3 text-base font-medium">{pillar.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{pillar.body}</p>
          </MotionCard>
        ))}
      </div>
    </section>
  );
}
