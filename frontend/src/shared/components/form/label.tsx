import type { FC, ReactNode } from "react";

import { RequiredAsterisk } from "./required-asterisk";

import { classNameManager } from "@/shared/lib/css";


const { joinClasses } = classNameManager;

type Props = {
  className?: string;
  htmlFor?: string;
  label?: ReactNode;
  required?: boolean;
  tooltip?: ReactNode;
};

export const Label: FC<Props> = ({ className, htmlFor, required, label }) => (
  <>
    {label && (
      <label
        htmlFor={htmlFor}
        className={joinClasses(
          "text-secondary-1 theme-transition flex items-center gap-3 text-sm hover:cursor-pointer sm:text-base dark:text-white",
          className || ""
        )}
      >
        <span className="flex">
          {required && (
            <>
              <RequiredAsterisk />
            </>
          )}
          {label}
        </span>
      </label>
    )}
  </>
);
