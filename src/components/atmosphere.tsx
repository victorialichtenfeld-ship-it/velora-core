"use client";

export function Atmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <div className="animate-gold-breathe absolute inset-x-0 top-[-18%] h-[34rem] bg-[radial-gradient(ellipse_at_50%_0%,rgb(196_163_90_/_0.32),transparent_58%)]" />
      <div className="absolute top-[6%] right-[-10%] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgb(61_122_92_/_0.18),transparent_70%)]" />
      <div className="absolute top-[28%] left-[-12%] h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgb(76_106_154_/_0.16),transparent_70%)]" />
      <div className="absolute bottom-[-8%] right-[18%] h-[18rem] w-[18rem] rounded-full bg-[radial-gradient(circle,rgb(232_164_120_/_0.16),transparent_70%)]" />
      <div className="animate-gold-sweep absolute top-[8%] left-0 h-[42%] w-[38%] bg-[linear-gradient(90deg,transparent,rgb(255_252_247_/_0.7),transparent)]" />
    </div>
  );
}
