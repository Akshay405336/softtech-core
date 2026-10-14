import type { FileRejection, FileValidationOptions } from "./types";

export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i] ?? "Bytes"}`;
}

export function getFileCategory(
  fileOrType: File | string,
): "image" | "video" | "audio" | "pdf" | "document" | "archive" | "code" | "other" {
  const type = typeof fileOrType === "string" ? fileOrType : fileOrType.type || fileOrType.name;

  const lower = type.toLowerCase();

  if (lower.startsWith("image/") || lower.match(/\.(jpg|jpeg|png|gif|webp|svg|bmp|ico)$/i)) {
    return "image";
  }
  if (lower.startsWith("video/") || lower.match(/\.(mp4|webm|ogg|mov|avi|mkv)$/i)) {
    return "video";
  }
  if (lower.startsWith("audio/") || lower.match(/\.(mp3|wav|ogg|flac|aac)$/i)) {
    return "audio";
  }
  if (lower === "application/pdf" || lower.endsWith(".pdf")) {
    return "pdf";
  }
  if (
    lower.includes("word") ||
    lower.includes("document") ||
    lower.includes("sheet") ||
    lower.includes("excel") ||
    lower.includes("presentation") ||
    lower.includes("powerpoint") ||
    lower.match(/\.(doc|docx|xls|xlsx|ppt|pptx|txt|rtf|csv)$/i)
  ) {
    return "document";
  }
  if (
    lower.includes("zip") ||
    lower.includes("tar") ||
    lower.includes("compressed") ||
    lower.match(/\.(zip|tar|gz|7z|rar)$/i)
  ) {
    return "archive";
  }
  if (
    lower.includes("javascript") ||
    lower.includes("typescript") ||
    lower.includes("json") ||
    lower.includes("html") ||
    lower.match(/\.(js|jsx|ts|tsx|json|html|css|py|rs|go|c|cpp|java|rb|sql)$/i)
  ) {
    return "code";
  }

  return "other";
}

export function matchesAccept(file: File, accept?: string[] | Record<string, string[]>): boolean {
  if (!accept) return true;

  const acceptedList: string[] = [];

  if (Array.isArray(accept)) {
    acceptedList.push(...accept);
  } else if (typeof accept === "object") {
    for (const [mime, extensions] of Object.entries(accept)) {
      acceptedList.push(mime);
      if (Array.isArray(extensions)) {
        acceptedList.push(...extensions);
      }
    }
  }

  if (acceptedList.length === 0) return true;

  const fileName = file.name.toLowerCase();
  const fileType = file.type.toLowerCase();

  return acceptedList.some((rule) => {
    const trimmed = rule.trim().toLowerCase();

    // Extension match: e.g. ".pdf", ".png"
    if (trimmed.startsWith(".")) {
      return fileName.endsWith(trimmed);
    }

    // Wildcard MIME match: e.g. "image/*", "video/*"
    if (trimmed.endsWith("/*")) {
      const category = trimmed.replace("/*", "");
      return fileType.startsWith(`${category}/`);
    }

    // Exact MIME match: e.g. "application/pdf"
    return fileType === trimmed;
  });
}

export function validateFile(file: File, options?: FileValidationOptions): string[] {
  if (!options) return [];
  const errors: string[] = [];

  if (options.maxSize !== undefined && file.size > options.maxSize) {
    errors.push(
      `File size exceeds limit of ${formatBytes(options.maxSize)} (file is ${formatBytes(file.size)})`,
    );
  }

  if (options.minSize !== undefined && file.size < options.minSize) {
    errors.push(`File size is smaller than minimum required of ${formatBytes(options.minSize)}`);
  }

  if (options.accept && !matchesAccept(file, options.accept)) {
    const ext = file.name.split(".").pop();
    const typeLabel = file.type || (ext ? `.${ext}` : "unknown type");
    errors.push(`File format "${typeLabel}" is not an accepted format`);
  }

  if (options.validate) {
    const customError = options.validate(file);
    if (customError) {
      errors.push(customError);
    }
  }

  return errors;
}

export function validateFiles(
  incomingFiles: File[],
  currentCount: number,
  options?: FileValidationOptions,
): { validFiles: File[]; rejections: FileRejection[] } {
  const validFiles: File[] = [];
  const rejections: FileRejection[] = [];

  const maxFiles = options?.maxFiles;

  for (let i = 0; i < incomingFiles.length; i++) {
    const file = incomingFiles[i];
    if (!file) continue;

    // Check max files limit
    if (maxFiles !== undefined && currentCount + validFiles.length >= maxFiles) {
      rejections.push({
        file,
        errors: [`Cannot add "${file.name}": maximum limit of ${maxFiles} file(s) reached`],
      });
      continue;
    }

    const errors = validateFile(file, options);
    if (errors.length > 0) {
      rejections.push({ file, errors });
    } else {
      validFiles.push(file);
    }
  }

  return { validFiles, rejections };
}
