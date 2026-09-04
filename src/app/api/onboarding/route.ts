import { NextResponse } from "next/server";
import { ONBOARDING_COOKIE } from "@/lib/auth-cookies";
import type { OnboardingState } from "@/lib/types";

export async function POST(request: Request) {
  const body = (await request.json()) as OnboardingState;
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ONBOARDING_COOKIE, JSON.stringify({ ...body, completed: true }), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}
