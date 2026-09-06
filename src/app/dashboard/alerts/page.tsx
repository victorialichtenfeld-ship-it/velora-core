"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useDemo } from "@/components/demo-store";
import { GlassPanel } from "@/components/glass-panel";
import { SeverityBadge } from "@/components/severity-badge";
import { formatCurrency, formatRelativeTime } from "@/lib/format";
import type { AlertStatus, Severity } from "@/lib/types";

const filters: { id: "all" | Severity; label: string }[] = [
  { id: "all", label: "All" },
  { id: "critical", label: "Critical" },
  { id: "high", label: "High" },
  { id: "medium", label: "Medium" },
];

export default function AlertsPage() {
  const { alerts, usingYourBooks } = useDemo();
  const [severity, setSeverity] = useState<"all" | Severity>("all");
  const visible = useMemo(
    () => (severity === "all" ? alerts : alerts.filter((alert) => alert.severity === severity)),
    [alerts, severity]
  );

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-gold">Alerts</p>
        <h1 className="mt-1 font-serif text-3xl">What Velora caught</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {usingYourBooks
            ? "Flags on the invoices and payments you imported. Every alert answers what happened, why it matters, the evidence, and what to do."
            : "Meridian sample flags. Import a CSV on Integrations to watch a company’s invoices instead."}
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setSeverity(filter.id)}
            className={`rounded-full px-3 py-1 text-xs ring-1 ${
              severity === filter.id
                ? "bg-gold/15 text-foreground ring-gold/40"
                : "bg-card text-muted-foreground ring-ink/10"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {visible.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No flags on this set.{" "}
            <Link href="/dashboard/integrations" className="text-gold hover:underline">
              Import more invoices
            </Link>{" "}
            or relax a rule.
          </p>
        ) : null}
        {visible.map((alert) => (
          <Link key={alert.id} href={`/dashboard/alerts/${alert.id}`}>
            <GlassPanel className="p-5 transition hover:-translate-y-0.5 hover:ring-gold/30">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-base font-medium">{alert.title}</h2>
                    <SeverityBadge severity={alert.severity} />
                    <StatusChip status={alert.status} />
                  </div>
                  <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{alert.summary}</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {alert.system} · {formatRelativeTime(alert.detectedAt)}
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">At risk</p>
                  <p className="font-figure text-xl text-gold">{formatCurrency(alert.dollarImpact)}</p>
                </div>
              </div>
            </GlassPanel>
          </Link>
        ))}
      </div>
    </div>
  );
}

function StatusChip({ status }: { status: AlertStatus }) {
  const label =
    status === "open"
      ? "Open"
      : status === "approved"
        ? "Approved"
        : status === "ignored"
          ? "Ignored"
          : status === "escalated"
            ? "Escalated"
            : "Resolved";
  return (
    <span className="rounded-full bg-ink/6 px-2 py-0.5 text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
      {label}
    </span>
  );
}
