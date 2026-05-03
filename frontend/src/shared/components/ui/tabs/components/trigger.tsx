import { Trigger } from "@radix-ui/react-tabs";
import type { ComponentProps, FC } from "react";

import { classNameManager } from "@/shared/lib/css";

const { mergeClasses } = classNameManager;

type Props = ComponentProps<typeof Trigger>;

export const TabsTrigger: FC<Props> = ({ className, ...props }) => {
  return (
    <Trigger
      data-slot="tabs-trigger"
      className={mergeClasses(
        "dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-gray-50 data-[state=active]:shadow-sm dark:text-gray-300 dark:text-gray-600 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className || ""
      )}
      {...props}
    />
  );
};
