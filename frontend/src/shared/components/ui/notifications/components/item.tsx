import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Info,
  LoaderCircle,
} from "lucide-react";
import { type FC, useCallback, useEffect, useMemo, useState } from "react";
import type { ToastContentProps } from "react-toastify";

import { NotificationCloseButton } from "./close-button";
import { NotificationItemProgressBar } from "./progress-bar";

import type { NotificationConfig } from "@/shared/components/ui/notifications/context/types/notification";
import { classNameManager } from "@/shared/lib/css";

const { joinClasses } = classNameManager;

type Props = ToastContentProps & {
  data?: NotificationConfig;
};

export const NotificationItem: FC<Props> = ({ closeToast, data }) => {
  const [isPaused, setIsPaused] = useState(false);

  const getVariantStyles = useCallback(
    (variant: NotificationConfig["variant"]) => {
      switch (variant) {
        case "success":
          return {
            containerClass:
              "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800",
            iconClass: "text-green-600 dark:text-green-400",
            icon: CheckCircle,
            textClass: "text-green-800 dark:text-green-200",
          };
        case "error":
          return {
            containerClass:
              "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800",
            iconClass: "text-red-600 dark:text-red-400",
            icon: AlertCircle,
            textClass: "text-red-800 dark:text-red-200",
          };
        case "warning":
          return {
            containerClass:
              "bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800",
            iconClass: "text-amber-600 dark:text-amber-400",
            icon: AlertTriangle,
            textClass: "text-amber-800 dark:text-amber-200",
          };
        case "info":
          return {
            containerClass:
              "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800",
            iconClass: "text-blue-600 dark:text-blue-400",
            icon: Info,
            textClass: "text-blue-800 dark:text-blue-200",
          };
        case "loading":
          return {
            containerClass:
              "bg-gray-50 border-gray-200 dark:bg-gray-900/20 dark:border-gray-800",
            iconClass: "text-gray-600 dark:text-gray-400",
            icon: null, // Will use spinner instead
            textClass: "text-gray-800 dark:text-gray-200",
          };
        default:
          return {
            containerClass:
              "bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-800",
            iconClass: "text-gray-600 dark:text-gray-400",
            icon: Info,
            textClass: "text-gray-800 dark:text-gray-200",
          };
      }
    },
    []
  );

  const styles = useMemo(
    () => getVariantStyles(data?.variant),
    [getVariantStyles, data?.variant]
  );

  const Icon = styles.icon;

  // Handle auto-close timer
  useEffect(() => {
    // Default to 5000ms if autoClose is not specified but not explicitly false
    const shouldAutoClose = data?.autoClose !== false;
    const duration =
      typeof data?.autoClose === "number" ? data.autoClose : 5000;

    if (!shouldAutoClose || isPaused) return;

    const timer = setTimeout(() => {
      if (closeToast) closeToast();
    }, duration);

    return () => clearTimeout(timer);
  }, [data?.autoClose, isPaused, closeToast]);

  const handleMouseEnter = useCallback(() => {
    if (data?.pauseOnHover !== false) setIsPaused(true);
  }, [data?.pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (data?.pauseOnHover !== false) setIsPaused(false);
  }, [data?.pauseOnHover]);

  return (
    <div
      className={joinClasses(
        "relative flex items-start gap-3 rounded-lg border p-4 shadow-md transition-all duration-200",
        styles.containerClass,
        data?.className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Icon */}
      <div className="flex-shrink-0 pt-0.5">
        {data?.variant === "loading" ? (
          <LoaderCircle
            className={joinClasses("h-5 w-5 animate-spin", styles.iconClass)}
          />
        ) : (
          Icon && <Icon className={joinClasses("h-5 w-5", styles.iconClass)} />
        )}
      </div>
      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className={joinClasses("text-sm font-medium", styles.textClass)}>
          {data?.message}
        </div>
        {data?.description && (
          <div
            className={joinClasses("mt-1 text-xs opacity-90", styles.textClass)}
          >
            {data.description}
          </div>
        )}
      </div>
      {/* Close button */}
      <NotificationCloseButton
        onClick={closeToast}
        className={styles.iconClass}
      />
      {/* Progress bar */}
      {data?.autoClose !== false && !data?.hideProgressBar && (
        <NotificationItemProgressBar
          isPaused={isPaused}
          autoClose={data?.autoClose}
          variant={data?.variant}
        />
      )}
    </div>
  );
};
