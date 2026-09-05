"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { CtaId, Plan } from "@/lib/validation";
import { track } from "@/lib/analytics-client";

export type LeadContext = {
  plan: Plan | "";
  source: string;
  cta: CtaId;
};

type ValidationApi = {
  lead: LeadContext | null;
  openLeadForm: (context: LeadContext) => void;
  closeLeadForm: () => void;
  trackCta: (input: { cta: CtaId; plan?: Plan | ""; location: string }) => void;
};

const ValidationContext = createContext<ValidationApi | null>(null);

export function ValidationProvider({ children }: { children: ReactNode }) {
  const [lead, setLead] = useState<LeadContext | null>(null);

  const trackCta = useCallback((input: { cta: CtaId; plan?: Plan | ""; location: string }) => {
    track({
      event: "cta_click",
      cta: input.cta,
      plan: input.plan ?? "",
      location: input.location,
    });
  }, []);

  const openLeadForm = useCallback(
    (context: LeadContext) => {
      trackCta({ cta: context.cta, plan: context.plan, location: context.source });
      setLead(context);
    },
    [trackCta]
  );

  const closeLeadForm = useCallback(() => setLead(null), []);

  const value = useMemo(
    () => ({ lead, openLeadForm, closeLeadForm, trackCta }),
    [lead, openLeadForm, closeLeadForm, trackCta]
  );

  return <ValidationContext.Provider value={value}>{children}</ValidationContext.Provider>;
}

export function useValidation() {
  const value = useContext(ValidationContext);
  if (!value) throw new Error("useValidation must be used inside ValidationProvider");
  return value;
}
