"use client";

import * as React from "react";
import { LogOut, Menu, PanelLeft, Settings, ShieldCheck, User as UserIcon } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import type { AdminUser } from "./types";

export interface AdminHeaderProps extends React.HTMLAttributes<HTMLElement> {
  brand?: React.ReactNode;
  onToggleDesktopSidebar?: () => void;
  onToggleMobileSidebar?: () => void;
  search?: React.ReactNode;
  notifications?: React.ReactNode;
  themeToggle?: React.ReactNode;
  user?: AdminUser;
  onLogout?: () => void;
  customActions?: React.ReactNode;
}

export function AdminHeader({
  brand,
  onToggleDesktopSidebar,
  onToggleMobileSidebar,
  search,
  notifications,
  themeToggle,
  user,
  onLogout,
  customActions,
  className,
  ...props
}: AdminHeaderProps): React.JSX.Element {
  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border bg-background/95 backdrop-blur-md px-4 sm:px-6 transition-colors",
        className,
      )}
      {...props}
    >
      {/* Left Area: Sidebar Toggles & Brand */}
      <div className="flex items-center gap-3">
        {/* Mobile Sidebar Hamburger Toggle */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="size-9 p-0 md:hidden text-muted-foreground hover:text-foreground"
          onClick={onToggleMobileSidebar}
          aria-label="Open mobile navigation menu"
        >
          <Menu className="size-5" aria-hidden="true" />
        </Button>

        {/* Desktop Sidebar Collapse Toggle */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="hidden md:flex size-9 p-0 text-muted-foreground hover:text-foreground"
          onClick={onToggleDesktopSidebar}
          aria-label="Toggle sidebar collapse"
        >
          <PanelLeft className="size-4" aria-hidden="true" />
        </Button>

        {brand && <div className="flex items-center">{brand}</div>}
      </div>

      {/* Middle Area: Search */}
      {search && <div className="hidden sm:flex flex-1 max-w-md mx-4">{search}</div>}

      {/* Right Area: Actions, Notifications, Theme, User Menu */}
      <div className="flex items-center gap-2 sm:gap-3">
        {customActions}
        {notifications}
        {themeToggle}

        {/* User Profile Dropdown */}
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="relative h-9 gap-2 rounded-full pl-2 pr-2.5 py-1 text-xs hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
                aria-label={`User menu for ${user.name}`}
              >
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="size-7 rounded-full object-cover border border-border"
                  />
                ) : (
                  <div className="size-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-medium text-xs border border-primary/20">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="hidden md:inline font-medium text-foreground max-w-[120px] truncate">
                  {user.name}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none text-foreground">{user.name}</p>
                  <p className="text-xs leading-none text-muted-foreground truncate">
                    {user.email}
                  </p>
                  {user.role && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-primary pt-0.5">
                      <ShieldCheck className="size-3" aria-hidden="true" />
                      {user.role}
                    </span>
                  )}
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2 cursor-pointer">
                <UserIcon className="size-4 text-muted-foreground" aria-hidden="true" />
                <span>Account Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 cursor-pointer">
                <Settings className="size-4 text-muted-foreground" aria-hidden="true" />
                <span>Preferences</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={onLogout}
                className="gap-2 text-destructive focus:text-destructive cursor-pointer"
              >
                <LogOut className="size-4" aria-hidden="true" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null}
      </div>
    </header>
  );
}
