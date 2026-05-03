import { Fallback } from "@radix-ui/react-avatar";
import type { ComponentProps, FC } from "react";

import { classNameManager } from "@/shared/lib/css";

const { joinClasses } = classNameManager;

type Props = ComponentProps<typeof Fallback>;

export const AvatarFallback: FC<Props> = ({ className, ...props }) => {
  return (
    <Fallback
      data-slot="avatar-fallback"
      className={joinClasses(
        "flex h-full w-full items-center justify-center rounded-full bg-gray-50 dark:bg-gray-950",
        className || ""
      )}
      {...props}
    />
  );
};
