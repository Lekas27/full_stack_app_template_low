import { type CellContext } from "@tanstack/react-table";

import { getTableCellWidth } from "./size";

import type { TableColumnRecord } from "@/shared/components/ui/table/types/columns";

/**
 * Converts TableColumnRecord (that we use for generating table columns) to TableColumnRecord which is a format used by table API.
 */
export const parseTableColumn = <Data>({
  name,
  header,
  render,
  enableSorting,
  enableDragging,
  enablePinning,
  enableHiding,
  pin,
  enableResizing,
  size,
  minSize,
  maxSize,
  cellPaddings,
  enableGrouping,
}: TableColumnRecord<Data>) => ({
  id: String(name),
  header: () => header,
  accessorKey: String(name),
  cell: ({ row, renderValue, cell }: CellContext<Data, unknown>) =>
    render ? render(row, cell) : renderValue(),
  enableSorting,
  enableDragging,
  enablePinning,
  enableHiding,
  enableGrouping,
  pin,
  enableResizing,
  ...(size && { size: getTableCellWidth(size, cellPaddings) }),
  ...(minSize && { minSize: getTableCellWidth(minSize, cellPaddings) }),
  ...(maxSize && { maxSize: getTableCellWidth(maxSize, cellPaddings) }),
});
