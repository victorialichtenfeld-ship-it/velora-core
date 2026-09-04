import Link from "next/link";
import { Check } from "lucide-react";
import { buttonVariants } from "@/components/ui/button-variants";
import { GlassPanel } from "@/components/glass-panel";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    price: "$299",
    cadence: "/month",
    description: "For finance teams validating the first mistake types.",
    features: [
      "Up to 3 connected systems",
      "Duplicate payment and invoice checks",
      "Discount and pricing rules",
      "Email alerts",
      "30-day audit history",
    ],
    highlighted: false,
  },
  {
    name: "Growth",
    price: "$799",
    cadence: "/month",
    description: "For operators who want Velora in the path of invoices and payments.",
    features: [
      "Up to 8 connected systems",
      "Contract vs invoice matching",
      "Purchase approval limits",
      "Slack / Teams routing",
      "AI explanations on every alert",
      "Priority onboarding",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "",
    description: "For multi-entity companies that need controls, SSO, and procurement review.",
    features: [
      "Unlimited adapters",
      "SSO and role mapping",
      "Custom rule packs",
      "Dedicated success",
      "Security questionnaire support",
    ],
    highlighted: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
      <p className="text-xs uppercase tracking-[0.2em] text-gold">Pricing</p>
      <h2 className="mt-3 font-serif text-3xl sm:text-4xl">Priced like a control system, not a chatbot seat.</h2>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        The hypothesis this prototype exists to test: will a business pay $299–$799 a month to catch expensive mistakes before they happen?
      </p>
      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {plans.map((plan) => (
          <GlassPanel
            key={plan.name}
            glow={plan.highlighted ? "gold" : "none"}
            className="flex flex-col p-6"
          >
            <p className="text-sm uppercase tracking-[0.16em] text-gold">{plan.name}</p>
            <p className="mt-3 font-serif text-4xl">
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
              href="/signup"
              className={cn(
                buttonVariants({ variant: plan.highlighted ? "default" : "outline" }),
                "mt-8 h-11"
              )}
            >
              {plan.name === "Enterprise" ? "Talk to us" : "Start with demo data"}
            </Link>
          </GlassPanel>
        ))}
      </div>
    </section>
  );
}
