"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { roles, type LeadPayload } from "@/lib/validation";
import { useValidation } from "@/components/validation/validation-provider";
import { track } from "@/lib/analytics-client";
import { startCheckout } from "@/lib/start-checkout";
import { paidPlans } from "@/lib/plans";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button-variants";

const fieldClass =
  "h-10 w-full rounded-xl border border-white/12 bg-white/5 px-3 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-primary/40";

export function EarlyAccessDialog() {
  const { lead, closeLeadForm } = useValidation();
  const open = Boolean(lead);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);
  const [paying, setPaying] = useState(false);
  const [stripeReady, setStripeReady] = useState(false);
  const [saved, setSaved] = useState({ name: "", email: "", company: "", role: "" });

  useEffect(() => {
    if (open) {
      setError("");
      setPending(false);
      setDone(false);
      setPaying(false);
      void fetch("/api/billing/status")
        .then((response) => response.json())
        .then((data: { stripe?: boolean }) => setStripeReady(Boolean(data.stripe)));
    }
  }, [open, lead?.source]);

  const paidPlan = lead?.plan === "growth" ? "growth" : "starter";
  const wantsPay = lead?.cta !== "talk_to_us";

  return (
    <Dialog open={open} onOpenChange={(next) => (!next ? closeLeadForm() : undefined)}>
      <DialogContent className="z-[80] max-h-[90vh] overflow-y-auto border border-white/12 bg-card sm:max-w-md" showCloseButton>
        {done ? (
          <div>
            <DialogHeader>
              <DialogTitle className="text-xl tracking-tight">
                {wantsPay ? "Continue to payment." : "You are on the list."}
              </DialogTitle>
              <DialogDescription>
                {wantsPay
                  ? `Starter is ${paidPlans.starter.label}. Growth is ${paidPlans.growth.label}. You pay on the next screen. Cancel any time from workspace Settings.`
                  : "We will follow up. Meanwhile you can walk the live demo environment."}
              </DialogDescription>
            </DialogHeader>
            {wantsPay ? (
              <Button
                className="mt-6 h-11 w-full"
                disabled={paying}
                onClick={async () => {
                  setPaying(true);
                  try {
                    await startCheckout({
                      plan: lead?.plan === "growth" ? "growth" : "starter",
                      name: saved.name,
                      email: saved.email,
                      company: saved.company,
                      role: saved.role,
                      source: lead?.source || "dialog",
                    });
                  } catch (cause) {
                    setPaying(false);
                    setError(cause instanceof Error ? cause.message : "Could not start checkout.");
                  }
                }}
              >
                {paying
                  ? "Redirecting…"
                  : stripeReady
                    ? `Pay ${paidPlans[paidPlan].label}`
                    : `Continue to ${paidPlans[paidPlan].name}`}
              </Button>
            ) : null}
            <a
              href="#demo"
              className={cn(buttonVariants({ variant: wantsPay ? "outline" : "default" }), "mt-3 inline-flex h-11 w-full")}
              onClick={() => {
                track({ event: "cta_click", cta: "start_with_demo_data", location: "early_access_success" });
                closeLeadForm();
              }}
            >
              Start with demo data
            </a>
            {error ? <p className="mt-3 text-sm text-destructive">{error}</p> : null}
            <button type="button" className="mt-3 w-full text-center text-sm text-muted-foreground hover:text-foreground" onClick={closeLeadForm}>
              Close
            </button>
          </div>
        ) : (
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              if (!lead) return;
              setPending(true);
              setError("");
              const form = new FormData(event.currentTarget);
              const payload: LeadPayload = {
                name: String(form.get("name") || ""),
                email: String(form.get("email") || ""),
                company: String(form.get("company") || ""),
                role: String(form.get("role") || ""),
                honeypot: String(form.get("company_website") || ""),
                plan: lead.plan || (wantsPay ? "starter" : ""),
                source: lead.source,
                cta: lead.cta,
              };
              const response = await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
              });
              const result = (await response.json()) as { ok: boolean; error?: string };
              setPending(false);
              if (!response.ok || !result.ok) {
                setError(result.error || "Could not save that. Try again.");
                return;
              }
              setSaved({
                name: payload.name,
                email: payload.email,
                company: payload.company,
                role: payload.role,
              });
              track({ event: "lead_submit", cta: lead.cta, plan: payload.plan, location: lead.source });
              if (wantsPay) {
                setPaying(true);
                try {
                  await startCheckout({
                    plan: lead.plan === "growth" ? "growth" : "starter",
                    name: payload.name,
                    email: payload.email,
                    company: payload.company,
                    role: payload.role,
                    source: lead.source || "dialog",
                  });
                  return;
                } catch (cause) {
                  setPaying(false);
                  setError(cause instanceof Error ? cause.message : "Could not start checkout.");
                  setDone(true);
                  return;
                }
              }
              setDone(true);
            }}
          >
            <DialogHeader>
              <DialogTitle className="text-xl tracking-tight">
                {lead?.cta === "talk_to_us" ? "Talk to us" : "Start Velora"}
              </DialogTitle>
              <DialogDescription>
                {lead?.cta === "talk_to_us"
                  ? "Tell us who to reach for Enterprise, SSO, or a security review."
                  : "Company details first. Then pay monthly — or walk the live demo."}
              </DialogDescription>
            </DialogHeader>
            {lead?.plan ? (
              <p className="mt-3 text-[13px] text-gold">
                {lead.plan === "starter" ? "Starter · $299/mo" : lead.plan === "growth" ? "Growth · $799/mo" : "Enterprise"}
              </p>
            ) : null}
            <div className="mt-5 space-y-3">
              <label className="block space-y-1.5 text-sm font-medium">
                Name
                <input name="name" required autoComplete="name" className={fieldClass} />
              </label>
              <label className="block space-y-1.5 text-sm font-medium">
                Work email
                <input name="email" type="email" required autoComplete="email" className={fieldClass} />
              </label>
              <label className="block space-y-1.5 text-sm font-medium">
                Company
                <input name="company" required autoComplete="organization" className={fieldClass} />
              </label>
              <label className="block space-y-1.5 text-sm font-medium">
                Role
                <select name="role" required defaultValue="" className={fieldClass}>
                  <option value="" disabled>
                    Select role
                  </option>
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </label>
              <input name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
            </div>
            {error ? <p className="mt-3 text-sm text-destructive">{error}</p> : null}
            <Button type="submit" className="mt-5 h-11 w-full" disabled={pending || paying}>
              {pending || paying
                ? paying
                  ? "Opening checkout…"
                  : "Saving…"
                : lead?.cta === "talk_to_us"
                  ? "Talk to us"
                  : stripeReady
                    ? `Continue to pay ${paidPlans[paidPlan].label}`
                    : "Continue to payment"}
            </Button>
            <p className="mt-3 text-[12px] leading-5 text-muted-foreground">
              Live demo environment — connect your own tools in early access. Nothing is auto-executed.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
