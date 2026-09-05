"use client";

export function Atmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <div className="absolute inset-x-0 top-[-20%] h-[48%] bg-[radial-gradient(ellipse_at_50%_0%,rgb(201_168_106_/_0.055),transparent_58%)]" />
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(rgb(139 111 71 / 0.22) 1px, transparent 1px), linear-gradient(90deg, rgb(139 111 71 / 0.22) 1px, transparent 1px)",
          backgroundSize: "88px 88px",
          maskImage: "radial-gradient(ellipse at 50% 18%, black 18%, transparent 72%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(rgb(237 232 223 / 0.55) 0.6px, transparent 0.6px)",
          backgroundSize: "3px 3px",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_52%,rgb(20_20_26_/_0.72)_100%)]" />
    </div>
  );
}
