"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useDemo } from "@/components/demo-store";
import { GlassPanel } from "@/components/glass-panel";
import type { BusinessRule, RuleAction, RuleField, RuleOperator } from "@/lib/types";

const fields: { id: RuleField; label: string }[] = [
  { id: "discount_pct", label: "Discounts" },
  { id: "invoice_total", label: "Invoice total" },
  { id: "purchase_amount", label: "Purchase amount" },
  { id: "invoice_unit_price", label: "Invoice unit price" },
  { id: "payment_amount", label: "Payment amount" },
];

const operators: { id: RuleOperator; label: string }[] = [
  { id: "greater_than", label: "exceed" },
  { id: "greater_or_equal", label: "are at least" },
  { id: "equals", label: "equal" },
  { id: "differs_from", label: "differ from contract" },
  { id: "duplicate_over", label: "are duplicated over" },
];

const actions: { id: RuleAction; label: string }[] = [
  { id: "warn", label: "Warn" },
  { id: "alert", label: "Alert" },
  { id: "block", label: "Block" },
  { id: "require_approval", label: "Require approval" },
];

export function RuleBuilder() {
  const { rules, addRule, toggleRule } = useDemo();
  const [field, setField] = useState<RuleField>("discount_pct");
  const [operator, setOperator] = useState<RuleOperator>("greater_than");
  const [threshold, setThreshold] = useState(15);
  const [action, setAction] = useState<RuleAction>("warn");

  const preview = useMemo(() => {
    const fieldLabel = fields.find((item) => item.id === field)?.label.toLowerCase();
    const opLabel = operators.find((item) => item.id === operator)?.label;
    const actionLabel = actions.find((item) => item.id === action)?.label;
    const unit = field === "discount_pct" ? "%" : field === "invoice_unit_price" ? "" : `$${threshold.toLocaleString()}`;
    const amount = field === "discount_pct" ? `${threshold}%` : field === "invoice_unit_price" ? "contract pricing" : unit;
    return `${actionLabel} if ${fieldLabel} ${opLabel} ${amount}.`;
  }, [action, field, operator, threshold]);

  function createRule() {
    const rule: BusinessRule = {
      id: `rule-${Date.now()}`,
      name: preview,
      description: "Created in the Velora rule builder.",
      enabled: true,
      field,
      operator,
      threshold,
      action,
      createdAt: new Date().toISOString(),
    };
    addRule(rule);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <GlassPanel className="p-6" glow="gold">
        <p className="text-xs uppercase tracking-[0.16em] text-gold">Rule builder</p>
        <h2 className="mt-2 font-serif text-2xl">When this happens, Velora should…</h2>
        <div className="mt-6 space-y-4">
          <SelectRow label="Watch" value={field} onChange={(value) => setField(value as RuleField)} options={fields} />
          <SelectRow
            label="Condition"
            value={operator}
            onChange={(value) => setOperator(value as RuleOperator)}
            options={operators}
          />
          <div className="space-y-1.5">
            <Label>Threshold</Label>
            <Input
              type="number"
              value={threshold}
              onChange={(event) => setThreshold(Number(event.target.value))}
              className="h-10 bg-background"
            />
          </div>
          <SelectRow
            label="Action"
            value={action}
            onChange={(value) => setAction(value as RuleAction)}
            options={actions}
          />
        </div>
        <p className="mt-6 rounded-xl bg-ink/5 p-4 font-serif text-lg">{preview}</p>
        <Button className="mt-4 h-11 w-full" onClick={createRule}>
          Add rule
        </Button>
      </GlassPanel>
      <div className="space-y-3">
        {rules.map((rule) => (
          <GlassPanel key={rule.id} className="flex items-start justify-between gap-4 p-5">
            <div>
              <p className="text-sm font-medium">{rule.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">{rule.description}</p>
              <p className="mt-2 text-[11px] uppercase tracking-[0.14em] text-gold">{rule.action}</p>
            </div>
            <Switch checked={rule.enabled} onCheckedChange={() => toggleRule(rule.id)} />
          </GlassPanel>
        ))}
      </div>
    </div>
  );
}

function SelectRow({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { id: string; label: string }[];
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 w-full rounded-lg border border-ink/10 bg-background px-3 text-sm"
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
