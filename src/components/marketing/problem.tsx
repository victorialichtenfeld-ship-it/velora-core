"use client";

import { useState } from "react";

const cases = [
  {
    id: "dup",
    title: "Duplicate vendor payments",
    line: "Apex Logistics billed twice in 15 hours.",
    detail:
      "ACH-4418 matched ACH-4410: same vendor, same $11,240. Velora held the second payment before it reached the bank.",
    impact: "$11,240",
  },
  {
    id: "price",
    title: "Invoice pricing mismatches",
    line: "Harborline was billed $84 instead of the $102 contract rate.",
    detail:
      "820 units were about to go out under the MSA. The $14,760 gap was blocked on the draft invoice, before billing sent it.",
    impact: "$14,760",
  },
];

export function ProblemSection() {
  const [active, setActive] = useState(cases[0].id);
  const current = cases.find((item) => item.id === active) ?? cases[0];

  return (
    <section id="product" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">What Velora checks first</p>
      <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
        Two AP mistakes that quietly move six figures.
      </h2>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Finance teams at mid-size companies lose the most money on repeat vendor payments and invoices that ignore the contracted unit price. Velora is built around those two checks. Everything else is secondary.
      </p>
      <div className="mt-10 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="grid gap-2">
          {cases.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(item.id)}
              className={`rounded-md px-4 py-3 text-left text-sm ring-1 transition ${
                active === item.id
                  ? "bg-secondary text-foreground ring-primary/40"
                  : "bg-card text-muted-foreground ring-border hover:text-foreground"
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>
        <div className="min-h-[240px] rounded-xl bg-card p-6 ring-1 ring-border sm:p-8">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-protect">Held in the walkthrough</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight">{current.line}</h3>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">{current.detail}</p>
          <div className="mt-8">
            <p className="text-[11px] text-muted-foreground">Amount at risk</p>
            <p className="mt-1 font-mono text-4xl tabular tracking-tight text-risk">{current.impact}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
