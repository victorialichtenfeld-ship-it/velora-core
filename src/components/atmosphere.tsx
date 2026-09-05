"use client";

export function Atmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <div className="animate-gold-breathe absolute inset-x-[-20%] top-[-28%] h-[42rem] bg-[radial-gradient(ellipse_at_50%_0%,rgb(61_124_240_/_0.38),transparent_62%)]" />
      <div className="animate-gold-sweep absolute top-[10%] left-0 h-[50%] w-[46%] bg-[linear-gradient(90deg,transparent,rgb(126_176_255_/_0.14),transparent)]" />
    </div>
  );
}
