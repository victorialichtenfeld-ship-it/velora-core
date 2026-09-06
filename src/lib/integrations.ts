/**
 * Live QuickBooks / Gmail / bank / Slack OAuth is not built.
 * Connect tiles in the UI are labels only. Import a CSV of invoices
 * and payments — that is the working path today.
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

function notBuilt(id: string, displayName: string): IntegrationAdapter {
  return {
    id,
    displayName,
    async connect() {
      return {
        ok: false,
        message: `${displayName} live connect is not built. Export a CSV and import it on Integrations.`,
      };
    },
    async disconnect() {
      return { ok: true };
    },
    async health() {
      return "disconnected";
    },
    async pullSample() {
      return { label: "records", count: 0 };
    },
  };
}

export const integrationAdapters: Record<string, IntegrationAdapter> = {
  gmail: notBuilt("gmail", "Gmail"),
  outlook: notBuilt("outlook", "Microsoft Outlook"),
  slack: notBuilt("slack", "Slack"),
  teams: notBuilt("teams", "Microsoft Teams"),
  quickbooks: notBuilt("quickbooks", "QuickBooks"),
  xero: notBuilt("xero", "Xero"),
  salesforce: notBuilt("salesforce", "Salesforce"),
  hubspot: notBuilt("hubspot", "HubSpot"),
  stripe: notBuilt("stripe", "Stripe"),
  "google-drive": notBuilt("google-drive", "Google Drive"),
  "microsoft-365": notBuilt("microsoft-365", "Microsoft 365"),
};

export function getIntegrationAdapter(id: string) {
  return integrationAdapters[id] ?? notBuilt(id, id);
}
