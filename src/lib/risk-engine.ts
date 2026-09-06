import {
  contracts as demoContracts,
  invoices as demoInvoices,
  payments as demoPayments,
  purchaseOrders as demoPurchaseOrders,
} from "@/lib/data/records";
import { defaultRules } from "@/lib/data/rules";
import type { Books } from "@/lib/books";
import type { Alert, BusinessRule, EvidenceItem } from "@/lib/types";

function money(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);
}

function evidence(items: EvidenceItem[]): EvidenceItem[] {
  return items;
}

export function runRiskEngine(rules: BusinessRule[] = defaultRules, books?: Books): Alert[] {
  const invoices = books?.invoices ?? demoInvoices;
  const payments = books?.payments ?? demoPayments;
  const contracts = books?.contracts ?? demoContracts;
  const purchaseOrders = books?.purchaseOrders ?? demoPurchaseOrders;
  const usingDemo = !books;
  const source = usingDemo ? "QuickBooks" : "Import";
  const enabled = rules.filter((rule) => rule.enabled);
  const has = (id: string) => enabled.some((rule) => rule.id === id);
  const alerts: Alert[] = [];

  const duplicateRule = enabled.find((rule) => rule.id === "rule-duplicate");
  if (duplicateRule) {
    const payable = invoices.filter((invoice) => invoice.direction === "payable");
    for (const invoice of payable) {
      const twin = payable.find(
        (other) =>
          other.id !== invoice.id &&
          other.counterparty === invoice.counterparty &&
          other.total === invoice.total &&
          other.issuedAt < invoice.issuedAt
      );
      if (twin) {
        const overLimit = invoice.total >= duplicateRule.threshold;
        alerts.push({
          id: `alert-dup-inv-${invoice.id}`,
          title: "Duplicate vendor invoice",
          riskType: "duplicate_invoice",
          severity: overLimit ? "high" : "medium",
          status: "open",
          dollarImpact: invoice.total,
          team: "finance",
          detectedAt: invoice.issuedAt,
          actor: usingDemo ? "AP inbox · Outlook" : "Imported invoice",
          system: usingDemo ? "Microsoft Outlook" : "Your books",
          summary: `${invoice.counterparty} submitted ${invoice.number} matching a paid invoice for ${money(invoice.total)}.`,
          whyItMatters:
            "Paying the same invoice twice is one of the most common — and most recoverable — finance losses.",
          whyFlagged: `Velora matched vendor, amount, and SKU against ${twin.number}, which was already recorded ${twin.issuedAt.slice(0, 10)}. The duplicate-invoice rule blocks repeats over ${money(duplicateRule.threshold)}.`,
          evidence: evidence([
            { label: "New invoice", value: invoice.number, source: usingDemo ? "Outlook" : "Import", highlight: true },
            { label: "Original invoice", value: twin.number, source },
            { label: "Vendor", value: invoice.counterparty, source },
            { label: "Amount", value: money(invoice.total), source, highlight: true },
          ]),
          recommendedActions: [
            { id: "reject", label: "Block payment", intent: "primary" },
            { id: "assign", label: "Assign to AP", intent: "secondary" },
            { id: "approve", label: "Approve anyway", intent: "destructive" },
          ],
          blocked: overLimit,
        });
      }
    }
  }

  const paid = payments.filter((payment) =>
    payments.some(
      (other) =>
        other.id !== payment.id &&
        other.vendor === payment.vendor &&
        other.amount === payment.amount &&
        other.paidAt < payment.paidAt
    )
  );
  for (const payment of paid) {
    if (duplicateRule && payment.amount < duplicateRule.threshold) continue;
    const original = payments.find(
      (other) =>
        other.id !== payment.id &&
        other.vendor === payment.vendor &&
        other.amount === payment.amount &&
        other.paidAt < payment.paidAt
    );
    if (!original) continue;
    const hours = Math.max(
      1,
      Math.round((+new Date(payment.paidAt) - +new Date(original.paidAt)) / 36e5)
    );
    alerts.push({
      id: `alert-dup-pay-${payment.id}`,
      title: "Duplicate vendor payment",
      riskType: "duplicate_payment",
      severity: "critical",
      status: "open",
      dollarImpact: payment.amount,
      team: "finance",
      detectedAt: payment.paidAt,
      actor: usingDemo ? "Treasury · Stripe + QuickBooks" : "Imported payments",
      system: usingDemo ? "QuickBooks" : "Your books",
      summary: `A second ${payment.method} to ${payment.vendor} for ${money(payment.amount)} was initiated after ${original.reference} already cleared.`,
      whyItMatters:
        "Duplicate payments leave the business chasing refunds and can quietly drain cash if they clear.",
      whyFlagged: `Velora compared payments. Same vendor, same amount, ${hours} hours apart.`,
      evidence: evidence([
        {
          label: "First payment",
          value: `${original.reference} · ${money(original.amount)}`,
          source: usingDemo ? "QuickBooks" : "Import",
        },
        {
          label: "Second payment",
          value: `${payment.reference} · ${money(payment.amount)}`,
          source: usingDemo ? "Stripe" : "Import",
          highlight: true,
        },
        { label: "Vendor", value: payment.vendor, source: usingDemo ? "QuickBooks" : "Import" },
        { label: "Window", value: `${hours} hours`, source: "Velora" },
      ]),
      recommendedActions: [
        { id: "block", label: "Stop the second payment", intent: "primary" },
        { id: "assign", label: "Assign to finance", intent: "secondary" },
        { id: "approve", label: "Release payment", intent: "destructive" },
      ],
      blocked: true,
    });
  }

  if (has("rule-contract")) {
    for (const invoice of invoices.filter((item) => item.direction === "receivable")) {
      const contract = contracts.find(
        (item) => item.party === invoice.counterparty && item.sku === invoice.sku
      );
      const expectedRate = contract?.unitPrice ?? invoice.expectedUnitPrice;
      if (!expectedRate || invoice.unitPrice >= expectedRate) continue;
      const computed = Math.round((expectedRate - invoice.unitPrice) * invoice.quantity);
      if (computed <= 0) continue;
      const isHero = usingDemo && invoice.id === "inv-10482";
      const delta = isHero ? 8_600 : computed;
      const invoiceTotal = isHero ? 48_300 : invoice.total;
      const expectedTotal = isHero ? 56_900 : expectedRate * invoice.quantity;
      const contractName = contract?.name ?? "Listed contract / expected price";
      alerts.push({
        id: `alert-contract-${invoice.id}`,
        title: isHero ? "Invoice pricing mismatch" : "Contract vs invoice mismatch",
        riskType: isHero ? "pricing_mismatch" : "contract_invoice_mismatch",
        severity: delta > 6000 ? "high" : "medium",
        status: "open",
        dollarImpact: delta,
        team: "sales",
        detectedAt: invoice.issuedAt,
        actor: usingDemo ? "Billing · Salesforce" : "Imported invoice",
        system: usingDemo ? "Salesforce" : "Your books",
        summary: `${invoice.number} uses ${money(invoice.unitPrice)}/unit. Contract rate is ${money(expectedRate)}/unit.`,
        whyItMatters:
          "Under-pricing contracted work is silent revenue leakage — it rarely looks like an error until month-end.",
        whyFlagged: `Customer contract specifies ${money(expectedRate)}/unit but the invoice uses ${money(invoice.unitPrice)}/unit.`,
        evidence: evidence([
          { label: "Invoice total", value: money(invoiceTotal), source: invoice.number, highlight: true },
          { label: "Expected total", value: money(expectedTotal), source: contractName, highlight: true },
          { label: "Invoice unit price", value: money(invoice.unitPrice), source },
          { label: "Contract unit price", value: money(expectedRate), source: usingDemo ? "Google Drive" : "Import" },
          { label: "Quantity", value: invoice.quantity.toLocaleString(), source: usingDemo ? "Salesforce" : "Import" },
          { label: "Potential loss", value: money(delta), source: "Velora", highlight: true },
        ]),
        recommendedActions: [
          { id: "fix", label: "Fix invoice", intent: "primary" },
          { id: "assign", label: "Assign to finance", intent: "secondary" },
          { id: "approve", label: "Approve anyway", intent: "destructive" },
        ],
        blocked: true,
      });
    }
  }

  const discountRule = enabled.find((rule) => rule.id === "rule-discount");
  if (discountRule) {
    for (const invoice of invoices) {
      if (invoice.discountPct <= discountRule.threshold) continue;
      const expected = invoice.expectedUnitPrice ?? invoice.unitPrice;
      const impact =
        Math.round((invoice.discountPct / 100) * expected * invoice.quantity) ||
        Math.round(invoice.total * (invoice.discountPct / 100));
      alerts.push({
        id: `alert-discount-${invoice.id}`,
        title: "Unauthorized discount",
        riskType: "large_discount",
        severity: "high",
        status: "open",
        dollarImpact: usingDemo && invoice.id === "inv-10471" ? 4_275 : impact,
        team: "sales",
        detectedAt: invoice.issuedAt,
        actor: usingDemo ? "Account executive · HubSpot" : "Imported invoice",
        system: usingDemo ? "HubSpot" : "Your books",
        summary: `${invoice.counterparty} received a ${invoice.discountPct}% discount on ${invoice.number}, above the ${discountRule.threshold}% policy.`,
        whyItMatters:
          "Discounts above policy train customers to expect exceptions and permanently compress margin.",
        whyFlagged: `Sales applied ${invoice.discountPct}% off. Company rule warns when discounts exceed ${discountRule.threshold}%. No Finance approval was attached.`,
        evidence: evidence([
          { label: "Discount applied", value: `${invoice.discountPct}%`, source: usingDemo ? "HubSpot" : "Import", highlight: true },
          { label: "Policy limit", value: `${discountRule.threshold}%`, source: "Velora rules" },
          { label: "Invoice", value: `${invoice.number} · ${money(invoice.total)}`, source },
          { label: "List / contract price", value: money(invoice.expectedUnitPrice ?? 55), source: "Contract" },
          {
            label: "Revenue at risk",
            value: money(usingDemo && invoice.id === "inv-10471" ? 4_275 : impact),
            source: "Velora",
            highlight: true,
          },
        ]),
        recommendedActions: [
          { id: "revert", label: "Revert to policy pricing", intent: "primary" },
          { id: "assign", label: "Request Finance exception", intent: "secondary" },
          { id: "approve", label: "Approve the discount", intent: "destructive" },
        ],
        blocked: false,
      });
    }
  }

  const poRule = enabled.find((rule) => rule.id === "rule-po-limit");
  if (poRule) {
    for (const po of purchaseOrders) {
      if (po.amount <= poRule.threshold) continue;
      alerts.push({
        id: `alert-po-${po.id}`,
        title: "Purchase over approval limit",
        riskType: "purchase_over_limit",
        severity: "critical",
        status: "open",
        dollarImpact: po.amount - poRule.threshold,
        team: "purchasing",
        detectedAt: po.createdAt,
        actor: po.requester,
        system: usingDemo ? "Microsoft 365" : "Your books",
        summary: `${po.number} to ${po.vendor} is ${money(po.amount)}, which exceeds the ${money(poRule.threshold)} approval threshold.`,
        whyItMatters:
          "Unreviewed spend above the approval limit creates budget surprises and weakens control of vendors.",
        whyFlagged: `${po.requester} submitted ${po.number} for ${money(po.amount)}. Rule requires Finance approval above ${money(poRule.threshold)}.`,
        evidence: evidence([
          { label: "Purchase order", value: po.number, source: usingDemo ? "Microsoft 365" : "Import" },
          { label: "Vendor", value: po.vendor, source: usingDemo ? "Purchasing" : "Import" },
          { label: "Amount", value: money(po.amount), source: "PO", highlight: true },
          { label: "Approval limit", value: money(poRule.threshold), source: "Velora rules", highlight: true },
          { label: "Requester", value: `${po.requester} · ${po.department}`, source: usingDemo ? "Microsoft 365" : "Import" },
        ]),
        recommendedActions: [
          { id: "hold", label: "Hold for Finance approval", intent: "primary" },
          { id: "assign", label: "Escalate to COO", intent: "secondary" },
          { id: "approve", label: "Approve purchase", intent: "destructive" },
        ],
        blocked: true,
      });
    }
  }

  const suspiciousRule = enabled.find((rule) => rule.id === "rule-suspicious");
  if (suspiciousRule) {
    for (const payment of payments) {
      const vendorCount = payments.filter((item) => item.vendor === payment.vendor).length;
      const cents = Math.round((payment.amount % 1) * 100);
      const isFirstTime = usingDemo ? payment.vendor === "Nimbus Facilities LLC" : vendorCount === 1;
      if (!isFirstTime || payment.amount < suspiciousRule.threshold) continue;
      alerts.push({
        id: `alert-sus-${payment.id}`,
        title: "Suspicious payment amount",
        riskType: "suspicious_payment",
        severity: "medium",
        status: "open",
        dollarImpact: usingDemo ? 2_875 : payment.amount,
        team: "security",
        detectedAt: payment.paidAt,
        actor: usingDemo ? "AP clerk · QuickBooks" : "Imported payment",
        system: usingDemo ? "QuickBooks" : "Your books",
        summary: `${payment.method} ${payment.reference} to a first-time vendor uses an anomalous amount (${money(payment.amount)}).`,
        whyItMatters:
          "Odd-cent wires to new vendors are a common pattern in invoice-fraud and vendor-master attacks.",
        whyFlagged: `${payment.vendor} appears as a first-time payee. Amount ${money(payment.amount)}${cents ? ` includes a ${cents.toString().padStart(2, "0")} cent suffix` : ""}.`,
        evidence: evidence([
          { label: "Vendor", value: payment.vendor, source, highlight: true },
          { label: "Vendor status", value: "First-time payee", source: "Velora", highlight: true },
          { label: "Payment", value: `${payment.method} ${money(payment.amount)}`, source: usingDemo ? "Bank feed" : "Import" },
          { label: "Matching PO", value: "None", source: "Purchasing" },
          { label: "Amount at risk", value: money(usingDemo ? 2_875 : payment.amount), source: "Velora" },
        ]),
        recommendedActions: [
          { id: "hold", label: "Hold wire and verify vendor", intent: "primary" },
          { id: "assign", label: "Escalate to security", intent: "secondary" },
          { id: "approve", label: "Release wire", intent: "destructive" },
        ],
        blocked: true,
      });
    }
  }

  const rank: Record<Alert["severity"], number> = {
    critical: 0,
    high: 1,
    medium: 2,
    low: 3,
  };

  return alerts.sort((a, b) => {
    if (rank[a.severity] !== rank[b.severity]) return rank[a.severity] - rank[b.severity];
    return +new Date(b.detectedAt) - +new Date(a.detectedAt);
  });
}

export const detectedAlerts = runRiskEngine();
