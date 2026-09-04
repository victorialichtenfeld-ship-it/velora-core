import Link from "next/link";
import { Check } from "lucide-react";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    price: "$299",
    cadence: "/month",
    description: "Duplicate-payment and invoice-pricing checks for one AP team.",
    features: [
      "Up to 3 connected systems",
      "Duplicate payment holds",
      "Invoice vs contract unit price",
      "Email alerts",
      "30-day audit history",
    ],
    highlighted: false,
    cta: "Start free trial",
    href: "/signup",
  },
  {
    name: "Growth",
    price: "$799",
    cadence: "/month",
    description: "Velora in the path of invoices and ACH for growing finance orgs.",
    features: [
      "Up to 8 connected systems",
      "Contract vs invoice matching",
      "Slack routing to AP",
      "Evidence on every alert",
      "Priority onboarding",
    ],
    highlighted: true,
    cta: "Start free trial",
    href: "/signup",
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "",
    description: "Multi-entity AP, SSO, and a security review before procurement.",
    features: [
      "Unlimited adapters",
      "SSO and role mapping",
      "Custom rule packs",
      "Dedicated success",
      "Security questionnaire support",
    ],
    highlighted: false,
    cta: "Book a call",
    href: "/book",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">Pricing</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Priced like a control, not a chatbot seat.</h2>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Starter and Growth start a trial workspace. Enterprise is a call with finance and IT — not a self-serve signup.
      </p>
      <div className="mt-8 grid gap-3 lg:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={cn(
              "flex flex-col rounded-xl bg-card p-6 ring-1 ring-border",
              plan.highlighted && "ring-primary/50"
            )}
          >
            <p className="text-sm font-medium">{plan.name}</p>
            <p className="mt-3 font-mono text-4xl tabular tracking-tight">
              {plan.price}
              <span className="ml-1 font-sans text-base text-muted-foreground">{plan.cadence}</span>
            </p>
            <p className="mt-3 text-sm text-muted-foreground">{plan.description}</p>
            <ul className="mt-6 flex flex-1 flex-col gap-2 text-sm">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <Check className="mt-0.5 size-4 text-protect" />
                  {feature}
                </li>
              ))}
            </ul>
            <Link
              href={plan.href}
              className={cn(
                buttonVariants({ variant: plan.highlighted ? "default" : "outline" }),
                "mt-8 h-11"
              )}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
