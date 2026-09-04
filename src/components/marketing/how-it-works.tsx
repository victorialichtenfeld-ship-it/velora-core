"use client";

import { motion } from "motion/react";

const systems = [
  "Gmail",
  "Outlook",
  "QuickBooks",
  "Salesforce",
  "HubSpot",
  "Stripe",
  "Slack",
  "Drive",
];

export function HowItWorks() {
  return (
    <section id="how" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
      <p className="text-xs uppercase tracking-[0.2em] text-protect">How Velora works</p>
      <h2 className="mt-3 font-serif text-3xl sm:text-4xl">A control layer, not another inbox.</h2>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Connect the tools you already run. Velora learns the rules of your business, then warns or blocks risky actions before money, contracts, or data leave the building.
      </p>

      <div className="glass mt-12 overflow-hidden rounded-[28px] p-6 ring-1 ring-border sm:p-10">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {systems.map((name, index) => (
            <motion.div
              key={name}
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="rounded-full bg-muted px-3 py-1.5 text-xs text-foreground ring-1 ring-border"
            >
              {name}
            </motion.div>
          ))}
        </div>
        <div className="relative mx-auto mt-8 h-28 max-w-xl">
          <svg viewBox="0 0 640 112" className="h-full w-full">
            <defs>
              <linearGradient id="flow" x1="0" x2="1">
                <stop stopColor="#7EC8BC" stopOpacity="0.2" />
                <stop offset="0.5" stopColor="#7EC8BC" />
                <stop offset="1" stopColor="#7EC8BC" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <path
              d="M20 56 H620"
              fill="none"
              stroke="url(#flow)"
              strokeWidth="2"
              strokeDasharray="8 10"
              className="[animation:dashMove_2.2s_linear_infinite]"
            />
            <circle cx="320" cy="56" r="22" fill="#ffffff" stroke="#0c0c0c" strokeWidth="1.6" />
            <circle cx="320" cy="56" r="7" fill="#7EC8BC" />
          </svg>
        </div>
        <div className="mt-1 text-center text-sm text-protect">Velora</div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <Step n="01" title="Connect business tools" body="Email, accounting, CRM, payments, and files stream into Velora through adapters — live later, simulated in this prototype." />
          <Step n="02" title="Understand rules and context" body="Contracts, approval limits, discount policy, and vendor masters become the baseline Velora reasons against." />
          <Step n="03" title="Warn or block before impact" body="Risky invoices, payments, and purchases are explained with evidence. A human always decides." />
        </div>
      </div>
    </section>
  );
}

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-2xl bg-card/90 p-5 ring-1 ring-ink/10"
    >
      <p className="font-mono text-xs text-protect">{n}</p>
      <h3 className="mt-2 text-lg font-medium">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
    </motion.div>
  );
}
