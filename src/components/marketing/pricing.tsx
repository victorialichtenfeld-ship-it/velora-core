"use client";

import { Check } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { buttonVariants } from "@/components/ui/button-variants";
import { SectionIntro } from "@/components/marketing/section-intro";
import { EarlyAccessCta } from "@/components/validation/ctas";
import { cn } from "@/lib/utils";
import type { CtaId, Plan } from "@/lib/validation";

const plans = [
  {
    name: "Starter",
    plan: "starter" as const,
    price: "$299",
    cadence: "/mo",
    description: "Watch invoices and payments for one finance team. Human approval on every flag.",
    features: ["Up to 3 systems", "Duplicate payments", "Pricing and contracts", "Email alerts"],
    highlighted: false,
    cta: "try_velora" as const,
    label: "Try Velora",
  },
  {
    name: "Growth",
    plan: "growth" as const,
    price: "$799",
    cadence: "/mo",
    description: "Velora in the path of invoices, payments, discounts, and POs for growing finance and ops.",
    features: ["Up to 8 systems", "Discounts and wires", "Slack to the owner", "Priority onboarding"],
    highlighted: true,
    cta: "try_velora" as const,
    label: "Try Velora",
  },
  {
    name: "Enterprise",
    plan: "enterprise" as const,
    price: "Custom",
    cadence: "",
    description: "Multi-entity controls, SSO, and a security review. Still never auto-executes.",
    features: ["Unlimited adapters", "SSO", "Your rule packs", "Dedicated success"],
    highlighted: false,
    cta: "talk_to_us" as const,
    label: "Talk to us",
  },
] satisfies Array<{
  name: string;
  plan: Plan;
  price: string;
  cadence: string;
  description: string;
  features: string[];
  highlighted: boolean;
  cta: Exclude<CtaId, "start_with_demo_data">;
  label: string;
}>;

export function Pricing() {
  const reduce = useReducedMotion();
  return (
    <section id="pricing" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
      <SectionIntro
        eyebrow="Pricing"
        title="A control in the payment path. Not a chatbot seat."
        body="Starter and Growth are early access at these prices. A human still decides every flag. Enterprise is a conversation with finance and IT."
      />
      <div className="mt-14 grid gap-6 lg:grid-cols-3 lg:items-stretch">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={reduce ? false : { y: 16 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            whileHover={reduce ? undefined : { y: -5 }}
            className={cn(
              "glass flex flex-col rounded-[1.6rem] p-7",
              plan.highlighted && "border-gold/35 bg-gold/[0.08]"
            )}
          >
            <p className="text-[13px] font-medium text-muted-foreground">{plan.name}</p>
            <p className={`font-figure mt-3 tracking-[-0.04em] text-4xl ${plan.highlighted ? "text-gold" : "text-foreground"}`}>
              {plan.price}
              <span className="ml-1 font-sans text-base text-muted-foreground">{plan.cadence}</span>
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
            <EarlyAccessCta
              cta={plan.cta}
              plan={plan.plan}
              source="pricing"
              className={cn(
                buttonVariants({ variant: plan.highlighted ? "default" : "outline" }),
                "mt-8 h-11 px-5 text-[14px]"
              )}
            >
              {plan.label}
            </EarlyAccessCta>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
