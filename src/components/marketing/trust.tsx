import { FileKey2, LockKeyhole, ShieldCheck, UserRoundCheck, ScrollText } from "lucide-react";
import { GlassPanel } from "@/components/glass-panel";

const pillars = [
  {
    icon: UserRoundCheck,
    title: "Human approval",
    body: "Velora recommends. People decide. Nothing irreversible happens without a named approver.",
  },
  {
    icon: ScrollText,
    title: "Audit logs",
    body: "Every flag, override, and ignore is recorded with evidence, actor, and timestamp.",
  },
  {
    icon: FileKey2,
    title: "Permissions",
    body: "Finance, sales, and security see what they are allowed to act on — nothing more.",
  },
  {
    icon: LockKeyhole,
    title: "Data encryption",
    body: "Contracts, invoices, and messages are encrypted in transit and at rest when live connectors are enabled.",
  },
  {
    icon: ShieldCheck,
    title: "Rules, not improvisation",
    body: "Velora does not act outside approved company rules. If a rule is off, the action is off.",
  },
];

export function TrustSection() {
  return (
    <section id="trust" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
      <p className="text-xs uppercase tracking-[0.2em] text-primary">Trust</p>
      <h2 className="mt-3 max-w-2xl font-serif text-3xl sm:text-4xl">
        Protective software has to earn the right to sit in the flow of money.
      </h2>
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {pillars.map((pillar) => (
          <GlassPanel key={pillar.title} className="p-6">
            <pillar.icon className="size-5 text-primary" />
            <h3 className="mt-4 text-lg font-medium">{pillar.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{pillar.body}</p>
          </GlassPanel>
        ))}
      </div>
    </section>
  );
}
