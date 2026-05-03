import type { ComponentProps, FC } from "react";

import { classNameManager } from "@/shared/lib/css";

const { joinClasses } = classNameManager;

type Props = ComponentProps<"div">;

export const CardAction: FC<Props> = ({ className, ...props }) => {
  return (
    <div
      data-slot="card-action"
      className={joinClasses(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className || ""
      )}
      {...props}
    />
  );
};
