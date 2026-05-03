import type { ComponentProps, FC } from "react";

import { classNameManager } from "@/shared/lib/css";

const { joinClasses } = classNameManager;

type Props = ComponentProps<"span">;

export const CommandShortcut: FC<Props> = ({ className, ...props }) => {
  return (
    <span
      data-slot="command-shortcut"
      className={joinClasses(
        "ml-auto text-xs tracking-widest text-gray-500 dark:text-gray-400",
        className || ""
      )}
      {...props}
    />
  );
};
