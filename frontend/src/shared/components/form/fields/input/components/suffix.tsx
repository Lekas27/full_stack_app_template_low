import { forwardRef, type ReactNode } from "react";

import { classNameManager } from "@/shared/lib/css";

const { joinClasses } = classNameManager;

const sufixInputClassnames =
  "absolute inset-y-0 right-0 flex items-center pr-2.5 text-sm text-secondary-1 dark:text-gray-1 theme-transition";

type Props = {
  children: ReactNode;
  className?: string;
};

export const InputSuffix = forwardRef<HTMLDivElement, Props>(
  ({ children, className }, ref) => (
    <div
      ref={ref}
      className={joinClasses(sufixInputClassnames, className || "")}
    >
      {children}
    </div>
  )
);

InputSuffix.displayName = "InputSuffix";
