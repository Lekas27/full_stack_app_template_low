import type { ComponentProps, FC } from "react";

import { classNameManager } from "@/shared/lib/css";

const { joinClasses } = classNameManager;

type Props = ComponentProps<"div">;

export const CardContent: FC<Props> = ({ className, ...props }) => {
  return (
    <div
      data-slot="card-content"
      className={joinClasses("px-6", className || "")}
      {...props}
    />
  );
};
