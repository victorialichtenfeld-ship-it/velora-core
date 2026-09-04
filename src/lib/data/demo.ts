import { contracts } from "@/lib/data/records";
import { detectedAlerts } from "@/lib/risk-engine";
import type {
  ActivityEvent,
  Alert,
  IntegrationId,
  IntegrationStatus,
  SessionUser,
} from "@/lib/types";

export const demoUser: SessionUser = {
  name: "Jordan Hale",
  email: "jordan@meridian-supply.com",
  company: "Meridian Supply",
  role: "VP of Finance",
};

export const DEMO_PROTECTED_MONTH = 184_320;
export const DEMO_MISTAKES_PREVENTED = 47;
export const DEMO_CONNECTED_SYSTEMS = 8;

export const onboardingScanTotal = detectedAlerts.reduce(
  (sum, alert) => sum + alert.dollarImpact,
  0
);

export const riskTrend = [
  { day: "Aug 5", protected: 4200, alerts: 3 },
  { day: "Aug 12", protected: 9100, alerts: 5 },
  { day: "Aug 19", protected: 6400, alerts: 4 },
  { day: "Aug 26", protected: 15800, alerts: 7 },
  { day: "Sep 2", protected: 22100, alerts: 9 },
  { day: "Sep 4", protected: 38420, alerts: 7 },
];

export const riskByType = [
  { type: "Duplicate payments", value: 62_400 },
  { type: "Pricing leakage", value: 51_180 },
  { type: "Unauthorized discounts", value: 28_750 },
  { type: "Contract conflicts", value: 21_940 },
  { type: "Suspicious spend", value: 20_050 },
];

export const activityTimeline: ActivityEvent[] = [
  {
    id: "evt-1",
    at: "2026-09-04T14:12:00.000Z",
    title: "Blocked invoice INV-10482",
    detail: "Harborline billed at $84/unit against a $102 contract.",
    tone: "risk",
  },
  {
    id: "evt-2",
    at: "2026-09-04T09:41:00.000Z",
    title: "Stopped duplicate ACH",
    detail: "Second $11,240 payment to Apex Logistics was held.",
    tone: "protect",
  },
  {
    id: "evt-3",
    at: "2026-09-04T10:26:00.000Z",
    title: "PO-2201 awaiting approval",
    detail: "Helios Industrial purchase exceeds the $25,000 limit.",
    tone: "risk",
  },
  {
    id: "evt-4",
    at: "2026-09-04T08:11:00.000Z",
    title: "New vendor wire flagged",
    detail: "Nimbus Facilities is not on the approved vendor master.",
    tone: "risk",
  },
  {
    id: "evt-5",
    at: "2026-09-03T16:02:00.000Z",
    title: "Rule pack updated",
    detail: "Finance tightened discount warnings from 20% to 15%.",
    tone: "system",
  },
  {
    id: "evt-6",
    at: "2026-09-02T19:44:00.000Z",
    title: "Salesforce connected",
    detail: "Opportunity and quote objects now stream into Velora.",
    tone: "neutral",
  },
];

export const integrationsCatalog: {
  id: IntegrationId;
  name: string;
  category: string;
  status: IntegrationStatus;
  description: string;
}[] = [
  {
    id: "gmail",
    name: "Gmail",
    category: "Email",
    status: "connected",
    description: "Watch outbound invoices, contracts, and payment instructions.",
  },
  {
    id: "outlook",
    name: "Microsoft Outlook",
    category: "Email",
    status: "connected",
    description: "Inspect AP inboxes and attachments before they are acted on.",
  },
  {
    id: "quickbooks",
    name: "QuickBooks",
    category: "Accounting",
    status: "connected",
    description: "Compare bills, invoices, and vendor payments to policy.",
  },
  {
    id: "stripe",
    name: "Stripe",
    category: "Payments",
    status: "connected",
    description: "Catch duplicate payouts and unusual payment amounts.",
  },
  {
    id: "salesforce",
    name: "Salesforce",
    category: "CRM",
    status: "connected",
    description: "Read quotes and contracted prices before invoices go out.",
  },
  {
    id: "hubspot",
    name: "HubSpot",
    category: "CRM",
    status: "connected",
    description: "Detect unauthorized discounts at the deal stage.",
  },
  {
    id: "slack",
    name: "Slack",
    category: "Messaging",
    status: "connected",
    description: "Route high-risk alerts to Finance without leaving Slack.",
  },
  {
    id: "google-drive",
    name: "Google Drive",
    category: "Files",
    status: "connected",
    description: "Parse contract PDFs for rate cards and approval language.",
  },
  {
    id: "teams",
    name: "Microsoft Teams",
    category: "Messaging",
    status: "available",
    description: "Send approval cards into the channels Finance already uses.",
  },
  {
    id: "xero",
    name: "Xero",
    category: "Accounting",
    status: "available",
    description: "Same bill and invoice controls for Xero-led finance teams.",
  },
  {
    id: "microsoft-365",
    name: "Microsoft 365",
    category: "Files",
    status: "available",
    description: "Read SharePoint contracts and purchase-order mailboxes.",
  },
];

export const transactions = [
  {
    id: "txn-1",
    at: "2026-09-04T14:12:00.000Z",
    party: "Harborline Retail",
    type: "Invoice",
    amount: 68880,
    status: "Blocked",
    system: "QuickBooks",
  },
  {
    id: "txn-2",
    at: "2026-09-04T09:41:00.000Z",
    party: "Apex Logistics",
    type: "ACH payment",
    amount: 11240,
    status: "Held",
    system: "Stripe",
  },
  {
    id: "txn-3",
    at: "2026-09-04T10:26:00.000Z",
    party: "Helios Industrial",
    type: "Purchase order",
    amount: 26760,
    status: "Needs approval",
    system: "Microsoft 365",
  },
  {
    id: "txn-4",
    at: "2026-09-04T11:04:00.000Z",
    party: "Northwind Clinics",
    type: "Invoice",
    amount: 23100,
    status: "Warned",
    system: "HubSpot",
  },
  {
    id: "txn-5",
    at: "2026-09-04T08:11:00.000Z",
    party: "Nimbus Facilities LLC",
    type: "Wire",
    amount: 9875.01,
    status: "Held",
    system: "QuickBooks",
  },
  {
    id: "txn-6",
    at: "2026-09-03T18:02:00.000Z",
    party: "Apex Logistics",
    type: "ACH payment",
    amount: 11240,
    status: "Cleared",
    system: "QuickBooks",
  },
  {
    id: "txn-7",
    at: "2026-09-02T13:08:00.000Z",
    party: "Cinder & Co.",
    type: "Invoice",
    amount: 76140,
    status: "Blocked",
    system: "Salesforce",
  },
  {
    id: "txn-8",
    at: "2026-09-01T15:00:00.000Z",
    party: "Keystone Parts",
    type: "Purchase order",
    amount: 8400,
    status: "Cleared",
    system: "Purchasing",
  },
];

export const contractRecords = contracts.map((contract) => ({
  ...contract,
  linkedAlerts: detectedAlerts.filter((alert) =>
    alert.evidence.some((item) => item.value.includes(contract.party) || item.source.includes(contract.name))
  ).length,
}));

export function getAlertById(id: string, alerts: Alert[] = detectedAlerts) {
  return alerts.find((alert) => alert.id === id);
}

export const dashboardStats = {
  moneyProtected: DEMO_PROTECTED_MONTH,
  mistakesPrevented: DEMO_MISTAKES_PREVENTED,
  highRisk: detectedAlerts.filter((alert) => alert.severity === "critical" || alert.severity === "high").length,
  connectedSystems: DEMO_CONNECTED_SYSTEMS,
  openImpact: detectedAlerts
    .filter((alert) => alert.status === "open")
    .reduce((sum, alert) => sum + alert.dollarImpact, 0),
};
