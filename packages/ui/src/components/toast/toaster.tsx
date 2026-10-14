"use client";

import * as React from "react";
import { AlertCircle, AlertTriangle, CheckCircle2, Info } from "lucide-react";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "./toast";
import { useToast } from "./use-toast";
import { Spinner } from "../spinner";

export function Toaster(): React.JSX.Element {
  const { toasts } = useToast();

  const getVariantIcon = (variant?: string | null) => {
    switch (variant) {
      case "success":
        return (
          <CheckCircle2
            className="toast-indicator size-4 shrink-0 mt-0.5 text-success"
            aria-hidden="true"
          />
        );
      case "error":
        return (
          <AlertCircle
            className="toast-indicator size-4 shrink-0 mt-0.5 text-destructive"
            aria-hidden="true"
          />
        );
      case "warning":
        return (
          <AlertTriangle
            className="toast-indicator size-4 shrink-0 mt-0.5 text-warning"
            aria-hidden="true"
          />
        );
      case "info":
        return (
          <Info
            className="toast-indicator size-4 shrink-0 mt-0.5 text-primary"
            aria-hidden="true"
          />
        );
      case "loading":
        return (
          <Spinner
            className="toast-indicator size-4 shrink-0 mt-0.5 text-primary"
            aria-hidden="true"
          />
        );
      default:
        return null;
    }
  };

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        return (
          <Toast key={id} variant={variant} {...props}>
            <div className="flex items-start gap-3 w-full">
              {getVariantIcon(variant)}
              <div className="grid gap-1 flex-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && <ToastDescription>{description}</ToastDescription>}
              </div>
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
