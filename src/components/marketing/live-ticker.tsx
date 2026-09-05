"use client";

const items = [
  { event: "Harborline under MSA", amount: "$14,760" },
  { event: "Keystone second bill", amount: "$8,400" },
  { event: "Helios repeat wire", amount: "$9,120" },
  { event: "Nimbus first-time payee", amount: "$18,400" },
];

export function LiveTicker() {
  const loop = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-border bg-white">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
      <div className="animate-ticker flex w-max gap-16 whitespace-nowrap py-5 text-[13px] text-muted-foreground">
        {loop.map((item, index) => (
          <span key={`${item.event}-${index}`} className="flex items-center gap-4" aria-hidden={index >= items.length}>
            <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-foreground">Held</span>
            <span className="font-figure text-2xl tracking-tight text-foreground">{item.amount}</span>
            <span>{item.event}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
