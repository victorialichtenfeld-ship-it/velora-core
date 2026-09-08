"use client";

import { Check, X, Minus } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { SectionIntro } from "@/components/marketing/section-intro";

type FeatureValue = boolean | "partial";

const features: { label: string; velora: FeatureValue; manual: FeatureValue; erp: FeatureValue }[] = [
  { label: "Catches duplicate payments", velora: true, manual: false, erp: "partial" },
  { label: "Catches pricing vs contract errors", velora: true, manual: false, erp: false },
  { label: "Human approves every flag", velora: true, manual: true, erp: false },
  { label: "Works across all your tools", velora: true, manual: false, erp: false },
  { label: "Flags before money leaves", velora: true, manual: false, erp: "partial" },
  { label: "No auto-execution, ever", velora: true, manual: true, erp: false },
  { label: "Audit log of every decision", velora: true, manual: false, erp: "partial" },
  { label: "Setup in minutes, not months", velora: true, manual: true, erp: false },
  { label: "Affordable for mid-size teams", velora: true, manual: true, erp: false },
];

function Cell({ value }: { value: boolean | "partial" }) {
  if (value === true) return <Check className="mx-auto size-5 text-gold" />;
  if (value === "partial") return <Minus className="mx-auto size-5 text-muted-foreground" />;
  return <X className="mx-auto size-5 text-white/20" />;
}

export function ComparisonTable() {
  const reduce = useReducedMotion();
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
      <SectionIntro
        eyebrow="How it compares"
        title="Better than manual. Simpler than an ERP."
        body="Manual review misses things. ERP controls are rigid and expensive to configure. Velora is the layer in between — built specifically for finance teams."
      />
      <motion.div
        className="mt-12 overflow-x-auto"
        initial={reduce ? false : { y: 16 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <table className="w-full min-w-[560px] border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="w-1/2 pb-4 text-left text-[13px] font-medium text-muted-foreground" />
              <th className="pb-4 text-center">
                <span className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[13px] font-medium text-gold">Velora</span>
              </th>
              <th className="pb-4 text-center text-[13px] font-medium text-muted-foreground">Manual review</th>
              <th className="pb-4 text-center text-[13px] font-medium text-muted-foreground">ERP built-ins</th>
            </tr>
          </thead>
          <tbody>
            {features.map((f, i) => (
              <tr key={f.label} className={i % 2 === 0 ? "bg-white/[0.02]" : ""}>
                <td className="rounded-l-xl px-4 py-3.5 text-[14px] text-foreground">{f.label}</td>
                <td className="px-4 py-3.5 text-center"><Cell value={f.velora} /></td>
                <td className="px-4 py-3.5 text-center"><Cell value={f.manual} /></td>
                <td className="rounded-r-xl px-4 py-3.5 text-center"><Cell value={f.erp} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </section>
  );
}
