"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

type Stage = "send" | "scan" | "match" | "held";

const nodes = [
  { x: 36, y: 210, r: 3 },
  { x: 88, y: 74, r: 2.2 },
  { x: 96, y: 338, r: 2.3 },
  { x: 128, y: 168, r: 2.6 },
  { x: 136, y: 268, r: 2.4 },
  { x: 188, y: 108, r: 2.5 },
  { x: 196, y: 312, r: 2.3 },
  { x: 240, y: 210, r: 6.2, core: true },
  { x: 284, y: 96, r: 2.5 },
  { x: 292, y: 324, r: 2.4 },
  { x: 336, y: 160, r: 2.6 },
  { x: 348, y: 268, r: 2.3 },
  { x: 392, y: 64, r: 3.2, paid: true },
  { x: 444, y: 210, r: 3.4, bank: true },
  { x: 400, y: 360, r: 2.1 },
];

const traces: [number, number, number, number][] = [
  [36, 210, 128, 168],
  [36, 210, 136, 268],
  [88, 74, 128, 168],
  [88, 74, 188, 108],
  [96, 338, 136, 268],
  [96, 338, 196, 312],
  [128, 168, 240, 210],
  [136, 268, 240, 210],
  [188, 108, 240, 210],
  [196, 312, 240, 210],
  [240, 210, 284, 96],
  [240, 210, 292, 324],
  [240, 210, 336, 160],
  [240, 210, 348, 268],
  [240, 210, 444, 210],
  [284, 96, 392, 64],
  [336, 160, 392, 64],
  [336, 160, 444, 210],
  [348, 268, 444, 210],
  [292, 324, 400, 360],
];

const thoughts = [
  "vendor == Apex Logistics",
  "amount == $11,240",
  "window == 15h",
  "ACH-4418 ≈ ACH-4410",
  "duplicate = 0.994",
];

const rain = [
  { x: "4%", d: "0s", t: "ACH-4418" },
  { x: "11%", d: "0.7s", t: "0xB089" },
  { x: "18%", d: "1.4s", t: "DUP" },
  { x: "86%", d: "0.3s", t: "MSA" },
  { x: "93%", d: "1.1s", t: "HOLD" },
  { x: "79%", d: "1.8s", t: "4410" },
];

const motes = [
  { x: "12%", y: "22%", d: "0s" },
  { x: "78%", y: "18%", d: "0.5s" },
  { x: "18%", y: "70%", d: "0.9s" },
  { x: "86%", y: "64%", d: "1.3s" },
  { x: "42%", y: "12%", d: "0.2s" },
  { x: "62%", y: "82%", d: "1.6s" },
  { x: "28%", y: "44%", d: "0.8s" },
  { x: "70%", y: "38%", d: "1.2s" },
];

function toCurve([x1, y1, x2, y2]: [number, number, number, number], i: number) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const off = (i % 2 === 0 ? 20 : -20);
  const cx = mx + (-dy / len) * off;
  const cy = my + (dx / len) * off;
  return { d: `M${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`, x1, y1, x2, y2 };
}

function hexPoints(cx: number, cy: number, r: number) {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 6;
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  }).join(" ");
}

function TypeLine({ text }: { text: string }) {
  const [shown, setShown] = useState(text);
  useEffect(() => {
    setShown("");
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) window.clearInterval(id);
    }, 16);
    return () => window.clearInterval(id);
  }, [text]);
  return (
    <span>
      {shown}
      <span className="ml-0.5 inline-block text-gold animate-flash">▌</span>
    </span>
  );
}

function useScore(target: number, reduce: boolean | null) {
  const [value, setValue] = useState(target);
  useEffect(() => {
    if (reduce) {
      setValue(target);
      return;
    }
    const from = value;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / 420, 1);
      const eased = 1 - (1 - p) ** 3;
      setValue(from + (target - from) * eased);
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- lerp from last displayed score
  }, [target, reduce]);
  return value;
}

function Waveform({ mode }: { mode: "idle" | "busy" | "flat" }) {
  const d =
    mode === "flat"
      ? "M0 14 H480"
      : mode === "busy"
        ? "M0 14 Q 12 1 24 14 T 48 14 T 72 14 T 96 14 T 120 14 T 144 14 T 168 14 T 192 14 T 216 14 T 240 14 T 264 14 T 288 14 T 312 14 T 336 14 T 360 14 T 384 14 T 408 14 T 432 14 T 456 14 T 480 14"
        : "M0 14 Q 20 8 40 14 T 80 14 T 120 14 T 160 14 T 200 14 T 240 14 T 280 14 T 320 14 T 360 14 T 400 14 T 440 14 T 480 14";
  return (
    <svg viewBox="0 0 240 28" className="mx-auto mt-3 h-7 w-40 overflow-hidden" aria-hidden="true">
      <g className={mode === "flat" ? undefined : "animate-wave"}>
        <path d={d} fill="none" stroke="#B0893A" strokeWidth="1.15" opacity={mode === "flat" ? 0.28 : 0.9} />
      </g>
    </svg>
  );
}

export function CashScene() {
  const [stage, setStage] = useState<Stage>("send");
  const [cycle, setCycle] = useState(0);
  const [thought, setThought] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [lat, setLat] = useState(18);
  const reduce = useReducedMotion();
  const view = reduce ? "held" : stage;
  const held = view === "held";
  const scanning = view === "scan" || view === "match";
  const matching = view === "match";
  const packetX = held ? 48 : matching ? 38 : scanning ? 22 : 5;
  const target = held || matching ? 99.4 : scanning ? 67.8 : 21.4;
  const score = useScore(target, reduce);
  const curves = useMemo(() => traces.map(toCurve), []);
  const hex = hexPoints(240, 210, 34);
  const hexOuter = hexPoints(240, 210, 48);

  useEffect(() => {
    if (reduce) return;
    const sequence: { stage: Stage; at: number }[] = [
      { stage: "send", at: 0 },
      { stage: "scan", at: 480 },
      { stage: "match", at: 2100 },
      { stage: "held", at: 3400 },
    ];
    let timers: number[] = [];
    const run = () => {
      timers.forEach(clearTimeout);
      timers = sequence.map(({ stage: next, at }) => window.setTimeout(() => setStage(next), at));
    };
    run();
    const loop = window.setInterval(() => {
      setCycle((n) => n + 1);
      setElapsed(0);
      run();
    }, 7000);
    return () => {
      timers.forEach(clearTimeout);
      clearInterval(loop);
    };
  }, [reduce]);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setThought((n) => (n + 1) % thoughts.length), 900);
    return () => window.clearInterval(id);
  }, [reduce]);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setElapsed((n) => n + 0.08);
      setLat(12 + Math.floor(Math.random() * 11));
    }, 80);
    return () => window.clearInterval(id);
  }, [reduce]);

  const status = held ? "HOLD" : matching ? "MATCH" : scanning ? "INFER" : "WATCH";
  const waveMode = held ? "flat" : scanning ? "busy" : "idle";

  return (
    <div className="ai-field relative mx-auto aspect-[6/5] w-full max-w-[560px] overflow-hidden">
      <div className="ai-floor" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgb(176_137_58_/_0.26),transparent_58%)] animate-gold-breathe" />
      {!reduce ? <div className={`ai-radar ${held ? "ai-radar-held" : ""}`} /> : null}
      <div className="ai-scanlines pointer-events-none absolute inset-0 opacity-40" />

      {reduce
        ? null
        : rain.map((drop) => (
            <span
              key={`${drop.t}-${drop.x}`}
              className="animate-token-fall absolute top-0 font-mono text-[8px] tracking-[0.12em] text-gold/35"
              style={{ left: drop.x, animationDelay: drop.d }}
            >
              {drop.t}
            </span>
          ))}

      {reduce
        ? null
        : motes.map((mote) => (
            <span
              key={`${mote.x}-${mote.y}`}
              className="animate-mote absolute size-1 rounded-full bg-gold"
              style={{
                left: mote.x,
                top: mote.y,
                animationDelay: mote.d,
                boxShadow: "0 0 8px rgb(176 137 58 / 0.7)",
              }}
            />
          ))}

      <svg viewBox="0 0 480 420" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id="traceGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7A6328" stopOpacity="0.08" />
            <stop offset="50%" stopColor="#C4A86A" stopOpacity="1" />
            <stop offset="100%" stopColor="#7A6328" stopOpacity="0.08" />
          </linearGradient>
          <filter id="nodeGlow">
            <feGaussianBlur stdDeviation="1.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {curves.map((curve, i) => (
          <path
            key={curve.d}
            d={curve.d}
            fill="none"
            stroke="url(#traceGold)"
            strokeWidth={held && i === 14 ? 1.05 : 1.2}
            className={reduce ? "" : "animate-wire"}
            style={{ animationDelay: `${i * 0.04}s` }}
            opacity={held && i === 14 ? 0.16 : 1}
          />
        ))}
        {!reduce
          ? traces.map(([x1, y1, x2, y2], i) =>
              i % 2 === 0 ? (
                <circle key={`p-${i}`} r={i % 4 === 0 ? 2.7 : 1.7} fill="#C4A86A">
                  <animateMotion
                    dur={`${0.9 + (i % 5) * 0.22}s`}
                    repeatCount="indefinite"
                    path={`M${x1},${y1} L${x2},${y2}`}
                  />
                </circle>
              ) : null
            )
          : null}
        <polygon
          points={hexOuter}
          fill="none"
          stroke="#B0893A"
          strokeWidth="0.55"
          opacity="0.28"
          strokeDasharray="3 7"
        >
          {reduce ? null : (
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 240 210"
              to="-360 240 210"
              dur="14s"
              repeatCount="indefinite"
            />
          )}
        </polygon>
        <polygon points={hex} fill="none" stroke="#C4A86A" strokeWidth="0.8" opacity="0.55" strokeDasharray="5 6">
          {reduce ? null : (
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 240 210"
              to="360 240 210"
              dur="7s"
              repeatCount="indefinite"
            />
          )}
        </polygon>
        {nodes.map((node) => (
          <g key={`${node.x}-${node.y}`}>
            {node.core ? (
              <circle
                cx={node.x}
                cy={node.y}
                r="22"
                fill="none"
                stroke="#B0893A"
                strokeWidth="0.7"
                className={reduce ? undefined : "animate-core-ping"}
                opacity="0.45"
              />
            ) : null}
            <circle
              cx={node.x}
              cy={node.y}
              r={node.r}
              fill={node.core ? "#B0893A" : "#C4A86A"}
              filter="url(#nodeGlow)"
              className={reduce ? undefined : "animate-node"}
              opacity={node.bank && held ? 0.18 : 1}
              style={{ animationDelay: `${node.x / 480}s` }}
            />
          </g>
        ))}
        {(matching || held) && !reduce ? (
          <path
            d="M240 210 Q 316 88 392 64"
            fill="none"
            stroke="#C4A86A"
            strokeWidth="2"
            className="animate-spark"
            opacity="0.95"
          />
        ) : null}
      </svg>

      {!reduce ? (
        <>
          <div className="ai-scan" />
          <div className="ai-scan-y" />
        </>
      ) : null}

      {held && !reduce ? (
        <motion.div
          key={`burst-${cycle}`}
          initial={{ opacity: 0.62, scale: 0.35 }}
          animate={{ opacity: 0, scale: 1.45 }}
          transition={{ duration: 0.75 }}
          className="pointer-events-none absolute inset-[16%] rounded-full bg-[radial-gradient(circle,rgb(176_137_58_/_0.5),transparent_70%)]"
        />
      ) : null}

      {matching && !reduce
        ? Array.from({ length: 8 }).map((_, i) => (
            <motion.span
              key={`spark-${cycle}-${i}`}
              className="absolute size-1 rounded-full bg-gold"
              style={{ left: "81%", top: "15%", boxShadow: "0 0 8px rgb(176 137 58)" }}
              initial={{ opacity: 1, x: 0, y: 0 }}
              animate={{
                opacity: 0,
                x: Math.cos((i / 8) * Math.PI * 2) * 42,
                y: Math.sin((i / 8) * Math.PI * 2) * 30,
              }}
              transition={{ duration: 0.65, ease: "easeOut" }}
            />
          ))
        : null}

      <div className="absolute top-3 right-3 left-3 z-10 flex items-center justify-between font-mono text-[8px] tracking-[0.16em] text-gold/45">
        <span>VELORA.INFER</span>
        <span className="text-gold/70">T+{elapsed.toFixed(2)}s</span>
        <span className={held ? "text-gold" : "animate-flash"}>{status}</span>
      </div>

      <p className={`absolute top-[12%] right-[7%] z-10 text-right ${matching ? "animate-flash" : ""}`}>
        <span className="block text-[8px] uppercase tracking-[0.2em] text-gold/50">Settled</span>
        <span className="font-figure text-sm text-gold">ACH-4410</span>
      </p>
      <p className="absolute right-[5%] top-[48%] z-10 text-[8px] uppercase tracking-[0.22em] text-gold/40">
        {held ? "Bank closed" : "Bank"}
      </p>

      <AnimatePresence>
        {!held ? (
          <motion.div
            key={`pkt-${cycle}`}
            className="absolute top-[46%] z-20 -translate-y-1/2"
            initial={{ left: "-8%", opacity: 0 }}
            animate={{ left: `${packetX}%`, opacity: 1 }}
            exit={{ left: "46%", scale: 0.2, opacity: 0 }}
            transition={{ type: "spring", stiffness: 92, damping: 15 }}
          >
            <div className="gold-chip">
              <p className="font-figure text-[13px] leading-none text-gold">ACH-4418</p>
              <p className="mt-1 text-[8px] uppercase tracking-[0.16em] text-gold/70">
                {matching ? "Duplicate" : scanning ? "Inferring" : "On the rail"}
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {held && !reduce ? (
        <p
          key={`held-mark-${cycle}`}
          className="animate-hold-stamp pointer-events-none absolute inset-0 z-[5] flex items-center justify-center font-figure text-6xl tracking-[0.28em] text-gold/12"
        >
          HELD
        </p>
      ) : null}

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center">
        <p className="text-[9px] uppercase tracking-[0.28em] text-gold/75">
          {held ? "Held before the bank" : matching ? "Match · ACH-4410" : scanning ? "Matching Apex ACH-4410" : "Apex Logistics"}
        </p>
        <p className="font-figure money-sheen mt-2 text-[2.85rem] leading-none tracking-[-0.055em] sm:text-[3.45rem]">
          $11,240
        </p>
        <Waveform mode={waveMode} />
        <div className="mt-1 w-40">
          <div className="h-px overflow-hidden bg-gold/20">
            <motion.div className="h-full bg-gold" animate={{ width: `${score}%` }} />
          </div>
          <p className="mt-2 font-mono text-[10px] tracking-[0.12em] text-gold/60">
            conf {score.toFixed(1)} · {held ? "hold" : scanning ? "infer" : "watch"} · {lat}ms
          </p>
        </div>
      </div>

      <div className="absolute right-3 bottom-3 left-3 z-10 flex items-end justify-between gap-3">
        <p className="font-mono text-[9px] tracking-[0.06em] text-gold/55">
          {reduce ? thoughts[3] : <TypeLine text={thoughts[thought]} />}
        </p>
        <p className="font-mono text-[9px] text-gold/40">velora.model</p>
      </div>

      <span className="ai-corner left-3 top-3 border-t border-l" />
      <span className="ai-corner right-3 top-3 border-t border-r" />
      <span className="ai-corner bottom-3 left-3 border-b border-l" />
      <span className="ai-corner right-3 bottom-3 border-b border-r" />
    </div>
  );
}

export function HeroVisual() {
  return <CashScene />;
}
