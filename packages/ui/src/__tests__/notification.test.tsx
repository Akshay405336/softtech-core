import * as React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { Toaster, toast, useToast, ConfirmDialog, useConfirm, ToastAction } from "../index";
import { Button } from "../components/button";

describe("Toast Notification System", () => {
  beforeEach(() => {
    act(() => {
      toast.dismiss();
    });
  });

  it("renders toast notifications with title and description", async () => {
    function ToastTrigger() {
      return (
        <div>
          <button
            onClick={() =>
              toast({
                title: "File Uploaded",
                description: "Invoice-2026.pdf was successfully attached.",
              })
            }
          >
            Trigger Toast
          </button>
          <Toaster />
        </div>
      );
    }

    render(<ToastTrigger />);
    fireEvent.click(screen.getByRole("button", { name: "Trigger Toast" }));

    await waitFor(() => {
      expect(screen.getByText("File Uploaded")).toBeDefined();
      expect(screen.getByText("Invoice-2026.pdf was successfully attached.")).toBeDefined();
    });
  });

  it("renders specialized variants: success, error, warning, info", async () => {
    function VariantsTrigger() {
      return (
        <div>
          <button onClick={() => toast.success("Changes saved")}>Success</button>
          <button onClick={() => toast.error("Database connection lost")}>Error</button>
          <button onClick={() => toast.warning("Session expiring soon")}>Warning</button>
          <button onClick={() => toast.info("New update available")}>Info</button>
          <Toaster />
        </div>
      );
    }

    render(<VariantsTrigger />);

    fireEvent.click(screen.getByRole("button", { name: "Success" }));
    await waitFor(() => {
      expect(screen.getByText("Changes saved")).toBeDefined();
    });

    fireEvent.click(screen.getByRole("button", { name: "Error" }));
    await waitFor(() => {
      expect(screen.getByText("Database connection lost")).toBeDefined();
    });

    fireEvent.click(screen.getByRole("button", { name: "Warning" }));
    await waitFor(() => {
      expect(screen.getByText("Session expiring soon")).toBeDefined();
    });

    fireEvent.click(screen.getByRole("button", { name: "Info" }));
    await waitFor(() => {
      expect(screen.getByText("New update available")).toBeDefined();
    });
  });

  it("supports action button in toast notification", async () => {
    const handleUndo = vi.fn();

    function ActionTrigger() {
      return (
        <div>
          <button
            onClick={() =>
              toast({
                title: "Item moved to trash",
                action: (
                  <ToastAction altText="Undo action" onClick={handleUndo}>
                    Undo
                  </ToastAction>
                ),
              })
            }
          >
            Delete Item
          </button>
          <Toaster />
        </div>
      );
    }

    render(<ActionTrigger />);
    fireEvent.click(screen.getByRole("button", { name: "Delete Item" }));

    await waitFor(() => {
      expect(screen.getByText("Item moved to trash")).toBeDefined();
      expect(screen.getByRole("button", { name: "Undo" })).toBeDefined();
    });

    fireEvent.click(screen.getByRole("button", { name: "Undo" }));
    expect(handleUndo).toHaveBeenCalledTimes(1);
  });

  it("handles toast.promise for async operations", async () => {
    function PromiseTrigger() {
      const runAsync = () => {
        const fakePromise = new Promise<string>((resolve) => {
          setTimeout(() => resolve("Profile saved!"), 50);
        });

        toast.promise(fakePromise, {
          loading: "Saving profile...",
          success: (data) => data,
          error: "Failed to save profile",
        });
      };

      return (
        <div>
          <button onClick={runAsync}>Save Profile</button>
          <Toaster />
        </div>
      );
    }

    render(<PromiseTrigger />);
    fireEvent.click(screen.getByRole("button", { name: "Save Profile" }));

    await waitFor(() => {
      expect(screen.getByText("Saving profile...")).toBeDefined();
    });

    await waitFor(() => {
      expect(screen.getByText("Profile saved!")).toBeDefined();
    });
  });

  it("allows manual dismissal of toasts", async () => {
    function DismissTrigger() {
      return (
        <div>
          <button onClick={() => toast({ title: "Dismissable Notice" })}>Notice</button>
          <Toaster />
        </div>
      );
    }

    render(<DismissTrigger />);
    fireEvent.click(screen.getByRole("button", { name: "Notice" }));

    await waitFor(() => {
      expect(screen.getByText("Dismissable Notice")).toBeDefined();
    });

    const closeBtn = screen.getByRole("button", { name: "Close notification" });
    fireEvent.click(closeBtn);
  });

  it("subscribes and tracks active toasts with useToast hook", async () => {
    function HookSubscriber() {
      const { toasts } = useToast();
      const openToasts = toasts.filter((t) => t.open);
      return <div data-testid="toast-count">{openToasts.length}</div>;
    }

    render(
      <div>
        <HookSubscriber />
        <button onClick={() => toast({ title: "Hook notification" })}>Trigger</button>
        <Toaster />
      </div>,
    );

    expect(screen.getByTestId("toast-count").textContent).toBe("0");

    fireEvent.click(screen.getByRole("button", { name: "Trigger" }));

    await waitFor(() => {
      expect(screen.getByTestId("toast-count").textContent).toBe("1");
    });
  });
});

describe("Confirmation Dialog System", () => {
  it("renders declarative ConfirmDialog with title and description", () => {
    const handleConfirm = vi.fn();
    const handleCancel = vi.fn();

    render(
      <ConfirmDialog
        open={true}
        title="Delete Resource?"
        description="This action cannot be undone."
        confirmLabel="Confirm Delete"
        variant="destructive"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />,
    );

    expect(screen.getByText("Delete Resource?")).toBeDefined();
    expect(screen.getByText("This action cannot be undone.")).toBeDefined();

    const confirmButton = screen.getByRole("button", { name: "Confirm Delete" });
    expect(confirmButton).toBeDefined();

    fireEvent.click(confirmButton);
    expect(handleConfirm).toHaveBeenCalledTimes(1);
  });

  it("supports useConfirm hook resolving to true on confirmation", async () => {
    function HookConsumer() {
      const { confirm, ConfirmDialog: DialogComponent } = useConfirm();
      const [result, setResult] = React.useState<string>("idle");

      const handleAction = async () => {
        const ok = await confirm({
          title: "Proceed with Operation?",
          description: "Please confirm your intent.",
          confirmLabel: "Proceed",
        });
        setResult(ok ? "confirmed" : "cancelled");
      };

      return (
        <div>
          <Button onClick={handleAction}>Launch Dialog</Button>
          <DialogComponent />
          <span data-testid="result-span">{result}</span>
        </div>
      );
    }

    render(<HookConsumer />);
    fireEvent.click(screen.getByRole("button", { name: "Launch Dialog" }));

    await waitFor(() => {
      expect(screen.getByText("Proceed with Operation?")).toBeDefined();
    });

    fireEvent.click(screen.getByRole("button", { name: "Proceed" }));

    await waitFor(() => {
      expect(screen.getByTestId("result-span").textContent).toBe("confirmed");
    });
  });

  it("supports useConfirm hook resolving to false on cancellation", async () => {
    function HookCancelConsumer() {
      const { confirm, ConfirmDialog: DialogComponent } = useConfirm();
      const [result, setResult] = React.useState<string>("idle");

      const handleAction = async () => {
        const ok = await confirm({
          title: "Cancel Check?",
          description: "Are you sure you want to exit?",
        });
        setResult(ok ? "confirmed" : "cancelled");
      };

      return (
        <div>
          <Button onClick={handleAction}>Launch Cancel Dialog</Button>
          <DialogComponent />
          <span data-testid="result-span">{result}</span>
        </div>
      );
    }

    render(<HookCancelConsumer />);
    fireEvent.click(screen.getByRole("button", { name: "Launch Cancel Dialog" }));

    await waitFor(() => {
      expect(screen.getByText("Cancel Check?")).toBeDefined();
    });

    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));

    await waitFor(() => {
      expect(screen.getByTestId("result-span").textContent).toBe("cancelled");
    });
  });
});
