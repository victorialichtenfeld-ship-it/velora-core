"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

export type HoldStage = "send" | "match" | "held";

export const holdSequence: { stage: HoldStage; at: number }[] = [
  { stage: "send", at: 0 },
  { stage: "match", at: 220 },
  { stage: "held", at: 620 },
];

export const holdLoopMs = 1950;

export const holdCopy: Record<HoldStage, string> = {
  send: "Second ACH to Apex is on the rail",
  match: "Duplicate vendor payment · 99.4%",
  held: "Held. Will not reach the bank.",
};

export function useHoldLoop() {
  const reduce = useReducedMotion();
  const [stage, setStage] = useState<HoldStage>("send");
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (reduce) return;
    let timers: number[] = [];
    const run = () => {
      timers.forEach(clearTimeout);
      setStage("send");
      timers = holdSequence.map(({ stage: next, at }) => window.setTimeout(() => setStage(next), at));
    };
    run();
    const loop = window.setInterval(() => {
      setCycle((n) => n + 1);
      run();
    }, holdLoopMs);
    return () => {
      timers.forEach(clearTimeout);
      clearInterval(loop);
    };
  }, [reduce]);

  return { stage: reduce ? ("held" as const) : stage, cycle, reduce };
}
