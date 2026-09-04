import { NextResponse } from "next/server";
import { ONBOARDING_COOKIE, SESSION_COOKIE } from "@/lib/auth-cookies";
import { demoUser } from "@/lib/data/demo";
import type { SessionUser } from "@/lib/types";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as Partial<SessionUser> & {
    demo?: boolean;
  };

  const user: SessionUser = {
    ...demoUser,
    name: body.name || demoUser.name,
    email: body.email || demoUser.email,
    company: body.company || demoUser.company,
    role: body.role || demoUser.role,
  };

  const response = NextResponse.json({ ok: true, user });
  response.cookies.set(SESSION_COOKIE, JSON.stringify(user), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  if (body.demo) {
    response.cookies.set(
      ONBOARDING_COOKIE,
      JSON.stringify({
        businessType: "Wholesale distribution",
        systems: ["quickbooks", "salesforce", "gmail", "slack"],
        risks: ["Revenue leakage", "Duplicate payments", "Pricing mistakes"],
        completed: true,
      }),
      { httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 30 }
    );
  }
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.delete(SESSION_COOKIE);
  response.cookies.delete(ONBOARDING_COOKIE);
  return response;
}
