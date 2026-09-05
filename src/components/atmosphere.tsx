"use client";

export function Atmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <div className="animate-gold-breathe absolute inset-x-0 top-[-12%] h-[28rem] bg-[radial-gradient(ellipse_at_50%_0%,rgb(15_28_46_/_0.09),transparent_62%)]" />
      <div className="absolute top-[8%] right-[-12%] h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgb(122_92_40_/_0.10),transparent_70%)]" />
      <div className="animate-gold-sweep absolute top-[4%] left-0 h-[40%] w-[30%] bg-[linear-gradient(90deg,transparent,rgb(255_255_255_/_0.55),transparent)]" />
    </div>
  );
}
