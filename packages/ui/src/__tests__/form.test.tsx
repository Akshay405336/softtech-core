import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormSection,
  FormActions,
  FormErrorSummary,
  useForm,
  zodResolver,
} from "../components/form";
import { Input } from "../components/input";
import { PasswordInput } from "../components/password-input";
import { RadioGroup, RadioGroupItem } from "../components/radio-group";
import { Button } from "../components/button";

describe("PasswordInput component", () => {
  it("toggles password visibility between password and text", () => {
    render(<PasswordInput placeholder="Enter your secret" data-testid="pwd-input" />);
    const input = screen.getByTestId("pwd-input") as HTMLInputElement;
    const toggleButton = screen.getByRole("button", { name: "Show password" });

    expect(input.type).toBe("password");

    // Click toggle to show password
    fireEvent.click(toggleButton);
    expect(input.type).toBe("text");
    expect(screen.getByRole("button", { name: "Hide password" })).toBeDefined();

    // Click toggle again to hide password
    fireEvent.click(screen.getByRole("button", { name: "Hide password" }));
    expect(input.type).toBe("password");
  });

  it("applies error styling and aria-invalid when error is true", () => {
    render(<PasswordInput error placeholder="Password" data-testid="pwd-error" />);
    const input = screen.getByTestId("pwd-error");
    expect(input.getAttribute("aria-invalid")).toBe("true");
    expect(input.className).toContain("border-destructive");
  });
});

describe("RadioGroup component", () => {
  it("renders radio group items and updates value on selection", () => {
    const handleChange = vi.fn();

    render(
      <RadioGroup defaultValue="admin" onValueChange={handleChange} aria-label="Role">
        <label htmlFor="r1">
          <RadioGroupItem value="user" id="r1" /> User
        </label>
        <label htmlFor="r2">
          <RadioGroupItem value="admin" id="r2" /> Admin
        </label>
      </RadioGroup>,
    );

    const radiogroup = screen.getByRole("radiogroup", { name: "Role" });
    expect(radiogroup).toBeDefined();

    const userRadio = screen.getByRole("radio", { name: "User" });
    const adminRadio = screen.getByRole("radio", { name: "Admin" });

    expect(adminRadio.getAttribute("data-state")).toBe("checked");
    expect(userRadio.getAttribute("data-state")).toBe("unchecked");

    fireEvent.click(userRadio);
    expect(handleChange).toHaveBeenCalledWith("user");
  });
});

describe("Form and FormField integration", () => {
  const testSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  type TestFormValues = z.infer<typeof testSchema>;

  function TestForm({
    onSubmit,
    serverError,
  }: {
    onSubmit: (values: TestFormValues) => void;
    serverError?: string;
  }) {
    const form = useForm<TestFormValues>({
      resolver: zodResolver(testSchema),
      defaultValues: {
        username: "",
        email: "",
        password: "",
      },
    });

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormErrorSummary message={serverError} errors={form.formState.errors} />

          <FormSection title="Account Setup" description="Enter your credentials">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter username" {...field} />
                  </FormControl>
                  <FormDescription>Your unique handle.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="name@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="Enter secret password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormSection>

          <FormActions align="end">
            <Button type="button" variant="outline" onClick={() => form.reset()}>
              Reset
            </Button>
            <Button type="submit" loading={form.formState.isSubmitting}>
              Submit
            </Button>
          </FormActions>
        </form>
      </Form>
    );
  }

  it("renders form elements with proper descriptions, labels and asterisks", () => {
    render(<TestForm onSubmit={vi.fn()} />);

    expect(screen.getByText("Account Setup")).toBeDefined();
    expect(screen.getByText("Enter your credentials")).toBeDefined();
    expect(screen.getByText("Your unique handle.")).toBeDefined();

    const usernameInput = screen.getByPlaceholderText("Enter username");
    expect(usernameInput.getAttribute("aria-describedby")).toContain("description");
  });

  it("displays validation errors on invalid submission", async () => {
    const handleSubmit = vi.fn();
    render(<TestForm onSubmit={handleSubmit} />);

    const submitBtn = screen.getByRole("button", { name: "Submit" });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(
        screen.getAllByText("Username must be at least 3 characters").length,
      ).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText("Invalid email address").length).toBeGreaterThanOrEqual(1);
      expect(
        screen.getAllByText("Password must be at least 6 characters").length,
      ).toBeGreaterThanOrEqual(1);
    });

    expect(handleSubmit).not.toHaveBeenCalled();

    // Verify aria-invalid on input
    const usernameInput = screen.getByPlaceholderText("Enter username");
    expect(usernameInput.getAttribute("aria-invalid")).toBe("true");
  });

  it("submits valid values successfully", async () => {
    const handleSubmit = vi.fn();
    render(<TestForm onSubmit={handleSubmit} />);

    fireEvent.change(screen.getByPlaceholderText("Enter username"), {
      target: { value: "alexsmith" },
    });
    fireEvent.change(screen.getByPlaceholderText("name@example.com"), {
      target: { value: "alex@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter secret password"), {
      target: { value: "secret123" },
    });

    const submitBtn = screen.getByRole("button", { name: "Submit" });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);
      expect(handleSubmit).toHaveBeenCalledWith(
        {
          username: "alexsmith",
          email: "alex@example.com",
          password: "secret123",
        },
        expect.anything(),
      );
    });
  });

  it("renders FormErrorSummary with server error alert", () => {
    render(<TestForm onSubmit={vi.fn()} serverError="Database connection timeout" />);

    expect(screen.getByRole("alert")).toBeDefined();
    expect(screen.getByText("Database connection timeout")).toBeDefined();
  });
});
