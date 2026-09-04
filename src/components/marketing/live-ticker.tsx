"use client";

const items = [
  "Duplicate ACH held · Apex Logistics · $11,240",
  "Invoice unit price $84 vs $102 contract · Harborline · $14,760",
  "Second bill matched paid invoice · Keystone Parts · $8,400",
  "Payable draft under MSA rate · Cinder & Co. · $6,480",
  "Repeat wire same vendor/amount · Helios Industrial · $9,120",
  "Receivable priced off contract addendum · Northwind · $4,275",
];

export function LiveTicker() {
  // Second copy exists only so the CSS marquee can loop without a jump.
  const loop = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-border bg-card py-2.5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-card to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-card to-transparent" />
      <p className="absolute top-1/2 left-3 z-20 -translate-y-1/2 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
        Sample
      </p>
      <div className="animate-ticker flex w-max gap-10 whitespace-nowrap px-6 pl-24 text-[12px] text-muted-foreground">
        {loop.map((item, index) => (
          <span
            key={`${item}-${index}`}
            aria-hidden={index >= items.length}
            className="flex items-center gap-3"
          >
            <span className="size-1.5 rounded-full bg-primary" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
