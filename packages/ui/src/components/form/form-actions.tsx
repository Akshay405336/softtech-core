"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

export interface FormActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center" | "end" | "between";
}

export const FormActions = React.forwardRef<HTMLDivElement, FormActionsProps>(
  ({ className, align = "end", children, ...props }, ref) => {
    const alignmentClasses = {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-wrap items-center gap-3 pt-4 border-t border-border",
          alignmentClasses[align],
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
FormActions.displayName = "FormActions";
