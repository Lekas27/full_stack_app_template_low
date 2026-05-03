import type { ComponentProps, FC } from "react";

import { classNameManager } from "@/shared/lib/css";

const { mergeClasses } = classNameManager;

type Props = ComponentProps<"div">;

export const SheetFooter: FC<Props> = ({ className, ...props }) => (
  <div
    data-slot="sheet-footer"
    className={mergeClasses("mt-auto flex flex-col gap-2 p-4", className)}
    {...props}
  />
);
