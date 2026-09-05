"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
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
    <section id="demo" className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">Interactive walkthrough</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Walk an alert from evidence to decision.</h2>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        This is the Meridian Supply walkthrough — a prepared finance workspace, not a live customer. Open an alert, read the match, then hold, approve, or dismiss it.
      </p>

      <div className="product-frame gold-glow mt-8 rounded-xl p-4 ring-1 ring-border sm:p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium">Meridian Supply · AP walkthrough</p>
            <p className="text-xs text-muted-foreground">Jordan Hale · VP of Finance · not live customer data</p>
          </div>
          <SampleDataBadge />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Metric label="Value held this month" value="$184,320" />
          <Metric label="Payments stopped" value="47" />
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Open alerts</p>
            <LayoutGroup>
            {alerts.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelected(item.id)}
                className={`relative w-full overflow-hidden rounded-md px-3 py-3 text-left ring-1 transition ${
                  selected === item.id ? "bg-secondary ring-primary/40" : "bg-background ring-border hover:bg-muted"
                }`}
              >
                {selected === item.id ? (
                  <motion.span
                    layoutId="demo-active"
                    className="absolute inset-y-0 left-0 w-0.5 bg-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                ) : null}
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm text-foreground">{item.title}</p>
                  <DecisionChip decision={decisions[item.id]} />
                </div>
                <p className="mt-1 font-mono text-sm tabular text-risk">{formatCurrency(item.dollarImpact)}</p>
              </button>
            ))}
            </LayoutGroup>
          </div>
          {alert ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28 }}
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

      <form action={launchDemoWorkspace} className="mt-4">
        <Button type="submit" variant="outline" className="h-10">
          Open the full walkthrough workspace
        </Button>
      </form>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-background p-4 ring-1 ring-border">
      <p className="text-[11px] text-muted-foreground">{label}</p>
      <p className="mt-2 font-mono text-3xl tabular tracking-tight text-protect sm:text-4xl">{value}</p>
    </div>
  );
}

function DecisionChip({ decision }: { decision?: Decision }) {
  if (!decision) {
    return <span className="text-[11px] text-muted-foreground">Open</span>;
  }
  if (decision === "resolved") {
    return <span className="text-[11px] font-medium text-protect">Held</span>;
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
  return (
    <div className="rounded-md bg-background p-4 ring-1 ring-border">
      <p className="text-xs text-muted-foreground">Evidence</p>
      <h3 className="mt-1 text-lg font-medium">{alert.title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{alert.whyFlagged}</p>
      <dl className="mt-4 grid gap-2 sm:grid-cols-2">
        {alert.evidence.map((item) => (
          <div
            key={`${item.label}-${item.value}`}
            className={`rounded-md px-3 py-2 ring-1 ${
              item.highlight ? "bg-risk/10 ring-risk/30" : "ring-border"
            }`}
          >
            <dt className="text-[11px] text-muted-foreground">{item.label}</dt>
            <dd className="mt-0.5 font-mono text-sm tabular">{item.value}</dd>
            <p className="text-[11px] text-muted-foreground">{item.source}</p>
          </div>
        ))}
      </dl>

      {decision ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-4 rounded-md p-3 ring-1 ${
            decision === "resolved" ? "bg-protect/10 ring-primary/30" : "bg-secondary ring-border"
          }`}
        >
          <p className="text-sm font-medium">
            {decision === "resolved" && "Decision recorded: hold. The second payment does not leave the account."}
            {decision === "approved" && "Decision recorded: approve. You overrode the hold with a named decision."}
            {decision === "ignored" && "Decision recorded: dismiss. The alert is closed without a hold."}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">Sample walkthrough only. No live bank or ERP action was taken.</p>
          <button type="button" onClick={onReset} className={cn(buttonVariants({ variant: "ghost" }), "mt-2 h-8 px-2")}>
            Reset this alert
          </button>
        </motion.div>
      ) : (
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <Button type="button" className="h-10" onClick={() => onDecide("resolved")}>
            {alert.recommendedActions[0]?.label ?? "Hold payment"}
          </Button>
          <Button type="button" variant="outline" className="h-10" onClick={() => onDecide("approved")}>
            Approve anyway
          </Button>
          <Button type="button" variant="ghost" className="h-10" onClick={() => onDecide("ignored")}>
            Dismiss
          </Button>
        </div>
      )}
    </div>
  );
}
