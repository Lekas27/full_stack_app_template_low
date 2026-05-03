import { Command as CommandPrimitive } from "cmdk";
import type { ComponentProps, FC } from "react";

import { classNameManager } from "@/shared/lib/css";

const { joinClasses } = classNameManager;

type Props = ComponentProps<typeof CommandPrimitive>;

export const Command: FC<Props> = ({ className, ...props }) => {
  return (
    <CommandPrimitive
      data-slot="command"
      className={joinClasses(
        "bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md",
        className || ""
      )}
      {...props}
    />
  );
};
