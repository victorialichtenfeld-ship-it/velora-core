import { NextResponse } from "next/server";
import { applyPaidSessionCookies } from "@/lib/auth";
import { getStripe, isPaidPlan, planFromMetadata, stripeConfigured } from "@/lib/billing";
import { appendRecord, forwardToSheet, readRecords } from "@/lib/validation-store";
import type { SessionUser } from "@/lib/types";

async function recordPaid(order: Record<string, unknown>) {
  const paid = {
    ...order,
    at: new Date().toISOString(),
    status: "paid",
  };
  await appendRecord("orders", paid);
  try {
    await forwardToSheet("orders", paid);
  } catch {
    // Local store still holds the paid order.
  }
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { sessionId?: string; orderId?: string };

  if (body.sessionId && stripeConfigured()) {
    const stripe = getStripe();
    if (!stripe) {
      return NextResponse.json({ ok: false, error: "Stripe is not configured." }, { status: 500 });
    }
    const session = await stripe.checkout.sessions.retrieve(body.sessionId);
    if (session.status !== "complete" && session.payment_status !== "paid") {
      return NextResponse.json({ ok: false, error: "Payment is not complete." }, { status: 402 });
    }
    const metadata = session.metadata ?? {};
    const user: SessionUser = {
      name: metadata.name || "Velora customer",
      email: session.customer_email || metadata.email || "",
      company: metadata.company || "",
      role: metadata.role || "Other",
      plan: planFromMetadata(metadata.plan) || "starter",
      paid: true,
      stripeCustomerId: typeof session.customer === "string" ? session.customer : "",
      stripeSubscriptionId: typeof session.subscription === "string" ? session.subscription : "",
    };
    const response = NextResponse.json({ ok: true });
    applyPaidSessionCookies(response, user);
    return response;
  }

  if (body.orderId && process.env.ALLOW_OFFLINE_CHECKOUT === "true") {
    const orders = await readRecords("orders");
    const order = orders.find((row) => row.id === body.orderId);
    if (!order) {
      return NextResponse.json({ ok: false, error: "Order not found." }, { status: 404 });
    }
    const plan = String(order.plan || "starter");
    const user: SessionUser = {
      name: String(order.name || "Velora customer"),
      email: String(order.email || ""),
      company: String(order.company || ""),
      role: String(order.role || "Other"),
      plan: isPaidPlan(plan) ? plan : "starter",
      paid: true,
    };
    await recordPaid({ ...order, provider: "offline" });
    const response = NextResponse.json({ ok: true });
    applyPaidSessionCookies(response, user);
    return response;
  }

  return NextResponse.json({ ok: false, error: "Nothing to claim." }, { status: 400 });
}
