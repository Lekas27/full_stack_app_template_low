import { Indicator, Root } from "@radix-ui/react-progress";
import type { ComponentProps, FC } from "react";

import { classNameManager } from "@/shared/lib/css";

const { joinClasses } = classNameManager;

type Props = ComponentProps<typeof Root>;

export const Progress: FC<Props> = ({ className, value, ...props }) => {
  return (
    <Root
      data-slot="progress"
      className={joinClasses(
        "relative h-2 w-full overflow-hidden rounded-full bg-gray-900/20 dark:bg-gray-100/20",
        className || ""
      )}
      {...props}
    >
      <Indicator
        data-slot="progress-indicator"
        className="h-full w-full flex-1 bg-gray-900 transition-all dark:bg-gray-100"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </Root>
  );
};
