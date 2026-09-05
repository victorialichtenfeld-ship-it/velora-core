"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { paidPlans } from "@/lib/plans";

function PayInner() {
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
            Add <code>STRIPE_SECRET_KEY</code> and a webhook at <code>/api/stripe/webhook</code>. Until then, this environment can open a workspace after the company details are saved so you can test the paid path.
          </p>
        </div>
      )}
      {error ? <p className="mt-4 text-sm text-destructive">{error}</p> : null}
      <Button
        className="mt-6 h-11"
        disabled={!orderId || pending}
        onClick={async () => {
          setPending(true);
          setError("");
          const response = await fetch("/api/billing/claim", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderId }),
          });
          setPending(false);
          if (!response.ok) {
            setError("Could not open the workspace. Confirm ALLOW_OFFLINE_CHECKOUT is on, or connect Stripe.");
            return;
          }
          window.location.href = "/dashboard";
        }}
      >
        {pending ? "Opening…" : "Continue to workspace"}
      </Button>
    </>
  );
}

export default function BillingPayPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-lg flex-col justify-center px-4 py-16">
      <Link href="/" className="mb-8">
        <Logo />
      </Link>
      <Suspense fallback={<p className="text-sm text-muted-foreground">Loading checkout…</p>}>
        <PayInner />
      </Suspense>
      <Link href="/#pricing" className="mt-4 text-sm text-muted-foreground hover:text-foreground">
        Back to pricing
      </Link>
    </main>
  );
}
