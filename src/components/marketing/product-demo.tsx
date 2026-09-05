"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Lock } from "lucide-react";
import { SectionIntro } from "@/components/marketing/section-intro";
import { launchDemoWorkspace } from "@/app/auth-actions";
import { SampleDataBadge } from "@/components/sample-data-badge";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/format";
import { detectedAlerts } from "@/lib/risk-engine";
import type { Alert, AlertStatus } from "@/lib/types";

const walkthroughIds = new Set(
  detectedAlerts
    .filter((alert) => alert.riskType === "duplicate_payment" || alert.riskType === "pricing_mismatch")
    .map((alert) => alert.id)
);

type Decision = Extract<AlertStatus, "resolved" | "approved" | "ignored">;

export function ProductDemo() {
  const alerts = useMemo(
    () => detectedAlerts.filter((alert) => walkthroughIds.has(alert.id)).slice(0, 2),
    []
  );
  const [selected, setSelected] = useState(alerts[0]?.id);
  const [decisions, setDecisions] = useState<Record<string, Decision>>({});
  const alert = alerts.find((item) => item.id === selected) ?? alerts[0];
  const decision = alert ? decisions[alert.id] : undefined;

  return (
    <section id="demo" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
      <SectionIntro
        eyebrow="Interactive walkthrough"
        title="Walk an alert from evidence to decision."
        body="This is the Meridian Supply walkthrough — a prepared finance workspace, not a live customer. Open an alert, read the match, then hold, approve, or dismiss it."
      />

      <div className="gold-desk relative mt-10 overflow-hidden p-6 sm:p-8">
        <span className="animate-rail pointer-events-none absolute top-0 left-0 h-px w-1/3 bg-gold" />
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="inline-flex items-center gap-2 text-[13px] font-medium">
              <span className="relative flex size-2">
                <span className="animate-pulse-ring absolute inset-0 rounded-full bg-gold" />
                <span className="relative size-2 rounded-full bg-gold" />
              </span>
              Velora control · Meridian Supply
            </p>
            <p className="mt-1 text-sm text-muted-foreground">Jordan Hale · VP of Finance</p>
          </div>
          <SampleDataBadge />
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="space-y-1">
            {alerts.map((item) => {
              const active = selected === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelected(item.id)}
                  className={`w-full rounded-2xl px-4 py-4 text-left transition ${
                    active ? "bg-gold/12" : "hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm text-foreground">{item.title}</p>
                    <DecisionChip decision={decisions[item.id]} />
                  </div>
                </button>
              );
            })}
          </div>
          {alert ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={alert.id}
                initial={{ y: 10 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.25 }}
              >
                <AlertWorkbench
                  alert={alert}
                  decision={decision}
                  onDecide={(next) => setDecisions((current) => ({ ...current, [alert.id]: next }))}
                  onReset={() =>
                    setDecisions((current) => {
                      const next = { ...current };
                      delete next[alert.id];
                      return next;
                    })
                  }
                />
              </motion.div>
            </AnimatePresence>
          ) : null}
        </div>
      </div>

      <form action={launchDemoWorkspace} className="mt-5">
        <Button type="submit" variant="outline" className="h-10">
          Open the full walkthrough workspace
        </Button>
      </form>
    </section>
  );
}

function DecisionChip({ decision }: { decision?: Decision }) {
  if (!decision) {
    return <span className="text-[11px] text-muted-foreground">Open</span>;
  }
  if (decision === "resolved") {
    return <span className="text-[11px] font-medium text-gold">Held</span>;
  }
  if (decision === "approved") {
    return <span className="text-[11px] font-medium text-muted-foreground">Approved</span>;
  }
  return <span className="text-[11px] font-medium text-muted-foreground">Dismissed</span>;
}

function AlertWorkbench({
  alert,
  decision,
  onDecide,
  onReset,
}: {
  alert: Alert;
  decision?: Decision;
  onDecide: (decision: Decision) => void;
  onReset: () => void;
}) {
  const held = decision === "resolved";
  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <p className="text-[12px] text-muted-foreground">Evidence</p>
        {held ? (
          <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-gold">
            <Lock className="size-3.5" />
            Locked
          </span>
        ) : null}
      </div>
      <p className="font-figure mt-3 text-5xl leading-none tracking-[-0.04em] text-gold sm:text-6xl">
        {formatCurrency(alert.dollarImpact)}
      </p>
      <h3 className="mt-4 text-xl font-medium">{alert.title}</h3>
      <p className="mt-2 max-w-lg text-sm leading-7 text-muted-foreground">{alert.whyFlagged}</p>
      <dl className="mt-6 divide-y divide-border border-y border-border">
        {alert.evidence.map((item) => (
          <div key={`${item.label}-${item.value}`} className="flex items-baseline justify-between gap-4 py-2.5">
            <dt className="text-[12px] text-muted-foreground">{item.label}</dt>
            <dd className={`font-figure text-base ${item.highlight ? "text-gold" : "text-muted-foreground"}`}>
              {item.value}
            </dd>
          </div>
        ))}
      </dl>

      {decision ? (
        <motion.div initial={{ y: 8 }} animate={{ y: 0 }} className="mt-6 rounded-2xl border border-gold/20 bg-gold/8 py-3 pl-4">
          <p className="text-sm font-medium">
            {decision === "resolved" && "Hold recorded. The second payment does not leave the account."}
            {decision === "approved" && "Override recorded. You released it with a named decision."}
            {decision === "ignored" && "Dismiss recorded. The alert is closed without a hold."}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">Sample walkthrough only. No live bank or ERP action was taken.</p>
          <button type="button" onClick={onReset} className={cn(buttonVariants({ variant: "ghost" }), "mt-2 h-8 px-2")}>
            Reset this alert
          </button>
        </motion.div>
      ) : (
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <Button type="button" className="h-11 px-5 text-[14px]" onClick={() => onDecide("resolved")}>
            {alert.recommendedActions[0]?.label ?? "Hold payment"}
          </Button>
          <Button type="button" variant="outline" className="h-11" onClick={() => onDecide("approved")}>
            Approve anyway
          </Button>
          <Button type="button" variant="ghost" className="h-11" onClick={() => onDecide("ignored")}>
            Dismiss
          </Button>
        </div>
      )}
    </div>
  );
}
