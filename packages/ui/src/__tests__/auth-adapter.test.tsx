import { describe, expect, it } from "vitest";
import { createMockAuthAdapter, DEFAULT_DEMO_USER } from "../index";

describe("Authentication Adapter Integration Boundary", () => {
  it("initializes with no active session", async () => {
    const adapter = createMockAuthAdapter();
    const session = await adapter.getSession();
    expect(session).toBeNull();
  });

  it("authenticates valid demo credentials successfully", async () => {
    const adapter = createMockAuthAdapter();
    const result = await adapter.login({
      email: "admin@softtech.io",
      password: "admin123",
      rememberMe: true,
    });

    expect(result.success).toBe(true);
    expect(result.user).toBeDefined();
    expect(result.user?.email).toBe("admin@softtech.io");
    expect(result.user?.role).toBe(DEFAULT_DEMO_USER.role);

    const session = await adapter.getSession();
    expect(session).toEqual(result.user);
  });

  it("authenticates any valid @softtech.io email address", async () => {
    const adapter = createMockAuthAdapter();
    const result = await adapter.login({
      email: "engineer@softtech.io",
      password: "admin123",
    });

    expect(result.success).toBe(true);
    expect(result.user?.email).toBe("engineer@softtech.io");
  });

  it("rejects invalid password with structured error", async () => {
    const adapter = createMockAuthAdapter();
    const result = await adapter.login({
      email: "admin@softtech.io",
      password: "wrongpassword",
    });

    expect(result.success).toBe(false);
    expect(result.user).toBeUndefined();
    expect(result.error).toContain("Invalid email or password");

    const session = await adapter.getSession();
    expect(session).toBeNull();
  });

  it("rejects unauthorized email domain", async () => {
    const adapter = createMockAuthAdapter();
    const result = await adapter.login({
      email: "hacker@external.com",
      password: "admin123",
    });

    expect(result.success).toBe(false);
    expect(result.error).toContain("Invalid email or password");
  });

  it("clears session on logout", async () => {
    const adapter = createMockAuthAdapter();
    await adapter.login({
      email: "admin@softtech.io",
      password: "admin123",
    });

    let session = await adapter.getSession();
    expect(session).not.toBeNull();

    await adapter.logout();
    session = await adapter.getSession();
    expect(session).toBeNull();
  });

  it("supports custom mock configuration", async () => {
    const customUser = {
      id: "usr_custom",
      name: "Custom Lead",
      email: "lead@custom.io",
      role: "Lead Architect",
    };

    const adapter = createMockAuthAdapter({
      demoUser: customUser,
      validPassword: "secret-key-123",
    });

    const failed = await adapter.login({
      email: "lead@custom.io",
      password: "admin123",
    });
    expect(failed.success).toBe(false);

    const passed = await adapter.login({
      email: "lead@custom.io",
      password: "secret-key-123",
    });
    expect(passed.success).toBe(true);
    expect(passed.user?.role).toBe("Lead Architect");
  });
});
