"use client";

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
      <p className="text-xs uppercase tracking-[0.2em] text-gold">How Velora works</p>
      <h2 className="mt-3 font-serif text-3xl sm:text-4xl">A control layer, not another inbox.</h2>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Connect the tools you already run. Velora learns the rules of your business, then warns or blocks risky actions before money, contracts, or data leave the building.
      </p>

      <div className="mt-12 overflow-hidden rounded-[28px] glass p-6 ring-1 ring-white/10 sm:p-10">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {systems.map((name, index) => (
            <div
              key={name}
              className="rounded-full bg-white/5 px-3 py-1.5 text-xs text-muted-foreground ring-1 ring-white/10"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              {name}
            </div>
          ))}
        </div>
        <div className="relative mx-auto mt-8 h-24 max-w-xl">
          <svg viewBox="0 0 640 96" className="h-full w-full">
            <defs>
              <linearGradient id="flow" x1="0" x2="1">
                <stop stopColor="#C9B07A" stopOpacity="0.1" />
                <stop offset="0.5" stopColor="#6EC8B8" />
                <stop offset="1" stopColor="#C9B07A" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <path
              d="M20 48 H620"
              fill="none"
              stroke="url(#flow)"
              strokeWidth="2"
              strokeDasharray="8 10"
              className="[animation:dataFlow_2.4s_linear_infinite]"
            />
            <circle cx="320" cy="48" r="18" fill="#10141f" stroke="#C9B07A" />
            <circle cx="320" cy="48" r="6" fill="#6EC8B8" className="animate-glow" />
          </svg>
        </div>
        <div className="mt-4 text-center text-sm text-gold">Velora</div>

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
    <div className="rounded-2xl bg-black/20 p-5 ring-1 ring-white/8">
      <p className="font-mono text-xs text-gold">{n}</p>
      <h3 className="mt-2 text-lg font-medium">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
    </div>
  );
}
