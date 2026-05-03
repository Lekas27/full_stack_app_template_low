import { type FC, useEffect, useRef } from "react";

import type { Props as InputProps } from "@/shared/components/ui/input";
import { classNameManager } from "@/shared/lib/css";

const { joinClasses } = classNameManager;

type Props = InputProps & {
  indeterminate?: boolean;
};

export const IndeterminateCheckbox: FC<Props> = ({
  indeterminate,
  className = "",
  checked,
  ...props
}) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof indeterminate === "boolean" && ref.current)
      ref.current.indeterminate = !checked && indeterminate;
  }, [ref, indeterminate, checked]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className={joinClasses(
        className || "",
        "dark:text-dark-1 dark:checked:text-primary-5 dark:indeterminate:text-primary-5 dark:bg-dark-1 dark:checked:bg-primary-5 dark:indeterminate:bg-primary-5 dark:border-dark-1 theme-transition mx-auto h-5 w-5 cursor-pointer rounded border border-gray-300 !p-0 text-white checked:text-blue-500 indeterminate:text-blue-500"
      )}
      checked={checked}
      {...props}
    />
  );
};
