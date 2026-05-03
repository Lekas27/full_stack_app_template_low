import type { ReactNode } from "react";
import type { ToastOptions } from "react-toastify";

/**
 * Notification variants, one for every method.
 *
 * Extend when needed
 */
export type NotificationVariant = "success" | "error" | "warning" | "info" | "loading";

/**
 * Config object for notification methods
 */
export type NotificationConfig = {
  id?: string;
  message: ReactNode;
  description?: ReactNode;
  variant?: NotificationVariant;
  autoClose?: number | false;
  position?: ToastOptions["position"];
  onClose?: () => void;
  className?: string;
  hideProgressBar?: boolean;
  closeOnClick?: boolean;
  pauseOnHover?: boolean;
  draggable?: boolean;
};

export type QueuedNotification = {
  id: string;
  timestamp: number;
} & NotificationConfig;
