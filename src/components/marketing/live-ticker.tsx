"use client";

const items = [
  { time: "09:17", event: "Duplicate ACH held", party: "Apex Logistics", amount: "$11,240" },
  { time: "09:04", event: "Invoice vs contract", party: "Harborline", amount: "$14,760" },
  { time: "08:51", event: "Second bill matched", party: "Keystone Parts", amount: "$8,400" },
  { time: "08:22", event: "Draft under MSA rate", party: "Cinder & Co.", amount: "$6,480" },
  { time: "07:58", event: "Repeat wire held", party: "Helios Industrial", amount: "$9,120" },
  { time: "07:41", event: "Receivable off addendum", party: "Northwind", amount: "$4,275" },
];

export function LiveTicker() {
  const loop = [...items, ...items];
  return (
    <div className="group/ticker relative overflow-hidden border-y border-bronze/25 bg-card/80 py-2.5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />
      <p className="absolute top-1/2 left-4 z-20 -translate-y-1/2 text-[10px] font-medium uppercase tracking-[0.2em] text-gold">
        Tape
      </p>
      <div className="animate-ticker flex w-max gap-12 whitespace-nowrap px-6 pl-24 text-[12px] text-muted-foreground group-hover/ticker:[animation-play-state:paused]">
        {loop.map((item, index) => (
          <span
            key={`${item.event}-${index}`}
            aria-hidden={index >= items.length}
            className="flex items-center gap-3"
          >
            <span className="font-figure text-gold/90">{item.time}</span>
            <span>{item.event}</span>
            <span className="text-foreground/80">{item.party}</span>
            <span className="font-figure text-foreground">{item.amount}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
