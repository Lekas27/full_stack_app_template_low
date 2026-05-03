import type { ComponentProps, FC } from "react";

import { classNameManager } from "@/shared/lib/css";

const { joinClasses } = classNameManager;

type Props = ComponentProps<"span">;

export const DropdownMenuShortcut: FC<Props> = ({ className, ...props }) => {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={joinClasses(
        "ml-auto text-xs tracking-widest text-gray-600 dark:text-gray-300",
        className || ""
      )}
      {...props}
    />
  );
};
