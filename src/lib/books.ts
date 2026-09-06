import type { Contract, Invoice, Payment, PurchaseOrder } from "@/lib/types";

export type Books = {
  invoices: Invoice[];
  payments: Payment[];
  contracts: Contract[];
  purchaseOrders: PurchaseOrder[];
};

export function emptyBooks(): Books {
  return { invoices: [], payments: [], contracts: [], purchaseOrders: [] };
}

export function booksRecordCount(books: Books) {
  return (
    books.invoices.length +
    books.payments.length +
    books.contracts.length +
    books.purchaseOrders.length
  );
}

export function booksHaveRecords(books: Books) {
  return booksRecordCount(books) > 0;
}

function money(value: string) {
  const cleaned = value.replace(/[$,\s]/g, "");
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : 0;
}

function splitCsvLine(line: string) {
  const cells: string[] = [];
  let current = "";
  let quoted = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      quoted = !quoted;
      continue;
    }
    if (ch === "," && !quoted) {
      cells.push(current.trim());
      current = "";
      continue;
    }
    current += ch;
  }
  cells.push(current.trim());
  return cells;
}

function normalizeHeader(header: string) {
  return header.replace(/^\uFEFF/, "").trim().toLowerCase();
}

function col(row: Record<string, string>, ...names: string[]) {
  for (const name of names) {
    const wanted = name.toLowerCase().replace(/[\s_]/g, "");
    const key = Object.keys(row).find(
      (item) => item.toLowerCase().replace(/[\s_]/g, "") === wanted
    );
    if (key && row[key]) return row[key];
  }
  return "";
}

function toIso(value: string, rowIndex: number) {
  if (!value) {
    return new Date(Date.UTC(2026, 8, 1, 12, 0, 0) + rowIndex * 36e5).toISOString();
  }
  const parsed = new Date(value);
  if (Number.isNaN(+parsed)) {
    return new Date(Date.UTC(2026, 8, 1, 12, 0, 0) + rowIndex * 36e5).toISOString();
  }
  return parsed.toISOString();
}

function inferKind(row: Record<string, string>, explicit: string) {
  const kind = explicit.toLowerCase();
  if (kind === "bill" || kind === "invoice" || kind === "receivable") return "invoice";
  if (kind === "payment" || kind === "check" || kind === "expense" || kind === "wire" || kind === "ach") {
    return "payment";
  }
  if (kind === "contract" || kind === "ratecard" || kind === "msa") return "contract";
  if (kind === "po" || kind === "purchase_order" || kind === "purchaseorder" || kind === "purchase order") {
    return "po";
  }

  const txn = col(row, "transactiontype", "type", "trntype").toLowerCase();
  if (/payment|check|expense|deposit|ach|wire|bill pay/.test(txn)) return "payment";
  if (/bill|invoice/.test(txn)) return "invoice";
  if (/purchase/.test(txn)) return "po";

  if (col(row, "requester") && col(row, "department")) return "po";
  if (col(row, "party") && col(row, "sku") && col(row, "unitprice") && !col(row, "total") && !col(row, "quantity")) {
    return "contract";
  }
  if (col(row, "method", "reference") && (col(row, "vendor", "name") || col(row, "amount")) && !col(row, "sku", "quantity")) {
    if (col(row, "reference", "method") && col(row, "amount") && !col(row, "number", "num")) return "payment";
  }
  return "invoice";
}

export function parseBooksCsv(text: string): Books {
  const books = emptyBooks();
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"));
  if (lines.length < 2) return books;

  const headers = splitCsvLine(lines[0]).map(normalizeHeader);
  lines.slice(1).forEach((line, rowIndex) => {
    const cells = splitCsvLine(line);
    const row: Record<string, string> = {};
    headers.forEach((header, index) => {
      row[header] = cells[index] ?? "";
    });

    const kind = inferKind(row, col(row, "kind", "record"));
    const id = col(row, "id") || crypto.randomUUID();

    if (kind === "payment") {
      const vendor = col(row, "vendor", "counterparty", "name", "party", "payee");
      const amount = money(col(row, "amount", "total"));
      if (!vendor || !amount) return;
      books.payments.push({
        id,
        vendor,
        amount,
        method: col(row, "method", "transactiontype", "type") || "ACH",
        paidAt: toIso(col(row, "paidat", "date", "issuedat"), rowIndex),
        reference: col(row, "reference", "number", "num", "checknumber") || id.slice(0, 8).toUpperCase(),
      });
      return;
    }

    if (kind === "contract") {
      const party = col(row, "party", "counterparty", "vendor", "customer");
      if (!party) return;
      books.contracts.push({
        id,
        name: col(row, "name", "contract") || `${party} contract`,
        party,
        sku: col(row, "sku") || "SKU",
        unitPrice: money(col(row, "unitprice", "rate", "price", "contractprice")),
        effectiveAt: (col(row, "effectiveat", "date") || new Date().toISOString()).slice(0, 10),
        expiresAt: col(row, "expiresat") || "",
        terms: col(row, "terms") || "",
      });
      return;
    }

    if (kind === "po") {
      const vendor = col(row, "vendor", "counterparty", "name", "party");
      const amount = money(col(row, "amount", "total"));
      if (!vendor || !amount) return;
      books.purchaseOrders.push({
        id,
        number: col(row, "number", "num", "ponumber") || `PO-${id.slice(0, 4)}`,
        vendor,
        amount,
        requester: col(row, "requester") || "Unknown",
        department: col(row, "department") || "Operations",
        createdAt: toIso(col(row, "createdat", "date"), rowIndex),
      });
      return;
    }

    const counterparty = col(row, "counterparty", "vendor", "customer", "party", "name");
    const quantity = Number(col(row, "quantity")) || 1;
    const unitPrice = money(col(row, "unitprice", "price"));
    const total = money(col(row, "total", "amount")) || (unitPrice ? unitPrice * quantity : 0);
    if (!counterparty || !total) return;
    const direction = col(row, "direction").toLowerCase() === "receivable" ? "receivable" : "payable";
    const expected = money(col(row, "expectedunitprice", "contractprice", "contractrate"));
    books.invoices.push({
      id,
      number: col(row, "number", "num", "invoicenumber", "billno") || `INV-${id.slice(0, 4)}`,
      counterparty,
      sku: col(row, "sku") || "SKU",
      unitPrice: unitPrice || total / quantity,
      expectedUnitPrice: expected || undefined,
      quantity,
      discountPct: money(col(row, "discountpct", "discount")),
      total,
      issuedAt: toIso(col(row, "issuedat", "date"), rowIndex),
      direction,
    });
  });

  return books;
}

export function mergeBooks(base: Books, extra: Books): Books {
  return {
    invoices: [...base.invoices, ...extra.invoices],
    payments: [...base.payments, ...extra.payments],
    contracts: [...base.contracts, ...extra.contracts],
    purchaseOrders: [...base.purchaseOrders, ...extra.purchaseOrders],
  };
}
