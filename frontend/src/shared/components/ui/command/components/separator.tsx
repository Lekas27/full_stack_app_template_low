import { Command as CommandPrimitive } from "cmdk";
import type { ComponentProps, FC } from "react";

import { classNameManager } from "@/shared/lib/css";

const { Separator } = CommandPrimitive;
const { joinClasses } = classNameManager;

type Props = ComponentProps<typeof Separator>;

export const CommandSeparator: FC<Props> = ({ className, ...props }) => {
  return (
    <Separator
      data-slot="command-separator"
      className={joinClasses(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className || ""
      )}
      {...props}
    />
  );
};
