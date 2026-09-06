"use client";

import { GlassPanel } from "@/components/glass-panel";
import { useDemo } from "@/components/demo-store";
import { contractRecords } from "@/lib/data/demo";
import { formatCurrency } from "@/lib/format";

export default function ContractsPage() {
  const { usingYourBooks, books } = useDemo();
  const rows = usingYourBooks
    ? books.contracts.map((contract) => ({
        ...contract,
        linkedAlerts: "—",
      }))
    : contractRecords;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-gold">Contracts</p>
        <h1 className="mt-1 font-serif text-3xl">The rates Velora holds invoices to</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {usingYourBooks
            ? "Imported rate cards. Invoice unit prices are compared to these rows."
            : "Sample agreements used by the demo engine. Import a CSV with kind=contract to use yours."}
        </p>
      </div>
      {rows.length === 0 ? (
        <p className="text-sm text-muted-foreground">No contracts imported yet.</p>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {rows.map((contract) => (
            <GlassPanel key={contract.id} className="p-6">
              <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{contract.party}</p>
              <h2 className="mt-1 text-lg">{contract.name}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{contract.terms || "No terms imported."}</p>
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
                  <dd>{"linkedAlerts" in contract ? contract.linkedAlerts : "—"}</dd>
                </div>
              </dl>
            </GlassPanel>
          ))}
        </div>
      )}
    </div>
  );
}
