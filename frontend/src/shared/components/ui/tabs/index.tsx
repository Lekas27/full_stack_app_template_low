import { Root } from "@radix-ui/react-tabs";
import type { ComponentProps, FC } from "react";

import { classNameManager } from "@/shared/lib/css";

const { mergeClasses } = classNameManager;

type Props = ComponentProps<typeof Root>;

export const Tabs: FC<Props> = ({ className, ...props }) => {
  return (
    <Root
      data-slot="tabs"
      className={mergeClasses("flex flex-col gap-2", className || "")}
      {...props}
    />
  );
};
