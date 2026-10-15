import * as React from "react";
import { cn } from "../../lib/utils";

export interface PageHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  breadcrumbs?: React.ReactNode;
  badge?: React.ReactNode;
  actions?: React.ReactNode;
  bordered?: boolean;
}

export function PageHeader({
  title,
  description,
  breadcrumbs,
  badge,
  actions,
  bordered = false,
  className,
  ...props
}: PageHeaderProps): React.JSX.Element {
  return (
    <div
      className={cn("space-y-3 pb-4", bordered && "border-b border-border pb-6", className)}
      {...props}
    >
      {breadcrumbs && <div className="mb-2">{breadcrumbs}</div>}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {title}
            </h1>
            {badge && <div className="inline-flex shrink-0 items-center">{badge}</div>}
          </div>
          {description && <p className="text-sm text-muted-foreground max-w-3xl">{description}</p>}
        </div>

        {actions && (
          <div className="flex flex-wrap items-center gap-2.5 shrink-0 sm:self-center">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
