"use client";

import * as React from "react";
import { UploadCloud } from "lucide-react";
import { cn } from "../../lib/utils";

export interface FileUploadDropzoneProps extends React.HTMLAttributes<HTMLDivElement> {
  onFilesSelected: (files: File[]) => void;
  accept?: string[] | Record<string, string[]>;
  multiple?: boolean;
  disabled?: boolean;
  label?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
}

export const FileUploadDropzone = React.forwardRef<HTMLDivElement, FileUploadDropzoneProps>(
  (
    {
      onFilesSelected,
      accept,
      multiple = true,
      disabled = false,
      label,
      description,
      icon,
      className,
      ...props
    },
    ref,
  ) => {
    const [isDragActive, setIsDragActive] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);

    // Compute accept string for native file input
    const acceptString = React.useMemo(() => {
      if (!accept) return undefined;
      if (Array.isArray(accept)) {
        return accept.join(",");
      }
      const list: string[] = [];
      for (const [mime, extensions] of Object.entries(accept)) {
        list.push(mime);
        if (Array.isArray(extensions)) {
          list.push(...extensions);
        }
      }
      return list.join(",");
    }, [accept]);

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (disabled) return;
      setIsDragActive(true);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (disabled) return;
      setIsDragActive(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);
      if (disabled) return;

      const droppedFiles = Array.from(e.dataTransfer.files);
      if (droppedFiles.length > 0) {
        onFilesSelected(multiple ? droppedFiles : droppedFiles.slice(0, 1));
      }
    };

    const handleClick = () => {
      if (disabled) return;
      inputRef.current?.click();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        inputRef.current?.click();
      }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = Array.from(e.target.files || []);
      if (selectedFiles.length > 0) {
        onFilesSelected(multiple ? selectedFiles : selectedFiles.slice(0, 1));
      }
      // Reset input value so re-selecting the same file fires change event
      e.target.value = "";
    };

    return (
      <div
        ref={ref}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        aria-label="Upload file dropzone"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-6 sm:p-8 text-center transition-all cursor-pointer select-none",
          "hover:border-primary/50 hover:bg-muted/50",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          isDragActive && "border-primary bg-primary/5 ring-2 ring-primary/20 scale-[0.99]",
          disabled &&
            "opacity-50 cursor-not-allowed pointer-events-none hover:border-border hover:bg-transparent",
          className,
        )}
        {...props}
      >
        <input
          ref={inputRef}
          type="file"
          tabIndex={-1}
          className="sr-only"
          multiple={multiple}
          accept={acceptString}
          disabled={disabled}
          onChange={handleInputChange}
          aria-hidden="true"
        />

        <div className="flex flex-col items-center gap-3">
          {icon ? (
            icon
          ) : (
            <div className="size-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <UploadCloud className="size-6" aria-hidden="true" />
            </div>
          )}

          <div className="space-y-1">
            <p className="text-sm font-medium">
              {label || (
                <>
                  <span className="text-primary hover:underline">Click to upload</span> or drag and
                  drop
                </>
              )}
            </p>
            {description && <p className="text-xs text-muted-foreground">{description}</p>}
          </div>
        </div>
      </div>
    );
  },
);
FileUploadDropzone.displayName = "FileUploadDropzone";
