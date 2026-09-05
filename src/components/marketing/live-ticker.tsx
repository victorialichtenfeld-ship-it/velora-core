"use client";

const items = [
  { event: "Duplicate payment", amount: "$11,240" },
  { event: "Pricing error vs contract", amount: "$14,760" },
  { event: "Over-limit discount", amount: "$28,750" },
  { event: "Unauthorized wire", amount: "$18,400" },
];

export function LiveTicker() {
  const loop = [...items, ...items];
  return (
    <div className="relative overflow-hidden py-2">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />
      <div className="animate-ticker flex w-max gap-4 whitespace-nowrap py-3 text-[13px] text-muted-foreground">
        {loop.map((item, index) => (
          <span
            key={`${item.event}-${index}`}
            className="glass inline-flex items-center gap-3 rounded-full px-3 py-1.5"
            aria-hidden={index >= items.length}
          >
            <span className="rounded-full bg-gold/18 px-2 py-0.5 text-[11px] font-medium text-gold">Held</span>
            <span className="font-figure text-base tracking-tight text-gold">{item.amount}</span>
            <span>{item.event}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
