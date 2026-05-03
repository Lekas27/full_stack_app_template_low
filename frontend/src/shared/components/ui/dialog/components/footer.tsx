import type { ComponentProps, FC } from "react";

import { classNameManager } from "@/shared/lib/css";

const { mergeClasses } = classNameManager;

type Props = ComponentProps<"div">;

export const DialogFooter: FC<Props> = ({ className, ...props }) => {
  return (
    <div
      data-slot="dialog-footer"
      className={mergeClasses(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className || ""
      )}
      {...props}
    />
  );
};
