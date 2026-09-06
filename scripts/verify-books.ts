import { readFileSync } from "node:fs";
import { parseBooksCsv } from "../src/lib/books";
import { runRiskEngine } from "../src/lib/risk-engine";
import type { RiskType } from "../src/lib/types";

function report(label: string, path: string) {
  const books = parseBooksCsv(readFileSync(path, "utf8"));
  const alerts = runRiskEngine(undefined, books);
  console.log(`\n${label}`);
  console.log(
    `  invoices=${books.invoices.length} payments=${books.payments.length} contracts=${books.contracts.length} pos=${books.purchaseOrders.length}`
  );
  console.log(`  alerts=${alerts.length}`);
  for (const alert of alerts) {
    console.log(`  - ${alert.severity} ${alert.riskType} ${alert.title} (${alert.dollarImpact})`);
  }
  return { books, alerts };
}

const template = report("template", "public/books-template.csv");
const qb = report("quickbooks", "public/quickbooks-bills-sample.csv");

const needed: RiskType[] = [
  "duplicate_invoice",
  "duplicate_payment",
  "contract_invoice_mismatch",
  "large_discount",
  "purchase_over_limit",
  "suspicious_payment",
];
const types = new Set(template.alerts.map((alert) => alert.riskType));
const missing = needed.filter((type) => !types.has(type));
if (missing.length) {
  console.error("\nTemplate missing alert types:", missing.join(", "));
  process.exit(1);
}
if (qb.alerts.filter((alert) => alert.riskType === "duplicate_invoice" || alert.riskType === "duplicate_payment").length < 2) {
  console.error("\nQuickBooks sample did not flag duplicates");
  process.exit(1);
}
console.log("\nOK");
