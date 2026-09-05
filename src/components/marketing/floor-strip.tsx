"use client";

import { useEffect, useState } from "react";

const quotes = [
  { symbol: "CASH HELD", last: "$184,320", tick: "▲ 12.4%" },
  { symbol: "DUP HOLDS", last: "47", tick: "▲ 8" },
  { symbol: "ACH-4418", last: "$11,240", tick: "HOLD" },
  { symbol: "HARBORLINE", last: "$14,760", tick: "MISMATCH" },
  { symbol: "VAULT", last: "LOCKED", tick: "LIVE" },
  { symbol: "WIRE GATE", last: "OPEN", tick: "NY" },
  { symbol: "APEX", last: "$11,240", tick: "CAUGHT" },
  { symbol: "KEYSTONE", last: "$8,400", tick: "MATCH" },
];

export function FloorStrip() {
  const [clock, setClock] = useState("09:17:04");
  const loop = [...quotes, ...quotes];

  useEffect(() => {
    const id = window.setInterval(() => {
      setClock(
        new Date().toLocaleTimeString("en-US", {
          timeZone: "America/New_York",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative overflow-hidden border-y border-gold/20 bg-background text-gold/80">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center bg-background px-3 pr-8 text-[10px] font-medium tracking-[0.2em] uppercase text-gold">
        <span className="mr-2 size-1.5 rounded-full bg-gold animate-flash" />
        NY {clock}
      </div>
      <div className="animate-ticker-fast flex w-max gap-10 py-2 pr-8 pl-36 text-[12px] font-medium tracking-[0.08em]">
        {loop.map((quote, index) => (
          <span key={`${quote.symbol}-${index}`} className="flex items-center gap-3" aria-hidden={index >= quotes.length}>
            <span className="font-figure">{quote.symbol}</span>
            <span className="font-figure">{quote.last}</span>
            <span>{quote.tick}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
