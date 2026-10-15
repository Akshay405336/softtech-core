"use client";

import Link from "next/link";
import {
  Badge,
  Button,
  CustomerFooter,
  CustomerHeader,
  CustomerLayout,
  Input,
  ThemeToggle,
} from "@softtech/ui";
import { Code2, Globe, Search, ShieldCheck } from "lucide-react";

export default function CustomerRouteLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <CustomerLayout
      header={
        <CustomerHeader
          brand={
            <Link
              href="/"
              className="flex items-center gap-2.5 font-bold tracking-tight text-lg text-foreground hover:opacity-90 transition-opacity"
            >
              <span className="size-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-black text-sm shadow-xs">
                S
              </span>
              <span>Softtech Core</span>
              <Badge variant="outline" className="hidden sm:inline-flex text-[10px] h-5 ml-1">
                Website
              </Badge>
            </Link>
          }
          navItems={[
            { label: "Showcase", href: "/#showcase" },
            { label: "Features", href: "/#features" },
            { label: "Pricing", href: "/pricing" },
            {
              label: "Admin Portal",
              href: "/admin",
              badge: (
                <Badge variant="secondary" className="text-[10px] h-4.5 px-1.5 font-mono">
                  SaaS
                </Badge>
              ),
            },
          ]}
          search={
            <div className="relative w-full">
              <Search
                className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                type="search"
                placeholder="Search components, docs..."
                className="pl-8 h-9 text-xs w-full bg-muted/40"
              />
            </div>
          }
          actions={
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button
                asChild
                variant="outline"
                size="sm"
                className="hidden sm:inline-flex text-xs h-9"
              >
                <a href="/admin">Dashboard</a>
              </Button>
              <Button asChild variant="default" size="sm" className="text-xs h-9">
                <a href="/admin/login">Admin Sign In</a>
              </Button>
            </div>
          }
          mobileActions={
            <div className="flex flex-col gap-2 pt-2">
              <div className="flex items-center justify-between py-1">
                <span className="text-xs text-muted-foreground">Appearance</span>
                <ThemeToggle />
              </div>
              <Button
                asChild
                variant="default"
                size="sm"
                className="w-full justify-center text-xs h-9"
              >
                <a href="/admin/login">Admin Sign In</a>
              </Button>
            </div>
          }
        />
      }
      footer={
        <CustomerFooter
          brand={
            <div className="flex items-center gap-2 font-bold tracking-tight text-base text-foreground">
              <span className="size-6 rounded-md bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs">
                S
              </span>
              <span>Softtech Core</span>
            </div>
          }
          description="A reusable software foundation for production-grade web applications, admin dashboards, and design systems built on Next.js 16 and React 19."
          contactInfo={
            <div className="flex flex-col gap-1 text-xs text-muted-foreground">
              <span className="font-medium text-foreground">Architecture Support</span>
              <span>Email: architecture@softtech.example</span>
              <span>Location: Softtech Engineering Workspace</span>
            </div>
          }
          linkGroups={[
            {
              title: "Foundation & System",
              links: [
                { label: "Design System Showcase", href: "/#showcase" },
                { label: "Data Table Engine", href: "/#section-data-table" },
                { label: "Form & Validation", href: "/#section-form" },
                { label: "File Upload System", href: "/#section-file-upload" },
              ],
            },
            {
              title: "Architecture",
              links: [
                { label: "Next.js 16 App Router", href: "https://nextjs.org", external: true },
                { label: "Tailwind CSS 4", href: "https://tailwindcss.com", external: true },
                { label: "React 19 & Turbopack", href: "https://react.dev", external: true },
                { label: "pnpm Workspaces", href: "https://pnpm.io", external: true },
              ],
            },
            {
              title: "Application Portals",
              links: [
                { label: "Customer Experience", href: "/" },
                { label: "Pricing & Plans", href: "/pricing" },
                { label: "Admin Dashboard", href: "/admin" },
                { label: "Admin Sign In", href: "/admin/login" },
              ],
            },
          ]}
          copyright={<span>© 2026 Softtech Core Foundation. All rights reserved.</span>}
          socialLinks={[
            { label: "Repository", href: "https://github.com", icon: Code2 },
            { label: "Website", href: "https://softtech.example", icon: Globe },
            { label: "Security", href: "/admin/login", icon: ShieldCheck },
          ]}
        />
      }
    >
      {children}
    </CustomerLayout>
  );
}
