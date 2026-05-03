import { ColumnPinPosition } from "@/shared/components/ui/table/enums/columns";
import type { CustomColumnDef } from "@/shared/components/ui/table/types/columns";
import { classNameManager } from "@/shared/lib/css";

const { joinClasses } = classNameManager;

/**
 * Generates CSS classes for pinned columns.
 */
export const pinnedStyles = <Data>(
  columnDef: CustomColumnDef<Data>,
  isTotal?: boolean,
  isSelected?: boolean
) =>
  columnDef?.pin
    ? joinClasses(
        columnDef.pin === ColumnPinPosition.LEFT
          ? "left-0 border-r"
          : columnDef.pin === ColumnPinPosition.RIGHT
          ? "right-0 border-l"
          : "",
        isTotal || isSelected ? "!bg-blue-500 dark:!bg-blue-600" : "",
        "sticky border-gray-3 dark:border-dark-1"
      )
    : "";
