"use client";

export function Atmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -left-24 -top-32 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(184,149,74,0.28),transparent_64%)] blur-2xl animate-orb-a" />
      <div className="absolute -right-20 top-10 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(47,130,122,0.2),transparent_64%)] blur-2xl animate-orb-b" />
      <div className="absolute bottom-[-8rem] left-1/3 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(40,70,140,0.16),transparent_64%)] blur-2xl animate-orb-a" />
      <div className="absolute inset-0 grid-fade opacity-80" />
    </div>
  );
}
