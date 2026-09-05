import { NextResponse } from "next/server";
import { appendRecord, forwardToSheet } from "@/lib/validation-store";

const opinions = ["too_high", "about_right", "too_low"] as const;

export async function POST(request: Request) {
  let body: Record<string, unknown> = {};
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const priceOpinion = String(body.priceOpinion || "");
  if (!opinions.includes(priceOpinion as (typeof opinions)[number])) {
    return NextResponse.json({ ok: false, error: "Pick a pricing reaction." }, { status: 400 });
  }

  const record = {
    id: crypto.randomUUID(),
    at: new Date().toISOString(),
    priceOpinion,
    comment: String(body.comment || "").trim().slice(0, 500),
    sessionId: String(body.sessionId || "").slice(0, 80),
    path: String(body.path || "").slice(0, 120),
  };

  await appendRecord("feedback", record);
  try {
    await forwardToSheet("feedback", record);
  } catch {
    // Local store still holds the response.
  }

  return NextResponse.json({ ok: true });
}
