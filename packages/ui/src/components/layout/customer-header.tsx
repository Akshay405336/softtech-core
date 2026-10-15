import * as React from "react";
import { Menu, X } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../button";
import type { CustomerNavItem } from "./types";

export interface CustomerHeaderProps extends React.HTMLAttributes<HTMLElement> {
  brand: React.ReactNode;
  navItems?: CustomerNavItem[];
  search?: React.ReactNode;
  actions?: React.ReactNode;
  mobileActions?: React.ReactNode;
  sticky?: boolean;
}

export function CustomerHeader({
  brand,
  navItems = [],
  search,
  actions,
  mobileActions,
  sticky = true,
  className,
  ...props
}: CustomerHeaderProps): React.JSX.Element {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header
      className={cn(
        "w-full border-b border-border bg-background/95 backdrop-blur-md transition-colors z-40",
        sticky && "sticky top-0",
        className,
      )}
      {...props}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 gap-4">
        {/* Brand */}
        <div className="flex items-center gap-6 shrink-0">
          <div className="flex items-center">{brand}</div>

          {/* Desktop Navigation */}
          {navItems.length > 0 && (
            <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className={cn(
                    "inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
                    item.active
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                  aria-current={item.active ? "page" : undefined}
                >
                  <span>{item.label}</span>
                  {item.badge && <span className="ml-1">{item.badge}</span>}
                </a>
              ))}
            </nav>
          )}
        </div>

        {/* Search Slot */}
        {search && <div className="hidden lg:flex flex-1 max-w-xs">{search}</div>}

        {/* Desktop Actions */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">{actions}</div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          {actions && <div className="flex sm:hidden items-center gap-1">{actions}</div>}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="p-2 h-9 w-9 text-muted-foreground hover:text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="customer-mobile-menu"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {mobileMenuOpen ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          id="customer-mobile-menu"
          className="border-b border-border bg-background px-4 py-4 md:hidden shadow-lg animate-in slide-in-from-top-2 duration-150"
        >
          {search && <div className="mb-4">{search}</div>}

          {navItems.length > 0 && (
            <nav aria-label="Mobile Navigation" className="flex flex-col gap-1 pb-3">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    item.active
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                  aria-current={item.active ? "page" : undefined}
                >
                  <span>{item.label}</span>
                  {item.badge && <span>{item.badge}</span>}
                </a>
              ))}
            </nav>
          )}

          {(mobileActions || actions) && (
            <div className="border-t border-border pt-3 flex flex-col gap-2">
              {mobileActions || actions}
            </div>
          )}
        </div>
      )}
    </header>
  );
}
