import { NextResponse } from "next/server";
import { appendRecord, forwardToSheet } from "@/lib/validation-store";
import { isCta, isEmail, isPlan, roles } from "@/lib/validation";

export async function POST(request: Request) {
  let body: Record<string, unknown> = {};
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  if (String(body.honeypot || "")) {
    return NextResponse.json({ ok: true });
  }

  const name = String(body.name || "").trim().slice(0, 80);
  const email = String(body.email || "").trim().toLowerCase().slice(0, 120);
  const company = String(body.company || "").trim().slice(0, 80);
  const role = String(body.role || "").trim();
  const plan = typeof body.plan === "string" && isPlan(body.plan) ? body.plan : "";
  const source = String(body.source || "").slice(0, 80);
  const cta = typeof body.cta === "string" && isCta(body.cta) ? body.cta : "try_velora";

  if (!name || !isEmail(email) || !company || !roles.includes(role as (typeof roles)[number])) {
    return NextResponse.json({ ok: false, error: "Name, work email, company, and role are required." }, { status: 400 });
  }

  const record = {
    id: crypto.randomUUID(),
    at: new Date().toISOString(),
    name,
    email,
    company,
    role,
    plan,
    source,
    cta,
  };

  await appendRecord("leads", record);
  let sheet = false;
  try {
    const result = await forwardToSheet("leads", record);
    sheet = result.forwarded;
  } catch {
    sheet = false;
  }

  return NextResponse.json({ ok: true, sheet });
}
