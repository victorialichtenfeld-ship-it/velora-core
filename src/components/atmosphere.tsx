"use client";

const motes = [
  { left: "8%", delay: "0s", duration: "6.5s" },
  { left: "18%", delay: "1.1s", duration: "7.2s" },
  { left: "31%", delay: "2.4s", duration: "5.8s" },
  { left: "47%", delay: "0.6s", duration: "8s" },
  { left: "62%", delay: "3s", duration: "6.2s" },
  { left: "73%", delay: "1.8s", duration: "7.6s" },
  { left: "86%", delay: "0.3s", duration: "6.8s" },
  { left: "93%", delay: "2.8s", duration: "5.5s" },
];

export function Atmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <div className="animate-gold-breathe absolute inset-x-0 top-[-18%] h-[52%] bg-[radial-gradient(ellipse_at_50%_0%,rgb(201_168_106_/_0.12),transparent_60%)]" />
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(rgb(201 168 106 / 0.14) 1px, transparent 1px), linear-gradient(90deg, rgb(201 168 106 / 0.14) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse at 50% 18%, black 22%, transparent 72%)",
        }}
      />
      {motes.map((mote) => (
        <span
          key={`${mote.left}-${mote.delay}`}
          className="animate-mote absolute bottom-[18%] h-1 w-1 rounded-full bg-gold"
          style={{
            left: mote.left,
            animationDelay: mote.delay,
            animationDuration: mote.duration,
            boxShadow: "0 0 10px rgb(201 168 106 / 0.7)",
          }}
        />
      ))}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_48%,rgb(20_20_26_/_0.7)_100%)]" />
    </div>
  );
}
