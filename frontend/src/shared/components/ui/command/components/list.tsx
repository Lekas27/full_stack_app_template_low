import { Command as CommandPrimitive } from "cmdk";
import type { ComponentProps, FC } from "react";

import { classNameManager } from "@/shared/lib/css";

const { List } = CommandPrimitive;
const { joinClasses } = classNameManager;

type Props = ComponentProps<typeof List>;

export const CommandList: FC<Props> = ({ className, ...props }) => {
  return (
    <List
      data-slot="command-list"
      className={joinClasses(
        "max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto",
        className || ""
      )}
      {...props}
    />
  );
};
