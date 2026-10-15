/**
 * Reusable Authentication Interface & Adapter Contract
 */

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthResult {
  success: boolean;
  user?: User;
  error?: string;
}

export interface AuthAdapter {
  getSession(): Promise<User | null>;
  login(credentials: LoginCredentials): Promise<AuthResult>;
  logout(): Promise<void>;
}

export interface MockAuthAdapterOptions {
  demoUser?: User;
  validPassword?: string;
  simulateLatencyMs?: number;
}

export const DEFAULT_DEMO_USER: User = {
  id: "usr_admin_001",
  name: "Sarah Connor",
  email: "admin@softtech.io",
  role: "System Administrator",
};

/**
 * Creates an in-memory or cookie-backed mock authentication adapter for testing and architecture demonstration.
 */
export function createMockAuthAdapter(options: MockAuthAdapterOptions = {}): AuthAdapter {
  const demoUser = options.demoUser ?? DEFAULT_DEMO_USER;
  const validPassword = options.validPassword ?? "admin123";
  let activeUser: User | null = null;

  return {
    async getSession(): Promise<User | null> {
      if (options.simulateLatencyMs) {
        await new Promise((r) => setTimeout(r, options.simulateLatencyMs));
      }
      return activeUser;
    },

    async login(credentials: LoginCredentials): Promise<AuthResult> {
      if (options.simulateLatencyMs) {
        await new Promise((r) => setTimeout(r, options.simulateLatencyMs));
      }

      const email = credentials.email.trim().toLowerCase();
      const isEmailValid = email === demoUser.email || email.endsWith("@softtech.io");
      const isPasswordValid = credentials.password === validPassword;

      if (!isEmailValid || !isPasswordValid) {
        return {
          success: false,
          error: "Invalid email or password. Use demo credentials (admin@softtech.io / admin123).",
        };
      }

      activeUser = {
        ...demoUser,
        email,
      };

      return {
        success: true,
        user: activeUser,
      };
    },

    async logout(): Promise<void> {
      if (options.simulateLatencyMs) {
        await new Promise((r) => setTimeout(r, options.simulateLatencyMs));
      }
      activeUser = null;
    },
  };
}
