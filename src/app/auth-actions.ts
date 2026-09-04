"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ONBOARDING_COOKIE, SESSION_COOKIE } from "@/lib/auth-cookies";
import { demoUser } from "@/lib/data/demo";
import type { SessionUser } from "@/lib/types";

function cookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  };
}

const demoOnboarding = {
  businessType: "Wholesale distribution",
  systems: ["quickbooks", "salesforce", "gmail", "slack"],
  risks: ["Revenue leakage", "Duplicate payments", "Pricing mistakes"],
  completed: true,
};

export async function launchDemoWorkspace() {
  const store = await cookies();
  store.set(SESSION_COOKIE, JSON.stringify(demoUser), cookieOptions());
  store.set(ONBOARDING_COOKIE, JSON.stringify(demoOnboarding), cookieOptions());
  redirect("/dashboard");
}

export async function startWorkspace(formData: FormData) {
  const store = await cookies();
  const user: SessionUser = {
    ...demoUser,
    name: String(formData.get("name") || demoUser.name),
    email: String(formData.get("email") || demoUser.email),
    company: String(formData.get("company") || demoUser.company),
  };
  store.set(SESSION_COOKIE, JSON.stringify(user), cookieOptions());
  redirect("/onboarding");
}

export async function completeOnboarding(formData: FormData) {
  const store = await cookies();
  store.set(
    ONBOARDING_COOKIE,
    JSON.stringify({
      businessType: String(formData.get("businessType") || ""),
      systems: String(formData.get("systems") || "")
        .split(",")
        .filter(Boolean),
      risks: String(formData.get("risks") || "")
        .split(",")
        .filter(Boolean),
      completed: true,
    }),
    cookieOptions()
  );
  redirect("/dashboard");
}

export async function signOut() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  store.delete(ONBOARDING_COOKIE);
  redirect("/");
}
