import type { AnalyticsEvent } from "@/lib/validation";

const SESSION_KEY = "velora_sid";
const FIRED_KEY = "velora_fired";

export function sessionId() {
  if (typeof window === "undefined") return "";
  const existing = window.sessionStorage.getItem(SESSION_KEY);
  if (existing) return existing;
  const id = crypto.randomUUID();
  window.sessionStorage.setItem(SESSION_KEY, id);
  return id;
}

function firedSet() {
  try {
    return new Set(JSON.parse(window.sessionStorage.getItem(FIRED_KEY) || "[]") as string[]);
  } catch {
    return new Set<string>();
  }
}

export function oncePerSession(key: string) {
  if (typeof window === "undefined") return false;
  const fired = firedSet();
  if (fired.has(key)) return false;
  fired.add(key);
  window.sessionStorage.setItem(FIRED_KEY, JSON.stringify([...fired]));
  return true;
}

export function track(event: AnalyticsEvent) {
  if (typeof window === "undefined") return;
  const payload = {
    ...event,
    path: event.path ?? window.location.pathname,
    sessionId: event.sessionId ?? sessionId(),
  };

  const body = JSON.stringify(payload);
  const blob = new Blob([body], { type: "application/json" });
  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/events", blob);
    return;
  }
  void fetch("/api/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  });
}
