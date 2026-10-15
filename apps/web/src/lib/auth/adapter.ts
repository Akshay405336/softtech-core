/**
 * SOFTTECH CORE AUTHENTICATION ADAPTER BOUNDARY
 *
 * IMPORTANT SECURITY AND ARCHITECTURE NOTICE:
 * --------------------------------------------
 * This module defines the integration contract (`AuthAdapter`) that any production
 * authentication provider must implement for Softtech Core.
 *
 * Current Status: DEMONSTRATION & INTEGRATION BOUNDARY ONLY.
 * - This repository does not yet include a production database, JWT signing secret, or OAuth provider.
 * - For development and demonstration purposes, this adapter manages a standard HTTP session cookie
 *   (`softtech_admin_session`) so that Next.js middleware and route redirects behave realistically.
 * - NEVER consider this application production-secured without:
 *     1. Connecting a certified identity provider (e.g., Auth.js/NextAuth, Supabase, Clerk, AWS Cognito, or custom OAuth2).
 *     2. Implementing cryptographically signed session tokens (HMAC-SHA256, RSA, or Ed25519).
 *     3. Enforcing server-side authorization checks on all protected API routes and Server Actions.
 *     4. Protecting against CSRF, brute-force attacks, and session fixation.
 */

import type { AuthAdapter, AuthResult, LoginCredentials, User } from "./types";

export const AUTH_COOKIE_NAME = "softtech_admin_session";

export const DEMO_ADMIN_USER: User = {
  id: "usr_admin_001",
  name: "Sarah Connor",
  email: "admin@softtech.io",
  role: "System Administrator",
};

/**
 * Client-safe helper to parse cookies from document.cookie
 */
function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(^|;\\s*)(${name})=([^;]*)`));
  return match && match[3] ? decodeURIComponent(match[3]) : null;
}

/**
 * Client-safe helper to set a cookie
 */
function setCookie(name: string, value: string, days = 7): void {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

/**
 * Client-safe helper to delete a cookie
 */
function deleteCookie(name: string): void {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
}

/**
 * Demonstration Auth Adapter implementing the AuthAdapter interface.
 */
export const demoAuthAdapter: AuthAdapter = {
  async getSession(): Promise<User | null> {
    const sessionCookie = getCookie(AUTH_COOKIE_NAME);
    if (!sessionCookie) return null;

    try {
      const parsed = JSON.parse(sessionCookie) as User;
      return parsed.email ? parsed : DEMO_ADMIN_USER;
    } catch {
      return DEMO_ADMIN_USER;
    }
  },

  async login(credentials: LoginCredentials): Promise<AuthResult> {
    // Artificial latency to simulate real network authorization
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Accepted demo credentials: admin@softtech.io with admin123
    // Alternatively, any @softtech.io address with 'admin123'
    const isEmailValid =
      credentials.email.trim().toLowerCase() === DEMO_ADMIN_USER.email ||
      credentials.email.trim().toLowerCase().endsWith("@softtech.io");

    const isPasswordValid = credentials.password === "admin123";

    if (!isEmailValid || !isPasswordValid) {
      return {
        success: false,
        error:
          "Invalid email or password. For this demonstration, use admin@softtech.io and password admin123.",
      };
    }

    const authenticatedUser: User = {
      ...DEMO_ADMIN_USER,
      email: credentials.email.trim().toLowerCase(),
    };

    setCookie(AUTH_COOKIE_NAME, JSON.stringify(authenticatedUser), credentials.rememberMe ? 30 : 1);

    return {
      success: true,
      user: authenticatedUser,
    };
  },

  async logout(): Promise<void> {
    deleteCookie(AUTH_COOKIE_NAME);
  },
};
