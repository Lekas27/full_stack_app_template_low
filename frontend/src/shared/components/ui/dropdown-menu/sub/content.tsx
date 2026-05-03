import { SubContent } from "@radix-ui/react-dropdown-menu";
import type { ComponentProps, FC } from "react";

import { classNameManager } from "@/shared/lib/css";

const { joinClasses } = classNameManager;

type Props = ComponentProps<typeof SubContent>;

export const DropdownMenuSubContent: FC<Props> = ({ className, ...props }) => {
  return (
    <SubContent
      data-slot="dropdown-menu-sub-content"
      className={joinClasses(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-md border bg-gray-50 p-1 text-gray-950 shadow-lg dark:bg-gray-900 dark:text-gray-50",
        className || ""
      )}
      {...props}
    />
  );
};
