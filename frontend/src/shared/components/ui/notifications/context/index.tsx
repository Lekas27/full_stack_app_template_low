import type { FC, ReactNode } from "react";
import { createContext, useCallback, useContext, useMemo } from "react";
import type { ToastContentProps, ToastOptions } from "react-toastify";
import { toast, ToastContainer } from "react-toastify";

import type { NotificationConfig } from "./types/notification";

import { NotificationItem } from "@/shared/components/ui/notifications/components/item";


type NotificationContextValue = {
  /** Shows a success notification with green styling */
  success: (config: Omit<NotificationConfig, "variant"> | string) => string;
  /** Shows an error notification with red styling */
  error: (config: Omit<NotificationConfig, "variant"> | string) => string;
  /** Shows an info notification with blue styling */
  info: (config: Omit<NotificationConfig, "variant"> | string) => string;
  /** Shows a warning notification with amber styling */
  warning: (config: Omit<NotificationConfig, "variant"> | string) => string;
  /** Shows a loading notification with spinner */
  loading: (config: Omit<NotificationConfig, "variant"> | string) => string;
  /** Shows a custom notification with full control over content */
  custom: (config: NotificationConfig) => string;
  /** Closes specific notification by ID, or latest notification if no ID provided */
  dismiss: (id?: string) => void;
  /** Closes all notifications */
  dismissAll: () => void;
  /** Updates an existing notification */
  update: (id: string, config: Partial<NotificationConfig>) => void;
};

const NotificationContext = createContext<NotificationContextValue | null>(
  null
);

const { Provider } = NotificationContext;

type Props = {
  children: ReactNode;
  /** Default options for all notifications */
  defaultOptions?: Partial<NotificationConfig>;
};

/** Notification provider component that manages global notification state and rendering */
export const NotificationProvider: FC<Props> = ({
  children,
  defaultOptions = {},
}) => {
  /** Default notification configuration */
  const baseConfig: Partial<NotificationConfig> = useMemo(
    () => ({
      autoClose: 5000,
      position: "top-right",
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      ...defaultOptions,
    }),
    [defaultOptions]
  );

  /** Helper to convert our config to react-toastify options */
  const mapToToastOptions = useCallback(
    (config: NotificationConfig): ToastOptions => {
      const mergedConfig = { ...baseConfig, ...config };
      // console.log(baseConfig, config);

      return {
        toastId: config.id,
        position: mergedConfig.position || "top-right",
        autoClose:
          mergedConfig.autoClose === false
            ? false
            : mergedConfig.autoClose ?? 5000,
        hideProgressBar: mergedConfig.hideProgressBar,
        closeOnClick: mergedConfig.closeOnClick,
        pauseOnHover: mergedConfig.pauseOnHover,
        draggable: mergedConfig.draggable,
        onClose: mergedConfig.onClose,
        className: mergedConfig.className,
      };
    },
    [baseConfig]
  );

  /** Adds a notification using react-toastify with custom component */
  const addNotification = useCallback(
    (config: NotificationConfig): string => {
      const options = mapToToastOptions(config);

      // Merge config with base defaults for the component
      // Ensure user-provided config overrides base defaults
      const mergedConfig = { ...baseConfig, ...config };

      // Use our custom NotificationItem component
      const content = (props: ToastContentProps) => (
        <NotificationItem {...props} data={mergedConfig} />
      );

      // Use toast() directly with our custom component - no default icons or styling
      const toastId = toast(content, {
        ...options,
        icon: false, // Disable default icons completely
        autoClose: false, // We handle auto-close in our component
        closeButton: false, // We handle close button in our component
      });

      return String(toastId);
    },
    [mapToToastOptions, baseConfig]
  );

  /** Helper to normalize config input (string or object) */
  const normalizeConfig = useCallback(
    (
      config: Omit<NotificationConfig, "variant"> | string
    ): Omit<NotificationConfig, "variant"> => {
      return typeof config === "string" ? { message: config } : config;
    },
    []
  );

  const success = useCallback(
    (config: Omit<NotificationConfig, "variant"> | string) => {
      const normalizedConfig = normalizeConfig(config);
      return addNotification({ ...normalizedConfig, variant: "success" });
    },
    [addNotification, normalizeConfig]
  );

  const error = useCallback(
    (config: Omit<NotificationConfig, "variant"> | string) => {
      const normalizedConfig = normalizeConfig(config);
      return addNotification({ ...normalizedConfig, variant: "error" });
    },
    [addNotification, normalizeConfig]
  );

  const info = useCallback(
    (config: Omit<NotificationConfig, "variant"> | string) => {
      const normalizedConfig = normalizeConfig(config);
      return addNotification({ ...normalizedConfig, variant: "info" });
    },
    [addNotification, normalizeConfig]
  );

  const warning = useCallback(
    (config: Omit<NotificationConfig, "variant"> | string) => {
      const normalizedConfig = normalizeConfig(config);
      return addNotification({ ...normalizedConfig, variant: "warning" });
    },
    [addNotification, normalizeConfig]
  );

  const loading = useCallback(
    (config: Omit<NotificationConfig, "variant"> | string) => {
      const normalizedConfig = normalizeConfig(config);
      return addNotification({
        ...normalizedConfig,
        variant: "loading",
        autoClose: false, // Loading notifications shouldn't auto-close
      });
    },
    [addNotification, normalizeConfig]
  );

  const custom = useCallback(
    (config: NotificationConfig) => {
      return addNotification(config);
    },
    [addNotification]
  );

  const dismiss = useCallback((id?: string) => {
    if (id) {
      toast.dismiss(id);
    } else {
      // Dismiss the most recent toast (react-toastify handles this automatically)
      toast.dismiss();
    }
  }, []);

  const dismissAll = useCallback(() => {
    toast.dismiss();
  }, []);

  const update = useCallback(
    (id: string, config: Partial<NotificationConfig>) => {
      const options = mapToToastOptions(config as NotificationConfig);
      const content = (props: ToastContentProps) => (
        <NotificationItem {...props} data={config as NotificationConfig} />
      );

      toast.update(id, {
        render: content,
        ...options,
      });
    },
    [mapToToastOptions]
  );

  const contextValue: NotificationContextValue = useMemo(
    () => ({
      success,
      error,
      info,
      warning,
      loading,
      custom,
      dismiss,
      dismissAll,
      update,
    }),
    [
      success,
      error,
      info,
      warning,
      loading,
      custom,
      dismiss,
      dismissAll,
      update,
    ]
  );

  return (
    <Provider value={contextValue}>
      {children}
      <ToastContainer
        position={baseConfig.position || "top-right"}
        autoClose={baseConfig.autoClose}
        hideProgressBar={baseConfig.hideProgressBar}
        closeOnClick={baseConfig.closeOnClick}
        closeButton={false}
        pauseOnHover={baseConfig.pauseOnHover}
        draggable={baseConfig.draggable}
        newestOnTop
        rtl={false}
        limit={5}
        toastClassName="!bg-transparent !p-0 !shadow-none !border-none !mb-2 !min-h-0"
      />
    </Provider>
  );
};

export const useNotifications = (): NotificationContextValue => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider"
    );
  }

  return context;
};
