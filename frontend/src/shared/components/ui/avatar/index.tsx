import { Root } from "@radix-ui/react-avatar";
import type { ComponentProps, FC } from "react";

import { classNameManager } from "@/shared/lib/css";

const { joinClasses } = classNameManager;

type Props = ComponentProps<typeof Root>;

export const Avatar: FC<Props> = ({ className, ...props }) => {
  return (
    <Root
      data-slot="avatar"
      className={joinClasses(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
        className || ""
      )}
      {...props}
    />
  );
};
