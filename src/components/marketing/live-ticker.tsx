"use client";

const items = [
  { event: "Harborline under MSA", amount: "$14,760", tone: "text-protect" },
  { event: "Keystone second bill", amount: "$8,400", tone: "text-gold" },
  { event: "Helios repeat wire", amount: "$9,120", tone: "text-dusk" },
  { event: "Nimbus first-time payee", amount: "$18,400", tone: "text-blush" },
];

export function LiveTicker() {
  const loop = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-gold/30 bg-[linear-gradient(90deg,rgb(212_176_90_/_0.16),rgb(47_138_100_/_0.12),rgb(74_111_168_/_0.12),rgb(217_137_106_/_0.12))]">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
      <div className="animate-ticker flex w-max gap-16 whitespace-nowrap py-5 text-[13px] text-muted-foreground">
        {loop.map((item, index) => (
          <span key={`${item.event}-${index}`} className="flex items-center gap-4" aria-hidden={index >= items.length}>
            <span className="rounded-full bg-protect/18 px-2 py-0.5 text-[11px] font-medium text-protect">Held</span>
            <span className="font-figure money-sheen text-2xl tracking-tight">{item.amount}</span>
            <span className={item.tone}>{item.event}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
