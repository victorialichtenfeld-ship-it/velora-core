"use client";

const motes = [
  { left: "3%", delay: "0s", duration: "4.8s" },
  { left: "9%", delay: "0.5s", duration: "5.6s" },
  { left: "15%", delay: "1.2s", duration: "4.4s" },
  { left: "21%", delay: "2s", duration: "6.1s" },
  { left: "28%", delay: "0.3s", duration: "5.2s" },
  { left: "35%", delay: "1.5s", duration: "6.4s" },
  { left: "42%", delay: "2.4s", duration: "4.9s" },
  { left: "49%", delay: "0.8s", duration: "5.8s" },
  { left: "56%", delay: "1.9s", duration: "5s" },
  { left: "63%", delay: "0.2s", duration: "6.2s" },
  { left: "70%", delay: "2.7s", duration: "4.6s" },
  { left: "76%", delay: "1.1s", duration: "5.5s" },
  { left: "82%", delay: "0.6s", duration: "6s" },
  { left: "88%", delay: "2.2s", duration: "4.7s" },
  { left: "94%", delay: "3s", duration: "5.3s" },
];

const dollars = [
  { left: "6%", delay: "0.2s", size: "20px" },
  { left: "18%", delay: "1.4s", size: "14px" },
  { left: "30%", delay: "0.7s", size: "26px" },
  { left: "44%", delay: "2.1s", size: "16px" },
  { left: "57%", delay: "0.9s", size: "22px" },
  { left: "69%", delay: "2.6s", size: "13px" },
  { left: "81%", delay: "1.6s", size: "24px" },
  { left: "92%", delay: "3.1s", size: "15px" },
];

export function Atmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <div className="animate-gold-breathe absolute inset-x-0 top-[-28%] h-[70%] bg-[radial-gradient(ellipse_at_50%_0%,rgb(212_175_55_/_0.38),transparent_58%)]" />
      <div className="absolute top-[18%] right-[-12%] h-[52%] w-[46%] rounded-full bg-[radial-gradient(circle,rgb(212_175_55_/_0.16),transparent_70%)]" />
      <div className="absolute bottom-[4%] left-[-14%] h-[40%] w-[40%] rounded-full bg-[radial-gradient(circle,rgb(243_213_106_/_0.1),transparent_72%)]" />
      <div className="animate-gold-sweep absolute top-[-12%] left-0 h-[75%] w-[42%] bg-[linear-gradient(90deg,transparent,rgb(212_175_55_/_0.2),transparent)]" />
      <div
        className="animate-grid absolute inset-0 opacity-[0.34]"
        style={{
          backgroundImage:
            "linear-gradient(rgb(212 175 55 / 0.26) 1px, transparent 1px), linear-gradient(90deg, rgb(212 175 55 / 0.26) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse at 50% 12%, black 28%, transparent 78%)",
        }}
      />
      {motes.map((mote) => (
        <span
          key={`${mote.left}-${mote.delay}`}
          className="animate-mote absolute bottom-[10%] h-1.5 w-1.5 rounded-full bg-gold"
          style={{
            left: mote.left,
            animationDelay: mote.delay,
            animationDuration: mote.duration,
            boxShadow: "0 0 18px rgb(212 175 55 / 1)",
          }}
        />
      ))}
      {dollars.map((mark) => (
        <span
          key={`${mark.left}-${mark.delay}`}
          className="animate-dollar absolute bottom-[16%] font-figure text-gold/80"
          style={{
            left: mark.left,
            fontSize: mark.size,
            animationDelay: mark.delay,
            textShadow: "0 0 22px rgb(212 175 55 / 0.85)",
          }}
        >
          $
        </span>
      ))}
      <div className="scanlines absolute inset-0 opacity-70" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_32%,rgb(5_5_5_/_0.72)_100%)]" />
    </div>
  );
}
