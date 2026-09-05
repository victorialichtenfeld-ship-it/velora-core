"use client";

export function Atmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <div className="animate-gold-breathe absolute inset-x-0 top-[-18%] h-[52%] bg-[radial-gradient(ellipse_at_50%_0%,rgb(176_137_58_/_0.26),transparent_60%)]" />
      <div className="absolute top-[10%] right-[-16%] h-[52%] w-[50%] rounded-full bg-[radial-gradient(circle,rgb(176_137_58_/_0.14),transparent_70%)]" />
      <div
        className="animate-grid absolute inset-0 opacity-[0.28]"
        style={{
          backgroundImage:
            "linear-gradient(rgb(176 137 58 / 0.16) 1px, transparent 1px), linear-gradient(90deg, rgb(176 137 58 / 0.16) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse at 72% 18%, black 16%, transparent 72%)",
        }}
      />
      <div className="animate-gold-sweep absolute top-[6%] left-0 h-[44%] w-[34%] bg-[linear-gradient(90deg,transparent,rgb(176_137_58_/_0.14),transparent)]" />
      <div className="animate-gold-sweep absolute top-[48%] right-0 h-[28%] w-[28%] bg-[linear-gradient(90deg,transparent,rgb(176_137_58_/_0.08),transparent)] [animation-delay:1.4s]" />
      <div className="scanlines absolute inset-0 opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgb(5_5_5_/_0.76)_100%)]" />
    </div>
  );
}
