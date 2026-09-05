export const paidPlans = {
  starter: {
    id: "starter" as const,
    name: "Starter",
    amount: 29900,
    label: "$299/mo",
    description: "Watch invoices and payments for one finance team.",
  },
  growth: {
    id: "growth" as const,
    name: "Growth",
    amount: 79900,
    label: "$799/mo",
    description: "Invoices, payments, discounts, and POs for growing finance and ops.",
  },
} as const;

export type PaidPlan = keyof typeof paidPlans;

export function isPaidPlan(value: string): value is PaidPlan {
  return value === "starter" || value === "growth";
}
