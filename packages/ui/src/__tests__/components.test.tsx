import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { Badge } from "../components/badge";
import { Card, CardHeader, CardTitle, CardContent } from "../components/card";
import { Alert, AlertTitle, AlertDescription } from "../components/alert";
import { Switch } from "../components/switch";

describe("Button component", () => {
  it("renders with text content and handles click events", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);

    const button = screen.getByRole("button", { name: "Click Me" });
    expect(button).toBeDefined();

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("handles loading state correctly by disabling button and showing status", () => {
    render(<Button loading>Processing</Button>);

    const button = screen.getByRole("button", { name: /processing/i });
    expect(button.getAttribute("disabled")).not.toBeNull();

    expect(button.getAttribute("aria-busy")).toBe("true");

    const spinner = screen.getByRole("status");
    expect(spinner).toBeDefined();
    expect(spinner.getAttribute("aria-label")).toBe("Loading");
  });

  it("handles disabled state without invoking click handler", () => {
    const handleClick = vi.fn();
    render(
      <Button disabled onClick={handleClick}>
        Disabled Action
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Disabled Action" });
    expect(button.getAttribute("disabled")).not.toBeNull();

    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });
});

describe("Input component", () => {
  it("renders input field and accepts user text", () => {
    render(<Input placeholder="Enter email" />);
    const input = screen.getByPlaceholderText("Enter email") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "test@example.com" } });
    expect(input.value).toBe("test@example.com");
  });

  it("sets aria-invalid attribute when error prop is true", () => {
    render(<Input error placeholder="Error field" />);
    const input = screen.getByPlaceholderText("Error field");
    expect(input.getAttribute("aria-invalid")).toBe("true");
  });
});

describe("Badge component", () => {
  it("renders with semantic status variant", () => {
    render(<Badge variant="success">Verified</Badge>);
    const badge = screen.getByText("Verified");
    expect(badge).toBeDefined();
    expect(badge.className).toContain("bg-success");
  });
});

describe("Card component", () => {
  it("renders card structure with header, title, and content", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>System Stats</CardTitle>
        </CardHeader>
        <CardContent>All systems operational.</CardContent>
      </Card>,
    );

    expect(screen.getByText("System Stats")).toBeDefined();
    expect(screen.getByText("All systems operational.")).toBeDefined();
  });
});

describe("Alert component", () => {
  it("renders with role='alert' and semantic title/description", () => {
    render(
      <Alert variant="destructive">
        <AlertTitle>Error Detected</AlertTitle>
        <AlertDescription>Configuration failed to resolve.</AlertDescription>
      </Alert>,
    );

    const alert = screen.getByRole("alert");
    expect(alert).toBeDefined();
    expect(screen.getByText("Error Detected")).toBeDefined();
    expect(screen.getByText("Configuration failed to resolve.")).toBeDefined();
  });
});

describe("Switch component", () => {
  it("renders with role='switch' and toggles state", () => {
    const handleToggle = vi.fn();
    render(<Switch aria-label="Dark Mode" onCheckedChange={handleToggle} />);

    const toggle = screen.getByRole("switch", { name: "Dark Mode" });
    expect(toggle).toBeDefined();

    fireEvent.click(toggle);
    expect(handleToggle).toHaveBeenCalledTimes(1);
  });
});
