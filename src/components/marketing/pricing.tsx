"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { buttonVariants } from "@/components/ui/button-variants";
import { SectionIntro } from "@/components/marketing/section-intro";
import { Stagger, StaggerItem } from "@/components/reveal";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    price: "$299",
    cadence: "/month",
    description: "Duplicate-payment and invoice-pricing checks for one AP team.",
    features: ["Up to 3 systems", "Duplicate holds", "Invoice vs contract", "Email alerts"],
    highlighted: false,
    cta: "Start free trial",
    href: "/signup",
  },
  {
    name: "Growth",
    price: "$799",
    cadence: "/month",
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
  const reduce = useReducedMotion();

  return (
    <section id="pricing" className="mx-auto w-full max-w-5xl px-4 py-20 sm:px-6 sm:py-24">
      <SectionIntro
        eyebrow="Pricing"
        title="Priced like a control, not a chatbot seat."
        body="Starter and Growth start a trial. Enterprise is a call with finance and IT."
      />
      <Stagger className="mt-14 grid gap-10 lg:grid-cols-3">
        {plans.map((plan) => (
          <StaggerItem key={plan.name}>
            <div className={cn("relative border-t pt-6", plan.highlighted ? "border-gold" : "border-gold/20")}>
              {plan.highlighted ? (
                <span className="absolute inset-x-0 top-0 h-px overflow-hidden">
                  <span className="absolute inset-y-0 w-1/3 bg-gold animate-gold-wash" />
                </span>
              ) : null}
              <p className="text-[11px] uppercase tracking-[0.16em] text-gold">{plan.name}</p>
              <p className={`mt-3 font-figure text-4xl tracking-tight text-gold ${plan.highlighted ? "money-sheen" : ""}`}>
                {plan.price}
                <span className="ml-1 font-sans text-base text-gold/55">{plan.cadence}</span>
              </p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{plan.description}</p>
              <ul className="mt-6 flex flex-col gap-2 text-sm text-muted-foreground">
                {plan.features.map((feature, index) => (
                  <motion.li
                    key={feature}
                    initial={reduce ? false : { y: 8 }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.08 + index * 0.06 }}
                    className="flex items-start gap-2"
                  >
                    <Check className="mt-0.5 size-4 text-gold" />
                    {feature}
                  </motion.li>
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
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
