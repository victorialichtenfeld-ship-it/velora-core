"use client";

import { useEffect, useMemo, useState } from "react";

type InboxPayload = {
  ok: boolean;
  sheetConfigured: boolean;
  counts: {
    leads: number;
    feedback: number;
    events: number;
    pageViews: number;
    reachedPricing: number;
    scroll: Record<string, number>;
    ctaByPlan: Record<string, Record<string, number>>;
  };
  leads: Array<Record<string, string>>;
  feedback: Array<Record<string, string>>;
};

const fieldClass =
  "h-10 rounded-xl border border-white/12 bg-white/5 px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary/40";

export default function InboxPage() {
  const [key, setKey] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState<InboxPayload | null>(null);

  useEffect(() => {
    const stored = window.sessionStorage.getItem("velora_inbox_key");
    const fromQuery = new URLSearchParams(window.location.search).get("key");
    const next = fromQuery || stored || "";
    if (next) {
      setKey(next);
      void load(next);
    }
  }, []);

  async function load(nextKey: string) {
    setError("");
    const response = await fetch(`/api/inbox?key=${encodeURIComponent(nextKey)}`);
    if (!response.ok) {
      setData(null);
      setError("That inbox key did not match.");
      return;
    }
    window.sessionStorage.setItem("velora_inbox_key", nextKey);
    setData((await response.json()) as InboxPayload);
  }

  const priceMix = useMemo(() => {
    if (!data) return [];
    const tally: Record<string, number> = { too_high: 0, about_right: 0, too_low: 0 };
    for (const row of data.feedback) {
      const opinion = row.priceOpinion;
      if (opinion in tally) tally[opinion] += 1;
    }
    return Object.entries(tally);
  }, [data]);

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6">
      <p className="text-[13px] font-medium text-gold">Customer validation</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">Inbox</h1>
      <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
        Leads, pricing reactions, and CTA clicks. Not linked from the public site. Set <code>VALIDATION_INBOX_KEY</code> to open this.
      </p>

      <form
        className="mt-6 flex flex-col gap-2 sm:flex-row"
        onSubmit={(event) => {
          event.preventDefault();
          void load(key);
        }}
      >
        <input
          type="password"
          value={key}
          onChange={(event) => setKey(event.target.value)}
          placeholder="Inbox key"
          className={fieldClass}
        />
        <button type="submit" className="h-10 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground">
          Open
        </button>
      </form>
      {error ? <p className="mt-3 text-sm text-destructive">{error}</p> : null}

      {data ? (
        <div className="mt-10 space-y-10">
          <p className="text-[13px] text-muted-foreground">
            {data.sheetConfigured ? "Also forwarding to the Google Sheet webhook." : "Saving locally in data/*.jsonl. Add GOOGLE_SHEETS_WEBHOOK_URL to mirror a sheet."}
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Stat label="Leads" value={data.counts.leads} />
            <Stat label="Reached pricing" value={data.counts.reachedPricing} />
            <Stat label="Page views" value={data.counts.pageViews} />
            <Stat label="Pricing feedback" value={data.counts.feedback} />
          </div>

          <section>
            <h2 className="text-lg font-semibold">CTA clicks by plan</h2>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-muted-foreground">
                  <tr>
                    <th className="py-2 pr-4">Plan</th>
                    <th className="py-2 pr-4">Try Velora</th>
                    <th className="py-2 pr-4">Start with demo data</th>
                    <th className="py-2">Talk to us</th>
                  </tr>
                </thead>
                <tbody>
                  {["starter", "growth", "enterprise", "none"].map((plan) => {
                    const row = data.counts.ctaByPlan[plan] ?? {};
                    return (
                      <tr key={plan} className="border-t border-white/8">
                        <td className="py-2 pr-4 capitalize">{plan}</td>
                        <td className="py-2 pr-4">{row.try_velora ?? 0}</td>
                        <td className="py-2 pr-4">{row.start_with_demo_data ?? 0}</td>
                        <td className="py-2">{row.talk_to_us ?? 0}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold">Scroll depth</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              25% {data.counts.scroll[25] ?? 0} · 50% {data.counts.scroll[50] ?? 0} · 75% {data.counts.scroll[75] ?? 0} · 100% {data.counts.scroll[100] ?? 0}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">Pricing reaction</h2>
            <ul className="mt-2 text-sm text-muted-foreground">
              {priceMix.map(([id, count]) => (
                <li key={id}>
                  {id.replaceAll("_", " ")}: {count}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold">Leads</h2>
              <a className="text-[13px] text-gold hover:underline" href={`/api/inbox?key=${encodeURIComponent(key)}&format=csv&kind=leads`}>
                Download CSV
              </a>
            </div>
            <ul className="mt-3 space-y-3">
              {data.leads.length === 0 ? <li className="text-sm text-muted-foreground">No leads yet.</li> : null}
              {data.leads.map((lead) => (
                <li key={lead.id} className="glass rounded-2xl p-4 text-sm">
                  <p className="font-medium">
                    {lead.name} · {lead.email}
                  </p>
                  <p className="mt-1 text-muted-foreground">
                    {lead.company} · {lead.role} · {lead.plan || "no plan"} · {lead.source}
                  </p>
                  <p className="mt-1 text-[12px] text-muted-foreground">{lead.at}</p>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold">Feedback</h2>
              <a className="text-[13px] text-gold hover:underline" href={`/api/inbox?key=${encodeURIComponent(key)}&format=csv&kind=feedback`}>
                Download CSV
              </a>
            </div>
            <ul className="mt-3 space-y-3">
              {data.feedback.length === 0 ? <li className="text-sm text-muted-foreground">No pricing comments yet.</li> : null}
              {data.feedback.map((row) => (
                <li key={row.id} className="glass rounded-2xl p-4 text-sm">
                  <p className="font-medium">{String(row.priceOpinion || "").replaceAll("_", " ")}</p>
                  {row.comment ? <p className="mt-1 text-muted-foreground">{row.comment}</p> : null}
                  <p className="mt-1 text-[12px] text-muted-foreground">{row.at}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      ) : null}
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="glass rounded-2xl p-4">
      <p className="font-figure text-2xl">{value}</p>
      <p className="mt-1 text-[12px] text-muted-foreground">{label}</p>
    </div>
  );
}
