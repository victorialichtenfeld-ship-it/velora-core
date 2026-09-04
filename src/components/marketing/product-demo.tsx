"use client";

import { useState } from "react";
import { AnimatedNumber } from "@/components/animated-number";
import { SeverityBadge } from "@/components/severity-badge";
import { detectedAlerts } from "@/lib/risk-engine";
import { dashboardStats } from "@/lib/data/demo";
import { formatCurrency } from "@/lib/format";

export function ProductDemo() {
  const [selected, setSelected] = useState(detectedAlerts[0]?.id);
  const alert = detectedAlerts.find((item) => item.id === selected) ?? detectedAlerts[0];

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <p className="text-xs uppercase tracking-[0.2em] text-primary">Product</p>
      <h2 className="mt-3 font-serif text-3xl sm:text-4xl">A command center for expensive mistakes.</h2>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        This is the same demo workspace customers walk through. Metrics, alerts, and actions are live against sample Meridian Supply data.
      </p>

      <div className="product-frame mt-10 rounded-[28px] p-4 ring-1 ring-white/10 sm:p-6">
        <div className="mb-4 flex items-center justify-between text-[#F4EFE6]/80">
          <p className="text-sm">Meridian Supply · Finance workspace</p>
          <span className="rounded-full bg-[#5EC8B8]/15 px-2.5 py-1 text-[11px] text-[#8EE0D2]">Demo mode</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Metric label="Money protected" value={dashboardStats.moneyProtected} prefix="$" />
          <Metric label="Mistakes prevented" value={dashboardStats.mistakesPrevented} />
          <Metric label="High-risk alerts" value={dashboardStats.highRisk} />
          <Metric label="Connected systems" value={dashboardStats.connectedSystems} />
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.16em] text-white/50">Recent alerts</p>
            {detectedAlerts.slice(0, 4).map((item) => (
              <button
                key={item.id}
                onClick={() => setSelected(item.id)}
                className={`w-full rounded-xl px-3 py-3 text-left ring-1 transition ${
                  selected === item.id
                    ? "bg-white/10 ring-[#E2C58D]/40"
                    : "bg-black/20 ring-white/10 hover:bg-white/5"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm text-white">{item.title}</p>
                  <SeverityBadge severity={item.severity} />
                </div>
                <p className="mt-1 font-mono text-xs text-[#E2C58D]">{formatCurrency(item.dollarImpact)}</p>
              </button>
            ))}
          </div>
          {alert ? (
            <div className="rounded-2xl bg-black/25 p-4 ring-1 ring-white/10">
              <p className="text-xs uppercase tracking-[0.16em] text-white/50">Suggested action</p>
              <h3 className="mt-2 text-lg text-white">{alert.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/65">{alert.whyFlagged}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {alert.recommendedActions.map((action) => (
                  <span
                    key={action.id}
                    className={`rounded-full px-3 py-1 text-xs ring-1 ${
                      action.intent === "primary"
                        ? "bg-[#E2C58D]/15 text-[#E2C58D] ring-[#E2C58D]/30"
                        : "bg-white/5 text-white/60 ring-white/10"
                    }`}
                  >
                    {action.label}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function Metric({
  label,
  value,
  prefix,
}: {
  label: string;
  value: number;
  prefix?: string;
}) {
  return (
    <div className="rounded-2xl bg-black/25 p-4 ring-1 ring-white/10">
      <p className="text-[11px] uppercase tracking-[0.14em] text-white/50">{label}</p>
      <p className="mt-2 text-2xl text-white">
        <AnimatedNumber value={value} prefix={prefix} />
      </p>
    </div>
  );
}
