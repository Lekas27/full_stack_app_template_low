import { type Column } from "@tanstack/react-table";
import { type CSSProperties } from "react";

import { ColumnPinPosition } from "@/shared/components/ui/table/enums/columns";

export const getCommonColumnPinningStyles = <T>(
  column: Column<T>
): CSSProperties => {
  const isPinned = column.getIsPinned();
  const isLastLeftPinnedColumn =
    isPinned === ColumnPinPosition.LEFT &&
    column.getIsLastColumn(ColumnPinPosition.LEFT);
  const isFirstRightPinnedColumn =
    isPinned === ColumnPinPosition.RIGHT &&
    column.getIsFirstColumn(ColumnPinPosition.RIGHT);

  return {
    boxShadow: isLastLeftPinnedColumn
      ? "-4px 0 4px -4px gray inset"
      : isFirstRightPinnedColumn
      ? "4px 0 4px -4px gray inset"
      : undefined,
    left:
      isPinned === ColumnPinPosition.LEFT
        ? `${column.getStart(ColumnPinPosition.LEFT)}px`
        : undefined,
    right:
      isPinned === ColumnPinPosition.RIGHT
        ? `${column.getAfter(ColumnPinPosition.RIGHT)}px`
        : undefined,
    opacity: isPinned ? 0.95 : 1,
    position: isPinned ? "sticky" : "relative",
    zIndex: isPinned ? 1 : 0,
  };
};
