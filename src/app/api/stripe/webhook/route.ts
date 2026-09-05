import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe, planFromMetadata } from "@/lib/billing";
import { appendRecord, forwardToSheet } from "@/lib/validation-store";

export async function POST(request: Request) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !secret) {
    return NextResponse.json({ ok: false, error: "Stripe webhook is not configured." }, { status: 501 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ ok: false, error: "Missing signature." }, { status: 400 });
  }

  const raw = await request.text();
  let event;
  try {
    event = stripe.webhooks.constructEvent(raw, signature, secret);
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid signature." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata ?? {};
    const record = {
      id: session.id,
      at: new Date().toISOString(),
      status: session.payment_status === "paid" || session.status === "complete" ? "paid" : session.status,
      provider: "stripe",
      plan: planFromMetadata(metadata.plan),
      name: metadata.name || "",
      email: session.customer_email || metadata.email || "",
      company: metadata.company || "",
      role: metadata.role || "",
      amount: session.amount_total ?? 0,
      customerId: typeof session.customer === "string" ? session.customer : "",
      subscriptionId: typeof session.subscription === "string" ? session.subscription : "",
      eventId: event.id,
    };
    await appendRecord("orders", record);
    try {
      await forwardToSheet("orders", record);
    } catch {
      // Keep the local copy.
    }
  }

  if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object as Stripe.Subscription;
    const record = {
      id: subscription.id,
      at: new Date().toISOString(),
      status: "canceled",
      provider: "stripe",
      eventId: event.id,
    };
    await appendRecord("orders", record);
  }

  return NextResponse.json({ ok: true });
}
