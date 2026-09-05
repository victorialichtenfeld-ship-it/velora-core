"use client";

const motes = [
  { left: "5%", delay: "0s", duration: "5.4s" },
  { left: "12%", delay: "0.7s", duration: "6.1s" },
  { left: "19%", delay: "1.6s", duration: "5s" },
  { left: "27%", delay: "2.2s", duration: "6.8s" },
  { left: "35%", delay: "0.3s", duration: "5.9s" },
  { left: "43%", delay: "1.1s", duration: "7.1s" },
  { left: "51%", delay: "2.5s", duration: "5.3s" },
  { left: "58%", delay: "0.6s", duration: "6.5s" },
  { left: "66%", delay: "1.9s", duration: "5.7s" },
  { left: "74%", delay: "1.4s", duration: "6.9s" },
  { left: "81%", delay: "0.2s", duration: "6.2s" },
  { left: "88%", delay: "2.8s", duration: "5.1s" },
  { left: "94%", delay: "3.2s", duration: "6.6s" },
];

const dollars = [
  { left: "8%", delay: "0.4s", size: "18px" },
  { left: "24%", delay: "1.8s", size: "14px" },
  { left: "41%", delay: "0.9s", size: "22px" },
  { left: "62%", delay: "2.4s", size: "16px" },
  { left: "79%", delay: "1.2s", size: "20px" },
  { left: "91%", delay: "3s", size: "13px" },
];

export function Atmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <div className="animate-gold-breathe absolute inset-x-0 top-[-22%] h-[62%] bg-[radial-gradient(ellipse_at_50%_0%,rgb(201_168_106_/_0.32),transparent_58%)]" />
      <div className="absolute top-1/4 right-[-8%] h-[48%] w-[42%] rounded-full bg-[radial-gradient(circle,rgb(201_168_106_/_0.14),transparent_70%)]" />
      <div className="absolute bottom-[8%] left-[-12%] h-[36%] w-[36%] rounded-full bg-[radial-gradient(circle,rgb(201_168_106_/_0.1),transparent_72%)]" />
      <div className="animate-gold-sweep absolute top-[-10%] left-0 h-[70%] w-[38%] bg-[linear-gradient(90deg,transparent,rgb(201_168_106_/_0.16),transparent)]" />
      <div
        className="absolute inset-0 opacity-[0.28]"
        style={{
          backgroundImage:
            "linear-gradient(rgb(201 168 106 / 0.22) 1px, transparent 1px), linear-gradient(90deg, rgb(201 168 106 / 0.22) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at 50% 16%, black 24%, transparent 74%)",
        }}
      />
      {motes.map((mote) => (
        <span
          key={`${mote.left}-${mote.delay}`}
          className="animate-mote absolute bottom-[14%] h-1.5 w-1.5 rounded-full bg-gold"
          style={{
            left: mote.left,
            animationDelay: mote.delay,
            animationDuration: mote.duration,
            boxShadow: "0 0 16px rgb(201 168 106 / 0.95)",
          }}
        />
      ))}
      {dollars.map((mark) => (
        <span
          key={`${mark.left}-${mark.delay}`}
          className="animate-dollar absolute bottom-[18%] font-figure text-gold/70"
          style={{
            left: mark.left,
            fontSize: mark.size,
            animationDelay: mark.delay,
            textShadow: "0 0 18px rgb(201 168 106 / 0.7)",
          }}
        >
          $
        </span>
      ))}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_38%,rgb(20_20_26_/_0.58)_100%)]" />
    </div>
  );
}
