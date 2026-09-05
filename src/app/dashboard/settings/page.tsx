"use client";

import { useEffect, useState } from "react";
import { GlassPanel } from "@/components/glass-panel";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { demoUser } from "@/lib/data/demo";
import { signOut } from "@/app/auth-actions";
import type { SessionUser } from "@/lib/types";

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-gold">Settings</p>
        <h1 className="mt-1 font-serif text-3xl">Workspace preferences</h1>
      </div>
      <GlassPanel className="p-6">
        <h2 className="text-sm font-medium">Profile</h2>
        <ProfilePanel />
      </GlassPanel>
      <GlassPanel className="space-y-4 p-6">
        <h2 className="text-sm font-medium">Billing</h2>
        <BillingPanel />
      </GlassPanel>
      <GlassPanel className="space-y-4 p-6">
        <h2 className="text-sm font-medium">Controls</h2>
        <Row label="Require human approval for blocks" defaultChecked />
        <Row label="Send Slack summaries for critical alerts" defaultChecked />
        <Row label="Allow Velora to auto-fix invoice drafts" />
        <p className="text-xs text-muted-foreground">
          Auto-fix stays off. Velora recommends; people decide. Live demo environment — connect your own tools in early access.
        </p>
      </GlassPanel>
      <form action={signOut}>
        <Button type="submit" variant="outline">
          Sign out
        </Button>
      </form>
    </div>
  );
}

function ProfilePanel() {
  const user = useSessionUser();
  const shown = user ?? demoUser;
  return (
    <dl className="mt-4 grid gap-3 sm:grid-cols-2 text-sm">
      <div>
        <dt className="text-xs text-muted-foreground">Name</dt>
        <dd>{shown.name}</dd>
      </div>
      <div>
        <dt className="text-xs text-muted-foreground">Email</dt>
        <dd>{shown.email}</dd>
      </div>
      <div>
        <dt className="text-xs text-muted-foreground">Company</dt>
        <dd>{shown.company}</dd>
      </div>
      <div>
        <dt className="text-xs text-muted-foreground">Role</dt>
        <dd>{shown.role}</dd>
      </div>
    </dl>
  );
}

function useSessionUser() {
  const [user, setUser] = useState<SessionUser | null>(null);
  useEffect(() => {
    void fetch("/api/auth/session")
      .then((response) => response.json())
      .then((data: { user?: SessionUser | null }) => setUser(data.user ?? null));
  }, []);
  return user;
}

function BillingPanel() {
  const user = useSessionUser();
  const [error, setError] = useState("");

  return (
    <div className="space-y-3 text-sm">
      <p className="text-muted-foreground">
        {user?.paid
          ? `Active ${user.plan || "subscription"}. Cards are billed monthly through Stripe.`
          : "This workspace is on the live demo. Subscribe on the homepage to pay $299 or $799 per month."}
      </p>
        {user?.stripeCustomerId ? (
        <Button
          type="button"
          variant="outline"
          onClick={async () => {
            setError("");
            const response = await fetch("/api/billing/portal", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ customerId: user.stripeCustomerId }),
            });
            const result = (await response.json()) as { url?: string; error?: string };
            if (!response.ok || !result.url) {
              setError(result.error || "Could not open the billing portal.");
              return;
            }
            window.location.href = result.url;
          }}
        >
          Manage billing
        </Button>
      ) : user?.paid ? (
        <p className="text-xs text-muted-foreground">
          This workspace is marked paid. Connect Stripe on the live site to manage cards and invoices.
        </p>
      ) : (
        <a href="/#pricing" className="text-gold hover:underline">
          Go to pricing
        </a>
      )}
      {error ? <p className="text-destructive">{error}</p> : null}
    </div>
  );
}

function Row({ label, defaultChecked = false }: { label: string; defaultChecked?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl bg-ink/5 px-4 py-3">
      <p className="text-sm">{label}</p>
      <Switch defaultChecked={defaultChecked} />
    </div>
  );
}
