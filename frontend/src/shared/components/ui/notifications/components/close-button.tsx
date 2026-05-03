import { X } from "lucide-react";
import { type FC } from "react";
import type { ToastContentProps } from "react-toastify";

import { classNameManager } from "@/shared/lib/css.ts";

const { joinClasses } = classNameManager;

type Props = {
  onClick: ToastContentProps["closeToast"];
  className: string;
};

export const NotificationCloseButton: FC<Props> = ({ onClick, className }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={joinClasses(
        "shrink-0 cursor-pointer rounded-md p-1 transition-colors duration-200 hover:opacity-70",
        // styles.iconClass
        className
      )}
      aria-label="Close notification"
    >
      <X className="h-4 w-4" />
    </button>
  );
};
