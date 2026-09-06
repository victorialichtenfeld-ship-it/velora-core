"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { detectedAlerts, runRiskEngine } from "@/lib/risk-engine";
import { defaultRules } from "@/lib/data/rules";
import { integrationsCatalog } from "@/lib/data/demo";
import { booksHaveRecords, emptyBooks, mergeBooks, type Books } from "@/lib/books";
import type { Alert, AlertStatus, BusinessRule, IntegrationId, IntegrationStatus, Invoice, Payment } from "@/lib/types";

const STORAGE = "velora_books_v1";

type Store = {
  alerts: Alert[];
  rules: BusinessRule[];
  books: Books;
  usingYourBooks: boolean;
  integrations: Record<IntegrationId, IntegrationStatus>;
  setAlertStatus: (id: string, status: AlertStatus) => void;
  addRule: (rule: BusinessRule) => void;
  toggleRule: (id: string) => void;
  setIntegration: (id: IntegrationId, status: IntegrationStatus) => void;
  importBooks: (incoming: Books, mode?: "replace" | "merge") => void;
  addInvoice: (invoice: Invoice) => void;
  addPayment: (payment: Payment) => void;
  resetToDemo: () => void;
};

const DemoContext = createContext<Store | null>(null);

function loadBooks(): Books | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Books;
    if (!parsed.invoices) return null;
    return parsed;
  } catch {
    return null;
  }
}

function saveBooks(books: Books) {
  window.localStorage.setItem(STORAGE, JSON.stringify(books));
}

function alertsFor(rules: BusinessRule[], books: Books | null) {
  if (books && booksHaveRecords(books)) return runRiskEngine(rules, books);
  return runRiskEngine(rules);
}

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [rules, setRules] = useState(defaultRules);
  const [books, setBooks] = useState<Books>(emptyBooks);
  const [usingYourBooks, setUsingYourBooks] = useState(false);
  const [alertOverrides, setAlertOverrides] = useState<Record<string, AlertStatus>>({});
  const [integrations, setIntegrations] = useState<Record<IntegrationId, IntegrationStatus>>(() => {
    const map = {} as Record<IntegrationId, IntegrationStatus>;
    for (const item of integrationsCatalog) map[item.id] = "available";
    return map;
  });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = loadBooks();
    if (stored && booksHaveRecords(stored)) {
      setBooks(stored);
      setUsingYourBooks(true);
    }
    setReady(true);
  }, []);

  const computed = useMemo(
    () => (ready ? alertsFor(rules, usingYourBooks ? books : null) : detectedAlerts),
    [ready, rules, books, usingYourBooks]
  );

  const alerts = useMemo(
    () =>
      computed.map((alert) =>
        alertOverrides[alert.id] ? { ...alert, status: alertOverrides[alert.id] } : alert
      ),
    [computed, alertOverrides]
  );

  const value = useMemo<Store>(
    () => ({
      alerts,
      rules,
      books,
      usingYourBooks,
      integrations,
      setAlertStatus(id, status) {
        setAlertOverrides((current) => ({ ...current, [id]: status }));
      },
      addRule(rule) {
        setRules((current) => [rule, ...current]);
      },
      toggleRule(id) {
        setRules((current) =>
          current.map((rule) => (rule.id === id ? { ...rule, enabled: !rule.enabled } : rule))
        );
      },
      setIntegration(id, status) {
        setIntegrations((current) => ({ ...current, [id]: status }));
      },
      importBooks(incoming, mode = "replace") {
        const next = mode === "merge" ? mergeBooks(books, incoming) : incoming;
        setBooks(next);
        setUsingYourBooks(booksHaveRecords(next));
        setAlertOverrides({});
        saveBooks(next);
      },
      addInvoice(invoice) {
        const next = { ...books, invoices: [...books.invoices, invoice] };
        setBooks(next);
        setUsingYourBooks(true);
        setAlertOverrides({});
        saveBooks(next);
      },
      addPayment(payment) {
        const next = { ...books, payments: [...books.payments, payment] };
        setBooks(next);
        setUsingYourBooks(true);
        setAlertOverrides({});
        saveBooks(next);
      },
      resetToDemo() {
        setBooks(emptyBooks());
        setUsingYourBooks(false);
        setAlertOverrides({});
        window.localStorage.removeItem(STORAGE);
      },
    }),
    [alerts, rules, books, usingYourBooks, integrations]
  );

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("useDemo must be used inside DemoProvider");
  return ctx;
}
