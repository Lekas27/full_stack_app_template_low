import type { ComponentProps, FC } from "react";

import { classNameManager } from "@/shared/lib/css";

const { mergeClasses } = classNameManager;

type Props = ComponentProps<"div">;

export const DialogHeader: FC<Props> = ({ className, ...props }) => {
  return (
    <div
      data-slot="dialog-header"
      className={mergeClasses("flex flex-col gap-2 text-left", className || "")}
      {...props}
    />
  );
};
