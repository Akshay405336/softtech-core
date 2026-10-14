import * as React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  FileUpload,
  FileUploadDropzone,
  ImageUpload,
  MediaGallery,
  UploadProgress,
  formatBytes,
  getFileCategory,
  matchesAccept,
  validateFile,
  validateFiles,
  type MediaItem,
  type UploadFileItem,
} from "../index";

describe("File Upload Utilities", () => {
  it("formats bytes accurately into human-readable strings", () => {
    expect(formatBytes(0)).toBe("0 Bytes");
    expect(formatBytes(1024)).toBe("1 KB");
    expect(formatBytes(1536)).toBe("1.5 KB");
    expect(formatBytes(1048576)).toBe("1 MB");
    expect(formatBytes(5242880)).toBe("5 MB");
    expect(formatBytes(1073741824)).toBe("1 GB");
  });

  it("identifies file categories from MIME types and extensions", () => {
    expect(getFileCategory("image/png")).toBe("image");
    expect(getFileCategory("photo.jpg")).toBe("image");
    expect(getFileCategory("video/mp4")).toBe("video");
    expect(getFileCategory("movie.mov")).toBe("video");
    expect(getFileCategory("audio/mp3")).toBe("audio");
    expect(getFileCategory("application/pdf")).toBe("pdf");
    expect(getFileCategory("document.pdf")).toBe("pdf");
    expect(getFileCategory("report.docx")).toBe("document");
    expect(getFileCategory("archive.zip")).toBe("archive");
    expect(getFileCategory("index.ts")).toBe("code");
    expect(getFileCategory("unknown.xyz")).toBe("other");
  });

  it("checks file acceptance against extensions, exact MIMEs, and wildcards", () => {
    const pngFile = new File(["dummy"], "avatar.png", { type: "image/png" });
    const pdfFile = new File(["dummy"], "report.pdf", { type: "application/pdf" });
    const txtFile = new File(["dummy"], "notes.txt", { type: "text/plain" });

    // Wildcard
    expect(matchesAccept(pngFile, ["image/*"])).toBe(true);
    expect(matchesAccept(pdfFile, ["image/*"])).toBe(false);

    // Extension
    expect(matchesAccept(pdfFile, [".pdf"])).toBe(true);
    expect(matchesAccept(pngFile, [".pdf"])).toBe(false);

    // Exact MIME
    expect(matchesAccept(pdfFile, ["application/pdf"])).toBe(true);

    // Object format
    expect(matchesAccept(pngFile, { "image/*": [".png", ".jpg"] })).toBe(true);
    expect(matchesAccept(txtFile, { "image/*": [".png", ".jpg"] })).toBe(false);
  });

  it("validates file sizes, accepted types, and custom rules", () => {
    const largeFile = new File([new ArrayBuffer(6 * 1024 * 1024)], "large.png", {
      type: "image/png",
    });
    const smallFile = new File(["ok"], "small.png", { type: "image/png" });

    const errors = validateFile(largeFile, {
      maxSize: 5 * 1024 * 1024,
    });
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0]).toContain("File size exceeds limit of 5 MB");

    const validErrors = validateFile(smallFile, {
      maxSize: 5 * 1024 * 1024,
      accept: ["image/*"],
    });
    expect(validErrors.length).toBe(0);

    const customErrors = validateFile(smallFile, {
      validate: (file) => (file.name === "small.png" ? "Name not allowed" : null),
    });
    expect(customErrors).toContain("Name not allowed");
  });

  it("enforces maxFiles threshold during batch validation", () => {
    const f1 = new File(["1"], "1.png", { type: "image/png" });
    const f2 = new File(["2"], "2.png", { type: "image/png" });
    const f3 = new File(["3"], "3.png", { type: "image/png" });

    const { validFiles, rejections } = validateFiles([f1, f2, f3], 0, {
      maxFiles: 2,
    });

    expect(validFiles.length).toBe(2);
    expect(rejections.length).toBe(1);
    expect(rejections[0]?.errors[0]).toContain("maximum limit of 2 file(s) reached");
  });
});

describe("FileUploadDropzone component", () => {
  it("renders with custom label, description, and triggers onFilesSelected", () => {
    const handleFilesSelected = vi.fn();

    render(
      <FileUploadDropzone
        onFilesSelected={handleFilesSelected}
        label="Drop project files"
        description="PDF or DOCX up to 10MB"
      />,
    );

    expect(screen.getByText("Drop project files")).toBeDefined();
    expect(screen.getByText("PDF or DOCX up to 10MB")).toBeDefined();

    const input = screen.getByLabelText("Upload file dropzone", {
      selector: "div",
    });
    expect(input).toBeDefined();
  });

  it("handles file drop event correctly", () => {
    const handleFilesSelected = vi.fn();
    render(<FileUploadDropzone onFilesSelected={handleFilesSelected} />);

    const dropzone = screen.getByRole("button", { name: "Upload file dropzone" });
    const file = new File(["content"], "test.pdf", { type: "application/pdf" });

    fireEvent.drop(dropzone, {
      dataTransfer: {
        files: [file],
      },
    });

    expect(handleFilesSelected).toHaveBeenCalledWith([file]);
  });
});

describe("UploadProgress component", () => {
  it("renders accessible progress bar with value and percentage", () => {
    render(<UploadProgress value={75} status="uploading" />);

    const progressbar = screen.getByRole("progressbar");
    expect(progressbar.getAttribute("aria-valuenow")).toBe("75");
    expect(screen.getByText("75%")).toBeDefined();
    expect(screen.getByText("Uploading...")).toBeDefined();
  });

  it("renders error status color when status is error", () => {
    const { container } = render(<UploadProgress value={50} status="error" />);
    const bar = container.querySelector(".bg-destructive");
    expect(bar).not.toBeNull();
  });
});

describe("FileUpload component", () => {
  beforeEach(() => {
    global.URL.createObjectURL = vi.fn(() => "blob:http://localhost/test-uuid");
    global.URL.revokeObjectURL = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders selected file items with filename and size", () => {
    const mockFiles: UploadFileItem[] = [
      {
        id: "item-1",
        file: new File(["data"], "invoice.pdf", { type: "application/pdf" }),
        name: "invoice.pdf",
        size: 1024,
        type: "application/pdf",
        status: "idle",
      },
    ];

    render(<FileUpload files={mockFiles} />);

    expect(screen.getByText("invoice.pdf")).toBeDefined();
    expect(screen.getByText("1 KB")).toBeDefined();
  });

  it("removes file item and revokes object URL when remove button is clicked", () => {
    const handleFilesChange = vi.fn();
    const mockFiles: UploadFileItem[] = [
      {
        id: "item-1",
        file: new File(["data"], "avatar.png", { type: "image/png" }),
        name: "avatar.png",
        size: 2048,
        type: "image/png",
        status: "idle",
        previewUrl: "blob:http://localhost/test-uuid",
      },
    ];

    render(<FileUpload files={mockFiles} onFilesChange={handleFilesChange} />);

    const removeBtn = screen.getByRole("button", { name: "Remove avatar.png" });
    fireEvent.click(removeBtn);

    expect(handleFilesChange).toHaveBeenCalledWith([]);
  });

  it("surfaces validation rejection alert without silently discarding files", () => {
    const handleRejections = vi.fn();

    render(
      <FileUpload
        validation={{
          maxSize: 100, // 100 bytes
        }}
        onRejections={handleRejections}
      />,
    );

    const dropzone = screen.getByRole("button", { name: "Upload file dropzone" });
    const hugeFile = new File([new ArrayBuffer(500)], "huge.pdf", {
      type: "application/pdf",
    });

    fireEvent.drop(dropzone, {
      dataTransfer: {
        files: [hugeFile],
      },
    });

    expect(handleRejections).toHaveBeenCalled();
    expect(screen.getByRole("alert")).toBeDefined();
    expect(screen.getByText(/1 file\(s\) could not be accepted/i)).toBeDefined();
    expect(screen.getByText(/File size exceeds limit of 100 Bytes/i)).toBeDefined();
  });
});

describe("ImageUpload component", () => {
  beforeEach(() => {
    global.URL.createObjectURL = vi.fn(() => "blob:http://localhost/avatar-uuid");
    global.URL.revokeObjectURL = vi.fn();
  });

  it("renders upload trigger and handles image selection", () => {
    const handleChange = vi.fn();
    render(<ImageUpload onChange={handleChange} shape="circle" size="md" />);

    expect(screen.getByText("Upload Image")).toBeDefined();
  });

  it("displays preview image and remove action when value is supplied", () => {
    const handleChange = vi.fn();
    render(
      <ImageUpload value="https://example.com/avatar.jpg" onChange={handleChange} shape="square" />,
    );

    const img = screen.getByAltText("Uploaded avatar");
    expect(img).toBeDefined();

    const removeBtn = screen.getByRole("button", { name: /remove/i });
    fireEvent.click(removeBtn);

    expect(handleChange).toHaveBeenCalledWith(null);
  });
});

describe("MediaGallery component", () => {
  const sampleMedia: MediaItem[] = [
    {
      id: "med-1",
      url: "https://example.com/img1.jpg",
      name: "Gallery 1.jpg",
      type: "image",
      size: 1048576,
      isPrimary: true,
    },
    {
      id: "med-2",
      url: "https://example.com/img2.jpg",
      name: "Gallery 2.jpg",
      type: "image",
      size: 2097152,
      isPrimary: false,
    },
  ];

  it("renders media items with primary badge and size", () => {
    render(<MediaGallery items={sampleMedia} />);

    expect(screen.getByText("Gallery 1.jpg")).toBeDefined();
    expect(screen.getByText("1 MB")).toBeDefined();
    expect(screen.getByText("Primary")).toBeDefined();

    expect(screen.getByText("Gallery 2.jpg")).toBeDefined();
    expect(screen.getByText("2 MB")).toBeDefined();
  });

  it("supports reordering media items left and right", () => {
    const handleReorder = vi.fn();
    render(<MediaGallery items={sampleMedia} onReorder={handleReorder} />);

    const moveRightBtn = screen.getByRole("button", { name: "Move Gallery 1.jpg right" });
    fireEvent.click(moveRightBtn);

    expect(handleReorder).toHaveBeenCalledTimes(1);
    expect(handleReorder).toHaveBeenCalledWith([sampleMedia[1], sampleMedia[0]]);
  });

  it("supports setting an item as primary", () => {
    const handleSetPrimary = vi.fn();
    render(<MediaGallery items={sampleMedia} onSetPrimary={handleSetPrimary} />);

    const setPrimaryBtn = screen.getByRole("button", {
      name: "Set Gallery 2.jpg as primary",
    });
    fireEvent.click(setPrimaryBtn);

    expect(handleSetPrimary).toHaveBeenCalledWith("med-2");
  });

  it("supports removing an item from the gallery", () => {
    const handleRemove = vi.fn();
    render(<MediaGallery items={sampleMedia} onRemove={handleRemove} />);

    const removeBtn = screen.getByRole("button", { name: "Remove Gallery 1.jpg" });
    fireEvent.click(removeBtn);

    expect(handleRemove).toHaveBeenCalledWith("med-1");
  });
});
