import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/glass-panel";
import { launchDemoWorkspace, startWorkspace } from "@/app/auth-actions";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-16">
      <div className="pointer-events-none absolute inset-0" />
      <div className="relative w-full max-w-md">
        <Link href="/" className="mb-8 flex justify-center">
          <Logo />
        </Link>
        <GlassPanel className="p-6 sm:p-8">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
            {mode === "signup" ? "Start free trial" : "Sign in"}
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            {mode === "signup" ? "Start a trial that holds duplicate ACH." : "Open the Meridian AP walkthrough."}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Auth is mocked. Use any details. The workspace is sample AP data: duplicate vendor payments and invoices that miss the contract price — not a live customer.
          </p>
          <form action={startWorkspace} className="mt-6 space-y-4">
            {mode === "signup" ? (
              <>
                <Field label="Full name" name="name" defaultValue="Jordan Hale" />
                <Field label="Company" name="company" defaultValue="Meridian Supply" />
              </>
            ) : null}
            <Field
              label="Work email"
              name="email"
              type="email"
              defaultValue="jordan@meridian-supply.com"
            />
            <Field label="Password" name="password" type="password" defaultValue="password" />
            <Button type="submit" className="h-11 w-full">
              {mode === "signup" ? "Start free trial" : "Sign in"}
            </Button>
          </form>
          <form action={launchDemoWorkspace}>
            <Button type="submit" variant="outline" className="mt-3 h-11 w-full">
              Open Meridian walkthrough
            </Button>
          </form>
          <p className="mt-5 text-center text-sm text-muted-foreground">
            {mode === "signup" ? (
              <>
                Already have access?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </>
            ) : (
              <>
                New here?{" "}
                <Link href="/signup" className="text-primary hover:underline">
                  Start free trial
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
        defaultValue={defaultValue}
        className="h-10 w-full rounded-xl border border-white/12 bg-white/5 px-3 text-sm font-normal text-foreground outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      />
    </label>
  );
}
