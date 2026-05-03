import { Content } from "@radix-ui/react-tabs";
import type { ComponentProps, FC } from "react";

import { classNameManager } from "@/shared/lib/css";

const { mergeClasses } = classNameManager;

type Props = ComponentProps<typeof Content>;

export const TabsContent: FC<Props> = ({ className, ...props }) => {
  return (
    <Content
      data-slot="tabs-content"
      className={mergeClasses("flex-1 outline-none", className || "")}
      {...props}
    />
  );
};
