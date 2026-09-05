"use client";

export function Atmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <div className="absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(ellipse_at_50%_-10%,rgb(15_28_46_/_0.06),transparent_58%)]" />
    </div>
  );
}
