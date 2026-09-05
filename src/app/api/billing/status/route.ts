import { NextResponse } from "next/server";
import { stripeConfigured } from "@/lib/billing";

export async function GET() {
  return NextResponse.json({
    ok: true,
    stripe: stripeConfigured(),
    offline: process.env.ALLOW_OFFLINE_CHECKOUT === "true",
  });
}
