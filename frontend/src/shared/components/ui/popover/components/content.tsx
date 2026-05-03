import { Content, Portal } from "@radix-ui/react-popover";
import type { ComponentProps, FC } from "react";

import { classNameManager } from "@/shared/lib/css";

const { joinClasses } = classNameManager;

type Props = ComponentProps<typeof Content>;

export const PopoverContent: FC<Props> = ({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}) => {
  return (
    <Portal>
      <Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={joinClasses(
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 rounded-md border bg-gray-50 p-4 text-gray-950 shadow-md outline-none dark:bg-gray-900 dark:text-gray-50",
          className || ""
        )}
        {...props}
      />
    </Portal>
  );
};
