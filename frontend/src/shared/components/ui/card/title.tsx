import type { ComponentProps, FC } from "react";

import { classNameManager } from "@/shared/lib/css";

const { joinClasses } = classNameManager;

type Props = ComponentProps<"div">;

export const CardTitle: FC<Props> = ({ className, ...props }) => {
  return (
    <div
      data-slot="card-title"
      className={joinClasses("leading-none font-semibold", className || "")}
      {...props}
    />
  );
};
