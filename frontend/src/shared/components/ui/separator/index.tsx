import { Root as SeparatorRoot } from "@radix-ui/react-separator";
import type { ComponentProps, FC } from "react";

import { classNameManager } from "@/shared/lib/css";

const { joinClasses } = classNameManager;

type Props = ComponentProps<typeof SeparatorRoot>;

export const Separator: FC<Props> = ({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) => {
  return (
    <SeparatorRoot
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={joinClasses(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className || ""
      )}
      {...props}
    />
  );
};
