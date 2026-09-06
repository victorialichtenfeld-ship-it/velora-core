"use client";

import { useState } from "react";
import { useDemo } from "@/components/demo-store";
import { GlassPanel } from "@/components/glass-panel";
import { Button } from "@/components/ui/button";
import { parseBooksCsv } from "@/lib/books";
import { integrationsCatalog } from "@/lib/data/demo";
import type { Invoice, Payment } from "@/lib/types";

const fieldClass =
  "h-10 w-full rounded-xl border border-white/12 bg-white/5 px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary/40";

export default function IntegrationsPage() {
  const { usingYourBooks, books, importBooks, addInvoice, addPayment, resetToDemo, alerts } = useDemo();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [merge, setMerge] = useState(false);

  function applyParsed(text: string, label: string) {
    const parsed = parseBooksCsv(text);
    const count =
      parsed.invoices.length + parsed.payments.length + parsed.contracts.length + parsed.purchaseOrders.length;
    if (!count) {
      setError(
        "No invoices or payments found. Use the template, or a QuickBooks export with Date, Transaction Type, Num, Name, Amount."
      );
      return;
    }
    importBooks(parsed, merge ? "merge" : "replace");
    setMessage(
      `${label}: ${parsed.invoices.length} invoices, ${parsed.payments.length} payments, ${parsed.contracts.length} contracts, ${parsed.purchaseOrders.length} POs. Velora is scanning them now.`
    );
  }

  async function onFile(file: File) {
    setError("");
    applyParsed(await file.text(), `Imported ${file.name}`);
  }

  async function loadSample(path: string, label: string) {
    setError("");
    const response = await fetch(path);
    if (!response.ok) {
      setError("Could not load the sample file.");
      return;
    }
    applyParsed(await response.text(), label);
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-gold">Your books</p>
        <h1 className="mt-1 font-serif text-3xl">Watch a company’s invoices</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Live QuickBooks, Gmail, bank, and Slack connect is not built — that is not a setting you missed. Export a CSV
          from those tools (or add rows by hand). Velora runs the same duplicate, pricing, discount, and PO rules on
          those rows.
        </p>
        {message ? <p className="mt-3 text-sm text-protect">{message}</p> : null}
        {error ? <p className="mt-3 text-sm text-destructive">{error}</p> : null}
        {usingYourBooks ? (
          <p className="mt-3 text-sm text-gold">
            Watching your books · {books.invoices.length} invoices · {books.payments.length} payments ·{" "}
            {alerts.filter((alert) => alert.status === "open").length} open flags
          </p>
        ) : (
          <p className="mt-3 text-sm text-muted-foreground">Currently showing Meridian Supply sample data.</p>
        )}
      </div>

      <GlassPanel className="space-y-4 p-6">
        <h2 className="text-sm font-medium">Import CSV</h2>
        <p className="text-sm text-muted-foreground">
          QuickBooks: Reports → Bills / Vendor payments → Export Excel/CSV. Bank: download transactions. Map columns to
          the template, or keep QuickBooks headers (<code>Date</code>, <code>Transaction Type</code>, <code>Num</code>,{" "}
          <code>Name</code>, <code>Amount</code>).
        </p>
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          <input
            type="checkbox"
            checked={merge}
            onChange={(event) => setMerge(event.target.checked)}
            className="size-4 accent-primary"
          />
          Add this file to the current books instead of replacing them
        </label>
        <div className="flex flex-wrap gap-3">
          <a href="/books-template.csv" download className="text-sm text-gold hover:underline">
            Download template
          </a>
          <a href="/quickbooks-bills-sample.csv" download className="text-sm text-gold hover:underline">
            QuickBooks-style sample
          </a>
          <label className="inline-flex h-10 cursor-pointer items-center rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground">
            Upload CSV
            <input
              type="file"
              accept=".csv,text/csv,text/plain"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) void onFile(file);
                event.target.value = "";
              }}
            />
          </label>
          <Button type="button" variant="outline" onClick={() => void loadSample("/books-template.csv", "Loaded template company")}>
            Watch template company
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => void loadSample("/quickbooks-bills-sample.csv", "Loaded QuickBooks-style export")}
          >
            Watch QuickBooks-style export
          </Button>
          {usingYourBooks ? (
            <Button type="button" variant="outline" onClick={() => resetToDemo()}>
              Back to Meridian sample
            </Button>
          ) : null}
        </div>
      </GlassPanel>

      <div className="grid gap-4 lg:grid-cols-2">
        <GlassPanel className="p-6">
          <h2 className="text-sm font-medium">Add an invoice</h2>
          <form
            className="mt-4 space-y-3"
            onSubmit={(event) => {
              event.preventDefault();
              const form = new FormData(event.currentTarget);
              const quantity = Number(form.get("quantity") || 1);
              const unitPrice = Number(form.get("unitPrice") || 0);
              const total = Number(form.get("total") || unitPrice * quantity);
              const expected = Number(form.get("expectedUnitPrice") || 0);
              const invoice: Invoice = {
                id: crypto.randomUUID(),
                number: String(form.get("number") || "").trim(),
                counterparty: String(form.get("counterparty") || "").trim(),
                sku: String(form.get("sku") || "SKU"),
                unitPrice: unitPrice || total / quantity,
                expectedUnitPrice: expected || undefined,
                quantity,
                discountPct: Number(form.get("discountPct") || 0),
                total,
                issuedAt: new Date(String(form.get("issuedAt") || Date.now())).toISOString(),
                direction: String(form.get("direction")) === "receivable" ? "receivable" : "payable",
              };
              if (!invoice.number || !invoice.counterparty || !invoice.total) return;
              addInvoice(invoice);
              setMessage(`Added invoice ${invoice.number}.`);
              event.currentTarget.reset();
            }}
          >
            <input name="number" required placeholder="Invoice number" className={fieldClass} />
            <input name="counterparty" required placeholder="Vendor or customer" className={fieldClass} />
            <input name="sku" placeholder="SKU" className={fieldClass} />
            <div className="grid grid-cols-2 gap-2">
              <input name="unitPrice" type="number" step="0.01" placeholder="Unit price" className={fieldClass} />
              <input name="quantity" type="number" defaultValue={1} className={fieldClass} />
            </div>
            <input name="expectedUnitPrice" type="number" step="0.01" placeholder="Contract / list price" className={fieldClass} />
            <input name="total" type="number" step="0.01" required placeholder="Total" className={fieldClass} />
            <input name="discountPct" type="number" step="0.1" placeholder="Discount %" className={fieldClass} />
            <input name="issuedAt" type="date" className={fieldClass} />
            <select name="direction" className={fieldClass} defaultValue="payable">
              <option value="payable">Bill (you pay)</option>
              <option value="receivable">Invoice (they pay you)</option>
            </select>
            <Button type="submit" className="w-full">
              Add invoice
            </Button>
          </form>
        </GlassPanel>
        <GlassPanel className="p-6">
          <h2 className="text-sm font-medium">Add a payment</h2>
          <form
            className="mt-4 space-y-3"
            onSubmit={(event) => {
              event.preventDefault();
              const form = new FormData(event.currentTarget);
              const payment: Payment = {
                id: crypto.randomUUID(),
                vendor: String(form.get("vendor") || "").trim(),
                amount: Number(form.get("amount") || 0),
                method: String(form.get("method") || "ACH"),
                paidAt: new Date(String(form.get("paidAt") || Date.now())).toISOString(),
                reference: String(form.get("reference") || "").trim(),
              };
              if (!payment.vendor || !payment.amount || !payment.reference) return;
              addPayment(payment);
              setMessage(`Added payment ${payment.reference}.`);
              event.currentTarget.reset();
            }}
          >
            <input name="vendor" required placeholder="Vendor" className={fieldClass} />
            <input name="amount" type="number" step="0.01" required placeholder="Amount" className={fieldClass} />
            <input name="reference" required placeholder="ACH-4418 or check #" className={fieldClass} />
            <input name="method" placeholder="ACH, Wire, Check" className={fieldClass} />
            <input name="paidAt" type="date" className={fieldClass} />
            <Button type="submit" className="w-full">
              Add payment
            </Button>
          </form>
        </GlassPanel>
      </div>

      <div>
        <h2 className="text-sm font-medium">Direct connections</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Gmail, QuickBooks, bank, and Slack OAuth are not built on this product. There is no hidden toggle. Export from
          those tools and import above.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {integrationsCatalog.map((item) => (
            <GlassPanel key={item.id} className="p-5">
              <p className="text-sm font-medium">{item.name}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">{item.category}</p>
              <p className="mt-3 text-sm text-muted-foreground">{item.description}</p>
              <p className="mt-4 text-xs text-muted-foreground">Not built · import CSV instead</p>
            </GlassPanel>
          ))}
        </div>
      </div>
    </div>
  );
}
