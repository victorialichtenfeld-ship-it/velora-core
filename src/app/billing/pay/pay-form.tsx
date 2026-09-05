"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button-variants";
import { paidPlans } from "@/lib/plans";
import { cn } from "@/lib/utils";

export function PayForm() {
  const params = useSearchParams();
  const orderId = params.get("order") || "";
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [stripeReady, setStripeReady] = useState(false);

  useEffect(() => {
    void fetch("/api/billing/status")
      .then((response) => response.json())
      .then((data: { stripe?: boolean }) => setStripeReady(Boolean(data.stripe)));
  }, []);

  return (
    <>
      <p className="text-[13px] font-medium text-gold">Checkout</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">Pay for Velora monthly.</h1>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        Starter is {paidPlans.starter.label}. Growth is {paidPlans.growth.label}. Subscriptions are billed by Stripe and renew until you cancel.
      </p>
      {stripeReady ? (
        <p className="mt-4 text-sm text-gold">Stripe is connected. Return to pricing and choose a plan to open Checkout.</p>
      ) : (
        <div className="glass mt-6 rounded-2xl p-5 text-sm leading-6 text-muted-foreground">
          <p className="font-medium text-foreground">Stripe is not connected on this deployment yet.</p>
          <p className="mt-2">
            Add <code>STRIPE_SECRET_KEY</code> and a webhook at <code>/api/stripe/webhook</code>. Until then, this environment can open a workspace after you subscribe from pricing.
          </p>
        </div>
      )}
      {error ? <p className="mt-4 text-sm text-destructive">{error}</p> : null}
      {orderId ? (
        <Button
          className="mt-6 h-11"
          disabled={pending}
          onClick={async () => {
            setPending(true);
            setError("");
            const response = await fetch("/api/billing/claim", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ orderId }),
            });
            if (!response.ok) {
              setPending(false);
              setError("Could not open the workspace. Subscribe from pricing, or connect Stripe.");
              return;
            }
            window.location.href = "/dashboard";
          }}
        >
          {pending ? "Opening…" : "Continue to workspace"}
        </Button>
      ) : (
        <div className="mt-6 space-y-3">
          <p className="text-sm text-muted-foreground">
            This checkout link is missing an order. Subscribe from pricing to start a $299 or $799 plan.
          </p>
          <Link href="/#pricing" className={cn(buttonVariants(), "inline-flex h-11 px-5")}>
            Go to pricing
          </Link>
        </div>
      )}
    </>
  );
}
