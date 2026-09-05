"use client";

import { ValidationProvider } from "@/components/validation/validation-provider";
import { EarlyAccessDialog } from "@/components/validation/early-access-dialog";
import { PricingFeedback } from "@/components/validation/pricing-feedback";
import { ScrollTracker } from "@/components/validation/scroll-tracker";
import type { ReactNode } from "react";

export function ValidationShell({ children }: { children: ReactNode }) {
  return (
    <ValidationProvider>
      {children}
      <ScrollTracker />
      <EarlyAccessDialog />
      <PricingFeedback />
    </ValidationProvider>
  );
}
