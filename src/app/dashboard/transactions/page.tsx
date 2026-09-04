"use client";

import { GlassPanel } from "@/components/glass-panel";
import { transactions } from "@/lib/data/demo";
import { formatCurrency, formatRelativeTime } from "@/lib/format";

const tone: Record<string, string> = {
  Blocked: "text-risk",
  Held: "text-warn",
  Warned: "text-gold",
  "Needs approval": "text-gold",
  Cleared: "text-protect",
};

export default function TransactionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-gold">Transactions</p>
        <h1 className="mt-1 font-serif text-3xl">Money in motion</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Sample invoices, payments, and purchase orders from Meridian Supply. Live sync is not enabled in this prototype.
        </p>
      </div>
      <GlassPanel className="overflow-hidden">
        <div className="hidden grid-cols-[1.1fr_0.9fr_0.7fr_0.7fr_0.8fr] gap-3 border-b border-white/8 px-5 py-3 text-[11px] uppercase tracking-[0.14em] text-muted-foreground md:grid">
          <span>Party</span>
          <span>Type</span>
          <span>Amount</span>
          <span>Status</span>
          <span>When</span>
        </div>
        <div className="divide-y divide-white/6">
          {transactions.map((txn) => (
            <div key={txn.id} className="grid gap-1 px-5 py-4 md:grid-cols-[1.1fr_0.9fr_0.7fr_0.7fr_0.8fr] md:items-center md:gap-3">
              <div>
                <p className="text-sm">{txn.party}</p>
                <p className="text-xs text-muted-foreground md:hidden">{txn.type}</p>
              </div>
              <p className="hidden text-sm text-muted-foreground md:block">{txn.type}</p>
              <p className="font-mono text-sm">{formatCurrency(txn.amount)}</p>
              <p className={`text-sm ${tone[txn.status] ?? "text-foreground"}`}>{txn.status}</p>
              <p className="text-xs text-muted-foreground">{formatRelativeTime(txn.at)} · {txn.system}</p>
            </div>
          ))}
        </div>
      </GlassPanel>
    </div>
  );
}
