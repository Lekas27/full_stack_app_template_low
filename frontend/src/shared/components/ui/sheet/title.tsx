import { Title } from "@radix-ui/react-dialog";
import type { ComponentProps, FC } from "react";

import { classNameManager } from "@/shared/lib/css";

const { mergeClasses } = classNameManager;

type Props = ComponentProps<typeof Title>;

export const SheetTitle: FC<Props> = (props) => (
  <Title
    data-slot="sheet-title"
    className={mergeClasses("text-foreground font-semibold")}
    {...props}
  />
);
