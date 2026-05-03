import type { ForwardRefExoticComponent, ReactNode, SVGProps } from "react";

/**
 * Dialog variants, one for every method.
 *
 * Extend when needed
 */
export type DialogVariant = "success" | "error" | "warning" | "info" | "confirm" | "custom";

/**
 * Config object for dialog methods
 */
export type DialogConfig = {
  id?: string;
  title: ReactNode;
  description?: ReactNode;
  content?: ReactNode;
  variant?: DialogVariant;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
  onConfirm?: () => unknown | Promise<unknown>;
  onCancel?: () => void;
  onClose?: () => void;
  confirmLoading?: boolean;
  destructive?: boolean;
  className?: string;
  icon?: ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, "ref">>;
  iconClassName?: string;
};

export type QueuedDialog = {
  id: string;
  resolve?: (value: boolean) => void;
  /** internal open state that lets Radix/shadcn animate out */
  isOpen?: boolean;
  /** internal resolve guard */
  _resolved?: boolean;
} & DialogConfig;
