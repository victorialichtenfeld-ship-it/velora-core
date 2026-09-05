"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

export default function BookPage() {
  const [sent, setSent] = useState(false);

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
              This prototype does not book a live calendar slot. Your details stay in this browser session so the conversion path is distinct from the self-serve trial.
            </p>
            <Link href="/" className="mt-6 inline-flex text-sm text-primary hover:underline">
              Back to Velora
            </Link>
          </div>
        ) : (
          <>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">Enterprise</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">Book a call with finance controls.</h1>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              For multi-entity AP, SSO, or a security review. If you want to click through sample alerts first, use See it work on the homepage.
            </p>
            <form
              className="mt-8 space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                setSent(true);
              }}
            >
              <Field label="Work email" name="email" type="email" defaultValue="jordan@meridian-supply.com" />
              <Field label="Company" name="company" defaultValue="Meridian Supply" />
              <Field label="Role" name="role" defaultValue="VP of Finance" />
              <Button type="submit" className="h-11 w-full">
                Request a call
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
  defaultValue,
  type = "text",
}: {
  label: string;
  name: string;
  defaultValue: string;
  type?: string;
}) {
  return (
    <label className="block space-y-1.5 text-sm font-medium">
      {label}
      <input
        name={name}
        type={type}
        required
        defaultValue={defaultValue}
        className="h-10 w-full rounded-xl border border-white/12 bg-white/5 px-3 text-sm font-normal outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      />
    </label>
  );
}
