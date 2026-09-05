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

const dollars = [
  { left: "14%", delay: "0.8s", size: "14px" },
  { left: "48%", delay: "2s", size: "16px" },
  { left: "78%", delay: "1.3s", size: "13px" },
];

export function Atmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <div className="animate-gold-breathe absolute inset-x-0 top-[-28%] h-[58%] bg-[radial-gradient(ellipse_at_50%_0%,rgb(176_137_58_/_0.18),transparent_62%)]" />
      <div className="absolute top-[22%] right-[-14%] h-[42%] w-[40%] rounded-full bg-[radial-gradient(circle,rgb(176_137_58_/_0.06),transparent_72%)]" />
      <div className="animate-gold-sweep absolute top-[-12%] left-0 h-[70%] w-[38%] bg-[linear-gradient(90deg,transparent,rgb(176_137_58_/_0.08),transparent)]" />
      <div
        className="animate-grid absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(rgb(176 137 58 / 0.14) 1px, transparent 1px), linear-gradient(90deg, rgb(176 137 58 / 0.14) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse at 50% 10%, black 22%, transparent 72%)",
        }}
      />
      {motes.map((mote) => (
        <span
          key={`${mote.left}-${mote.delay}`}
          className="animate-mote absolute bottom-[10%] h-1 w-1 rounded-full bg-gold"
          style={{
            left: mote.left,
            animationDelay: mote.delay,
            animationDuration: mote.duration,
            boxShadow: "0 0 8px rgb(176 137 58 / 0.45)",
          }}
        />
      ))}
      {dollars.map((mark) => (
        <span
          key={`${mark.left}-${mark.delay}`}
          className="animate-dollar absolute bottom-[16%] font-figure text-gold/35"
          style={{
            left: mark.left,
            fontSize: mark.size,
            animationDelay: mark.delay,
          }}
        >
          $
        </span>
      ))}
      <div className="scanlines absolute inset-0 opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_28%,rgb(5_5_5_/_0.82)_100%)]" />
    </div>
  );
}
