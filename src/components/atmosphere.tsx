"use client";

export function Atmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <div className="animate-gold-breathe absolute inset-x-[-20%] top-[-28%] h-[44rem] bg-[radial-gradient(ellipse_at_50%_0%,rgb(61_124_240_/_0.5),transparent_62%)]" />
      <div className="animate-gold-breathe absolute bottom-[-20%] left-[20%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgb(61_124_240_/_0.22),transparent_70%)] [animation-delay:0.9s]" />
      <div className="animate-gold-sweep absolute top-[8%] left-0 h-[55%] w-[50%] bg-[linear-gradient(90deg,transparent,rgb(126_176_255_/_0.2),transparent)]" />
      <span className="animate-mote absolute top-[18%] left-[12%] size-1 rounded-full bg-gold/80" />
      <span className="animate-mote absolute top-[28%] left-[78%] size-1 rounded-full bg-gold/55 [animation-delay:0.8s]" />
      <span className="animate-mote absolute top-[42%] left-[32%] size-1.5 rounded-full bg-gold/45 [animation-delay:1.6s]" />
      <span className="animate-mote absolute top-[52%] left-[64%] size-1 rounded-full bg-gold/70 [animation-delay:0.4s]" />
      <span className="animate-mote absolute top-[66%] left-[22%] size-1 rounded-full bg-gold/40 [animation-delay:2.1s]" />
      <span className="animate-mote absolute top-[14%] left-[48%] size-1 rounded-full bg-gold/60 [animation-delay:1.2s]" />
      <span className="animate-mote absolute top-[74%] left-[58%] size-1.5 rounded-full bg-gold/35 [animation-delay:2.8s]" />
    </div>
  );
}
