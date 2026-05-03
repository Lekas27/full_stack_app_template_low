import type { FC } from "react";

import type {
  PaginationClassNames,
  PaginationStyles,
} from "@/shared/components/ui/table/components/pagination/types/styles";
import { classNameManager } from "@/shared/lib/css";

const { joinClasses } = classNameManager;

type Props = {
  index: number;
  currentPageIndex: number;
  onChange: (value: number) => void;
  classes?: PaginationClassNames;
  styles?: PaginationStyles;
};

export const PaginationPageNumber: FC<Props> = ({
  index,
  currentPageIndex,
  onChange,
  classes,
  styles,
}) => (
  <button
    key={index}
    aria-current="page"
    disabled={currentPageIndex === index}
    onClick={() => onChange(index - 1)}
    className={joinClasses(
      classes?.pageButton || "",
      currentPageIndex === index
        ? joinClasses(
            classes?.pageButtonActive || "",
            "bg-opacity-30 z-10 bg-blue-500 font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          )
        : joinClasses(
            classes?.pageButtonInactive || "",
            "dark:hover:bg-dark-2 font-light hover:bg-gray-50 focus:outline-offset-0 dark:text-white dark:hover:text-black"
          ),
      "border-gray-3 dark:border-dark-1 hover-transition relative inline-flex cursor-pointer items-center border px-4 py-2 text-sm focus:z-20 disabled:cursor-not-allowed"
    )}
    style={styles?.pageButton}
  >
    {index}
  </button>
);
