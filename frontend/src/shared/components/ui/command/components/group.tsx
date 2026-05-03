import { Command as CommandPrimitive } from "cmdk";
import type { ComponentProps, FC } from "react";

import { classNameManager } from "@/shared/lib/css";

const { Group } = CommandPrimitive;
const { joinClasses } = classNameManager;

type Props = ComponentProps<typeof Group>;

export const CommandGroup: FC<Props> = ({ className, ...props }) => {
  return (
    <Group
      data-slot="command-group"
      className={joinClasses(
        "text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium",
        className || ""
      )}
      {...props}
    />
  );
};
