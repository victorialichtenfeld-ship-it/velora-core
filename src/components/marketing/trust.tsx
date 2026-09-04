import { FileKey2, LockKeyhole, ShieldCheck, UserRoundCheck, ScrollText } from "lucide-react";

const pillars = [
  {
    icon: UserRoundCheck,
    title: "Human approval",
    body: "Velora recommends. A named finance owner decides. Nothing irreversible happens without that person.",
  },
  {
    icon: ScrollText,
    title: "Audit logs",
    body: "Every hold, override, and dismiss is recorded with evidence, actor, and timestamp.",
  },
  {
    icon: FileKey2,
    title: "Least privilege",
    body: "AP, controllers, and treasury see the payments they are allowed to act on — nothing more.",
  },
  {
    icon: LockKeyhole,
    title: "Encryption",
    body: "Invoices, payments, and contracts are encrypted in transit and at rest when live connectors are enabled.",
  },
  {
    icon: ShieldCheck,
    title: "Rules, not improvisation",
    body: "Velora does not invent policy. If a duplicate or pricing rule is off, the hold is off.",
  },
];

export function TrustSection() {
  return (
    <section id="trust" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">Trust</p>
      <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
        Controls only belong in the payment path if they are boring and auditable.
      </h2>
      <div className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {pillars.map((pillar) => (
          <div key={pillar.title} className="rounded-xl bg-card p-5 ring-1 ring-border">
            <pillar.icon className="size-4 text-muted-foreground" />
            <h3 className="mt-3 text-base font-medium">{pillar.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{pillar.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
