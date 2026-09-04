"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { detectedAlerts } from "@/lib/risk-engine";
import { defaultRules } from "@/lib/data/rules";
import { integrationsCatalog } from "@/lib/data/demo";
import type { Alert, AlertStatus, BusinessRule, IntegrationId, IntegrationStatus } from "@/lib/types";

type Store = {
  alerts: Alert[];
  rules: BusinessRule[];
  integrations: Record<IntegrationId, IntegrationStatus>;
  setAlertStatus: (id: string, status: AlertStatus) => void;
  addRule: (rule: BusinessRule) => void;
  toggleRule: (id: string) => void;
  setIntegration: (id: IntegrationId, status: IntegrationStatus) => void;
};

const DemoContext = createContext<Store | null>(null);

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [alerts, setAlerts] = useState(detectedAlerts);
  const [rules, setRules] = useState(defaultRules);
  const [integrations, setIntegrations] = useState<Record<IntegrationId, IntegrationStatus>>(() => {
    const map = {} as Record<IntegrationId, IntegrationStatus>;
    for (const item of integrationsCatalog) map[item.id] = item.status;
    return map;
  });

  const value = useMemo<Store>(
    () => ({
      alerts,
      rules,
      integrations,
      setAlertStatus(id, status) {
        setAlerts((current) =>
          current.map((alert) => (alert.id === id ? { ...alert, status } : alert))
        );
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
    }),
    [alerts, rules, integrations]
  );

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("useDemo must be used inside DemoProvider");
  return ctx;
}
