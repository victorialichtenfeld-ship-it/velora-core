"use client";

export function Atmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -left-24 -top-28 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(232,176,72,0.42),transparent_64%)] blur-2xl animate-orb-a" />
      <div className="absolute -right-16 top-6 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(56,176,160,0.32),transparent_64%)] blur-2xl animate-orb-b" />
      <div className="absolute bottom-[-7rem] left-1/4 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(214,108,72,0.18),transparent_64%)] blur-2xl animate-orb-a" />
      <div className="absolute inset-0 grid-fade opacity-90" />
    </div>
  );
}
