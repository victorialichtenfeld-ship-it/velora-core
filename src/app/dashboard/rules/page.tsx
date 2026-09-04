"use client";

import { RuleBuilder } from "@/components/dashboard/rule-builder";

export default function RulesPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-gold">Rules</p>
        <h1 className="mt-1 font-serif text-3xl">Tell Velora what “expensive” means here</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Rules are deterministic on purpose. AI explains the match; it does not invent policy. Start from the four Meridian defaults or write a new one in plain language.
        </p>
      </div>
      <RuleBuilder />
    </div>
  );
}
