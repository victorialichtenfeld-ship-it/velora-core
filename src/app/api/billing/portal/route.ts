import { NextResponse } from "next/server";
import { getStripe, stripeConfigured } from "@/lib/billing";
import { siteUrl } from "@/lib/site";

export async function POST(request: Request) {
  if (!stripeConfigured()) {
    return NextResponse.json({ ok: false, error: "Stripe is not configured." }, { status: 501 });
  }
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json({ ok: false, error: "Stripe is not configured." }, { status: 501 });
  }

  const body = (await request.json()) as { customerId?: string };
  if (!body.customerId) {
    return NextResponse.json({ ok: false, error: "Missing customer." }, { status: 400 });
  }

  const portal = await stripe.billingPortal.sessions.create({
    customer: body.customerId,
    return_url: `${siteUrl()}/dashboard/settings`,
  });

  return NextResponse.json({ ok: true, url: portal.url });
}
