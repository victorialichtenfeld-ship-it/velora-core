"use client";

import Link from "next/link";
import { AnimatedNumber } from "@/components/animated-number";
import { GlassPanel } from "@/components/glass-panel";
import { SampleDataBadge } from "@/components/sample-data-badge";
import { SeverityBadge } from "@/components/severity-badge";
import { RiskTrendChart } from "@/components/dashboard/charts";
import { useDemo } from "@/components/demo-store";
import { activityTimeline, dashboardStats } from "@/lib/data/demo";
import { formatCurrency, formatRelativeTime } from "@/lib/format";

export default function OverviewPage() {
  const { alerts, usingYourBooks, books } = useDemo();
  const open = alerts.filter((alert) => alert.status === "open");
  const protectedValue = usingYourBooks
    ? open.reduce((sum, alert) => sum + alert.dollarImpact, 0)
    : dashboardStats.moneyProtected;
  const highRisk = open.filter((alert) => alert.severity === "critical" || alert.severity === "high");
  const timeline = usingYourBooks
    ? alerts.slice(0, 6).map((alert) => ({
        id: alert.id,
        title: alert.title,
        detail: alert.summary,
        at: alert.detectedAt,
      }))
    : activityTimeline;
  const trend = usingYourBooks
    ? [{ day: "This import", protected: protectedValue, alerts: open.length }]
    : undefined;

  return (
    <div className="space-y-6">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">Overview</p>
          {usingYourBooks ? (
            <span className="inline-flex items-center rounded-full bg-protect/15 px-2 py-0.5 text-[11px] font-medium text-protect">
              Your books
            </span>
          ) : (
            <SampleDataBadge />
          )}
        </div>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">
          {usingYourBooks ? "Your invoices and payments" : "Meridian Supply walkthrough"}
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          {usingYourBooks
            ? `${books.invoices.length} invoices · ${books.payments.length} payments. Velora flags duplicates, pricing breaks, and over-limit spend. Nothing is auto-executed.`
            : "Prepared AP sample data — not a live customer and not a live QuickBooks connection. Import a CSV on Integrations to watch a company’s books."}
        </p>
        {!usingYourBooks ? (
          <p className="mt-3 text-sm">
            <Link href="/dashboard/integrations" className="text-gold hover:underline">
              Import invoices and payments →
            </Link>
          </p>
        ) : null}
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Total value protected" value={protectedValue} prefix="$" sample={!usingYourBooks} />
        <Stat
          label="Mistakes prevented"
          value={usingYourBooks ? alerts.filter((alert) => alert.status !== "open").length : dashboardStats.mistakesPrevented}
          sample={!usingYourBooks}
        />
        <Stat label="Open impact" value={open.reduce((sum, alert) => sum + alert.dollarImpact, 0)} prefix="$" />
        <Stat label="Live connections" value={0} />
      </div>
      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <GlassPanel className="p-5">
          <p className="text-sm font-medium">Risk trend</p>
          <p className="mb-4 text-xs text-muted-foreground">
            {usingYourBooks ? "Value flagged on the current import" : "Value protected over the last six weeks (sample)"}
          </p>
          <RiskTrendChart data={trend} />
        </GlassPanel>
        <GlassPanel className="p-5">
          <p className="text-sm font-medium">High-risk items</p>
          <div className="mt-4 space-y-3">
            {highRisk.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No high-risk flags on this set.{" "}
                <Link href="/dashboard/integrations" className="text-gold hover:underline">
                  Import more invoices
                </Link>
              </p>
            ) : (
              highRisk.slice(0, 5).map((alert) => (
                <Link
                  key={alert.id}
                  href={`/dashboard/alerts/${alert.id}`}
                  className="block rounded-xl bg-ink/5 p-3 ring-1 ring-ink/8 transition hover:ring-primary/30"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm">{alert.title}</p>
                    <SeverityBadge severity={alert.severity} />
                  </div>
                  <p className="mt-1 font-figure text-xs tabular text-gold">{formatCurrency(alert.dollarImpact)}</p>
                </Link>
              ))
            )}
          </div>
        </GlassPanel>
      </div>
      <div className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
        <GlassPanel className="p-5">
          <p className="text-sm font-medium">Activity timeline</p>
          <ol className="mt-4 space-y-4">
            {timeline.length === 0 ? (
              <li className="text-sm text-muted-foreground">No activity yet. Import a CSV on Integrations.</li>
            ) : (
              timeline.map((event) => (
                <li key={event.id} className="flex gap-3">
                  <span className="mt-1 size-2 rounded-full bg-gold" />
                  <div>
                    <p className="text-sm">{event.title}</p>
                    <p className="text-xs text-muted-foreground">{event.detail}</p>
                    <p className="mt-1 text-[11px] text-muted-foreground/70">{formatRelativeTime(event.at)}</p>
                  </div>
                </li>
              ))
            )}
          </ol>
        </GlassPanel>
        <GlassPanel className="p-5">
          <p className="text-sm font-medium">Data source</p>
          <ul className="mt-4 space-y-2">
            <li className="flex items-center justify-between rounded-xl bg-ink/5 px-3 py-2 text-sm">
              <span>{usingYourBooks ? "CSV / manual entry" : "Meridian sample records"}</span>
              <span className="text-xs text-muted-foreground">{usingYourBooks ? "Watching" : "Walkthrough"}</span>
            </li>
            <li className="rounded-xl bg-ink/5 px-3 py-2 text-sm text-muted-foreground">
              QuickBooks, Gmail, bank, and Slack OAuth are not built. Import CSV on{" "}
              <Link href="/dashboard/integrations" className="text-gold hover:underline">
                Integrations
              </Link>
              .
            </li>
          </ul>
        </GlassPanel>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  prefix,
  sample,
}: {
  label: string;
  value: number;
  prefix?: string;
  sample?: boolean;
}) {
  return (
    <GlassPanel className="p-5">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[11px] text-muted-foreground">{label}</p>
        {sample ? <SampleDataBadge /> : null}
      </div>
      <p className="mt-2 font-figure text-3xl tracking-tight text-gold">
        <AnimatedNumber value={value} prefix={prefix} />
      </p>
    </GlassPanel>
  );
}
