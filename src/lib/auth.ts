import { cookies } from "next/headers";
import { demoUser } from "@/lib/data/demo";
import type { OnboardingState, SessionUser } from "@/lib/types";
import { ONBOARDING_COOKIE, SESSION_COOKIE } from "@/lib/auth-cookies";

export { ONBOARDING_COOKIE, SESSION_COOKIE };

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
