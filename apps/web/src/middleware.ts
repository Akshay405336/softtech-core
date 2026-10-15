import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_COOKIE_NAME } from "./lib/auth/adapter";

/**
 * Next.js Edge Middleware for Server-Side Route Protection
 *
 * NOTE ON SECURITY ARCHITECTURE:
 * ------------------------------
 * This middleware enforces server-side route boundary protection for all `/admin/*` routes.
 *
 * In production:
 * 1. The cookie value must contain a cryptographically signed JWT or opaque session ID.
 * 2. This middleware must verify the token signature (via jose or web crypto) against a shared secret or public key.
 * 3. Expired or revoked tokens must immediately invalidate the session and redirect to /admin/login.
 */
export function middleware(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get(AUTH_COOKIE_NAME);
  const isAuthenticated = Boolean(sessionCookie?.value);

  // 1. Protected Admin Routes (all /admin routes except /admin/login)
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!isAuthenticated) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 2. Prevent authenticated users from getting stuck on login page
  if (pathname === "/admin/login") {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
