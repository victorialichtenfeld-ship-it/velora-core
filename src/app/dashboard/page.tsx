"use client";

import Link from "next/link";
import { AnimatedNumber } from "@/components/animated-number";
import { GlassPanel } from "@/components/glass-panel";
import { SeverityBadge } from "@/components/severity-badge";
import { RiskTrendChart } from "@/components/dashboard/charts";
import { useDemo } from "@/components/demo-store";
import { activityTimeline, dashboardStats, integrationsCatalog } from "@/lib/data/demo";
import { formatCurrency, formatRelativeTime } from "@/lib/format";

export default function OverviewPage() {
  const { alerts, integrations } = useDemo();
  const open = alerts.filter((alert) => alert.status === "open");
  const connected = Object.values(integrations).filter((status) => status === "connected").length;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-gold">Overview</p>
        <h1 className="mt-1 font-serif text-3xl">Meridian Supply control room</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Velora is watching invoices, payments, contracts, and purchase orders. Nothing leaves without a human decision.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Total value protected" value={dashboardStats.moneyProtected} prefix="$" />
        <Stat label="Mistakes prevented" value={dashboardStats.mistakesPrevented} />
        <Stat label="Open impact" value={open.reduce((sum, alert) => sum + alert.dollarImpact, 0)} prefix="$" />
        <Stat label="Connected systems" value={connected} />
      </div>
      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <GlassPanel className="p-5">
          <p className="text-sm font-medium">Risk trend</p>
          <p className="mb-4 text-xs text-muted-foreground">Value protected over the last six weeks</p>
          <RiskTrendChart />
        </GlassPanel>
        <GlassPanel className="p-5">
          <p className="text-sm font-medium">High-risk items</p>
          <div className="mt-4 space-y-3">
            {open
              .filter((alert) => alert.severity === "critical" || alert.severity === "high")
              .slice(0, 5)
              .map((alert) => (
                <Link
                  key={alert.id}
                  href={`/dashboard/alerts/${alert.id}`}
                  className="block rounded-xl bg-ink/5 p-3 ring-1 ring-ink/8 transition hover:ring-gold/30"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm">{alert.title}</p>
                    <SeverityBadge severity={alert.severity} />
                  </div>
                  <p className="mt-1 font-mono text-xs text-gold">{formatCurrency(alert.dollarImpact)}</p>
                </Link>
              ))}
          </div>
        </GlassPanel>
      </div>
      <div className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
        <GlassPanel className="p-5">
          <p className="text-sm font-medium">Activity timeline</p>
          <ol className="mt-4 space-y-4">
            {activityTimeline.map((event) => (
              <li key={event.id} className="flex gap-3">
                <span
                  className={`mt-1 size-2 rounded-full ${
                    event.tone === "risk"
                      ? "bg-risk"
                      : event.tone === "protect"
                        ? "bg-protect"
                        : event.tone === "system"
                          ? "bg-gold"
                          : "bg-ink/30"
                  }`}
                />
                <div>
                  <p className="text-sm">{event.title}</p>
                  <p className="text-xs text-muted-foreground">{event.detail}</p>
                  <p className="mt-1 text-[11px] text-muted-foreground/70">{formatRelativeTime(event.at)}</p>
                </div>
              </li>
            ))}
          </ol>
        </GlassPanel>
        <GlassPanel className="p-5">
          <p className="text-sm font-medium">Connected systems</p>
          <ul className="mt-4 space-y-2">
            {integrationsCatalog
              .filter((item) => integrations[item.id] === "connected")
              .map((item) => (
                <li key={item.id} className="flex items-center justify-between rounded-xl bg-ink/5 px-3 py-2 text-sm">
                  <span>{item.name}</span>
                  <span className="text-xs text-protect">Live · demo</span>
                </li>
              ))}
          </ul>
        </GlassPanel>
      </div>
    </div>
  );
}

function Stat({ label, value, prefix }: { label: string; value: number; prefix?: string }) {
  return (
    <GlassPanel className="p-5">
      <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
      <p className="mt-2 text-2xl">
        <AnimatedNumber value={value} prefix={prefix} />
      </p>
    </GlassPanel>
  );
}
