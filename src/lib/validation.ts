export const roles = [
  "Controller",
  "VP / Head of Finance",
  "FP&A",
  "Ops lead",
  "Founder / CEO",
  "Other",
] as const;

export const plans = ["starter", "growth", "enterprise"] as const;

export type Role = (typeof roles)[number];
export type Plan = (typeof plans)[number];
export type CtaId = "try_velora" | "start_with_demo_data" | "talk_to_us";

export type LeadPayload = {
  name: string;
  email: string;
  company: string;
  role: string;
  plan: Plan | "";
  source: string;
  cta: CtaId;
  honeypot?: string;
};

export type FeedbackPayload = {
  priceOpinion: "too_high" | "about_right" | "too_low";
  comment: string;
};

export type AnalyticsEvent = {
  event: string;
  cta?: CtaId;
  plan?: Plan | "";
  location?: string;
  depth?: number;
  path?: string;
  sessionId?: string;
};

export function isPlan(value: string): value is Plan {
  return (plans as readonly string[]).includes(value);
}

export function isCta(value: string): value is CtaId {
  return value === "try_velora" || value === "start_with_demo_data" || value === "talk_to_us";
}

export function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
