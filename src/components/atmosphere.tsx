"use client";

export function Atmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <div className="animate-gold-breathe absolute inset-x-[-20%] top-[-28%] h-[42rem] bg-[radial-gradient(ellipse_at_50%_0%,rgb(61_124_240_/_0.42),transparent_62%)]" />
      <div className="animate-gold-sweep absolute top-[8%] left-0 h-[55%] w-[50%] bg-[linear-gradient(90deg,transparent,rgb(126_176_255_/_0.16),transparent)]" />
      <span className="animate-mote absolute top-[22%] left-[18%] size-1 rounded-full bg-gold/70" />
      <span className="animate-mote absolute top-[38%] left-[72%] size-1 rounded-full bg-gold/50 [animation-delay:1.1s]" />
      <span className="animate-mote absolute top-[58%] left-[40%] size-1.5 rounded-full bg-gold/40 [animation-delay:2.2s]" />
      <span className="animate-mote absolute top-[16%] left-[58%] size-1 rounded-full bg-gold/60 [animation-delay:0.6s]" />
    </div>
  );
}
