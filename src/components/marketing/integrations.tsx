"use client";

import { integrationsCatalog } from "@/lib/data/demo";
import { SectionIntro } from "@/components/marketing/section-intro";
import { Stagger, StaggerItem } from "@/components/reveal";

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
      <p className="mt-10 flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-gold">
        <span className="size-1.5 rounded-full bg-gold animate-flash" />
        Live now
      </p>
      <Stagger className="mt-3 flex flex-wrap gap-x-3 gap-y-2 font-figure text-xl text-gold/90 sm:text-2xl">
        {liveNow.map((item, index) => (
          <StaggerItem key={item.name}>
            <span>
              {index > 0 ? <span className="mr-3 text-gold/40">·</span> : null}
              {item.name}
            </span>
          </StaggerItem>
        ))}
      </Stagger>
      <p className="mt-8 text-[11px] uppercase tracking-[0.16em] text-gold/70">Coming soon</p>
      <Stagger className="mt-3 flex flex-wrap gap-x-3 gap-y-2 text-sm leading-7 text-muted-foreground">
        {comingSoon.map((item, index) => (
          <StaggerItem key={item.name}>
            <span>
              {index > 0 ? <span className="mr-3 text-gold/30">·</span> : null}
              {item.name}
            </span>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
