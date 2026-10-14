"use client";

import * as React from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../alert";
import { cn } from "../../lib/utils";

export interface FormErrorSummaryProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  message?: string | null;
  errors?: Record<string, { message?: string } | undefined> | Array<string | undefined>;
}

export const FormErrorSummary = React.forwardRef<HTMLDivElement, FormErrorSummaryProps>(
  ({ className, title = "Please correct the errors below", message, errors, ...props }, ref) => {
    const errorList: string[] = [];

    if (Array.isArray(errors)) {
      for (const err of errors) {
        if (typeof err === "string" && err.trim().length > 0) {
          errorList.push(err);
        }
      }
    } else if (errors && typeof errors === "object") {
      for (const fieldError of Object.values(errors)) {
        if (fieldError?.message) {
          errorList.push(fieldError.message);
        }
      }
    }

    if (!message && errorList.length === 0) {
      return null;
    }

    return (
      <Alert
        variant="destructive"
        role="alert"
        aria-live="polite"
        className={cn("mb-6", className)}
        ref={ref}
        {...props}
      >
        <AlertCircle className="size-4" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>
          {message && <p className="mt-1">{message}</p>}
          {errorList.length > 0 && (
            <ul className="list-disc pl-5 mt-2 space-y-1 text-xs">
              {errorList.map((err, index) => (
                <li key={index}>{err}</li>
              ))}
            </ul>
          )}
        </AlertDescription>
      </Alert>
    );
  },
);
FormErrorSummary.displayName = "FormErrorSummary";
