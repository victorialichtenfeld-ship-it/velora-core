"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { roles } from "@/lib/validation";
import { useValidation } from "@/components/validation/validation-provider";
import { track } from "@/lib/analytics-client";
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

  useEffect(() => {
    if (open) {
      setError("");
      setPending(false);
      setDone(false);
    }
  }, [open, lead?.source]);

  return (
    <Dialog open={open} onOpenChange={(next) => (!next ? closeLeadForm() : undefined)}>
      <DialogContent className="z-[80] max-h-[90vh] overflow-y-auto border border-white/12 bg-card sm:max-w-md" showCloseButton>
        {done ? (
          <div>
            <DialogHeader>
              <DialogTitle className="text-xl tracking-tight">You are on the list.</DialogTitle>
              <DialogDescription>
                We will follow up about early access. Meanwhile you can walk the live demo environment — connect your own tools in early access.
              </DialogDescription>
            </DialogHeader>
            <a
              href="#demo"
              className={cn(buttonVariants(), "mt-6 inline-flex h-11 w-full")}
              onClick={() => {
                track({ event: "cta_click", cta: "start_with_demo_data", location: "early_access_success" });
                closeLeadForm();
              }}
            >
              Start with demo data
            </a>
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
              const payload = {
                name: String(form.get("name") || ""),
                email: String(form.get("email") || ""),
                company: String(form.get("company") || ""),
                role: String(form.get("role") || ""),
                honeypot: String(form.get("company_website") || ""),
                plan: lead.plan,
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
              track({ event: "lead_submit", cta: lead.cta, plan: lead.plan, location: lead.source });
              setDone(true);
            }}
          >
            <DialogHeader>
              <DialogTitle className="text-xl tracking-tight">Get early access</DialogTitle>
              <DialogDescription>
                {lead?.cta === "talk_to_us"
                  ? "Tell us who to reach. We will follow up — no live calendar booking yet."
                  : "Name, work email, company, and role. We will reach out before a full signup is live."}
              </DialogDescription>
            </DialogHeader>
            {lead?.plan ? (
              <p className="mt-3 text-[13px] text-gold">
                Interested in {lead.plan === "starter" ? "Starter · $299/mo" : lead.plan === "growth" ? "Growth · $799/mo" : "Enterprise"}
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
            <Button type="submit" className="mt-5 h-11 w-full" disabled={pending}>
              {pending ? "Saving…" : lead?.cta === "talk_to_us" ? "Talk to us" : "Request early access"}
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
