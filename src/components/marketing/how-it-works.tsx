const steps = [
  {
    n: "01",
    title: "Connect AP systems",
    body: "Email, QuickBooks, and payment rails stream bills and ACH instructions into Velora. This walkthrough uses simulated adapters.",
  },
  {
    n: "02",
    title: "Match against policy",
    body: "Vendor masters, paid invoices, and contract unit prices are the baseline. Duplicate amount + vendor, or invoice price ≠ contract, gets flagged.",
  },
  {
    n: "03",
    title: "Hold for a named person",
    body: "Risky payments and invoices stop before they leave. A finance owner holds, approves, or dismisses with an audit trail.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">How it works</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">A hold in the payment path, not another inbox.</h2>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Velora does not ask AP to re-key data. It watches the tools they already run and blocks the two mistakes that cost the most.
      </p>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {steps.map((step) => (
          <div key={step.n} className="rounded-xl bg-card p-5 ring-1 ring-border">
            <p className="font-mono text-xs text-muted-foreground">{step.n}</p>
            <h3 className="mt-2 text-lg font-medium">{step.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
