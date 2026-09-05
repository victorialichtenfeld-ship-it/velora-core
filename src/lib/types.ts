export type Severity = "critical" | "high" | "medium" | "low";

export type AlertStatus = "open" | "approved" | "ignored" | "escalated" | "resolved";

export type RiskType =
  | "duplicate_invoice"
  | "duplicate_payment"
  | "pricing_mismatch"
  | "large_discount"
  | "purchase_over_limit"
  | "contract_invoice_mismatch"
  | "suspicious_payment";

export type Team = "finance" | "sales" | "legal" | "purchasing" | "operations" | "security";

export type IntegrationId =
  | "gmail"
  | "outlook"
  | "slack"
  | "teams"
  | "quickbooks"
  | "xero"
  | "salesforce"
  | "hubspot"
  | "stripe"
  | "google-drive"
  | "microsoft-365";

export type IntegrationStatus = "connected" | "available" | "coming_soon";

export type EvidenceItem = {
  label: string;
  value: string;
  highlight?: boolean;
  source: string;
};

export type RecommendedAction = {
  id: string;
  label: string;
  intent: "primary" | "secondary" | "destructive";
};

export type Alert = {
  id: string;
  title: string;
  riskType: RiskType;
  severity: Severity;
  status: AlertStatus;
  dollarImpact: number;
  team: Team;
  detectedAt: string;
  actor: string;
  system: string;
  summary: string;
  whyItMatters: string;
  whyFlagged: string;
  evidence: EvidenceItem[];
  recommendedActions: RecommendedAction[];
  blocked: boolean;
};

export type Invoice = {
  id: string;
  number: string;
  counterparty: string;
  sku: string;
  unitPrice: number;
  expectedUnitPrice?: number;
  quantity: number;
  discountPct: number;
  total: number;
  issuedAt: string;
  direction: "receivable" | "payable";
};

export type Payment = {
  id: string;
  vendor: string;
  amount: number;
  method: string;
  paidAt: string;
  reference: string;
};

export type PurchaseOrder = {
  id: string;
  number: string;
  vendor: string;
  amount: number;
  requester: string;
  department: string;
  createdAt: string;
};

export type Contract = {
  id: string;
  name: string;
  party: string;
  sku: string;
  unitPrice: number;
  effectiveAt: string;
  expiresAt: string;
  terms: string;
};

export type RuleOperator = "greater_than" | "greater_or_equal" | "equals" | "differs_from" | "duplicate_over";

export type RuleField =
  | "discount_pct"
  | "invoice_total"
  | "purchase_amount"
  | "invoice_unit_price"
  | "payment_amount";

export type RuleAction = "warn" | "block" | "alert" | "require_approval";

export type BusinessRule = {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  field: RuleField;
  operator: RuleOperator;
  threshold: number;
  action: RuleAction;
  createdAt: string;
};

export type ActivityEvent = {
  id: string;
  at: string;
  title: string;
  detail: string;
  tone: "risk" | "protect" | "neutral" | "system";
};

export type SessionUser = {
  name: string;
  email: string;
  company: string;
  role: string;
  businessType?: string;
  systems?: string[];
  risks?: string[];
  plan?: string;
  paid?: boolean;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
};

export type OnboardingState = {
  businessType: string;
  systems: string[];
  risks: string[];
  completed: boolean;
};
