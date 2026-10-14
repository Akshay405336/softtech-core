"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { Button } from "../button";
import { FileUploadItem } from "./file-upload-item";
import type { UploadFileItem } from "./types";

export interface FileUploadListProps extends React.HTMLAttributes<HTMLDivElement> {
  items: UploadFileItem[];
  onRemove?: (id: string) => void;
  onRetry?: (item: UploadFileItem) => void;
  onUpload?: (item: UploadFileItem) => void;
  onClearAll?: () => void;
}

export function FileUploadList({
  items,
  onRemove,
  onRetry,
  onUpload,
  onClearAll,
  className,
  ...props
}: FileUploadListProps): React.JSX.Element | null {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className={cn("space-y-3", className)} {...props}>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Selected files ({items.length})</span>
        {onClearAll && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="h-7 text-xs text-muted-foreground hover:text-foreground"
          >
            Clear all
          </Button>
        )}
      </div>

      <div className="space-y-2">
        {items.map((item) => (
          <FileUploadItem
            key={item.id}
            item={item}
            onRemove={onRemove}
            onRetry={onRetry}
            onUpload={onUpload}
          />
        ))}
      </div>
    </div>
  );
}
