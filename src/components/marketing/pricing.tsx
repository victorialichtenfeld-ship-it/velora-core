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
    <section id="pricing" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <SectionIntro
        eyebrow="Pricing"
        title="Priced like a control, not a chatbot seat."
        body="Starter and Growth start a trial. Enterprise is a call with finance and IT."
      />
      <div className="mt-14 grid gap-6 lg:grid-cols-3 lg:items-end">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={cn(
              "relative px-1 pt-8",
              plan.highlighted ? "gold-desk px-6 pb-8" : "border-t border-gold/20"
            )}
          >
            {plan.highlighted ? (
              <span className="absolute inset-x-0 top-0 h-px overflow-hidden">
                <span className="absolute inset-y-0 w-1/3 bg-gold animate-gold-wash" />
              </span>
            ) : null}
            <p className="text-[11px] uppercase tracking-[0.2em] text-gold">{plan.name}</p>
            <p className={`mt-3 font-figure tracking-[-0.04em] text-gold ${plan.highlighted ? "money-sheen text-6xl" : "text-4xl"}`}>
              {plan.price}
              <span className="ml-1 font-sans text-base text-gold/55">{plan.cadence}</span>
            </p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{plan.description}</p>
            <ul className="mt-6 flex flex-col gap-2 text-sm text-muted-foreground">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <Check className="mt-0.5 size-4 text-gold" />
                  {feature}
                </li>
              ))}
            </ul>
            <Link
              href={plan.href}
              className={cn(
                buttonVariants({ variant: plan.highlighted ? "default" : "outline" }),
                "mt-8 h-12 px-5 text-[13px] tracking-[0.08em] uppercase"
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
