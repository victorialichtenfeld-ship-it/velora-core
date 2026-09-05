"use client";

const items = [
  { event: "Harborline invoice vs MSA", amount: "$14,760" },
  { event: "Keystone duplicate ACH", amount: "$8,400" },
  { event: "Helios second vendor wire", amount: "$9,120" },
  { event: "Apex duplicate $11,240 ACH", amount: "$11,240" },
];

function Row({ reverse = false }: { reverse?: boolean }) {
  const loop = [...items, ...items];
  return (
    <div
      className={`${reverse ? "animate-ticker-reverse" : "animate-ticker"} flex w-max gap-4 whitespace-nowrap py-3 text-[13px] text-muted-foreground`}
    >
      {loop.map((item, index) => (
        <span
          key={`${reverse ? "b" : "a"}-${item.event}-${index}`}
          className="glass inline-flex items-center gap-3 rounded-full px-3 py-1.5"
          aria-hidden={index >= items.length}
        >
          <span className="relative rounded-full bg-gold/18 px-2 py-0.5 text-[11px] font-medium text-gold">
            Held
          </span>
          <span className="font-figure text-base tracking-tight text-gold">{item.amount}</span>
          <span>{item.event}</span>
        </span>
      ))}
    </div>
  );
}

export function LiveTicker() {
  return (
    <div className="relative overflow-hidden py-2">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />
      <Row />
      <Row reverse />
    </div>
  );
}
