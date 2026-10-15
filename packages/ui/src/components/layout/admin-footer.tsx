import * as React from "react";
import { cn } from "../../lib/utils";

export interface AdminFooterProps extends React.HTMLAttributes<HTMLElement> {
  systemStatus?: React.ReactNode;
  version?: string;
  copyright?: React.ReactNode;
  links?: Array<{ label: string; href: string; external?: boolean }>;
}

export function AdminFooter({
  systemStatus = (
    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
      <span className="size-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
      <span>All systems operational</span>
    </div>
  ),
  version = "v0.1.0",
  copyright,
  links = [],
  className,
  ...props
}: AdminFooterProps): React.JSX.Element {
  return (
    <footer
      className={cn(
        "w-full border-t border-border bg-card/40 px-4 py-3 sm:px-6 transition-colors text-xs text-muted-foreground",
        className,
      )}
      {...props}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5">
        <div className="flex flex-wrap items-center gap-4">
          {copyright || <span>© 2026 Softtech Core Admin</span>}
          {version && <span className="font-mono text-[11px] opacity-75">{version}</span>}
          {systemStatus}
        </div>

        {links.length > 0 && (
          <div className="flex items-center gap-3">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </footer>
  );
}
