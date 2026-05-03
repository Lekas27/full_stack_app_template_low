import type { ComponentProps, FC } from "react";

import { classNameManager } from "@/shared/lib/css";

const { joinClasses } = classNameManager;

type Props = ComponentProps<"div">;

export const Skeleton: FC<Props> = ({ className, ...props }) => {
  return (
    <div
      data-slot="skeleton"
      className={joinClasses(
        "animate-pulse rounded-md bg-gray-200 dark:bg-gray-800",
        className || ""
      )}
      {...props}
    />
  );
};
