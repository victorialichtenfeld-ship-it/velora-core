"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

export type HoldStage = "send" | "match" | "held";

export const holdSequence: { stage: HoldStage; at: number }[] = [
  { stage: "send", at: 0 },
  { stage: "match", at: 420 },
  { stage: "held", at: 1050 },
];

export const holdLoopMs = 2900;

export const holdCopy: Record<HoldStage, string> = {
  send: "On the rail to the bank",
  match: "Duplicate found · 99.4%",
  held: "Held. Will not clear.",
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
