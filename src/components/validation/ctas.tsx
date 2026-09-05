"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useValidation } from "@/components/validation/validation-provider";
import type { CtaId, Plan } from "@/lib/validation";

export function EarlyAccessCta({
  cta,
  plan = "",
  source,
  className,
  children,
  onClick,
}: {
  cta: Exclude<CtaId, "start_with_demo_data">;
  plan?: Plan | "";
  source: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  const { openLeadForm } = useValidation();
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        onClick?.();
        openLeadForm({ cta, plan, source });
      }}
    >
      {children}
    </button>
  );
}

export function DemoCta({
  source,
  className,
  children,
  onClick,
}: {
  source: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  const { trackCta } = useValidation();
  return (
    <a
      href="#demo"
      className={cn(className)}
      onClick={() => {
        trackCta({ cta: "start_with_demo_data", location: source });
        onClick?.();
      }}
    >
      {children}
    </a>
  );
}
