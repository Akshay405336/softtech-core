"use client";

import * as React from "react";
import { AlertCircle, Upload, X } from "lucide-react";
import { cn } from "../../lib/utils";
import { Alert, AlertDescription, AlertTitle } from "../alert";
import { Button } from "../button";
import { FileUploadDropzone } from "./file-upload-dropzone";
import { FileUploadList } from "./file-upload-list";
import type { FileRejection, FileUploadProps, UploadFileItem } from "./types";
import { formatBytes, validateFiles } from "./utils";

let uploadCounter = 0;

export function FileUpload({
  files: controlledFiles,
  onFilesChange,
  onRejections,
  onUpload,
  onUploadAll,
  onRetry,
  validation,
  multiple = true,
  disabled = false,
  label,
  description,
  icon,
  className,
}: FileUploadProps): React.JSX.Element {
  const [internalFiles, setInternalFiles] = React.useState<UploadFileItem[]>([]);
  const [rejections, setRejections] = React.useState<FileRejection[]>([]);
  const objectUrlsRef = React.useRef<Set<string>>(new Set());

  const isControlled = controlledFiles !== undefined;
  const currentFiles = isControlled ? controlledFiles : internalFiles;

  // Cleanup object URLs on unmount to avoid memory leaks
  React.useEffect(() => {
    const urls = objectUrlsRef.current;
    return () => {
      urls.forEach((url) => {
        try {
          URL.revokeObjectURL(url);
        } catch {
          // Ignore revocation errors on unmount
        }
      });
      urls.clear();
    };
  }, []);

  const updateFiles = (nextFiles: UploadFileItem[]) => {
    if (!isControlled) {
      setInternalFiles(nextFiles);
    }
    onFilesChange?.(nextFiles);
  };

  const handleFilesSelected = (selectedFiles: File[]) => {
    const { validFiles, rejections: newRejections } = validateFiles(
      selectedFiles,
      currentFiles.length,
      validation,
    );

    if (newRejections.length > 0) {
      setRejections(newRejections);
      onRejections?.(newRejections);
    } else {
      setRejections([]);
    }

    if (validFiles.length === 0) return;

    const newItems: UploadFileItem[] = validFiles.map((file) => {
      uploadCounter++;
      let previewUrl: string | undefined = undefined;

      // Generate object URLs for images and videos safely
      if (
        typeof window !== "undefined" &&
        (file.type.startsWith("image/") || file.type.startsWith("video/"))
      ) {
        try {
          previewUrl = URL.createObjectURL(file);
          objectUrlsRef.current.add(previewUrl);
        } catch {
          previewUrl = undefined;
        }
      }

      return {
        id: `upload-${Date.now()}-${uploadCounter}`,
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        status: "idle",
        progress: 0,
        previewUrl,
      };
    });

    if (multiple) {
      updateFiles([...currentFiles, ...newItems]);
    } else {
      // In single file mode, revoke prior URLs and replace
      currentFiles.forEach((item) => {
        if (item.previewUrl && objectUrlsRef.current.has(item.previewUrl)) {
          URL.revokeObjectURL(item.previewUrl);
          objectUrlsRef.current.delete(item.previewUrl);
        }
      });
      updateFiles(newItems.slice(0, 1));
    }
  };

  const handleRemove = (id: string) => {
    const itemToRemove = currentFiles.find((f) => f.id === id);
    if (itemToRemove?.previewUrl && objectUrlsRef.current.has(itemToRemove.previewUrl)) {
      URL.revokeObjectURL(itemToRemove.previewUrl);
      objectUrlsRef.current.delete(itemToRemove.previewUrl);
    }

    const nextFiles = currentFiles.filter((f) => f.id !== id);
    updateFiles(nextFiles);
  };

  const handleClearAll = () => {
    currentFiles.forEach((item) => {
      if (item.previewUrl && objectUrlsRef.current.has(item.previewUrl)) {
        URL.revokeObjectURL(item.previewUrl);
        objectUrlsRef.current.delete(item.previewUrl);
      }
    });
    updateFiles([]);
    setRejections([]);
  };

  // Compute helper description from validation rules if not explicitly supplied
  const resolvedDescription = React.useMemo(() => {
    if (description) return description;
    const parts: string[] = [];
    if (validation?.accept) {
      if (Array.isArray(validation.accept)) {
        parts.push(validation.accept.join(", "));
      } else {
        parts.push(Object.keys(validation.accept).join(", "));
      }
    }
    if (validation?.maxSize) {
      parts.push(`up to ${formatBytes(validation.maxSize)}`);
    }
    if (validation?.maxFiles) {
      parts.push(`max ${validation.maxFiles} file(s)`);
    }
    return parts.length > 0 ? parts.join(" • ") : undefined;
  }, [description, validation]);

  const canUploadAll =
    onUploadAll &&
    currentFiles.length > 0 &&
    currentFiles.some((f) => f.status === "idle" || f.status === "error");

  return (
    <div className={cn("space-y-4", className)}>
      <FileUploadDropzone
        onFilesSelected={handleFilesSelected}
        accept={validation?.accept}
        multiple={multiple}
        disabled={disabled}
        label={label}
        description={resolvedDescription}
        icon={icon}
      />

      {/* Actionable Rejection Alert: never silently discard rejected files */}
      {rejections.length > 0 && (
        <Alert variant="destructive" role="alert" aria-live="polite">
          <AlertCircle className="size-4" />
          <div className="flex items-start justify-between w-full">
            <div className="space-y-1">
              <AlertTitle>{rejections.length} file(s) could not be accepted</AlertTitle>
              <AlertDescription>
                <ul className="list-disc pl-5 mt-1 space-y-1 text-xs">
                  {rejections.map((rej, idx) => (
                    <li key={idx}>
                      <span className="font-semibold">{rej.file.name}:</span>{" "}
                      {rej.errors.join("; ")}
                    </li>
                  ))}
                </ul>
              </AlertDescription>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-6 text-destructive-foreground hover:bg-destructive/20 -mr-1"
              onClick={() => setRejections([])}
              aria-label="Dismiss errors"
            >
              <X className="size-3.5" />
            </Button>
          </div>
        </Alert>
      )}

      <FileUploadList
        items={currentFiles}
        onRemove={disabled ? undefined : handleRemove}
        onRetry={onRetry}
        onUpload={disabled ? undefined : onUpload}
        onClearAll={disabled || currentFiles.length === 0 ? undefined : handleClearAll}
      />

      {canUploadAll && (
        <div className="flex justify-end pt-2">
          <Button type="button" onClick={() => onUploadAll(currentFiles)} className="gap-2 text-xs">
            <Upload className="size-3.5" />
            Upload All ({currentFiles.length})
          </Button>
        </div>
      )}
    </div>
  );
}
