"use client";

import { GlassPanel } from "@/components/glass-panel";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { demoUser } from "@/lib/data/demo";
import { signOut } from "@/app/auth-actions";

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-gold">Settings</p>
        <h1 className="mt-1 font-serif text-3xl">Workspace preferences</h1>
      </div>
      <GlassPanel className="p-6">
        <h2 className="text-sm font-medium">Profile</h2>
        <dl className="mt-4 grid gap-3 sm:grid-cols-2 text-sm">
          <div>
            <dt className="text-xs text-muted-foreground">Name</dt>
            <dd>{demoUser.name}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Email</dt>
            <dd>{demoUser.email}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Company</dt>
            <dd>{demoUser.company}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Role</dt>
            <dd>{demoUser.role}</dd>
          </div>
        </dl>
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

function Row({ label, defaultChecked = false }: { label: string; defaultChecked?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl bg-ink/5 px-4 py-3">
      <p className="text-sm">{label}</p>
      <Switch defaultChecked={defaultChecked} />
    </div>
  );
}
