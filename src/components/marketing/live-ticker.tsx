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
    <div className="relative overflow-hidden border-y border-gold/40 bg-gold/[0.07]">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
      <div className="animate-ticker flex w-max gap-16 whitespace-nowrap py-5 text-[13px] text-gold/80">
        {loop.map((item, index) => (
          <span key={`${item.event}-${index}`} className="flex items-center gap-4" aria-hidden={index >= items.length}>
            <span className="inline-block size-1.5 rounded-full bg-gold animate-flash" />
            <span className="font-figure money-sheen text-2xl tracking-tight">{item.amount}</span>
            <span className="uppercase tracking-[0.14em]">{item.event}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
