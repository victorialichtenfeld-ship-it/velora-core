"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { roles } from "@/lib/validation";
import { track } from "@/lib/analytics-client";

export default function BookPage() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="px-4 pt-4 sm:px-6">
        <div className="nav-glass mx-auto flex h-14 w-full max-w-5xl items-center rounded-full px-4">
          <Link href="/">
            <Logo />
          </Link>
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col justify-center px-4 py-16">
        {sent ? (
          <div className="glass rounded-[1.5rem] p-6">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">Request received</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight">We will reach out to schedule.</h1>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              You are on the early-access list. Live demo environment — connect your own tools in early access.
            </p>
            <Link href="/#demo" className="mt-6 inline-flex text-sm text-primary hover:underline">
              Start with demo data
            </Link>
          </div>
        ) : (
          <>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">Enterprise</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">Talk to us about putting Velora in the path of invoices and payments.</h1>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              For multi-entity finance, SSO, or a security review. Velora still never auto-executes.
            </p>
            <form
              className="mt-8 space-y-4"
              onSubmit={async (event) => {
                event.preventDefault();
                setPending(true);
                setError("");
                const form = new FormData(event.currentTarget);
                track({ event: "cta_click", cta: "talk_to_us", plan: "enterprise", location: "book" });
                const response = await fetch("/api/leads", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    name: String(form.get("name") || ""),
                    email: String(form.get("email") || ""),
                    company: String(form.get("company") || ""),
                    role: String(form.get("role") || ""),
                    plan: "enterprise",
                    source: "book",
                    cta: "talk_to_us",
                  }),
                });
                const result = (await response.json()) as { ok: boolean; error?: string };
                setPending(false);
                if (!response.ok || !result.ok) {
                  setError(result.error || "Could not save that.");
                  return;
                }
                setSent(true);
              }}
            >
              <Field label="Name" name="name" />
              <Field label="Work email" name="email" type="email" />
              <Field label="Company" name="company" />
              <label className="block space-y-1.5 text-sm font-medium">
                Role
                <select
                  name="role"
                  required
                  defaultValue=""
                  className="h-10 w-full rounded-xl border border-white/12 bg-white/5 px-3 text-sm font-normal outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                >
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
              {error ? <p className="text-sm text-destructive">{error}</p> : null}
              <Button type="submit" className="h-11 w-full" disabled={pending}>
                {pending ? "Saving…" : "Talk to us"}
              </Button>
            </form>
          </>
        )}
      </main>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
}: {
  label: string;
  name: string;
  type?: string;
}) {
  return (
    <label className="block space-y-1.5 text-sm font-medium">
      {label}
      <input
        name={name}
        type={type}
        required
        className="h-10 w-full rounded-xl border border-white/12 bg-white/5 px-3 text-sm font-normal outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      />
    </label>
  );
}
