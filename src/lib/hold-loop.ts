export type HoldStage = "send" | "match" | "held";

export const holdSequence: { stage: HoldStage; at: number }[] = [
  { stage: "send", at: 0 },
  { stage: "match", at: 1500 },
  { stage: "held", at: 3400 },
];

export const holdLoopMs = 7800;

export const holdCopy: Record<HoldStage, string> = {
  send: "On the rail to the bank",
  match: "Duplicate found · 99.4%",
  held: "Held. Will not clear.",
};
