"use client";

import { integrationsCatalog } from "@/lib/data/demo";
import { SectionIntro } from "@/components/marketing/section-intro";

export function IntegrationsSection() {
  const liveNow = integrationsCatalog.filter((item) => item.status === "connected");
  const comingSoon = integrationsCatalog.filter((item) => item.status !== "connected");

  return (
    <section id="integrations" className="mx-auto w-full max-w-4xl px-4 py-20 sm:px-6 sm:py-24">
      <SectionIntro
        eyebrow="Integrations"
        title="Wired to the systems AP already uses."
        body="Live now connectors are simulated here. Coming-soon adapters share the same interface."
      />
      <p className="mt-10 text-[11px] uppercase tracking-[0.16em] text-gold">Live now</p>
      <p className="mt-3 font-figure text-xl leading-9 text-gold/90 sm:text-2xl">
        {liveNow.map((item) => item.name).join("  ·  ")}
      </p>
      <p className="mt-8 text-[11px] uppercase tracking-[0.16em] text-gold/70">Coming soon</p>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        {comingSoon.map((item) => item.name).join("  ·  ")}
      </p>
    </section>
  );
}
