"use client";

import { integrationsCatalog } from "@/lib/data/demo";
import { MotionCard } from "@/components/motion-card";
import { SectionIntro } from "@/components/marketing/section-intro";

export function IntegrationsSection() {
  const liveNow = integrationsCatalog.filter((item) => item.status === "connected");
  const comingSoon = integrationsCatalog.filter((item) => item.status !== "connected");

  return (
    <section id="integrations" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
      <SectionIntro
        eyebrow="Integrations"
        title="Wired to the systems AP already uses."
        body="Live now connectors are simulated in this walkthrough. Coming soon adapters share the same interface and can be swapped in without rewriting the product."
      />

      <Group title="Live now" items={liveNow} />
      <Group title="Coming soon" items={comingSoon} startDelay={0.12} />
    </section>
  );
}

function Group({
  title,
  items,
  startDelay = 0,
}: {
  title: string;
  items: { id: string; name: string; category: string }[];
  startDelay?: number;
}) {
  return (
    <div className="mt-8">
      <p className="text-[11px] uppercase tracking-[0.16em] text-gold">{title}</p>
      <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item, index) => (
          <li key={item.id}>
            <MotionCard delay={startDelay + index * 0.04} className="rounded-md p-0 px-4 py-3">
              <p className="text-sm font-medium">{item.name}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{item.category}</p>
            </MotionCard>
          </li>
        ))}
      </ul>
    </div>
  );
}
