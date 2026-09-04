"use client";

import { GlassPanel } from "@/components/glass-panel";
import { contractRecords } from "@/lib/data/demo";
import { formatCurrency } from "@/lib/format";

export default function ContractsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-gold">Contracts</p>
        <h1 className="mt-1 font-serif text-3xl">The rates Velora holds you to</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Parsed from Drive and email in production. In the prototype these are sample agreements used by the risk engine.
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {contractRecords.map((contract) => (
          <GlassPanel key={contract.id} className="p-6">
            <p className="text-xs uppercase tracking-[0.14em] text-gold">{contract.party}</p>
            <h2 className="mt-1 text-lg">{contract.name}</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{contract.terms}</p>
            <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-xs text-muted-foreground">SKU</dt>
                <dd className="font-mono">{contract.sku}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Contract rate</dt>
                <dd className="font-mono">{formatCurrency(contract.unitPrice)}/unit</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Effective</dt>
                <dd>{contract.effectiveAt}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Linked alerts</dt>
                <dd>{contract.linkedAlerts}</dd>
              </div>
            </dl>
          </GlassPanel>
        ))}
      </div>
    </div>
  );
}
