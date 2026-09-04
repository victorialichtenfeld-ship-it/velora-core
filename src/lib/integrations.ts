/**
 * Integration adapters are intentionally provider-agnostic.
 * The MVP uses simulated connectors. Swap a simulator for a live client
 * without changing dashboard UI.
 */

export type ConnectorHealth = "ok" | "degraded" | "disconnected";

export type IntegrationAdapter = {
  id: string;
  displayName: string;
  connect: () => Promise<{ ok: boolean; message: string }>;
  disconnect: () => Promise<{ ok: boolean }>;
  health: () => Promise<ConnectorHealth>;
  pullSample: () => Promise<{ label: string; count: number }>;
};

function simulate(id: string, displayName: string): IntegrationAdapter {
  return {
    id,
    displayName,
    async connect() {
      await new Promise((resolve) => setTimeout(resolve, 600));
      return { ok: true, message: `${displayName} connected in demo mode.` };
    },
    async disconnect() {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return { ok: true };
    },
    async health() {
      return "ok";
    },
    async pullSample() {
      return { label: "records", count: 42 };
    },
  };
}

export const integrationAdapters: Record<string, IntegrationAdapter> = {
  gmail: simulate("gmail", "Gmail"),
  outlook: simulate("outlook", "Microsoft Outlook"),
  slack: simulate("slack", "Slack"),
  teams: simulate("teams", "Microsoft Teams"),
  quickbooks: simulate("quickbooks", "QuickBooks"),
  xero: simulate("xero", "Xero"),
  salesforce: simulate("salesforce", "Salesforce"),
  hubspot: simulate("hubspot", "HubSpot"),
  stripe: simulate("stripe", "Stripe"),
  "google-drive": simulate("google-drive", "Google Drive"),
  "microsoft-365": simulate("microsoft-365", "Microsoft 365"),
};

export function getIntegrationAdapter(id: string) {
  return integrationAdapters[id] ?? simulate(id, id);
}
