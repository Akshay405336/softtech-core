import * as React from "react";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  PageContainer,
} from "@softtech/ui";
import { Check, Sparkles } from "lucide-react";

export default function PricingPage(): React.JSX.Element {
  const plans = [
    {
      name: "Starter Foundation",
      price: "$0",
      period: "forever open source",
      description: "Everything you need to build customer websites and monorepos.",
      features: [
        "Core React 19 UI component library",
        "Tailwind CSS 4 token integration",
        "Responsive Customer Layout",
        "TypeScript strict typing configs",
        "Vitest unit test infrastructure",
      ],
      buttonLabel: "Get Started Free",
      buttonVariant: "outline" as const,
      highlighted: false,
    },
    {
      name: "Enterprise SaaS",
      price: "$99",
      period: "per workspace / month",
      description: "Complete administration suite with protected layouts and analytics.",
      features: [
        "Everything in Starter Foundation",
        "Collapsible Admin Dashboard Shell",
        "Edge Middleware route protection",
        "Enterprise Data Table with faceted filters",
        "Zod + React Hook Form validation suite",
        "File upload & media gallery manager",
      ],
      buttonLabel: "Access Admin Demo",
      buttonVariant: "default" as const,
      highlighted: true,
      badge: "Recommended",
    },
    {
      name: "Custom Enterprise",
      price: "Custom",
      period: "tailored architecture",
      description:
        "Dedicated architecture engineering, custom security, and multi-tenant adapters.",
      features: [
        "Everything in Enterprise SaaS",
        "Custom OAuth2 / SSO adapter integration",
        "Multi-database schema orchestration",
        "SLA & priority monorepo support",
        "Audit logging & compliance pipelines",
      ],
      buttonLabel: "Contact Architecture Team",
      buttonVariant: "outline" as const,
      highlighted: false,
    },
  ];

  return (
    <PageContainer maxWidth="7xl" className="py-12 space-y-12">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <Badge variant="secondary" className="px-3 py-1 text-xs">
          Demonstration Page
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Flexible Architecture Plans
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Demonstrating how customer pages automatically inherit the customer website layout,
          header, footer, and styling across the Softtech Core workspace.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`flex flex-col justify-between relative ${
              plan.highlighted ? "border-primary shadow-lg ring-1 ring-primary/20" : ""
            }`}
          >
            {plan.badge && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge variant="default" className="text-xs px-3 py-0.5 shadow-sm">
                  <Sparkles className="size-3 mr-1" aria-hidden="true" />
                  {plan.badge}
                </Badge>
              </div>
            )}
            <CardHeader className="space-y-2">
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="pt-2">
                <span className="text-3xl font-extrabold text-foreground">{plan.price}</span>
                <span className="text-xs text-muted-foreground ml-2">/ {plan.period}</span>
              </div>
            </CardHeader>

            <CardContent className="flex-1 space-y-3 pt-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Included Features
              </div>
              <ul className="space-y-2.5 text-xs text-muted-foreground">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="size-4 text-emerald-500 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter className="pt-4 border-t border-border">
              <Button asChild variant={plan.buttonVariant} className="w-full">
                <a href={plan.highlighted ? "/admin" : "/"}>{plan.buttonLabel}</a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
}
