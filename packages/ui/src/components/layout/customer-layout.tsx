import * as React from "react";
import { cn } from "../../lib/utils";

export interface CustomerLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

export function CustomerLayout({
  header,
  footer,
  children,
  className,
  ...props
}: CustomerLayoutProps): React.JSX.Element {
  return (
    <div
      className={cn(
        "min-h-screen flex flex-col bg-background text-foreground transition-colors duration-200",
        className,
      )}
      {...props}
    >
      {header}
      <main className="flex-1 flex flex-col">{children}</main>
      {footer}
    </div>
  );
}
