import { Separator } from "@radix-ui/react-dropdown-menu";
import type { ComponentProps, FC } from "react";

import { classNameManager } from "@/shared/lib/css";

const { joinClasses } = classNameManager;

type Props = ComponentProps<typeof Separator>;

export const DropdownMenuSeparator: FC<Props> = ({ className, ...props }) => {
  return (
    <Separator
      data-slot="dropdown-menu-separator"
      className={joinClasses("bg-border -mx-1 my-1 h-px", className || "")}
      {...props}
    />
  );
};
