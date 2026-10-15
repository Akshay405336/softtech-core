"use client";

import * as React from "react";
import { ChevronDown, ChevronRight, X } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../tooltip";
import type { AdminNavGroup, AdminNavItem } from "./types";

export interface AdminSidebarProps extends React.HTMLAttributes<HTMLElement> {
  groups: AdminNavGroup[];
  brand?: React.ReactNode;
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  mobileOpen?: boolean;
  onMobileOpenChange?: (open: boolean) => void;
  footer?: React.ReactNode;
}

export function AdminSidebar({
  groups,
  brand,
  collapsed = false,
  onCollapsedChange,
  mobileOpen = false,
  onMobileOpenChange,
  footer,
  className,
  ...props
}: AdminSidebarProps): React.JSX.Element {
  // Track open state of nested submenus
  const [openSubmenus, setOpenSubmenus] = React.useState<Record<string, boolean>>({});

  const toggleSubmenu = (title: string) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const renderNavItem = (item: AdminNavItem, isCollapsedMode: boolean) => {
    const Icon = item.icon;
    const hasChildren = item.children && item.children.length > 0;
    const isSubmenuOpen = !!openSubmenus[item.title];

    // Collapsed Mode (Icon only with Tooltip)
    if (isCollapsedMode) {
      return (
        <Tooltip key={item.title} delayDuration={100}>
          <TooltipTrigger asChild>
            <a
              href={item.href}
              className={cn(
                "flex size-10 items-center justify-center rounded-lg text-muted-foreground transition-colors mx-auto",
                "hover:bg-accent hover:text-accent-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                item.active && "bg-primary/10 text-primary font-medium hover:bg-primary/15",
              )}
              aria-current={item.active ? "page" : undefined}
              aria-label={item.title}
            >
              {Icon && <Icon className="size-5 shrink-0" aria-hidden="true" />}
            </a>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={12} className="flex items-center gap-2">
            <span>{item.title}</span>
            {item.badge && <span className="text-xs">{item.badge}</span>}
          </TooltipContent>
        </Tooltip>
      );
    }

    // Expanded Mode
    return (
      <div key={item.title} className="space-y-1">
        {hasChildren ? (
          <button
            type="button"
            onClick={() => toggleSubmenu(item.title)}
            className={cn(
              "flex w-full items-center justify-between gap-3 px-3 py-2 text-sm font-medium rounded-lg text-muted-foreground transition-colors text-left",
              "hover:bg-muted hover:text-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              (item.active || isSubmenuOpen) && "text-foreground",
            )}
            aria-expanded={isSubmenuOpen}
          >
            <div className="flex items-center gap-3 truncate">
              {Icon && (
                <Icon className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
              )}
              <span className="truncate">{item.title}</span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              {item.badge}
              {isSubmenuOpen ? (
                <ChevronDown className="size-3.5 text-muted-foreground" aria-hidden="true" />
              ) : (
                <ChevronRight className="size-3.5 text-muted-foreground" aria-hidden="true" />
              )}
            </div>
          </button>
        ) : (
          <a
            href={item.href}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noopener noreferrer" : undefined}
            className={cn(
              "flex items-center justify-between gap-3 px-3 py-2 text-sm font-medium rounded-lg text-muted-foreground transition-colors",
              "hover:bg-muted hover:text-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              item.active &&
                "bg-primary/10 text-primary font-medium hover:bg-primary/15 hover:text-primary",
            )}
            aria-current={item.active ? "page" : undefined}
          >
            <div className="flex items-center gap-3 truncate">
              {Icon && (
                <Icon
                  className={cn(
                    "size-4 shrink-0",
                    item.active ? "text-primary" : "text-muted-foreground",
                  )}
                  aria-hidden="true"
                />
              )}
              <span className="truncate">{item.title}</span>
            </div>
            {item.badge && <div className="shrink-0">{item.badge}</div>}
          </a>
        )}

        {/* Submenu Items */}
        {hasChildren && isSubmenuOpen && (
          <div className="ml-7 space-y-1 border-l border-border pl-2 pt-1">
            {item.children?.map((subItem) => (
              <a
                key={subItem.title}
                href={subItem.href}
                className={cn(
                  "flex items-center justify-between px-2.5 py-1.5 text-xs font-medium rounded-md text-muted-foreground transition-colors",
                  "hover:bg-muted hover:text-foreground",
                  subItem.active && "bg-primary/10 text-primary font-medium",
                )}
                aria-current={subItem.active ? "page" : undefined}
              >
                <span className="truncate">{subItem.title}</span>
                {subItem.badge && <div className="shrink-0">{subItem.badge}</div>}
              </a>
            ))}
          </div>
        )}
      </div>
    );
  };

  const sidebarContent = (isCollapsedMode: boolean) => (
    <div className="flex h-full flex-col justify-between overflow-y-auto overflow-x-hidden p-3">
      <div className="space-y-6">
        {brand && (
          <div
            className={cn(
              "flex items-center px-1 py-2",
              isCollapsedMode ? "justify-center" : "justify-between",
            )}
          >
            {brand}
          </div>
        )}

        <nav aria-label="Admin Navigation" className="space-y-6">
          {groups.map((group, groupIdx) => (
            <div key={group.title || `group-${groupIdx}`} className="space-y-1.5">
              {!isCollapsedMode && group.title && (
                <h4 className="px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
                  {group.title}
                </h4>
              )}
              {isCollapsedMode && groupIdx > 0 && (
                <div className="my-2 border-t border-border mx-2" />
              )}
              <div className="space-y-1">
                {group.items.map((item) => renderNavItem(item, isCollapsedMode))}
              </div>
            </div>
          ))}
        </nav>
      </div>

      <div className="mt-auto space-y-2">
        {onCollapsedChange && (
          <div className="pt-2 border-t border-border">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className={cn(
                "w-full text-muted-foreground hover:text-foreground text-xs",
                isCollapsedMode ? "justify-center p-0 h-9" : "justify-start px-2 h-9",
              )}
              onClick={() => onCollapsedChange(!collapsed)}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsedMode ? (
                <ChevronRight className="size-4" aria-hidden="true" />
              ) : (
                <>
                  <ChevronDown className="size-4 -rotate-90 mr-2" aria-hidden="true" />
                  <span>Collapse Sidebar</span>
                </>
              )}
            </Button>
          </div>
        )}
        {footer && <div className="pt-2 border-t border-border">{footer}</div>}
      </div>
    </div>
  );

  return (
    <TooltipProvider>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col border-r border-border bg-card text-card-foreground transition-all duration-300 shrink-0",
          collapsed ? "w-16" : "w-64",
          className,
        )}
        {...props}
      >
        {sidebarContent(collapsed)}
      </aside>

      {/* Mobile Drawer Backdrop & Container */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
            onClick={() => onMobileOpenChange?.(false)}
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <div
            className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-card text-card-foreground border-r border-border shadow-2xl animate-in slide-in-from-left duration-200"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Drawer"
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center truncate">{brand}</div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="size-8 p-0 text-muted-foreground hover:text-foreground"
                onClick={() => onMobileOpenChange?.(false)}
                aria-label="Close navigation menu"
              >
                <X className="size-4" aria-hidden="true" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto">{sidebarContent(false)}</div>
          </div>
        </div>
      )}
    </TooltipProvider>
  );
}
