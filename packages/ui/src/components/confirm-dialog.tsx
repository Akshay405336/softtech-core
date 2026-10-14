"use client";

import * as React from "react";
import { AlertCircle, AlertTriangle, Info } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog";
import { Button } from "./button";

export interface ConfirmDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title: React.ReactNode;
  description: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "default" | "destructive" | "warning";
  loading?: boolean;
  onConfirm: () => void | Promise<void>;
  onCancel?: () => void;
  trigger?: React.ReactNode;
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel,
  cancelLabel = "Cancel",
  variant = "default",
  loading: externalLoading = false,
  onConfirm,
  onCancel,
  trigger,
}: ConfirmDialogProps): React.JSX.Element {
  const [internalLoading, setInternalLoading] = React.useState(false);
  const isLoading = externalLoading || internalLoading;

  const defaultConfirmLabel = confirmLabel ?? (variant === "destructive" ? "Delete" : "Confirm");

  const getVariantIcon = () => {
    switch (variant) {
      case "destructive":
        return (
          <div className="size-10 rounded-full bg-destructive/10 text-destructive flex items-center justify-center shrink-0">
            <AlertTriangle className="size-5" aria-hidden="true" />
          </div>
        );
      case "warning":
        return (
          <div className="size-10 rounded-full bg-warning/10 text-warning flex items-center justify-center shrink-0">
            <AlertCircle className="size-5" aria-hidden="true" />
          </div>
        );
      default:
        return (
          <div className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <Info className="size-5" aria-hidden="true" />
          </div>
        );
    }
  };

  const handleConfirm = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const result = onConfirm();
      if (result instanceof Promise) {
        setInternalLoading(true);
        await result;
        setInternalLoading(false);
      }
      onOpenChange?.(false);
    } catch (err) {
      setInternalLoading(false);
      throw err;
    }
  };

  const handleCancel = () => {
    if (isLoading) return;
    onCancel?.();
    onOpenChange?.(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      {trigger && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            {getVariantIcon()}
            <div className="space-y-1.5 text-center sm:text-left flex-1">
              <AlertDialogTitle>{title}</AlertDialogTitle>
              <AlertDialogDescription>{description}</AlertDialogDescription>
            </div>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button type="button" variant="outline" onClick={handleCancel} disabled={isLoading}>
            {cancelLabel}
          </Button>
          <Button
            type="button"
            variant={variant === "destructive" ? "destructive" : "default"}
            loading={isLoading}
            onClick={handleConfirm}
          >
            {defaultConfirmLabel}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export interface UseConfirmOptions {
  title: React.ReactNode;
  description: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "default" | "destructive" | "warning";
}

export function useConfirm() {
  const [state, setState] = React.useState<{
    open: boolean;
    title: React.ReactNode;
    description: React.ReactNode;
    confirmLabel?: string;
    cancelLabel?: string;
    variant?: "default" | "destructive" | "warning";
    resolve?: (value: boolean) => void;
  }>({
    open: false,
    title: "",
    description: "",
  });

  const confirm = React.useCallback((options: UseConfirmOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      setState({
        open: true,
        ...options,
        resolve,
      });
    });
  }, []);

  const handleConfirm = React.useCallback(() => {
    state.resolve?.(true);
    setState((prev) => ({ ...prev, open: false }));
  }, [state]);

  const handleCancel = React.useCallback(() => {
    state.resolve?.(false);
    setState((prev) => ({ ...prev, open: false }));
  }, [state]);

  const ConfirmDialogComponent = React.useCallback(
    () => (
      <ConfirmDialog
        open={state.open}
        onOpenChange={(open) => {
          if (!open) handleCancel();
        }}
        title={state.title}
        description={state.description}
        confirmLabel={state.confirmLabel}
        cancelLabel={state.cancelLabel}
        variant={state.variant}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    ),
    [state, handleConfirm, handleCancel],
  );

  return { confirm, ConfirmDialog: ConfirmDialogComponent };
}
