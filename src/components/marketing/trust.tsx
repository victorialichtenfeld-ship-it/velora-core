"use client";

import { motion } from "motion/react";
import { SectionIntro } from "@/components/marketing/section-intro";
import { Stagger, StaggerItem } from "@/components/reveal";

const pillars = [
  { title: "Human approval", body: "Velora recommends. A named finance owner decides." },
  { title: "Audit logs", body: "Every hold, override, and dismiss is recorded." },
  { title: "Least privilege", body: "People see only the payments they can act on." },
  { title: "Encryption", body: "Invoices, payments, and contracts encrypted in transit and at rest." },
  { title: "Rules, not improvisation", body: "If the duplicate or pricing rule is off, the hold is off." },
];

export function TrustSection() {
  return (
    <section id="trust" className="mx-auto w-full max-w-4xl px-4 py-20 sm:px-6 sm:py-24">
      <SectionIntro
        eyebrow="Trust"
        title="A hold only belongs in the payment path if it is boring and auditable."
      />
      <Stagger className="mt-12 space-y-6">
        {pillars.map((pillar) => (
          <StaggerItem key={pillar.title}>
            <div className="relative pl-4">
              <motion.span
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-1 left-0 h-8 w-px origin-top bg-gold/70"
              />
              <p className="text-sm font-medium text-gold">{pillar.title}</p>
              <p className="mt-1 text-sm leading-7 text-muted-foreground">{pillar.body}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
