"use client";

const items = [
  { time: "09:17", event: "Duplicate ACH held", party: "Apex Logistics", amount: "$11,240" },
  { time: "09:04", event: "Invoice vs contract", party: "Harborline", amount: "$14,760" },
  { time: "08:51", event: "Second bill matched", party: "Keystone Parts", amount: "$8,400" },
  { time: "08:22", event: "Draft under MSA rate", party: "Cinder & Co.", amount: "$6,480" },
  { time: "07:58", event: "Repeat wire held", party: "Helios Industrial", amount: "$9,120" },
  { time: "07:41", event: "Receivable off addendum", party: "Northwind", amount: "$4,275" },
];

const amounts = [
  "$11,240 held",
  "$14,760 held",
  "$8,400 held",
  "$6,480 held",
  "$9,120 held",
  "$4,275 held",
  "$184,320 vault",
  "$47 payments stopped",
];

export function LiveTicker() {
  const loop = [...items, ...items];
  const cash = [...amounts, ...amounts];
  return (
    <div className="group/ticker relative overflow-hidden border-y border-gold/40 bg-gold/5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />
      <p className="absolute top-1/2 left-3 z-20 -translate-y-1/2 text-[10px] font-medium uppercase tracking-[0.2em] text-gold">
        Tape
      </p>
      <div className="animate-ticker flex w-max gap-10 whitespace-nowrap py-2.5 pr-6 pl-24 text-[12px] text-gold/75 group-hover/ticker:[animation-play-state:paused]">
        {loop.map((item, index) => (
          <span
            key={`${item.event}-${index}`}
            aria-hidden={index >= items.length}
            className="flex items-center gap-3"
          >
            <span className="size-1.5 rounded-full bg-gold shadow-[0_0_10px_rgb(201_168_106_/_1)] animate-gold-breathe" />
            <span className="font-figure text-gold">{item.time}</span>
            <span>{item.event}</span>
            <span className="text-gold/90">{item.party}</span>
            <span className="font-figure text-gold">{item.amount}</span>
          </span>
        ))}
      </div>
      <div className="animate-ticker-reverse flex w-max gap-8 border-t border-gold/25 bg-gold/8 py-1.5 pr-6 pl-24 text-[12px] text-gold group-hover/ticker:[animation-play-state:paused]">
        {cash.map((amount, index) => (
          <span key={`${amount}-${index}`} aria-hidden={index >= amounts.length} className="font-figure tracking-[0.06em]">
            {amount}
          </span>
        ))}
      </div>
    </div>
  );
}
