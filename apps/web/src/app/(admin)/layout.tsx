"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  AdminFooter,
  AdminHeader,
  AdminLayout,
  AdminSidebar,
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Input,
  ThemeToggle,
  toast,
} from "@softtech/ui";
import {
  AlertTriangle,
  BarChart3,
  Bell,
  BookOpen,
  CheckCircle2,
  FileUp,
  FolderKanban,
  History,
  LayoutDashboard,
  Search,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";
import { DEMO_ADMIN_USER, demoAuthAdapter } from "../../lib/auth/adapter";

export default function AuthenticatedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await demoAuthAdapter.logout();
    toast.info("Signed out", {
      description: "Administrative session terminated successfully.",
    });
    router.push("/admin/login");
  };

  const navGroups = [
    {
      title: "Overview",
      items: [
        {
          title: "Dashboard",
          href: "/admin",
          icon: LayoutDashboard,
          active: pathname === "/admin",
        },
        {
          title: "Analytics",
          href: "/admin",
          icon: BarChart3,
          badge: (
            <Badge variant="outline" className="text-[10px] h-4">
              Mock
            </Badge>
          ),
          active: false,
        },
      ],
    },
    {
      title: "Core Directory",
      items: [
        {
          title: "Students",
          href: "/admin/students",
          icon: Users,
          active: pathname === "/admin/students",
          badge: <span className="text-[10px] font-mono text-muted-foreground">1.4k</span>,
        },
        {
          title: "Courses",
          href: "/admin",
          icon: BookOpen,
          active: false,
        },
        {
          title: "Batches",
          href: "/admin",
          icon: FolderKanban,
          active: false,
        },
      ],
    },
    {
      title: "Media & Assets",
      items: [
        {
          title: "Storage & Uploads",
          href: "/#section-file-upload",
          icon: FileUp,
          active: false,
        },
      ],
    },
    {
      title: "Administration",
      items: [
        {
          title: "Audit Logs",
          href: "/admin",
          icon: History,
          active: false,
        },
        {
          title: "System Settings",
          href: "/admin",
          icon: Settings,
          active: false,
        },
      ],
    },
  ];

  return (
    <AdminLayout
      sidebar={({ collapsed, onCollapsedChange, mobileOpen, onMobileOpenChange }) => (
        <AdminSidebar
          groups={navGroups}
          brand={
            <a
              href="/admin"
              className="flex items-center gap-2.5 font-bold tracking-tight text-foreground"
            >
              <span className="size-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-black text-sm shrink-0">
                S
              </span>
              {!collapsed && (
                <div className="flex flex-col truncate text-left">
                  <span className="text-sm font-semibold leading-none">Softtech Core</span>
                  <span className="text-[10px] font-mono text-muted-foreground mt-0.5">
                    Admin Workspace
                  </span>
                </div>
              )}
            </a>
          }
          collapsed={collapsed}
          onCollapsedChange={onCollapsedChange}
          mobileOpen={mobileOpen}
          onMobileOpenChange={onMobileOpenChange}
          footer={
            <div className="text-xs text-muted-foreground flex items-center justify-between">
              {!collapsed ? (
                <>
                  <div className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Edge Protected</span>
                  </div>
                  <Link href="/" className="text-primary hover:underline text-[11px]">
                    Site →
                  </Link>
                </>
              ) : (
                <span className="size-2 rounded-full bg-emerald-500 mx-auto" title="Protected" />
              )}
            </div>
          }
        />
      )}
      header={({ toggleCollapsed, toggleMobileOpen }) => (
        <AdminHeader
          brand={
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm tracking-tight text-foreground hidden sm:inline">
                Administration Portal
              </span>
              <Badge
                variant="secondary"
                className="text-[10px] h-5 hidden md:inline-flex font-mono"
              >
                v0.1.0-preview
              </Badge>
            </div>
          }
          onToggleDesktopSidebar={toggleCollapsed}
          onToggleMobileSidebar={toggleMobileOpen}
          search={
            <div className="relative w-full">
              <Search
                className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                type="search"
                placeholder="Search students, courses, settings (⌘K)..."
                className="pl-8 h-9 text-xs w-full bg-muted/40"
              />
              <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded border border-border bg-muted px-1.5 text-[10px] font-mono text-muted-foreground pointer-events-none">
                ⌘K
              </kbd>
            </div>
          }
          notifications={
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative size-9 p-0 text-muted-foreground hover:text-foreground"
                >
                  <Bell className="size-4" aria-hidden="true" />
                  <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-primary" />
                  <span className="sr-only">Notifications</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="font-semibold text-xs flex items-center justify-between">
                  <span>System Notifications</span>
                  <Badge variant="outline" className="text-[10px] h-4">
                    2 New
                  </Badge>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex flex-col items-start gap-1 p-2.5 cursor-pointer">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-foreground">
                    <CheckCircle2 className="size-3.5 text-emerald-500" />
                    <span>Batch 2026-Q1 enrolled</span>
                  </div>
                  <span className="text-[11px] text-muted-foreground">
                    42 students successfully enrolled via bulk CSV.
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start gap-1 p-2.5 cursor-pointer">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-foreground">
                    <ShieldCheck className="size-3.5 text-primary" />
                    <span>Middleware check passed</span>
                  </div>
                  <span className="text-[11px] text-muted-foreground">
                    Admin edge route session verified.
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          }
          themeToggle={<ThemeToggle />}
          user={DEMO_ADMIN_USER}
          onLogout={handleLogout}
        />
      )}
      footer={
        <AdminFooter
          copyright={<span>© 2026 Softtech Core Enterprise Administration</span>}
          version="v0.1.0-architecture"
          links={[
            { label: "Public Website", href: "/" },
            { label: "Showcase", href: "/#showcase" },
            { label: "Pricing", href: "/pricing" },
          ]}
        />
      }
    >
      {/* Security Architecture Demo Alert */}
      <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 sm:px-6 py-2 text-xs text-amber-800 dark:text-amber-300 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <AlertTriangle
            className="size-4 shrink-0 text-amber-600 dark:text-amber-400"
            aria-hidden="true"
          />
          <span>
            <strong>Architecture Integration Notice:</strong> Admin routes are protected by Next.js
            Edge Middleware and the AuthAdapter contract. In production, configure cryptographic
            server authorization in{" "}
            <code className="font-mono text-xs">src/lib/auth/adapter.ts</code>.
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="text-xs h-7 px-2 hover:bg-amber-500/20 text-amber-900 dark:text-amber-200"
        >
          Sign Out
        </Button>
      </div>

      {children}
    </AdminLayout>
  );
}
