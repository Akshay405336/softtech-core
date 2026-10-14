import * as React from "react";
import { Inbox } from "lucide-react";
import { Button } from "../button";

export interface DataTableEmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ComponentType<{ className?: string }>;
}

export function DataTableEmptyState({
  title = "No results found",
  description = "No records match the current search or filter criteria.",
  actionLabel,
  onAction,
  icon: Icon = Inbox,
}: DataTableEmptyStateProps): React.JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center space-y-3">
      <div className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <Icon className="size-6" />
      </div>
      <div className="space-y-1">
        <h4 className="text-sm font-semibold text-foreground">{title}</h4>
        <p className="text-xs text-muted-foreground max-w-sm">{description}</p>
      </div>
      {actionLabel && onAction && (
        <Button variant="outline" size="sm" onClick={onAction} className="text-xs">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
