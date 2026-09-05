"use client";

import { integrationsCatalog } from "@/lib/data/demo";
import { SectionIntro } from "@/components/marketing/section-intro";

export function IntegrationsSection() {
  const liveNow = integrationsCatalog.filter((item) => item.status === "connected");
  const comingSoon = integrationsCatalog.filter((item) => item.status !== "connected");

  return (
    <section id="integrations" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <SectionIntro
        eyebrow="Integrations"
        title="Wired to the systems AP already uses."
        body="Live now connectors are simulated here. Coming-soon adapters share the same interface."
      />
      <p className="mt-10 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-gold">
        <span className="size-1.5 rounded-full bg-gold animate-flash" />
        Live now
      </p>
      <p className="font-figure mt-4 text-3xl leading-snug tracking-[-0.03em] text-gold sm:text-5xl sm:leading-[1.15]">
        {liveNow.map((item) => item.name).join("  ·  ")}
      </p>
      <p className="mt-8 text-[11px] uppercase tracking-[0.2em] text-gold/70">Coming soon</p>
      <p className="mt-3 font-figure text-xl leading-9 text-gold/55 sm:text-2xl">
        {comingSoon.map((item) => item.name).join("  ·  ")}
      </p>
    </section>
  );
}
