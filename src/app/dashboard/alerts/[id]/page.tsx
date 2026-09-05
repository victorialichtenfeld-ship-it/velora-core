"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { AskVelora } from "@/components/dashboard/ask-velora";
import { useDemo } from "@/components/demo-store";
import { GlassPanel } from "@/components/glass-panel";
import { SeverityBadge } from "@/components/severity-badge";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatRelativeTime } from "@/lib/format";
import type { AlertStatus } from "@/lib/types";

export default function AlertDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { alerts, setAlertStatus } = useDemo();
  const alert = alerts.find((item) => item.id === params.id);

  if (!alert) {
    return (
      <div>
        <h1 className="font-serif text-3xl">Alert not found</h1>
        <Link href="/dashboard/alerts" className="mt-4 inline-flex text-sm text-gold hover:underline">
          Back to alerts
        </Link>
      </div>
    );
  }

  const current = alert;

  function act(status: AlertStatus) {
    setAlertStatus(current.id, status);
    router.push("/dashboard/alerts");
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Link href="/dashboard/alerts" className="text-sm text-muted-foreground hover:text-foreground">
        ← All alerts
      </Link>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="font-serif text-3xl">{alert.title}</h1>
            <SeverityBadge severity={alert.severity} />
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {alert.actor} · {formatRelativeTime(alert.detectedAt)}
          </p>
        </div>
        <div className="rounded-2xl bg-risk/10 px-4 py-3 ring-1 ring-risk/25">
          <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Money at risk</p>
          <p className="font-figure text-2xl text-risk">{formatCurrency(alert.dollarImpact)}</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <GlassPanel className="p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-gold">What happened</p>
          <p className="mt-2 text-sm leading-6">{alert.summary}</p>
        </GlassPanel>
        <GlassPanel className="p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-gold">Why it matters</p>
          <p className="mt-2 text-sm leading-6">{alert.whyItMatters}</p>
        </GlassPanel>
      </div>

      <GlassPanel className="p-5" glow="risk">
        <p className="text-xs uppercase tracking-[0.16em] text-risk">Why Velora flagged it</p>
        <p className="mt-2 text-sm leading-6">{alert.whyFlagged}</p>
        {alert.blocked ? (
          <p className="mt-4 text-sm text-protect">Blocked before sending or paying. Waiting on a human.</p>
        ) : (
          <p className="mt-4 text-sm text-warn">Warned. The action can still proceed if you approve it.</p>
        )}
      </GlassPanel>

      <GlassPanel className="p-5">
        <p className="text-xs uppercase tracking-[0.16em] text-gold">Evidence</p>
        <dl className="mt-4 grid gap-3 sm:grid-cols-2">
          {alert.evidence.map((item) => (
            <div
              key={`${item.label}-${item.value}`}
              className={`rounded-xl px-3 py-3 ring-1 ${
                item.highlight ? "bg-risk/10 ring-risk/30" : "bg-ink/5 ring-ink/8"
              }`}
            >
              <dt className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">{item.label}</dt>
              <dd className="mt-1 font-mono text-sm">{item.value}</dd>
              <p className="mt-1 text-[11px] text-muted-foreground">{item.source}</p>
            </div>
          ))}
        </dl>
      </GlassPanel>

      <GlassPanel className="p-5">
        <p className="text-xs uppercase tracking-[0.16em] text-gold">What you should do</p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <Button className="h-11" onClick={() => act("resolved")}>
            {alert.recommendedActions[0]?.label ?? "Fix now"}
          </Button>
          <Button variant="outline" className="h-11" onClick={() => act("approved")}>
            Approve anyway
          </Button>
          <Button variant="outline" className="h-11" onClick={() => act("escalated")}>
            Escalate
          </Button>
          <Button variant="ghost" className="h-11" onClick={() => act("ignored")}>
            Ignore
          </Button>
        </div>
        <div className="mt-5">
          <AskVelora alert={alert} />
        </div>
      </GlassPanel>
    </div>
  );
}
