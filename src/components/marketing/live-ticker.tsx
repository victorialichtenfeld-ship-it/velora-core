"use client";

const items = [
  "Duplicate ACH held · Apex Logistics · $11,240",
  "Invoice pricing mismatch · Harborline · $14,760",
  "Discount above policy · Northwind · $4,275",
  "PO over approval limit · Helios · $26,760",
  "First-time vendor wire flagged · Nimbus · $9,875",
  "Contract rate restored · Cinder & Co. · $6,480",
];

export function LiveTicker() {
  const loop = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-border bg-card py-3">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />
      <div className="animate-ticker flex w-max gap-10 whitespace-nowrap px-6 text-[12px] uppercase tracking-[0.16em] text-foreground/75">
        {loop.map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center gap-3">
            <span className="size-1.5 rounded-full bg-primary" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
