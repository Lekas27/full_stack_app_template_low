import type { FC, ReactNode } from "react";

import { classNameManager } from "@/shared/lib/css";

const { joinClasses } = classNameManager;

type Props = {
  hasLabel: boolean;
  children: ReactNode;
};

export const InputContainer: FC<Props> = ({ hasLabel, children }) => (
  <div
    className={joinClasses(
      hasLabel ? "mt-2" : "",
      "relative flex items-center gap-4"
    )}
  >
    {children}
  </div>
);
