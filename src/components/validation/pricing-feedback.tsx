"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { sessionId, track } from "@/lib/analytics-client";

const opinions = [
  { id: "too_high", label: "Too high" },
  { id: "about_right", label: "About right" },
  { id: "too_low", label: "Too low" },
] as const;

export function PricingFeedback() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [opinion, setOpinion] = useState<(typeof opinions)[number]["id"] | "">("");
  const [comment, setComment] = useState("");
  const [sent, setSent] = useState(false);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (window.sessionStorage.getItem("velora_price_feedback")) return;

    const pricing = document.getElementById("pricing");
    if (!pricing) return;

    let dwell: number | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        dwell = window.setTimeout(() => {
          if (window.sessionStorage.getItem("velora_price_feedback")) return;
          setOpen(true);
        }, 4500);
      },
      { threshold: 0.35 }
    );
    observer.observe(pricing);
    return () => {
      observer.disconnect();
      if (dwell) window.clearTimeout(dwell);
    };
  }, [pathname]);

  if (!open) return null;

  return (
    <aside className="fixed bottom-4 left-4 right-4 z-[70] sm:left-auto sm:right-5 sm:w-[22rem]">
      <div className="glass rounded-2xl p-4 shadow-2xl">
        {sent ? (
          <p className="text-sm text-foreground">Thanks. That helps us decide what to build next.</p>
        ) : (
          <>
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm font-medium leading-5">Was $299–$799/mo reasonable for this?</p>
              <button
                type="button"
                className="text-[12px] text-muted-foreground hover:text-foreground"
                onClick={() => {
                  window.sessionStorage.setItem("velora_price_feedback", "dismissed");
                  setOpen(false);
                }}
              >
                Not now
              </button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {opinions.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setOpinion(item.id)}
                  className={`rounded-full px-3 py-1.5 text-[12px] ${
                    opinion === item.id ? "bg-primary text-primary-foreground" : "border border-white/12 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <label className="mt-3 block text-[12px] text-muted-foreground">
              What would make you try this?
              <textarea
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                rows={2}
                className="mt-1.5 w-full rounded-xl border border-white/12 bg-white/5 px-3 py-2 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                placeholder="Optional"
              />
            </label>
            <button
              type="button"
              disabled={!opinion || pending}
              className="mt-3 h-9 w-full rounded-full bg-primary text-[13px] font-medium text-primary-foreground disabled:opacity-50"
              onClick={async () => {
                if (!opinion) return;
                setPending(true);
                await fetch("/api/feedback", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    priceOpinion: opinion,
                    comment,
                    sessionId: sessionId(),
                    path: window.location.pathname,
                  }),
                });
                track({ event: "pricing_feedback", location: "pricing" });
                window.sessionStorage.setItem("velora_price_feedback", opinion);
                setPending(false);
                setSent(true);
                window.setTimeout(() => setOpen(false), 2200);
              }}
            >
              {pending ? "Sending…" : "Send"}
            </button>
          </>
        )}
      </div>
    </aside>
  );
}
