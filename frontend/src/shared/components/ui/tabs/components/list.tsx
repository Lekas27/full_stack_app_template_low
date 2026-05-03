import { List } from "@radix-ui/react-tabs";
import type { ComponentProps, FC } from "react";

import { classNameManager } from "@/shared/lib/css";

const { mergeClasses } = classNameManager;

type Props = ComponentProps<typeof List>;

export const TabsList: FC<Props> = ({ className, ...props }) => {
  return (
    <List
      data-slot="tabs-list"
      className={mergeClasses(
        "inline-flex h-9 w-fit items-center justify-center rounded-lg bg-gray-50 p-[3px] text-gray-600 dark:bg-gray-900 dark:text-gray-300",
        className || ""
      )}
      {...props}
    />
  );
};
