"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import type { UploadStatus } from "./types";

export interface UploadProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  status?: UploadStatus;
  showPercentage?: boolean;
}

export function UploadProgress({
  value = 0,
  status = "idle",
  showPercentage = true,
  className,
  ...props
}: UploadProgressProps): React.JSX.Element {
  const clamped = Math.min(100, Math.max(0, value));

  const getStatusColor = () => {
    switch (status) {
      case "error":
        return "bg-destructive";
      case "success":
        return "bg-success";
      default:
        return "bg-primary";
    }
  };

  return (
    <div className={cn("w-full space-y-1", className)} {...props}>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="capitalize font-medium">
          {status === "uploading" ? "Uploading..." : status}
        </span>
        {showPercentage && <span className="font-mono">{Math.round(clamped)}%</span>}
      </div>
      <div
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Upload progress"
        className="relative h-1.5 w-full overflow-hidden rounded-full bg-secondary"
      >
        <div
          className={cn(
            "h-full w-full flex-1 transition-all duration-300 ease-in-out",
            getStatusColor(),
            status === "uploading" && "animate-pulse",
          )}
          style={{ transform: `translateX(-${100 - clamped}%)` }}
        />
      </div>
    </div>
  );
}
