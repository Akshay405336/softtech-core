"use client";

import * as React from "react";
import type { ToastActionElement, ToastProps } from "./toast";

const TOAST_LIMIT = 5;
const TOAST_REMOVE_DELAY = 1000;

type ToasterToast = Omit<ToastProps, "title"> & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  duration?: number;
};

let count = 0;

function genId(): string {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return `toast-${count}`;
}

type Action =
  | {
      type: "ADD_TOAST";
      toast: ToasterToast;
    }
  | {
      type: "UPDATE_TOAST";
      toast: Partial<ToasterToast>;
    }
  | {
      type: "DISMISS_TOAST";
      toastId?: ToasterToast["id"];
    }
  | {
      type: "REMOVE_TOAST";
      toastId?: ToasterToast["id"];
    };

interface State {
  toasts: ToasterToast[];
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) => (t.id === action.toast.id ? { ...t, ...action.toast } : t)),
      };

    case "DISMISS_TOAST": {
      const { toastId } = action;

      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id);
        });
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t,
        ),
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
  }
};

const listeners: Array<(state: State) => void> = [];

let memoryState: State = { toasts: [] };

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

type Toast = Omit<ToasterToast, "id">;

export interface ToastOptions extends Omit<ToasterToast, "id" | "title"> {
  title?: React.ReactNode;
}

function toast({ ...props }: Toast) {
  const id = genId();

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    });

  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });

  // Loading notifications must not auto-dismiss while pending
  const duration =
    props.duration !== undefined
      ? props.duration
      : props.variant === "loading"
        ? Number.POSITIVE_INFINITY
        : 5000;

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      duration,
      onOpenChange: (open) => {
        if (!open) dismiss();
      },
    },
  });

  return {
    id: id,
    dismiss,
    update,
  };
}

// Helper methods on toast
toast.success = (title: React.ReactNode, options?: ToastOptions) =>
  toast({
    title,
    variant: "success",
    ...options,
  });

toast.error = (title: React.ReactNode, options?: ToastOptions) =>
  toast({
    title,
    variant: "error",
    ...options,
  });

toast.warning = (title: React.ReactNode, options?: ToastOptions) =>
  toast({
    title,
    variant: "warning",
    ...options,
  });

toast.info = (title: React.ReactNode, options?: ToastOptions) =>
  toast({
    title,
    variant: "info",
    ...options,
  });

toast.loading = (title: React.ReactNode, options?: ToastOptions) =>
  toast({
    title,
    variant: "loading",
    duration: Number.POSITIVE_INFINITY,
    ...options,
  });

toast.promise = async <T>(
  promiseOrFn: Promise<T> | (() => Promise<T>),
  messages: {
    loading: React.ReactNode;
    success: React.ReactNode | ((data: T) => React.ReactNode);
    error: React.ReactNode | ((err: unknown) => React.ReactNode);
  },
  options?: ToastOptions,
): Promise<T> => {
  const { id, update } = toast.loading(messages.loading, options);

  try {
    const promise = typeof promiseOrFn === "function" ? promiseOrFn() : promiseOrFn;
    const result = await promise;

    const successMessage =
      typeof messages.success === "function" ? messages.success(result) : messages.success;

    update({
      id,
      title: successMessage,
      variant: "success",
      duration: 5000,
      open: true,
    });

    return result;
  } catch (err) {
    const errorMessage =
      typeof messages.error === "function" ? messages.error(err) : messages.error;

    update({
      id,
      title: errorMessage,
      variant: "error",
      duration: 5000,
      open: true,
    });

    throw err;
  }
};

toast.dismiss = (toastId?: string) => {
  dispatch({ type: "DISMISS_TOAST", toastId });
};

function useToast() {
  const [state, setState] = React.useState<State>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  };
}

export { useToast, toast };
export type { ToasterToast };
