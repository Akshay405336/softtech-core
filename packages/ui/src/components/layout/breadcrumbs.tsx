import * as React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils";
import type { BreadcrumbsProps } from "./types";

export function Breadcrumbs({
  items,
  separator = (
    <ChevronRight className="size-3.5 text-muted-foreground/60 shrink-0" aria-hidden="true" />
  ),
  className,
  ...props
}: BreadcrumbsProps): React.JSX.Element {
  if (!items || items.length === 0) {
    return <nav aria-label="Breadcrumb" className={className} {...props} />;
  }

  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center", className)} {...props}>
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isCurrent = item.current ?? isLast;
          const Icon = item.icon;

          return (
            <li key={`${item.label}-${index}`} className="inline-flex items-center gap-1.5">
              {index > 0 && <span className="inline-flex items-center">{separator}</span>}
              {isCurrent ? (
                <span
                  aria-current="page"
                  className="inline-flex items-center gap-1.5 font-medium text-foreground"
                >
                  {Icon && <Icon className="size-3.5 shrink-0" aria-hidden="true" />}
                  {item.label}
                </span>
              ) : item.href ? (
                <a
                  href={item.href}
                  className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
                >
                  {Icon && <Icon className="size-3.5 shrink-0" aria-hidden="true" />}
                  {item.label}
                </a>
              ) : (
                <span className="inline-flex items-center gap-1.5">
                  {Icon && <Icon className="size-3.5 shrink-0" aria-hidden="true" />}
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
