import { NextResponse } from "next/server";
import { getAiAdapter } from "@/lib/ai";
import { detectedAlerts } from "@/lib/risk-engine";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    alertId?: string;
    question?: string;
  };
  const alert = detectedAlerts.find((item) => item.id === body.alertId);
  if (!alert) {
    return NextResponse.json({ error: "Alert not found" }, { status: 404 });
  }
  const adapter = getAiAdapter();
  const explanation = await adapter.explainAlert(alert, body.question);
  return NextResponse.json({
    provider: adapter.provider,
    explanation,
  });
}
