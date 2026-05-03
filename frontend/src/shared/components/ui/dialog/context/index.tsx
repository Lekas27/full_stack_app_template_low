import type { AnimationEvent, ReactNode } from "react";
import { createContext, useCallback, useContext, useRef, useState } from "react";

import { DialogInstance } from "./components/instance";
import type { DialogConfig, DialogVariant, QueuedDialog } from "./types/dialog";

type DialogContextValue = {
  /** Shows a success dialog with green styling */
  success: (config: Omit<DialogConfig, "variant">) => void;
  /** Shows an error dialog with red styling */
  error: (config: Omit<DialogConfig, "variant">) => void;
  /** Shows a warning dialog with amber styling */
  warning: (config: Omit<DialogConfig, "variant">) => void;
  /** Shows an info dialog with blue styling */
  info: (config: Omit<DialogConfig, "variant">) => void;
  /** Shows a confirmation dialog. Returns promise that resolves to user's choice (true/false) */
  confirm: (
    config: Omit<DialogConfig, "variant" | "onConfirm"> & {
      onConfirm?: () => unknown | Promise<unknown>;
    }
  ) => Promise<boolean>;
  /** Shows a custom dialog with full control over content */
  custom: (config: Omit<DialogConfig, "variant">) => void;
  /** Closes specific dialog by ID, or latest dialog if no ID provided */
  close: (id?: string) => void;
  /** Closes all open dialogs */
  closeAll: () => void;
  /** Sets loading state for dialog's confirm button */
  setLoading: (loading: boolean, id?: string) => void;
};

const DialogContext = createContext<DialogContextValue | null>(null);

const { Provider } = DialogContext;

type DialogProviderProps = {
  children: ReactNode;
};

/** Dialog provider component that manages global dialog state and rendering */
export const DialogProvider = ({ children }: DialogProviderProps) => {
  const [dialogs, setDialogs] = useState<QueuedDialog[]>([]);
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
  const dialogIdCounter = useRef(0);

  /** Generates unique dialog IDs */
  const generateId = useCallback(() => {
    dialogIdCounter.current += 1;

    return `dialog-${dialogIdCounter.current}`;
  }, []);

  /** Adds a dialog to the queue with optional promise resolver */
  const addDialog = useCallback(
    (config: DialogConfig, resolve?: (value: boolean) => void) => {
      const id = config.id || generateId();
      const dialogConfig: QueuedDialog = {
        ...config,
        id,
        resolve,
        isOpen: true,
        _resolved: false,
      };
      setDialogs((prev) => [...prev, dialogConfig]);
      return id;
    },
    [generateId]
  );

  /** "Hard" remove (after exit animation finished) */
  const removeDialog = useCallback((id: string) => {
    setDialogs((prev) => prev.filter((dialog) => dialog.id !== id));
    setLoadingStates((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  /** Trigger exit animation by flipping `isOpen` to false (do not unmount yet) */
  const softClose = useCallback((id: string) => {
    setDialogs((prev) =>
      prev.map((dialog) => (dialog.id === id ? { ...dialog, isOpen: false } : dialog))
    );
  }, []);

  const success = useCallback(
    (config: Omit<DialogConfig, "variant">) => {
      addDialog({ ...config, variant: "success" });
    },
    [addDialog]
  );

  const error = useCallback(
    (config: Omit<DialogConfig, "variant">) => {
      addDialog({ ...config, variant: "error" });
    },
    [addDialog]
  );

  const warning = useCallback(
    (config: Omit<DialogConfig, "variant">) => {
      addDialog({ ...config, variant: "warning" });
    },
    [addDialog]
  );

  const info = useCallback(
    (config: Omit<DialogConfig, "variant">) => {
      addDialog({ ...config, variant: "info" });
    },
    [addDialog]
  );

  const confirm = useCallback(
    (
      config: Omit<DialogConfig, "variant" | "onConfirm"> & {
        onConfirm?: () => unknown | Promise<unknown>;
      }
    ): Promise<boolean> => {
      return new Promise((resolve) => {
        addDialog(
          {
            ...config,
            variant: "confirm",
            showCancel: config.showCancel !== false,
            onConfirm: config.onConfirm,
          },
          resolve
        );
      });
    },
    [addDialog]
  );

  const custom = useCallback(
    (config: Omit<DialogConfig, "variant">) => {
      addDialog({ ...config, variant: "custom" });
    },
    [addDialog]
  );

  const close = useCallback(
    (id?: string) => {
      if (id) softClose(id);
      else if (dialogs.length > 0) softClose(dialogs[dialogs.length - 1].id);
    },
    [dialogs, softClose]
  );

  const closeAll = useCallback(() => {
    setDialogs((prev) => prev.map((dialog) => ({ ...dialog, isOpen: false })));
  }, []);

  const setLoading = useCallback(
    (loading: boolean, id?: string) => {
      if (id) setLoadingStates((prev) => ({ ...prev, [id]: loading }));
      else if (dialogs.length > 0) {
        const lastDialogId = dialogs[dialogs.length - 1].id;
        setLoadingStates((prev) => ({ ...prev, [lastDialogId]: loading }));
      }
    },
    [dialogs]
  );

  /** Returns styling configuration for different dialog variants */
  const getVariantStyles = useCallback((variant: DialogVariant) => {
    switch (variant) {
      case "error":
        return {
          titleClassName: "text-destructive",
          confirmButtonVariant: "solid" as const,
          iconBackgroundClassName: "bg-red-100 dark:bg-red-900/30",
          iconClassName: "text-red-500",
        };
      case "success":
        return {
          titleClassName: "text-green-600",
          confirmButtonVariant: "solid" as const,
          iconBackgroundClassName: "bg-green-100 dark:bg-green-900/30",
          iconClassName: "text-green-500",
        };
      case "warning":
        return {
          titleClassName: "text-amber-600",
          confirmButtonVariant: "solid" as const,
          iconBackgroundClassName: "bg-amber-100 dark:bg-amber-900/30",
          iconClassName: "text-amber-500",
        };
      case "info":
        return {
          titleClassName: "text-blue-600",
          confirmButtonVariant: "solid" as const,
          iconBackgroundClassName: "bg-blue-100 dark:bg-blue-900/30",
          iconClassName: "text-blue-500",
        };
      case "confirm":
        return {
          titleClassName: "",
          confirmButtonVariant: "solid" as const,
          iconBackgroundClassName: "bg-red-100 dark:bg-red-900/30",
          iconClassName: "text-red-500",
        };
      default:
        return {
          titleClassName: "",
          confirmButtonVariant: "solid" as const,
          iconBackgroundClassName: "",
          iconClassName: "",
        };
    }
  }, []);

  /** Handles dialog confirmation with loading state and error handling */
  const handleConfirm = useCallback(
    async (dialog: QueuedDialog) => {
      if (loadingStates[dialog.id]) return;

      setLoadingStates((prev) => ({ ...prev, [dialog.id]: true }));
      try {
        if (dialog.onConfirm) {
          await Promise.resolve(dialog.onConfirm()); // await user action (e.g., mutateAsync)
        }

        // Mark this dialog as resolved
        setDialogs((prev) =>
          prev.map((dialog) => (dialog.id === dialog.id ? { ...dialog, _resolved: true } : dialog))
        );

        if (dialog.resolve && !dialog._resolved) dialog.resolve(true);

        // success → start exit animation
        softClose(dialog.id);
      } catch {
        // keep the dialog open; optionally surface an error message here
        if (dialog.resolve && !dialog._resolved) dialog.resolve(false);
      } finally {
        setLoadingStates((prev) => ({ ...prev, [dialog.id]: false }));
      }
    },
    [loadingStates, softClose]
  );

  const handleCancel = useCallback(
    (dialog: QueuedDialog) => {
      if (dialog.onCancel) dialog.onCancel();
      if (dialog.resolve && !dialog._resolved) dialog.resolve(false);
      // Trigger exit animation; actual unmount happens onAnimationEnd
      softClose(dialog.id);
    },
    [softClose]
  );

  /** Final cleanup *after* the exit animation ends */
  const handleClosedCleanup = useCallback(
    (dialog: QueuedDialog) => {
      if (dialog.onClose) dialog.onClose();
      removeDialog(dialog.id);
    },
    [removeDialog]
  );

  const handleAnimationEnd = useCallback(
    (event: AnimationEvent<HTMLDivElement>, dialog: QueuedDialog) => {
      // Radix/shadcn sets data-state="closed" during exit
      const state = (event.currentTarget as HTMLElement).getAttribute("data-state");

      if (state === "closed") handleClosedCleanup(dialog);
    },
    [handleClosedCleanup]
  );

  const contextValue: DialogContextValue = {
    success,
    error,
    warning,
    info,
    confirm,
    custom,
    close,
    closeAll,
    setLoading,
  };

  return (
    <Provider value={contextValue}>
      {children}
      {dialogs.map((dialog) => {
        const { id, variant } = dialog;
        const styles = getVariantStyles(variant || "custom");
        const isLoading = loadingStates[id] || false;

        return (
          <DialogInstance
            key={id}
            dialog={dialog}
            styles={styles}
            isLoading={isLoading}
            onAnimationEnd={handleAnimationEnd}
            onClose={softClose}
            onCancelAction={handleCancel}
            onConfirmAction={handleConfirm}
          />
        );
      })}
    </Provider>
  );
};

export const useDialog = (): DialogContextValue => {
  const context = useContext(DialogContext);

  if (!context) throw new Error("useDialog must be used within a DialogProvider");

  return context;
};
