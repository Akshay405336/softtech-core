"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

export interface AdminLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  sidebar: (props: {
    collapsed: boolean;
    onCollapsedChange: (collapsed: boolean) => void;
    mobileOpen: boolean;
    onMobileOpenChange: (open: boolean) => void;
  }) => React.ReactNode;
  header: (props: {
    collapsed: boolean;
    toggleCollapsed: () => void;
    mobileOpen: boolean;
    toggleMobileOpen: () => void;
  }) => React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  defaultCollapsed?: boolean;
}

export function AdminLayout({
  sidebar,
  header,
  footer,
  children,
  defaultCollapsed = false,
  className,
  ...props
}: AdminLayoutProps): React.JSX.Element {
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const toggleCollapsed = React.useCallback(() => {
    setCollapsed((prev) => !prev);
  }, []);

  const toggleMobileOpen = React.useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  return (
    <div
      className={cn(
        "min-h-screen flex bg-background text-foreground transition-colors duration-200 antialiased",
        className,
      )}
      {...props}
    >
      {/* Sidebar Slot */}
      {sidebar({
        collapsed,
        onCollapsedChange: setCollapsed,
        mobileOpen,
        onMobileOpenChange: setMobileOpen,
      })}

      {/* Main Content & Header Column */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Header Slot */}
        {header({
          collapsed,
          toggleCollapsed,
          mobileOpen,
          toggleMobileOpen,
        })}

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden flex flex-col">{children}</main>

        {/* Footer Slot */}
        {footer}
      </div>
    </div>
  );
}
