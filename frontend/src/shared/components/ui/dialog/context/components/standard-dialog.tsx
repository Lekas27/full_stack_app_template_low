import type { FC } from "react";

import { Button } from "@/shared/components/ui/button";
import type { ButtonVariantProps } from "@/shared/components/ui/button/styles/variants";
import { DialogDescription } from "@/shared/components/ui/dialog/components/description";
import { DialogFooter } from "@/shared/components/ui/dialog/components/footer";
import { DialogHeader } from "@/shared/components/ui/dialog/components/header";
import { DialogTitle } from "@/shared/components/ui/dialog/components/title";
import type { QueuedDialog } from "@/shared/components/ui/dialog/context/types/dialog";

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

export const StandardDialog: FC<Props> = ({
  dialog,
  styles,
  isLoading,
  onCancelAction,
  onConfirmAction,
}) => {
  const {
    title,
    description,
    content,
    onConfirm,
    showCancel,
    cancelText,
    destructive,
    confirmText,
  } = dialog;

  return (
    <>
      <DialogHeader>
        <DialogTitle className={styles.titleClassName}>{title}</DialogTitle>
        {description && <DialogDescription>{description}</DialogDescription>}
      </DialogHeader>
      {content && <div className="py-4">{content}</div>}
      {(onConfirm || showCancel !== false) && (
        <DialogFooter>
          {showCancel !== false && (
            <Button
              variant="outline"
              onClick={() => onCancelAction(dialog)}
              disabled={isLoading}
            >
              {cancelText || "Cancel"}
            </Button>
          )}
          {onConfirm && (
            <Button
              variant="solid"
              color={destructive ? "danger" : "default"}
              onClick={() => onConfirmAction(dialog)}
              loading={isLoading}
              disabled={isLoading}
            >
              {confirmText || "Confirm"}
            </Button>
          )}
        </DialogFooter>
      )}
    </>
  );
};
