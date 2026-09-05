import { cookies } from "next/headers";
import type { NextResponse } from "next/server";
import { demoUser } from "@/lib/data/demo";
import type { OnboardingState, SessionUser } from "@/lib/types";
import { ONBOARDING_COOKIE, SESSION_COOKIE } from "@/lib/auth-cookies";
import { siteUrl } from "@/lib/site";

export { ONBOARDING_COOKIE, SESSION_COOKIE };

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    secure: siteUrl().startsWith("https"),
  };
}

const paidOnboarding = {
  businessType: "Wholesale distribution",
  systems: ["quickbooks", "salesforce", "gmail", "slack"],
  risks: ["Revenue leakage", "Duplicate payments", "Pricing mistakes"],
  completed: true,
};

export function paidSessionUser(user: SessionUser): SessionUser {
  return { ...demoUser, ...user, paid: true };
}

export function applyPaidSessionCookies(response: NextResponse, user: SessionUser) {
  const payload = paidSessionUser(user);
  response.cookies.set(SESSION_COOKIE, JSON.stringify(payload), sessionCookieOptions());
  response.cookies.set(ONBOARDING_COOKIE, JSON.stringify(paidOnboarding), sessionCookieOptions());
  return payload;
}

export async function writePaidSession(user: SessionUser) {
  const store = await cookies();
  store.set(SESSION_COOKIE, JSON.stringify(paidSessionUser(user)), sessionCookieOptions());
  store.set(ONBOARDING_COOKIE, JSON.stringify(paidOnboarding), sessionCookieOptions());
}

export async function getSession(): Promise<SessionUser | null> {
  const store = await cookies();
  const raw = store.get(SESSION_COOKIE)?.value;
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as SessionUser;
    return { ...demoUser, ...parsed };
  } catch {
    return demoUser;
  }
}

export async function getOnboarding(): Promise<OnboardingState | null> {
  const store = await cookies();
  const raw = store.get(ONBOARDING_COOKIE)?.value;
  if (!raw) return null;
  try {
    return JSON.parse(raw) as OnboardingState;
  } catch {
    return { businessType: "", systems: [], risks: [], completed: true };
  }
}
