import { Title } from "@radix-ui/react-dialog";
import type { ComponentProps, FC } from "react";

import { classNameManager } from "@/shared/lib/css";

const { mergeClasses } = classNameManager;

type Props = ComponentProps<typeof Title>;

export const DialogTitle: FC<Props> = ({ className, ...props }) => {
  return (
    <Title
      data-slot="dialog-title"
      className={mergeClasses(
        "text-lg leading-none font-semibold",
        className || ""
      )}
      {...props}
    />
  );
};
