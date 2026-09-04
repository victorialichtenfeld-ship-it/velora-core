"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { completeOnboarding } from "@/app/auth-actions";
import { GlassPanel } from "@/components/glass-panel";
import { detectedAlerts } from "@/lib/risk-engine";
import { onboardingScanTotal } from "@/lib/data/demo";
import { formatCurrency } from "@/lib/format";

const businesses = [
  "Wholesale / distribution",
  "Professional services",
  "SaaS / technology",
  "Manufacturing",
  "Healthcare operations",
  "Logistics",
];

const systems = [
  { id: "quickbooks", label: "QuickBooks" },
  { id: "xero", label: "Xero" },
  { id: "salesforce", label: "Salesforce" },
  { id: "hubspot", label: "HubSpot" },
  { id: "gmail", label: "Gmail" },
  { id: "outlook", label: "Outlook" },
  { id: "stripe", label: "Stripe" },
  { id: "slack", label: "Slack" },
  { id: "google-drive", label: "Google Drive" },
];

const risks = [
  "Revenue leakage",
  "Duplicate payments",
  "Pricing mistakes",
  "Unauthorized discounts",
  "Contract conflicts",
  "Suspicious spending",
];

const scanSteps = [
  "Connecting business systems…",
  "Analyzing company rules…",
  "Checking transactions…",
  "Reviewing contracts…",
];

export function OnboardingFlow() {
  const [step, setStep] = useState(0);
  const [businessType, setBusinessType] = useState(businesses[0]);
  const [selectedSystems, setSelectedSystems] = useState<string[]>(["quickbooks", "salesforce", "gmail"]);
  const [selectedRisks, setSelectedRisks] = useState<string[]>(["Revenue leakage", "Duplicate payments", "Pricing mistakes"]);
  const [scanIndex, setScanIndex] = useState(0);
  const [done, setDone] = useState(false);

  const issueCount = detectedAlerts.length;
  const impact = useMemo(
    () => (onboardingScanTotal > 0 ? onboardingScanTotal : 38_420),
    []
  );

  function toggle(list: string[], value: string, setter: (next: string[]) => void) {
    setter(list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);
  }

  async function startScan() {
    setStep(3);
    for (let i = 0; i < scanSteps.length; i += 1) {
      setScanIndex(i);
      await new Promise((resolve) => setTimeout(resolve, 900));
    }
    setDone(true);
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-12">
      <div className="pointer-events-none absolute inset-0 grid-fade" />
      <div className="relative w-full max-w-2xl">
        <div className="mb-8 flex items-center justify-between">
          <Logo />
          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Step {Math.min(step + 1, 4)} of 4
          </p>
        </div>
        <GlassPanel className="p-6 sm:p-8" glow="gold">
          {step === 0 && (
            <Step title="What kind of business are you?" subtitle="This tunes the sample rules Velora loads first.">
              <div className="grid gap-2 sm:grid-cols-2">
                {businesses.map((item) => (
                  <Choice key={item} active={businessType === item} onClick={() => setBusinessType(item)}>
                    {item}
                  </Choice>
                ))}
              </div>
              <Button className="mt-6 h-11" onClick={() => setStep(1)}>
                Continue
              </Button>
            </Step>
          )}
          {step === 1 && (
            <Step title="Which systems do you use?" subtitle="We’ll simulate these connectors in the demo workspace.">
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {systems.map((item) => (
                  <Choice
                    key={item.id}
                    active={selectedSystems.includes(item.id)}
                    onClick={() => toggle(selectedSystems, item.id, setSelectedSystems)}
                  >
                    {item.label}
                  </Choice>
                ))}
              </div>
              <div className="mt-6 flex gap-2">
                <Button variant="ghost" onClick={() => setStep(0)}>
                  Back
                </Button>
                <Button className="h-11 flex-1" onClick={() => setStep(2)}>
                  Continue
                </Button>
              </div>
            </Step>
          )}
          {step === 2 && (
            <Step title="What risks do you care about?" subtitle="Velora will prioritize these mistake types in the first scan.">
              <div className="grid gap-2 sm:grid-cols-2">
                {risks.map((item) => (
                  <Choice
                    key={item}
                    active={selectedRisks.includes(item)}
                    onClick={() => toggle(selectedRisks, item, setSelectedRisks)}
                  >
                    {item}
                  </Choice>
                ))}
              </div>
              <div className="mt-6 flex gap-2">
                <Button variant="ghost" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button className="h-11 flex-1" onClick={() => void startScan()}>
                  Scan sample activity
                </Button>
              </div>
            </Step>
          )}
          {step === 3 && (
            <div className="min-h-[280px]">
              {!done ? (
                <div className="flex flex-col items-center py-10 text-center">
                  <div className="mb-6 size-16 rounded-full border border-gold/30 bg-gold/10">
                    <div className="size-full animate-spin rounded-full border-2 border-transparent border-t-gold" />
                  </div>
                  <p className="font-serif text-2xl">{scanSteps[scanIndex]}</p>
                  <p className="mt-2 text-sm text-muted-foreground">Reading Meridian Supply demo activity</p>
                  <div className="mt-8 w-full max-w-sm space-y-2">
                    {scanSteps.map((label, index) => (
                      <div key={label} className="flex items-center gap-3 text-left text-sm">
                        <span
                          className={`size-2 rounded-full ${
                            index <= scanIndex ? "bg-protect" : "bg-white/15"
                          }`}
                        />
                        <span className={index <= scanIndex ? "text-foreground" : "text-muted-foreground"}>
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-6 text-center"
                >
                  <p className="text-xs uppercase tracking-[0.18em] text-protect">Scan complete</p>
                  <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
                    Velora found {issueCount} potential issues worth {formatCurrency(Math.round(impact))}.
                  </h2>
                  <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">
                    None of these have been sent, paid, or approved. Open the dashboard to inspect evidence and decide.
                  </p>
                  <form action={completeOnboarding}>
                    <input type="hidden" name="businessType" value={businessType} />
                    <input type="hidden" name="systems" value={selectedSystems.join(",")} />
                    <input type="hidden" name="risks" value={selectedRisks.join(",")} />
                    <Button type="submit" className="mt-8 h-12 px-6">
                      Open dashboard
                    </Button>
                  </form>
                </motion.div>
              )}
            </div>
          )}
        </GlassPanel>
      </div>
    </div>
  );
}

function Step({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1 className="font-serif text-3xl">{title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
      <div className="mt-6">{children}</div>
    </div>
  );
}

function Choice({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl px-4 py-3 text-left text-sm ring-1 transition ${
        active ? "bg-gold/15 text-foreground ring-gold/40" : "bg-black/20 text-muted-foreground ring-white/10 hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}
