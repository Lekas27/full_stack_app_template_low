import type { Row, Table } from "@tanstack/react-table";
import type { ReactNode } from "react";

import { classNameManager } from "@/shared/lib/css";

const { joinClasses } = classNameManager;

export type Props<Data> = {
  className?: string;
  row: Row<Data>;
  table: Table<Data>;
  content: ReactNode;
};

export const ExpandedTableRow = <T,>({
  className,
  row,
  table,
  content,
}: Props<T>) => {
  const { getCanSelect, getIsSelected } = row;
  const { getAllColumns, getState } = table;

  return (
    <tr>
      <td
        colSpan={getAllColumns().length}
        className={joinClasses(
          getState().rowSelection && getCanSelect() && getIsSelected()
            ? "text-primary bg-accent"
            : "text-foreground dark:bg-dark-2 bg-white",
          "border-gray-3 dark:border-dark-1 theme-transition border-r py-4 pr-3 pl-7 text-sm whitespace-nowrap",
          className || ""
        )}
      >
        {content}
      </td>
    </tr>
  );
};
