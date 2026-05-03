import type { ComponentProps, FC } from "react";

import { classNameManager } from "@/shared/lib/css";

const { mergeClasses } = classNameManager;

type Props = ComponentProps<"div">;

export const SheetHeader: FC<Props> = ({ className, ...props }) => (
  <div
    data-slot="sheet-header"
    className={mergeClasses("flex flex-col gap-1.5 p-4", className)}
    {...props}
  />
);
