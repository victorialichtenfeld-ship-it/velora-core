"use client";

const motes = [
  { left: "8%", delay: "0s", duration: "6.2s" },
  { left: "22%", delay: "1.4s", duration: "7s" },
  { left: "37%", delay: "0.6s", duration: "5.8s" },
  { left: "51%", delay: "2.2s", duration: "6.6s" },
  { left: "66%", delay: "1.1s", duration: "6s" },
  { left: "81%", delay: "2.8s", duration: "7.2s" },
  { left: "93%", delay: "0.4s", duration: "5.5s" },
];

export function Atmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <div className="animate-gold-breathe absolute inset-x-0 top-[-20%] h-[55%] bg-[radial-gradient(ellipse_at_50%_0%,rgb(176_137_58_/_0.22),transparent_62%)]" />
      <div className="absolute top-[18%] right-[-12%] h-[48%] w-[46%] rounded-full bg-[radial-gradient(circle,rgb(176_137_58_/_0.1),transparent_70%)]" />
      <div className="absolute bottom-[-18%] left-[10%] h-[42%] w-[50%] rounded-full bg-[radial-gradient(circle,rgb(176_137_58_/_0.08),transparent_72%)]" />
      <div className="animate-gold-sweep absolute top-[-12%] left-0 h-[70%] w-[38%] bg-[linear-gradient(90deg,transparent,rgb(176_137_58_/_0.1),transparent)]" />
      <div
        className="animate-grid absolute inset-0 opacity-[0.2]"
        style={{
          backgroundImage:
            "linear-gradient(rgb(176 137 58 / 0.16) 1px, transparent 1px), linear-gradient(90deg, rgb(176 137 58 / 0.16) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse at 50% 30%, black 18%, transparent 78%)",
        }}
      />
      {motes.map((mote) => (
        <span
          key={`${mote.left}-${mote.delay}`}
          className="animate-mote absolute bottom-[8%] h-1.5 w-1.5 rounded-full bg-gold"
          style={{
            left: mote.left,
            animationDelay: mote.delay,
            animationDuration: mote.duration,
            boxShadow: "0 0 10px rgb(176 137 58 / 0.55)",
          }}
        />
      ))}
      <div className="scanlines absolute inset-0 opacity-45" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_18%,rgb(5_5_5_/_0.72)_100%)]" />
    </div>
  );
}
