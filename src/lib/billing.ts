import Stripe from "stripe";
import type { Plan } from "@/lib/validation";
import { siteUrl } from "@/lib/site";
import { paidPlans, type PaidPlan } from "@/lib/plans";

export { paidPlans, isPaidPlan, type PaidPlan } from "@/lib/plans";

export function stripeConfigured() {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key);
}

export function priceIdFor(plan: PaidPlan) {
  if (plan === "starter") return process.env.STRIPE_PRICE_STARTER || "";
  return process.env.STRIPE_PRICE_GROWTH || "";
}

export function checkoutUrls() {
  const origin = siteUrl();
  return {
    success: `${origin}/billing/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel: `${origin}/billing/cancel`,
  };
}

export function planFromMetadata(value: string | undefined): Plan | "" {
  if (value === "starter" || value === "growth" || value === "enterprise") return value;
  return "";
}

export function catalog(plan: PaidPlan) {
  return paidPlans[plan];
}
