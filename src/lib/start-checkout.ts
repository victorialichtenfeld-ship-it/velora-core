"use client";

export async function startCheckout(input: {
  plan: string;
  name: string;
  email: string;
  company: string;
  role: string;
  source: string;
}) {
  const response = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(input),
  });
  const result = (await response.json()) as { ok: boolean; url?: string; error?: string };
  if (!response.ok || !result.ok || !result.url) {
    throw new Error(result.error || "Could not start checkout.");
  }
  window.location.href = result.url;
}
