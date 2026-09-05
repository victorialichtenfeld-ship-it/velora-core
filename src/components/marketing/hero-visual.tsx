"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { SampleDataBadge } from "@/components/sample-data-badge";

type Stage = "draft" | "scan" | "detect" | "alert" | "held";

function statusFor(stage: Stage) {
  if (stage === "held") return { label: "Held", className: "text-protect" };
  if (stage === "detect" || stage === "alert") return { label: "Duplicate", className: "text-risk" };
  if (stage === "scan") return { label: "Scanning", className: "text-gold" };
  return { label: "Queued", className: "text-muted-foreground" };
}

export function HeroVisual() {
  const [stage, setStage] = useState<Stage>("draft");
  const [clock, setClock] = useState("09:17:04");
  const reduce = useReducedMotion();
  const viewStage = reduce ? "held" : stage;
  const second = statusFor(viewStage);
  const flagged = viewStage === "detect" || viewStage === "alert" || viewStage === "held";
  const scanning = viewStage === "scan" || viewStage === "detect";

  useEffect(() => {
    const id = window.setInterval(() => {
      setClock(
        new Date().toLocaleTimeString("en-GB", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" })
      );
    }, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (reduce) return;
    const sequence: { stage: Stage; at: number }[] = [
      { stage: "draft", at: 0 },
      { stage: "scan", at: 800 },
      { stage: "detect", at: 2400 },
      { stage: "alert", at: 3600 },
      { stage: "held", at: 5200 },
    ];
    let timers: number[] = [];
    const run = () => {
      timers.forEach(clearTimeout);
      timers = sequence.map(({ stage: next, at }) => window.setTimeout(() => setStage(next), at));
    };
    run();
    const loop = window.setInterval(run, 8000);
    return () => {
      timers.forEach(clearTimeout);
      clearInterval(loop);
    };
  }, [reduce]);

  return (
    <a
      href="#demo"
      className="product-frame gold-glow relative mx-auto block w-full max-w-[540px] rounded-lg p-5 ring-1 ring-gold/22 sm:p-6"
    >
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px gold-hairline" />
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-gold">AP ledger</p>
          <p className="mt-1 text-sm text-foreground">Meridian Supply</p>
        </div>
        <div className="text-right">
          <p className="font-figure text-[13px] tabular-nums text-muted-foreground">{clock}</p>
          <div className="mt-1.5 flex justify-end">
            <SampleDataBadge />
          </div>
        </div>
      </div>

      <LedgerRow
        id="ACH-4410"
        meta="Apex Logistics · yesterday 18:02"
        amount="$11,240"
        status="Cleared"
        statusClass="text-muted-foreground"
      />
      <div className="relative mt-2">
        {scanning ? (
          <>
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-12 scan-wash animate-scan" />
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 scan-beam animate-scan" />
          </>
        ) : null}
        <LedgerRow
          id="ACH-4418"
          meta="Apex Logistics · today 09:17"
          amount="$11,240"
          status={second.label}
          statusClass={second.className}
          warn={flagged && viewStage !== "held"}
          held={viewStage === "held"}
        />
      </div>

      <AnimatePresence>
        {flagged ? (
          <motion.div
            key="match"
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 border-t border-bronze/30 pt-4"
          >
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">Match</p>
            <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
              Same vendor, same amount, 15 hours after ACH-4410 cleared.
            </p>
            <p className={`mt-3 font-figure text-[1.85rem] tracking-[-0.03em] ${viewStage === "held" ? "text-protect" : "text-risk"}`}>
              $11,240
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {viewStage === "held" ? "Held before it left the account." : "Would have left the account today."}
            </p>
          </motion.div>
        ) : (
          <p className="mt-4 text-xs text-muted-foreground">Watching the second ACH against paid history.</p>
        )}
      </AnimatePresence>

      <p className="mt-5 text-[11px] tracking-[0.06em] text-gold">Open the full evidence trail →</p>
    </a>
  );
}

function LedgerRow({
  id,
  meta,
  amount,
  status,
  statusClass,
  warn,
  held,
}: {
  id: string;
  meta: string;
  amount: string;
  status: string;
  statusClass: string;
  warn?: boolean;
  held?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between gap-4 rounded-md px-3.5 py-3 ring-1 ${
        held ? "bg-protect/8 ring-protect/30" : warn ? "bg-risk/8 ring-risk/30" : "bg-background/70 ring-bronze/25"
      }`}
    >
      <div>
        <p className="font-figure text-[15px] tracking-[-0.02em]">{id}</p>
        <p className="mt-0.5 text-[11px] text-muted-foreground">{meta}</p>
      </div>
      <div className="text-right">
        <p className={`font-figure text-[15px] ${warn ? "text-risk" : "text-foreground"}`}>{amount}</p>
        <p className={`mt-0.5 text-[11px] tracking-[0.06em] ${statusClass}`}>{status}</p>
      </div>
    </div>
  );
}
