import type { FC } from "react";

import type {
  PaginationClassNames,
  PaginationStyles,
} from "@/shared/components/ui/table/components/pagination/types/styles";
import { classNameManager } from "@/shared/lib/css";

const { joinClasses } = classNameManager;

type Props = {
  uniqueKey: string | number;
  classes?: PaginationClassNames;
  styles?: PaginationStyles;
};

export const PaginationDots: FC<Props> = ({ uniqueKey, classes, styles }) => (
  <span
    key={uniqueKey}
    className={joinClasses(
      "border-gray-3 dark:border-dark-1 hover-transition relative inline-flex items-center border px-4 py-2 text-sm font-semibold focus:outline-offset-0 disabled:cursor-not-allowed dark:text-white",
      classes?.pageButton || ""
    )}
    style={styles?.pageButton}
  >
    ...
  </span>
);
