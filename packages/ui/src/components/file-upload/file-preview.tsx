"use client";

import * as React from "react";
import {
  File,
  FileArchive,
  FileAudio,
  FileCode,
  FileSpreadsheet,
  FileText,
  FileVideo,
  Image as ImageIcon,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { getFileCategory } from "./utils";

export interface FilePreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  file?: File;
  previewUrl?: string;
  name?: string;
  size?: "sm" | "md" | "lg";
  allowVideoPlayback?: boolean;
}

export function FilePreview({
  file,
  previewUrl,
  name,
  size = "md",
  allowVideoPlayback = false,
  className,
  ...props
}: FilePreviewProps): React.JSX.Element {
  const [imageError, setImageError] = React.useState(false);
  const category = file ? getFileCategory(file) : getFileCategory(name || "");

  const sizeClasses = {
    sm: "size-8 text-xs",
    md: "size-12 text-sm",
    lg: "size-16 text-base",
  };

  const iconSizes = {
    sm: "size-4",
    md: "size-6",
    lg: "size-8",
  };

  if (category === "image" && previewUrl && !imageError) {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-md border border-border bg-muted flex items-center justify-center shrink-0",
          sizeClasses[size],
          className,
        )}
        {...props}
      >
        <img
          src={previewUrl}
          alt={name || file?.name || "File preview"}
          className="h-full w-full object-cover"
          onError={() => setImageError(true)}
        />
      </div>
    );
  }

  if (category === "video" && previewUrl && allowVideoPlayback) {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-md border border-border bg-black flex items-center justify-center shrink-0",
          sizeClasses[size],
          className,
        )}
        {...props}
      >
        <video
          src={previewUrl}
          controls
          preload="metadata"
          className="h-full w-full object-contain"
        >
          <track kind="captions" />
        </video>
      </div>
    );
  }

  const renderIcon = () => {
    const iconClass = iconSizes[size];
    switch (category) {
      case "image":
        return <ImageIcon className={cn(iconClass, "text-blue-500")} aria-hidden="true" />;
      case "video":
        return <FileVideo className={cn(iconClass, "text-purple-500")} aria-hidden="true" />;
      case "audio":
        return <FileAudio className={cn(iconClass, "text-pink-500")} aria-hidden="true" />;
      case "pdf":
        return <FileText className={cn(iconClass, "text-red-500")} aria-hidden="true" />;
      case "document":
        return <FileSpreadsheet className={cn(iconClass, "text-emerald-500")} aria-hidden="true" />;
      case "archive":
        return <FileArchive className={cn(iconClass, "text-amber-500")} aria-hidden="true" />;
      case "code":
        return <FileCode className={cn(iconClass, "text-indigo-500")} aria-hidden="true" />;
      default:
        return <File className={cn(iconClass, "text-muted-foreground")} aria-hidden="true" />;
    }
  };

  return (
    <div
      className={cn(
        "rounded-md border border-border bg-muted/60 flex items-center justify-center shrink-0",
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {renderIcon()}
    </div>
  );
}
