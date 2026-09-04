/**
 * Optional live clients. The product never imports these directly from UI code.
 * Swap demo session cookies for a real provider when you are ready.
 */

export type AuthAdapter = {
  id: "demo" | "supabase" | "clerk" | "auth0";
  getUser: () => Promise<{ email: string; name: string } | null>;
};

export const demoAuthAdapter: AuthAdapter = {
  id: "demo",
  async getUser() {
    return { email: "jordan@meridian-supply.com", name: "Jordan Hale" };
  },
};

export function getAuthAdapter(): AuthAdapter {
  if (process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    return { ...demoAuthAdapter, id: "clerk" };
  }
  if (process.env.AUTH0_SECRET) {
    return { ...demoAuthAdapter, id: "auth0" };
  }
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return { ...demoAuthAdapter, id: "supabase" };
  }
  return demoAuthAdapter;
}
