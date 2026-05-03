import {
  AlertTriangleIcon,
  CheckCircleIcon,
  InfoIcon,
  Trash2Icon,
  XCircleIcon,
} from "lucide-react";
import { useCallback, type FC } from "react";

import { Button } from "@/shared/components/ui/button";
import type { ButtonVariantProps } from "@/shared/components/ui/button/styles/variants";
import { DialogDescription } from "@/shared/components/ui/dialog/components/description";
import { DialogTitle } from "@/shared/components/ui/dialog/components/title";
import type { QueuedDialog } from "@/shared/components/ui/dialog/context/types/dialog";
import { classNameManager } from "@/shared/lib/css";

const { joinClasses } = classNameManager;

type Props = {
  dialog: QueuedDialog;
  styles: {
    titleClassName: string;
    confirmButtonVariant: NonNullable<ButtonVariantProps["variant"]>;
    iconBackgroundClassName: string;
    iconClassName: string;
  };
  isLoading: boolean;
  onCancelAction: (dialog: QueuedDialog) => void;
  onConfirmAction: (dialog: QueuedDialog) => Promise<void>;
};

export const ConfirmDialog: FC<Props> = ({
  dialog,
  styles,
  isLoading,
  onCancelAction,
  onConfirmAction,
}) => {
  const {
    variant,
    title,
    description,
    content,
    onConfirm,
    showCancel,
    cancelText,
    destructive,
    confirmText,
    icon,
    iconClassName,
  } = dialog;

  // Get default icon based on variant if no custom icon is provided
  const getDefaultIcon = useCallback(() => {
    if (icon) return icon;

    switch (variant) {
      case "success":
        return CheckCircleIcon;
      case "error":
        return XCircleIcon;
      case "warning":
        return AlertTriangleIcon;
      case "info":
        return InfoIcon;
      default:
        if (destructive) return Trash2Icon;

        return null;
    }
  }, [destructive, icon, variant]);

  const IconComponent = getDefaultIcon();

  return (
    <div className="px-4 py-8 text-center">
      {IconComponent && (
        <div
          className={joinClasses(
            "mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full",
            styles.iconBackgroundClassName
          )}
        >
          <IconComponent
            className={joinClasses(
              "h-10 w-10",
              styles.iconClassName,
              iconClassName
            )}
          />
        </div>
      )}

      <div className="mb-8">
        <DialogTitle
          className={joinClasses(
            "mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100",
            styles.titleClassName
          )}
        >
          {title}
        </DialogTitle>
        {description && (
          <DialogDescription className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            {description}
          </DialogDescription>
        )}
      </div>

      {content && <div className="mb-6">{content}</div>}

      <div className="space-y-3">
        {(onConfirm || variant === "confirm") && (
          <Button
            variant="solid"
            color={destructive ? "danger" : "default"}
            shape="pill"
            onClick={() => onConfirmAction(dialog)}
            loading={isLoading}
            disabled={isLoading}
            className="w-full rounded-full border-0 py-3 font-medium shadow-lg"
          >
            {confirmText || "Confirm"}
          </Button>
        )}
        {showCancel !== false && (
          <Button
            variant="ghost"
            color="default"
            shape="pill"
            onClick={() => onCancelAction(dialog)}
            disabled={isLoading}
            className="w-full py-3 font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
          >
            {cancelText || "Cancel"}
          </Button>
        )}
      </div>
    </div>
  );
};
