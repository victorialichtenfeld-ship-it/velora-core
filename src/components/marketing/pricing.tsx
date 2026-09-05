"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { buttonVariants } from "@/components/ui/button-variants";
import { SectionIntro } from "@/components/marketing/section-intro";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    price: "$299",
    cadence: "/mo",
    description: "Duplicate-payment and invoice-pricing checks for one AP team.",
    features: ["Up to 3 systems", "Duplicate holds", "Invoice vs contract", "Email alerts"],
    highlighted: false,
    cta: "Start free trial",
    href: "/signup",
  },
  {
    name: "Growth",
    price: "$799",
    cadence: "/mo",
    description: "Velora in the path of invoices and ACH for growing finance orgs.",
    features: ["Up to 8 systems", "Contract matching", "Slack to AP", "Priority onboarding"],
    highlighted: true,
    cta: "Start free trial",
    href: "/signup",
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "",
    description: "Multi-entity AP, SSO, and a security review before procurement.",
    features: ["Unlimited adapters", "SSO", "Custom rules", "Dedicated success"],
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
        body="Starter and Growth start a trial. Enterprise is a call with finance and IT."
      />
      <div className="mt-14 grid gap-6 lg:grid-cols-3 lg:items-stretch">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={cn(
              "flex flex-col rounded-2xl border p-7",
              plan.highlighted
                ? "border-gold/35 bg-card shadow-[0_18px_40px_rgb(196_163_90_/_0.18)]"
                : "border-border bg-transparent"
            )}
          >
            <p className="text-[13px] font-medium text-muted-foreground">{plan.name}</p>
            <p className={`font-figure mt-3 tracking-[-0.04em] text-4xl ${plan.highlighted ? "money-sheen" : "text-foreground"}`}>
              {plan.price}
              <span className="ml-1 font-sans text-base text-muted-foreground">{plan.cadence}</span>
            </p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{plan.description}</p>
            <ul className="mt-6 flex flex-col gap-2 text-sm text-muted-foreground">
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
                "mt-8 h-11 px-5 text-[14px]"
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
