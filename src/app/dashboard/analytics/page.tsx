"use client";

import { GlassPanel } from "@/components/glass-panel";
import { RiskTrendChart, RiskTypeChart } from "@/components/dashboard/charts";
import { useDemo } from "@/components/demo-store";
import { dashboardStats } from "@/lib/data/demo";
import { formatCurrency } from "@/lib/format";

export default function AnalyticsPage() {
  const { alerts } = useDemo();
  const byTeam = alerts.reduce<Record<string, number>>((acc, alert) => {
    acc[alert.team] = (acc[alert.team] ?? 0) + alert.dollarImpact;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-gold">Analytics</p>
        <h1 className="mt-1 font-serif text-3xl">Which mistakes are worth the subscription</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Use this view in customer conversations: if duplicate payments and pricing leakage dominate, that is the wedge.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <GlassPanel className="p-5">
          <p className="text-xs text-muted-foreground">Protected this month</p>
          <p className="mt-2 font-figure text-2xl text-gold">{formatCurrency(dashboardStats.moneyProtected)}</p>
        </GlassPanel>
        <GlassPanel className="p-5">
          <p className="text-xs text-muted-foreground">Open alerts</p>
          <p className="mt-2 font-figure text-2xl">{alerts.filter((alert) => alert.status === "open").length}</p>
        </GlassPanel>
        <GlassPanel className="p-5">
          <p className="text-xs text-muted-foreground">Avg. catch</p>
          <p className="mt-2 font-figure text-2xl">
            {formatCurrency(Math.round(alerts.reduce((sum, alert) => sum + alert.dollarImpact, 0) / alerts.length))}
          </p>
        </GlassPanel>
      </div>
      <div className="grid gap-4 xl:grid-cols-2">
        <GlassPanel className="p-5">
          <p className="mb-4 text-sm font-medium">Value protected</p>
          <RiskTrendChart />
        </GlassPanel>
        <GlassPanel className="p-5">
          <p className="mb-4 text-sm font-medium">Loss by mistake type</p>
          <RiskTypeChart />
        </GlassPanel>
      </div>
      <GlassPanel className="p-5">
        <p className="text-sm font-medium">Impact by team</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {Object.entries(byTeam).map(([team, value]) => (
            <div key={team} className="rounded-xl bg-ink/5 p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{team}</p>
              <p className="mt-1 font-mono text-lg">{formatCurrency(value)}</p>
            </div>
          ))}
        </div>
      </GlassPanel>
    </div>
  );
}
