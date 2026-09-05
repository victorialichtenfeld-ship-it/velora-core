"use client";

export function Atmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <div className="animate-gold-breathe absolute inset-x-0 top-[-18%] h-[52%] bg-[radial-gradient(ellipse_at_50%_0%,rgb(176_137_58_/_0.2),transparent_60%)]" />
      <div className="absolute top-[12%] right-[-18%] h-[50%] w-[48%] rounded-full bg-[radial-gradient(circle,rgb(176_137_58_/_0.1),transparent_70%)]" />
      <div
        className="animate-grid absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgb(176 137 58 / 0.14) 1px, transparent 1px), linear-gradient(90deg, rgb(176 137 58 / 0.14) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse at 70% 20%, black 12%, transparent 70%)",
        }}
      />
      <div className="animate-gold-sweep absolute top-[8%] left-0 h-[40%] w-[30%] bg-[linear-gradient(90deg,transparent,rgb(176_137_58_/_0.1),transparent)]" />
      <div className="scanlines absolute inset-0 opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_22%,rgb(5_5_5_/_0.78)_100%)]" />
    </div>
  );
}
