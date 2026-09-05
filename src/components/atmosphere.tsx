"use client";

const motes = [
  { top: "12%", left: "8%", size: 3, delay: "0s" },
  { top: "22%", left: "78%", size: 2, delay: "1.4s" },
  { top: "48%", left: "18%", size: 2, delay: "2.8s" },
  { top: "62%", left: "88%", size: 3, delay: "0.6s" },
  { top: "78%", left: "42%", size: 2, delay: "3.2s" },
  { top: "34%", left: "54%", size: 1.5, delay: "4s" },
];

export function Atmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <div className="animate-gold-breathe absolute inset-x-0 top-[-18%] h-[52%] bg-[radial-gradient(ellipse_at_50%_0%,rgb(226_194_120_/_0.16),transparent_62%)]" />
      <div
        className="absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage:
            "linear-gradient(rgb(226 194 120 / 0.07) 1px, transparent 1px), linear-gradient(90deg, rgb(226 194 120 / 0.07) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse at 50% 20%, black 20%, transparent 75%)",
        }}
      />
      {motes.map((mote) => (
        <span
          key={`${mote.top}-${mote.left}`}
          className="animate-mote absolute rounded-full bg-primary"
          style={{
            top: mote.top,
            left: mote.left,
            width: mote.size,
            height: mote.size,
            animationDelay: mote.delay,
            boxShadow: "0 0 10px rgb(226 194 120 / 0.7)",
          }}
        />
      ))}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgb(12_12_12_/_0.72)_100%)]" />
    </div>
  );
}
