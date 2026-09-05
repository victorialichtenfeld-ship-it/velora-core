"use client";

export function Atmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <div className="animate-gold-breathe absolute inset-x-[-10%] top-[-22%] h-[40rem] bg-[radial-gradient(ellipse_at_50%_0%,rgb(212_176_90_/_0.55),transparent_62%)]" />
      <div className="absolute top-[2%] right-[-8%] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgb(47_138_100_/_0.34),transparent_68%)]" />
      <div className="absolute top-[18%] left-[-14%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgb(74_111_168_/_0.3),transparent_68%)]" />
      <div className="absolute top-[42%] right-[8%] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgb(217_137_106_/_0.28),transparent_70%)]" />
      <div className="absolute bottom-[-12%] left-[22%] h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgb(47_138_100_/_0.22),transparent_70%)]" />
      <div className="animate-gold-sweep absolute top-[6%] left-0 h-[48%] w-[42%] bg-[linear-gradient(90deg,transparent,rgb(255_253_248_/_0.55),transparent)]" />
    </div>
  );
}
