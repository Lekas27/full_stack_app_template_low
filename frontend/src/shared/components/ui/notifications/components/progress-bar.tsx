import { type FC, useCallback } from "react";

import type {
  NotificationConfig,
  NotificationVariant,
} from "@/shared/components/ui/notifications/context/types/notification";
import { classNameManager } from "@/shared/lib/css";

const { joinClasses } = classNameManager;

type Props = {
  isPaused: boolean;
  autoClose: number | undefined;
  variant: NotificationVariant | undefined;
};

export const NotificationItemProgressBar: FC<Props> = ({
  isPaused,
  autoClose,
  variant,
}) => {
  const getProgressBarColor = useCallback(
    (variant: NotificationConfig["variant"]) => {
      switch (variant) {
        case "success":
          return "bg-green-600 dark:bg-green-400";
        case "error":
          return "bg-red-600 dark:bg-red-400";
        case "warning":
          return "bg-amber-600 dark:bg-amber-400";
        case "info":
          return "bg-blue-600 dark:bg-blue-400";
        case "loading":
          return "bg-gray-600 dark:bg-gray-400";
        default:
          return "bg-gray-600 dark:bg-gray-400";
      }
    },
    []
  );

  return (
    <div className="absolute right-px bottom-0 left-px h-1 overflow-hidden rounded-b-lg bg-black/10 dark:bg-white/10">
      <div
        className={joinClasses(
          "h-full opacity-60",
          getProgressBarColor(variant)
        )}
        style={{
          width: "100%",
          animation: isPaused
            ? "none"
            : `shrink-width ${
                typeof autoClose === "number" ? autoClose : 5000
              }ms linear forwards`,
        }}
      />
    </div>
  );
};
