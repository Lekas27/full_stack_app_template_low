import type { ComponentProps, FC } from "react";

import { classNameManager } from "@/shared/lib/css";

const { joinClasses } = classNameManager;

type Props = ComponentProps<"div">;

export const CardDescription: FC<Props> = ({ className, ...props }) => {
  return (
    <div
      data-slot="card-description"
      className={joinClasses(
        "text-sm text-gray-600 dark:text-gray-300",
        className || ""
      )}
      {...props}
    />
  );
};
