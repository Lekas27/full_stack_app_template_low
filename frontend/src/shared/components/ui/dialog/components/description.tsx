import { Description } from "@radix-ui/react-dialog";
import type { ComponentProps, FC } from "react";

import { classNameManager } from "@/shared/lib/css";

const { mergeClasses } = classNameManager;

type Props = ComponentProps<typeof Description>;

export const DialogDescription: FC<Props> = ({ className, ...props }) => {
  return (
    <Description
      data-slot="dialog-description"
      className={mergeClasses(
        "text-sm text-gray-600 dark:text-gray-300",
        className || ""
      )}
      {...props}
    />
  );
};
