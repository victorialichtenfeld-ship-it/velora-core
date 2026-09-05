"use client";

const items = [
  { time: "09:17", event: "DUP ACH HELD", party: "Apex Logistics", amount: "$11,240" },
  { time: "09:04", event: "INV vs MSA", party: "Harborline", amount: "$14,760" },
  { time: "08:51", event: "SECOND BILL", party: "Keystone Parts", amount: "$8,400" },
  { time: "08:22", event: "UNDER RATE", party: "Cinder & Co.", amount: "$6,480" },
  { time: "07:58", event: "REPEAT WIRE", party: "Helios Industrial", amount: "$9,120" },
  { time: "07:41", event: "ADDENDUM GAP", party: "Northwind", amount: "$4,275" },
];

const amounts = [
  "$11,240 HELD",
  "$14,760 HELD",
  "$8,400 HELD",
  "$6,480 HELD",
  "$9,120 HELD",
  "$4,275 HELD",
  "$184,320 VAULT",
  "47 STOPS",
];

const ticks = ["▲ CASH", "HOLD", "LOCK", "GATE", "NY DESK", "ACH", "WIRE", "VAULT"];

export function LiveTicker() {
  const loop = [...items, ...items];
  const cash = [...amounts, ...amounts];
  const tape = [...ticks, ...ticks, ...ticks, ...ticks];
  return (
    <div className="group/ticker relative overflow-hidden border-y border-gold/25 bg-background">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />
      <p className="absolute top-1.5 left-3 z-20 text-[10px] font-medium uppercase tracking-[0.22em] text-gold">
        Tape
      </p>
      <div className="animate-ticker flex w-max gap-10 whitespace-nowrap py-2 pr-6 pl-20 text-[12px] text-gold group-hover/ticker:[animation-play-state:paused]">
        {loop.map((item, index) => (
          <span
            key={`${item.event}-${index}`}
            aria-hidden={index >= items.length}
            className="flex items-center gap-3"
          >
            <span className="size-1.5 rounded-full bg-gold/80 animate-flash" />
            <span className="font-figure">{item.time}</span>
            <span className="tracking-[0.08em]">{item.event}</span>
            <span className="text-gold/80">{item.party}</span>
            <span className="font-figure">{item.amount}</span>
          </span>
        ))}
      </div>
      <div className="animate-ticker-reverse flex w-max gap-8 border-y border-gold/20 bg-gold/5 py-1.5 pr-6 pl-20 text-[12px] text-gold/85 group-hover/ticker:[animation-play-state:paused]">
        {cash.map((amount, index) => (
          <span key={`${amount}-${index}`} aria-hidden={index >= amounts.length} className="font-figure tracking-[0.1em]">
            {amount}
          </span>
        ))}
      </div>
      <div className="animate-ticker-fast flex w-max gap-6 py-1 pr-6 pl-20 text-[10px] tracking-[0.22em] text-gold/70 group-hover/ticker:[animation-play-state:paused]">
        {tape.map((tick, index) => (
          <span key={`${tick}-${index}`} aria-hidden={index >= ticks.length}>
            {tick}
          </span>
        ))}
      </div>
    </div>
  );
}
