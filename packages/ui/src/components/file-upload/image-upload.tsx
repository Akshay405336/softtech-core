"use client";

import * as React from "react";
import { Camera, Image as ImageIcon, Trash2, Upload } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../button";
import type { FileValidationOptions } from "./types";
import { formatBytes, validateFile } from "./utils";

export interface ImageUploadProps {
  value?: File | string | null;
  onChange?: (file: File | null) => void;
  onError?: (error: string) => void;
  shape?: "circle" | "square" | "cover";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  validation?: Omit<FileValidationOptions, "maxFiles" | "minFiles">;
  className?: string;
  ariaLabel?: string;
}

export function ImageUpload({
  value,
  onChange,
  onError,
  shape = "circle",
  size = "md",
  disabled = false,
  validation = { maxSize: 5 * 1024 * 1024, accept: ["image/*"] },
  className,
  ariaLabel = "Upload image",
}: ImageUploadProps): React.JSX.Element {
  const [internalUrl, setInternalUrl] = React.useState<string | null>(null);
  const [isDragActive, setIsDragActive] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Derive preview URL
  const previewUrl = React.useMemo(() => {
    if (!value) return null;
    if (typeof value === "string") return value;
    return internalUrl;
  }, [value, internalUrl]);

  // Object URL management
  React.useEffect(() => {
    if (value instanceof File) {
      const url = URL.createObjectURL(value);
      setInternalUrl(url);
      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setInternalUrl(null);
    }
  }, [value]);

  const handleFile = (file: File) => {
    const errors = validateFile(file, {
      accept: ["image/*"],
      ...validation,
    });

    if (errors.length > 0) {
      onError?.(errors[0] || "Invalid image");
      return;
    }

    onChange?.(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (disabled) return;

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.(null);
  };

  const sizeStyles = {
    sm: shape === "cover" ? "h-28 w-full" : "size-20",
    md: shape === "cover" ? "h-40 w-full" : "size-32",
    lg: shape === "cover" ? "h-52 w-full" : "size-44",
  };

  const shapeStyles = {
    circle: "rounded-full",
    square: "rounded-xl",
    cover: "rounded-lg",
  };

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label={ariaLabel}
        aria-disabled={disabled}
        onClick={() => !disabled && inputRef.current?.click()}
        onKeyDown={(e) => {
          if (!disabled && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setIsDragActive(true);
        }}
        onDragLeave={() => setIsDragActive(false)}
        onDrop={handleDrop}
        className={cn(
          "group relative overflow-hidden border-2 border-dashed border-border bg-muted/30 flex items-center justify-center cursor-pointer transition-all select-none",
          "hover:border-primary/50 hover:bg-muted/60",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          isDragActive && "border-primary bg-primary/10 ring-2 ring-primary/20",
          disabled && "opacity-50 cursor-not-allowed pointer-events-none",
          sizeStyles[size],
          shapeStyles[shape],
        )}
      >
        <input
          ref={inputRef}
          type="file"
          tabIndex={-1}
          accept="image/*"
          className="sr-only"
          disabled={disabled}
          onChange={handleInputChange}
          aria-hidden="true"
        />

        {previewUrl ? (
          <>
            <img src={previewUrl} alt="Uploaded avatar" className="h-full w-full object-cover" />
            <div
              className={cn(
                "absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-xs gap-1",
                shapeStyles[shape],
              )}
            >
              <Camera className="size-5" aria-hidden="true" />
              <span className="font-medium">Change Photo</span>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-muted-foreground p-3 text-center">
            <ImageIcon className="size-6 mb-1 text-primary/70" aria-hidden="true" />
            <span className="text-xs font-medium text-foreground">Upload Image</span>
            {validation.maxSize && (
              <span className="text-[10px] text-muted-foreground mt-0.5">
                Up to {formatBytes(validation.maxSize)}
              </span>
            )}
          </div>
        )}
      </div>

      {previewUrl && !disabled && (
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => inputRef.current?.click()}
            className="h-7 text-xs gap-1"
          >
            <Upload className="size-3" />
            Change
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleRemove}
            className="h-7 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive gap-1"
          >
            <Trash2 className="size-3" />
            Remove
          </Button>
        </div>
      )}
    </div>
  );
}
