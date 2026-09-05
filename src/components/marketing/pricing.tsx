"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { buttonVariants } from "@/components/ui/button-variants";
import { MotionCard } from "@/components/motion-card";
import { SectionIntro } from "@/components/marketing/section-intro";
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
    <section id="pricing" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
      <SectionIntro
        eyebrow="Pricing"
        title="Priced like a control, not a chatbot seat."
        body="Starter and Growth start a trial workspace. Enterprise is a call with finance and IT — not a self-serve signup."
      />
      <div className="mt-12 grid gap-3 lg:grid-cols-3">
        {plans.map((plan, index) => (
          <MotionCard
            key={plan.name}
            delay={index * 0.08}
            className={cn("flex flex-col p-6", plan.highlighted && "gold-glow ring-gold/35")}
          >
            <p className="text-sm font-medium">{plan.name}</p>
            <p className={`mt-3 font-figure text-4xl tracking-tight text-gold ${plan.highlighted ? "money-sheen" : ""}`}>
              {plan.price}
              <span className="ml-1 font-sans text-base text-gold/60">{plan.cadence}</span>
            </p>
            <p className="mt-3 text-sm text-muted-foreground">{plan.description}</p>
            <ul className="mt-6 flex flex-1 flex-col gap-2 text-sm">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <Check className="mt-0.5 size-4 text-primary" />
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
          </MotionCard>
        ))}
      </div>
    </section>
  );
}
