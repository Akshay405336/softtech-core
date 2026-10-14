import type * as React from "react";

export type UploadStatus = "idle" | "uploading" | "success" | "error";

export interface UploadFileItem {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  status: UploadStatus;
  progress?: number;
  error?: string;
  previewUrl?: string;
}

export interface FileValidationOptions {
  /** Maximum file size in bytes (e.g. 10 * 1024 * 1024 for 10MB) */
  maxSize?: number;
  /** Minimum file size in bytes */
  minSize?: number;
  /**
   * Accepted file types (MIME types like "image/*", "application/pdf" or extensions like ".jpg", ".pdf")
   */
  accept?: string[] | Record<string, string[]>;
  /** Maximum number of files allowed */
  maxFiles?: number;
  /** Minimum number of files required */
  minFiles?: number;
  /** Custom validation function returning error string if invalid, or null/undefined if valid */
  validate?: (file: File) => string | null | undefined;
}

export interface FileRejection {
  file: File;
  errors: string[];
}

export interface MediaItem {
  id: string;
  url: string;
  name?: string;
  type?: "image" | "video" | "document";
  size?: number;
  isPrimary?: boolean;
  alt?: string;
}

export interface FileUploadProps {
  /** Selected file items (controlled) */
  files?: UploadFileItem[];
  /** Callback when files change */
  onFilesChange?: (files: UploadFileItem[]) => void;
  /** Callback when invalid files are rejected */
  onRejections?: (rejections: FileRejection[]) => void;
  /** Upload handler for an individual file */
  onUpload?: (file: UploadFileItem) => void | Promise<void>;
  /** Upload handler for all files */
  onUploadAll?: (files: UploadFileItem[]) => void | Promise<void>;
  /** Retry handler for failed uploads */
  onRetry?: (file: UploadFileItem) => void | Promise<void>;
  /** Validation rules */
  validation?: FileValidationOptions;
  /** Single file upload mode (defaults to false) */
  multiple?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Dropzone label/heading */
  label?: React.ReactNode;
  /** Dropzone helper description */
  description?: React.ReactNode;
  /** Custom dropzone icon */
  icon?: React.ReactNode;
  /** Optional container class name */
  className?: string;
}
