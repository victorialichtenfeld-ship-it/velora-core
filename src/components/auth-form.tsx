"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GlassPanel } from "@/components/glass-panel";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const [email, setEmail] = useState("jordan@meridian-supply.com");
  const [name, setName] = useState("Jordan Hale");
  const [company, setCompany] = useState("Meridian Supply");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(demo = false) {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          demo,
          email,
          name,
          company,
          role: "VP of Finance",
        }),
      });
      if (!response.ok) throw new Error("Could not start session");
      router.push(demo ? "/dashboard" : "/onboarding");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-16">
      <div className="pointer-events-none absolute inset-0 grid-fade" />
      <div className="relative w-full max-w-md">
        <Link href="/" className="mb-8 flex justify-center">
          <Logo />
        </Link>
        <GlassPanel className="p-6 sm:p-8" glow="gold">
          <p className="text-xs uppercase tracking-[0.18em] text-gold">
            {mode === "signup" ? "Start a workspace" : "Welcome back"}
          </p>
          <h1 className="mt-2 font-serif text-3xl">
            {mode === "signup" ? "Try Velora on demo data." : "Enter the Meridian workspace."}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Authentication is mocked for this prototype. Use any details, or launch the prepared Finance demo.
          </p>
          <form
            className="mt-6 space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              void submit(false);
            }}
          >
            {mode === "signup" ? (
              <>
                <Field label="Full name" value={name} onChange={setName} />
                <Field label="Company" value={company} onChange={setCompany} />
              </>
            ) : null}
            <Field label="Work email" value={email} onChange={setEmail} type="email" />
            <Field label="Password" value="••••••••" onChange={() => undefined} type="password" />
            {error ? <p className="text-sm text-risk">{error}</p> : null}
            <Button type="submit" className="h-11 w-full" disabled={loading}>
              {loading ? "Opening…" : mode === "signup" ? "Create workspace" : "Sign in"}
            </Button>
          </form>
          <Button
            type="button"
            variant="outline"
            className="mt-3 h-11 w-full border-white/15"
            disabled={loading}
            onClick={() => void submit(true)}
          >
            Launch demo workspace
          </Button>
          <p className="mt-5 text-center text-sm text-muted-foreground">
            {mode === "signup" ? (
              <>
                Already have access?{" "}
                <Link href="/login" className="text-gold hover:underline">
                  Sign in
                </Link>
              </>
            ) : (
              <>
                New here?{" "}
                <Link href="/signup" className="text-gold hover:underline">
                  Try Velora
                </Link>
              </>
            )}
          </p>
        </GlassPanel>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 bg-black/30"
      />
    </div>
  );
}
