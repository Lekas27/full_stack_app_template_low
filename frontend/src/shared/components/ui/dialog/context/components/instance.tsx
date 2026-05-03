import { useCallback, useMemo, type AnimationEvent, type FC } from "react";

import { ConfirmDialog } from "./confirm-dialog";
import { StandardDialog } from "./standard-dialog";

import type { ButtonVariantProps } from "@/shared/components/ui/button/styles/variants";
import { Dialog } from "@/shared/components/ui/dialog";
import { DialogContent } from "@/shared/components/ui/dialog/components/content";
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
  onAnimationEnd: (
    event: AnimationEvent<HTMLDivElement>,
    dialog: QueuedDialog
  ) => void;
  onClose: (id: string) => void;
  onCancelAction: (dialog: QueuedDialog) => void;
  onConfirmAction: (dialog: QueuedDialog) => Promise<void>;
};

export const DialogInstance: FC<Props> = ({
  dialog,
  styles,
  isLoading,
  onAnimationEnd,
  onClose,
  onCancelAction,
  onConfirmAction,
}) => {
  const { id, isOpen, className, variant, destructive } = dialog;

  /**
   * Flip open state to trigger exit animation; cleanup will occur `onAnimationEnd`
   *
   * NOTE: Don't allow closing (overlay click / ESC) while loading.
   */
  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open && !isLoading) onClose(id);
    },
    [id, isLoading, onClose]
  );

  // Use refined styling for confirm dialogs and destructive actions
  const isConfirmVariant = useMemo(
    () => variant === "confirm" || (destructive && variant !== "custom"),
    [destructive, variant]
  );

  return (
    <Dialog open={isOpen ?? true} onOpenChange={handleOpenChange}>
      <DialogContent
        className={joinClasses(
          isConfirmVariant
            ? "max-w-sm rounded-3xl border-0 bg-white shadow-2xl dark:bg-gray-900"
            : "",
          className
        )}
        showCloseButton={variant !== "confirm"}
        onAnimationEnd={(event) => onAnimationEnd(event, dialog)}
      >
        {isConfirmVariant ? (
          <ConfirmDialog
            dialog={dialog}
            styles={styles}
            isLoading={isLoading}
            onCancelAction={onCancelAction}
            onConfirmAction={onConfirmAction}
          />
        ) : (
          <StandardDialog
            dialog={dialog}
            styles={styles}
            isLoading={isLoading}
            onCancelAction={onCancelAction}
            onConfirmAction={onConfirmAction}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
