"use client";

const items = [
  { event: "Apex duplicate held", amount: "$11,240" },
  { event: "Harborline under MSA", amount: "$14,760" },
  { event: "Keystone second bill", amount: "$8,400" },
  { event: "Helios repeat wire", amount: "$9,120" },
];

export function LiveTicker() {
  const loop = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-gold/25 bg-gold/[0.04]">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background to-transparent" />
      <div className="animate-ticker flex w-max gap-12 whitespace-nowrap py-3 text-[13px] text-gold/80">
        {loop.map((item, index) => (
          <span key={`${item.event}-${index}`} className="flex items-center gap-3" aria-hidden={index >= items.length}>
            <span className="font-figure text-gold">{item.amount}</span>
            <span>{item.event}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
