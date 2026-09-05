import { NextResponse } from "next/server";
import { appendRecord, forwardToSheet } from "@/lib/validation-store";
import { isCta, isPlan } from "@/lib/validation";

export async function POST(request: Request) {
  let body: Record<string, unknown> = {};
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const event = String(body.event || "").slice(0, 80);
  if (!event) return NextResponse.json({ ok: false }, { status: 400 });

  const cta = typeof body.cta === "string" && isCta(body.cta) ? body.cta : undefined;
  const plan = typeof body.plan === "string" && isPlan(body.plan) ? body.plan : "";

  const record = {
    id: crypto.randomUUID(),
    at: new Date().toISOString(),
    event,
    cta: cta ?? "",
    plan,
    location: String(body.location || "").slice(0, 80),
    depth: typeof body.depth === "number" ? body.depth : "",
    path: String(body.path || "").slice(0, 120),
    sessionId: String(body.sessionId || "").slice(0, 80),
  };

  await appendRecord("events", record);

  if (event === "cta_click" || event === "reached_pricing") {
    try {
      await forwardToSheet("events", record);
    } catch {
      // Local store is the source of truth if the sheet is not configured.
    }
  }

  return NextResponse.json({ ok: true });
}
