import { NextResponse } from "next/server";
import { checkoutUrls, getStripe, isPaidPlan, paidPlans, priceIdFor, stripeConfigured } from "@/lib/billing";
import { appendRecord, forwardToSheet } from "@/lib/validation-store";
import { isEmail } from "@/lib/validation";

export async function POST(request: Request) {
  let body: Record<string, unknown> = {};
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const plan = String(body.plan || "starter");
  if (!isPaidPlan(plan)) {
    return NextResponse.json({ ok: false, error: "Pick Starter or Growth." }, { status: 400 });
  }

  const name = String(body.name || "").trim().slice(0, 80);
  const email = String(body.email || "").trim().toLowerCase().slice(0, 120);
  const company = String(body.company || "").trim().slice(0, 80);
  const role = String(body.role || "").trim().slice(0, 80);
  const source = String(body.source || "").slice(0, 80);

  if (!name || !isEmail(email) || !company) {
    return NextResponse.json({ ok: false, error: "Name, work email, and company are required to pay." }, { status: 400 });
  }

  const catalog = paidPlans[plan];
  const urls = checkoutUrls();

  if (stripeConfigured()) {
    const stripe = getStripe();
    if (!stripe) {
      return NextResponse.json({ ok: false, error: "Stripe is not configured." }, { status: 500 });
    }

    const price = priceIdFor(plan);
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: email,
      success_url: urls.success,
      cancel_url: urls.cancel,
      allow_promotion_codes: true,
      billing_address_collection: "required",
      metadata: { name, email, company, role, plan, source },
      subscription_data: {
        metadata: { name, email, company, role, plan },
      },
      custom_text: {
        submit: { message: `Velora ${catalog.name} is billed monthly. Cancel any time from Settings.` },
      },
      line_items: price
        ? [{ price, quantity: 1 }]
        : [
            {
              quantity: 1,
              price_data: {
                currency: "usd",
                recurring: { interval: "month" },
                unit_amount: catalog.amount,
                product_data: {
                  name: `Velora ${catalog.name}`,
                  description: catalog.description,
                },
              },
            },
          ],
    });

    if (!session.url) {
      return NextResponse.json({ ok: false, error: "Stripe did not return a checkout URL." }, { status: 500 });
    }

    await appendRecord("orders", {
      id: session.id,
      at: new Date().toISOString(),
      status: "checkout_created",
      provider: "stripe",
      plan,
      name,
      email,
      company,
      role,
      source,
      amount: catalog.amount,
    });

    try {
      await forwardToSheet("orders", {
        id: session.id,
        at: new Date().toISOString(),
        status: "checkout_created",
        provider: "stripe",
        plan,
        name,
        email,
        company,
        role,
        source,
        amount: catalog.amount,
      });
    } catch {
      // Local store still holds the order.
    }

    return NextResponse.json({ ok: true, url: session.url, provider: "stripe" });
  }

  if (process.env.ALLOW_OFFLINE_CHECKOUT !== "true") {
    return NextResponse.json(
      {
        ok: false,
        error: "Stripe is not connected on this deployment. Add STRIPE_SECRET_KEY (see GO-LIVE.md).",
      },
      { status: 503 }
    );
  }

  const order = {
    id: crypto.randomUUID(),
    at: new Date().toISOString(),
    status: "pending_processor",
    provider: "offline",
    plan,
    name,
    email,
    company,
    role,
    source,
    amount: catalog.amount,
  };
  await appendRecord("orders", order);
  try {
    await forwardToSheet("orders", order);
  } catch {
    // Local store still holds the order.
  }

  return NextResponse.json({
    ok: true,
    url: `/billing/pay?order=${order.id}`,
    provider: "offline",
  });
}
