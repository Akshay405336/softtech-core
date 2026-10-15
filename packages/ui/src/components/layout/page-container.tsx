import * as React from "react";
import { cn } from "../../lib/utils";

export interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "7xl" | "full" | "none";
  padded?: boolean;
}

const maxWidthMap = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  "2xl": "max-w-screen-2xl",
  "7xl": "max-w-7xl",
  full: "w-full",
  none: "",
};

export function PageContainer({
  maxWidth = "7xl",
  padded = true,
  className,
  children,
  ...props
}: PageContainerProps): React.JSX.Element {
  return (
    <div
      className={cn(
        "mx-auto w-full",
        maxWidthMap[maxWidth],
        padded && "px-4 sm:px-6 lg:px-8 py-6 sm:py-8",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
