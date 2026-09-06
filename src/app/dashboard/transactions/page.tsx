"use client";

import { GlassPanel } from "@/components/glass-panel";
import { useDemo } from "@/components/demo-store";
import { transactions } from "@/lib/data/demo";
import { formatCurrency, formatRelativeTime } from "@/lib/format";

const tone: Record<string, string> = {
  Blocked: "text-gold",
  Held: "text-gold",
  Warned: "text-gold",
  "Needs approval": "text-gold",
  Cleared: "text-gold",
};

export default function TransactionsPage() {
  const { usingYourBooks, books } = useDemo();
  const rows = usingYourBooks
    ? [
        ...books.invoices.map((invoice) => ({
          id: invoice.id,
          party: invoice.counterparty,
          type: invoice.direction === "payable" ? "Bill" : "Invoice",
          amount: invoice.total,
          status: "Imported",
          at: invoice.issuedAt,
          system: invoice.number,
        })),
        ...books.payments.map((payment) => ({
          id: payment.id,
          party: payment.vendor,
          type: payment.method,
          amount: payment.amount,
          status: "Imported",
          at: payment.paidAt,
          system: payment.reference,
        })),
      ].sort((a, b) => +new Date(b.at) - +new Date(a.at))
    : transactions.map((txn) => ({
        id: txn.id,
        party: txn.party,
        type: txn.type,
        amount: txn.amount,
        status: txn.status,
        at: txn.at,
        system: txn.system,
      }));

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-gold">Transactions</p>
        <h1 className="mt-1 font-serif text-3xl">{usingYourBooks ? "Your money in motion" : "Money in motion"}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {usingYourBooks
            ? "Imported invoices and payments. Add more on Integrations."
            : "Sample invoices, payments, and purchase orders from Meridian Supply. Import your CSV on Integrations to replace this."}
        </p>
      </div>
      <GlassPanel className="overflow-hidden">
        <div className="hidden grid-cols-[1.1fr_0.9fr_0.7fr_0.7fr_0.8fr] gap-3 border-b border-ink/8 px-5 py-3 text-[11px] uppercase tracking-[0.14em] text-muted-foreground md:grid">
          <span>Party</span>
          <span>Type</span>
          <span>Amount</span>
          <span>Status</span>
          <span>When</span>
        </div>
        <div className="divide-y divide-ink/8">
          {rows.length === 0 ? (
            <p className="px-5 py-8 text-sm text-muted-foreground">No transactions yet. Import a CSV on Integrations.</p>
          ) : (
            rows.map((txn) => (
              <div key={txn.id} className="grid gap-1 px-5 py-4 md:grid-cols-[1.1fr_0.9fr_0.7fr_0.7fr_0.8fr] md:items-center md:gap-3">
                <div>
                  <p className="text-sm">{txn.party}</p>
                  <p className="text-xs text-muted-foreground md:hidden">{txn.type}</p>
                </div>
                <p className="hidden text-sm text-muted-foreground md:block">{txn.type}</p>
                <p className="font-mono text-sm">{formatCurrency(txn.amount)}</p>
                <p className={`text-sm ${tone[txn.status] ?? "text-foreground"}`}>{txn.status}</p>
                <p className="text-xs text-muted-foreground">
                  {formatRelativeTime(txn.at)} · {txn.system}
                </p>
              </div>
            ))
          )}
        </div>
      </GlassPanel>
    </div>
  );
}
