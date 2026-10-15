"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  PasswordInput,
  Spinner,
  toast,
} from "@softtech/ui";
import { AlertCircle, Info, Lock } from "lucide-react";
import { demoAuthAdapter } from "../../../../lib/auth/adapter";

const loginSchema = z.object({
  email: z.string().min(1, "Email address is required").email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function AdminLoginPage(): React.JSX.Element {
  const router = useRouter();
  const [authError, setAuthError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "admin@softtech.io",
      password: "admin123",
      rememberMe: true,
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setAuthError(null);
    setIsSubmitting(true);

    try {
      const result = await demoAuthAdapter.login(values);

      if (!result.success) {
        setAuthError(result.error || "Authentication failed. Please verify your credentials.");
        toast.error("Sign in failed", {
          description: result.error,
        });
        return;
      }

      toast.success("Welcome back!", {
        description: `Authenticated as ${result.user?.name} (${result.user?.role})`,
      });

      // Redirect to the protected dashboard
      router.push("/admin");
    } catch {
      setAuthError("An unexpected network or service error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Brand Header */}
      <div className="text-center space-y-2">
        <div className="mx-auto size-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-black text-xl shadow-md">
          S
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Softtech Core Administration
        </h1>
        <p className="text-xs text-muted-foreground">
          Enter your administrative credentials to access the SaaS management console.
        </p>
      </div>

      {/* Authentication Card */}
      <Card className="shadow-lg border-border">
        <CardHeader className="space-y-1 pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Sign In</CardTitle>
            <Badge variant="outline" className="text-[10px] font-mono">
              Protected Area
            </Badge>
          </div>
          <CardDescription className="text-xs">
            Authenticate using your verified administrative identity.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Demo Callout Alert */}
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 text-xs space-y-1.5 text-foreground">
            <div className="flex items-center gap-1.5 font-medium text-primary">
              <Info className="size-4 shrink-0" aria-hidden="true" />
              <span>Demonstration Credentials Pre-filled</span>
            </div>
            <p className="text-muted-foreground text-[11px] leading-relaxed">
              Email:{" "}
              <code className="font-mono text-foreground font-semibold">admin@softtech.io</code>
              <br />
              Password: <code className="font-mono text-foreground font-semibold">admin123</code>
            </p>
          </div>

          {/* Error Message */}
          {authError && (
            <Alert variant="destructive" className="py-2.5">
              <AlertCircle className="size-4" aria-hidden="true" />
              <AlertTitle className="text-xs font-semibold">Authentication Error</AlertTitle>
              <AlertDescription className="text-xs">{authError}</AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-medium">Administrator Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="admin@softtech.io"
                        autoComplete="email"
                        disabled={isSubmitting}
                        className="h-9 text-xs"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[11px]" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-xs font-medium">Password</FormLabel>
                      <button
                        type="button"
                        onClick={() =>
                          toast.info("Password Recovery", {
                            description:
                              "In production, this triggers an enterprise password reset flow.",
                          })
                        }
                        className="text-[11px] text-primary hover:underline"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <FormControl>
                      <PasswordInput
                        placeholder="••••••••"
                        autoComplete="current-password"
                        disabled={isSubmitting}
                        className="h-9 text-xs"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[11px]" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2 space-y-0 pt-1">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormLabel className="text-xs font-normal text-muted-foreground cursor-pointer">
                      Remember this workstation for 30 days
                    </FormLabel>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full h-9 text-xs font-medium mt-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Spinner size="sm" className="mr-2" />
                    Authenticating Session...
                  </>
                ) : (
                  <>
                    <Lock className="size-3.5 mr-1.5" aria-hidden="true" />
                    Sign In to Admin Console
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="pt-2 pb-4 text-center justify-center border-t border-border/60">
          <p className="text-[11px] text-muted-foreground">
            Architecture boundary: server-side token validation required for production.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
