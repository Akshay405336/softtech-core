"use client";

import * as React from "react";
import { AlertCircle, CheckCircle2, RotateCw, Upload, X } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../button";
import { FilePreview } from "./file-preview";
import type { UploadFileItem } from "./types";
import { UploadProgress } from "./upload-progress";
import { formatBytes } from "./utils";

export interface FileUploadItemProps extends React.HTMLAttributes<HTMLDivElement> {
  item: UploadFileItem;
  onRemove?: (id: string) => void;
  onRetry?: (item: UploadFileItem) => void;
  onUpload?: (item: UploadFileItem) => void;
}

export function FileUploadItem({
  item,
  onRemove,
  onRetry,
  onUpload,
  className,
  ...props
}: FileUploadItemProps): React.JSX.Element {
  return (
    <div
      className={cn(
        "group relative flex items-center gap-3 rounded-lg border border-border bg-card p-3 shadow-xs transition-all",
        item.status === "error" && "border-destructive/40 bg-destructive/5",
        className,
      )}
      {...props}
    >
      <FilePreview file={item.file} previewUrl={item.previewUrl} name={item.name} size="md" />

      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-medium truncate text-foreground" title={item.name}>
            {item.name}
          </p>
          <span className="text-xs text-muted-foreground shrink-0 font-mono">
            {formatBytes(item.size)}
          </span>
        </div>

        {item.status === "uploading" && (
          <UploadProgress value={item.progress ?? 0} status="uploading" />
        )}

        {item.status === "error" && (
          <div className="flex items-center gap-1.5 text-xs text-destructive">
            <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
            <span className="truncate">{item.error || "Upload failed"}</span>
          </div>
        )}

        {item.status === "success" && (
          <div className="flex items-center gap-1.5 text-xs text-success">
            <CheckCircle2 className="size-3.5 shrink-0" aria-hidden="true" />
            <span>Uploaded successfully</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-1 shrink-0">
        {item.status === "idle" && onUpload && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-8 text-muted-foreground hover:text-primary"
            onClick={() => onUpload(item)}
            aria-label={`Upload ${item.name}`}
          >
            <Upload className="size-4" />
          </Button>
        )}

        {item.status === "error" && onRetry && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-8 text-muted-foreground hover:text-foreground"
            onClick={() => onRetry(item)}
            aria-label={`Retry upload for ${item.name}`}
          >
            <RotateCw className="size-4" />
          </Button>
        )}

        {onRemove && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-8 text-muted-foreground hover:text-destructive"
            onClick={() => onRemove(item.id)}
            aria-label={`Remove ${item.name}`}
          >
            <X className="size-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
