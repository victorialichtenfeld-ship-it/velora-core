"use client";

import { GlassPanel } from "@/components/glass-panel";
import { RiskTrendChart, RiskTypeChart } from "@/components/dashboard/charts";
import { useDemo } from "@/components/demo-store";
import { dashboardStats } from "@/lib/data/demo";
import { formatCurrency } from "@/lib/format";
import type { RiskType } from "@/lib/types";

const typeLabel: Record<RiskType, string> = {
  duplicate_invoice: "Duplicate invoices",
  duplicate_payment: "Duplicate payments",
  pricing_mismatch: "Pricing leakage",
  large_discount: "Unauthorized discounts",
  purchase_over_limit: "Over-limit spend",
  contract_invoice_mismatch: "Contract conflicts",
  suspicious_payment: "Suspicious spend",
};

export default function AnalyticsPage() {
  const { alerts, usingYourBooks } = useDemo();
  const byTeam = alerts.reduce<Record<string, number>>((acc, alert) => {
    acc[alert.team] = (acc[alert.team] ?? 0) + alert.dollarImpact;
    return acc;
  }, {});
  const byType = Object.entries(
    alerts.reduce<Record<string, number>>((acc, alert) => {
      const label = typeLabel[alert.riskType] ?? alert.riskType;
      acc[label] = (acc[label] ?? 0) + alert.dollarImpact;
      return acc;
    }, {})
  ).map(([type, value]) => ({ type, value }));
  const openImpact = alerts
    .filter((alert) => alert.status === "open")
    .reduce((sum, alert) => sum + alert.dollarImpact, 0);
  const avg = alerts.length ? Math.round(alerts.reduce((sum, alert) => sum + alert.dollarImpact, 0) / alerts.length) : 0;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-gold">Analytics</p>
        <h1 className="mt-1 font-serif text-3xl">Which mistakes are worth the subscription</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          {usingYourBooks
            ? "Figures below are from the invoices and payments you imported."
            : "Sample walkthrough numbers. Import a CSV on Integrations to replace these with a company’s books."}
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <GlassPanel className="p-5">
          <p className="text-xs text-muted-foreground">{usingYourBooks ? "Open impact" : "Protected this month"}</p>
          <p className="mt-2 font-figure text-2xl text-gold">
            {formatCurrency(usingYourBooks ? openImpact : dashboardStats.moneyProtected)}
          </p>
        </GlassPanel>
        <GlassPanel className="p-5">
          <p className="text-xs text-muted-foreground">Open alerts</p>
          <p className="mt-2 font-figure text-2xl">{alerts.filter((alert) => alert.status === "open").length}</p>
        </GlassPanel>
        <GlassPanel className="p-5">
          <p className="text-xs text-muted-foreground">Avg. catch</p>
          <p className="mt-2 font-figure text-2xl">{formatCurrency(avg)}</p>
        </GlassPanel>
      </div>
      <div className="grid gap-4 xl:grid-cols-2">
        <GlassPanel className="p-5">
          <p className="mb-4 text-sm font-medium">Value protected</p>
          <RiskTrendChart
            data={
              usingYourBooks ? [{ day: "This import", protected: openImpact, alerts: alerts.length }] : undefined
            }
          />
        </GlassPanel>
        <GlassPanel className="p-5">
          <p className="mb-4 text-sm font-medium">Loss by mistake type</p>
          <RiskTypeChart data={usingYourBooks ? byType : undefined} />
        </GlassPanel>
      </div>
      <GlassPanel className="p-5">
        <p className="text-sm font-medium">Impact by team</p>
        {Object.keys(byTeam).length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">No flags on this set yet.</p>
        ) : (
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {Object.entries(byTeam).map(([team, value]) => (
              <div key={team} className="rounded-xl bg-ink/5 p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{team}</p>
                <p className="mt-1 font-mono text-lg">{formatCurrency(value)}</p>
              </div>
            ))}
          </div>
        )}
      </GlassPanel>
    </div>
  );
}
