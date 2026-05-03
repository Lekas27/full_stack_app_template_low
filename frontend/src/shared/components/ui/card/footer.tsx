import type { ComponentProps, FC } from "react";

import { classNameManager } from "@/shared/lib/css";

const { joinClasses } = classNameManager;

type Props = ComponentProps<"div">;

export const CardFooter: FC<Props> = ({ className, ...props }) => {
  return (
    <div
      data-slot="card-footer"
      className={joinClasses(
        "flex items-center px-6 [.border-t]:pt-6",
        className || ""
      )}
      {...props}
    />
  );
};
