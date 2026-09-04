import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ONBOARDING_COOKIE, SESSION_COOKIE } from "@/lib/auth-cookies";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get(SESSION_COOKIE)?.value;
  const onboarded = request.cookies.get(ONBOARDING_COOKIE)?.value;

  if (pathname.startsWith("/dashboard")) {
    if (!session) {
      const login = new URL("/login", request.url);
      login.searchParams.set("next", pathname);
      return NextResponse.redirect(login);
    }
    if (!onboarded) {
      return NextResponse.redirect(new URL("/onboarding", request.url));
    }
  }

  if (pathname.startsWith("/onboarding") && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if ((pathname === "/login" || pathname === "/signup") && session) {
    return NextResponse.redirect(new URL(onboarded ? "/dashboard" : "/onboarding", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/onboarding", "/login", "/signup"],
};
