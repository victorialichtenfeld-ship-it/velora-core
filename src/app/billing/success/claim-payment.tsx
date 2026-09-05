"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export function ClaimPayment() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!sessionId) {
      setError("Missing checkout session.");
      return;
    }
    void (async () => {
      const response = await fetch("/api/billing/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });
      if (!response.ok) {
        setError("Payment is recorded, but we could not open the workspace. Sign in with the email you used at checkout.");
        return;
      }
      window.location.href = "/dashboard";
    })();
  }, [sessionId]);

  return (
    <>
      <h1 className="text-3xl font-semibold tracking-tight">Payment received.</h1>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        {error || "Opening your Velora workspace. Subscription renews monthly until you cancel."}
      </p>
      {error ? (
        <Link href="/login" className={cn(buttonVariants(), "mt-6 inline-flex h-11 px-5")}>
          Sign in
        </Link>
      ) : null}
    </>
  );
}
