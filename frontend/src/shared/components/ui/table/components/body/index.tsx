import { type Table } from "@tanstack/react-table";
import { useCallback, useMemo, useState, type ReactNode } from "react";

import { TableBodyRow } from "./row";

import { type Props as TableCellProps } from "@/shared/components/ui/table/components/cell";
import type { TableVariants } from "@/shared/components/ui/table/enums/table";
import { type CellPaddingsRecord } from "@/shared/components/ui/table/utils/size";
import { classNameManager } from "@/shared/lib/css";

const { joinClasses } = classNameManager;

export type Props<Data> = {
  table: Table<Data>;
  tableBodyClassName?: string;
  rowClassName?: string;
  cellClassName?: TableCellProps<Data>["className"];
  cellStyle?: TableCellProps<Data>["style"];
  expandable?: { rowId: string; content: ReactNode }[];
  expandToggleLocation?: TableCellProps<Data>["expandToggleLocation"];
  expandToggleIcons?: TableCellProps<Data>["expandToggleIcons"];
  expandToggleClassName?: TableCellProps<Data>["expandToggleClassName"];
  selectCheckboxLocation?: TableCellProps<Data>["selectCheckboxLocation"];
  selectCheckboxClassName?: TableCellProps<Data>["selectCheckboxClassName"];
  expandSingleRow?: boolean;
  expandSingleRowClassName?: string;
  expandAllSelectedRows?: boolean;
  onExpandAllSelectedRows: TableCellProps<Data>["onExpandAllSelectedRows"];
  cellPaddings?: CellPaddingsRecord;
  variant?: TableVariants;
  renderExpandedRowContent?: (rowData: Data, rowId: string) => ReactNode;
  enableRowResizing?: boolean;
};

export const TableBody = <Data,>({
  table,
  tableBodyClassName,
  rowClassName,
  cellClassName,
  cellStyle,
  expandable,
  expandToggleLocation,
  expandToggleIcons,
  expandToggleClassName,
  selectCheckboxLocation,
  selectCheckboxClassName,
  expandSingleRow,
  expandSingleRowClassName,
  expandAllSelectedRows,
  onExpandAllSelectedRows,
  cellPaddings,
  variant,
  renderExpandedRowContent,
  enableRowResizing,
}: Props<Data>) => {
  const { getRowModel, getState } = table;
  const { columnOrder } = getState();
  const [rowHeights, setRowHeights] = useState<Record<string, number>>({});

  const handleRowResize = useCallback((rowId: string, newHeight: number) => {
    setRowHeights((prevHeights) => ({
      ...prevHeights,
      [rowId]: newHeight,
    }));
  }, []);

  const expandedContentsById = useMemo(() => {
    const map: Record<string, ReactNode> = {};
    getRowModel().rows.forEach((row) => {
      const { id } = row;
      if (renderExpandedRowContent) {
        map[id] = renderExpandedRowContent(row.original, id);
      } else {
        const expand = expandable?.find(({ rowId }) => rowId === id);
        map[id] = expand?.content;
      }
    });
    return map;
  }, [expandable, renderExpandedRowContent, getRowModel]);

  return (
    <tbody
      className={joinClasses(
        tableBodyClassName || "",
        "relative divide-y divide-gray-200 rounded-xl"
      )}
    >
      {getRowModel().rows.map((row) => (
        <TableBodyRow
          key={row.id}
          row={row}
          table={table}
          rowHeight={rowHeights[row.id]}
          expandedContent={expandedContentsById[row.id]}
          columnOrder={columnOrder}
          rowClassName={rowClassName}
          cellClassName={cellClassName}
          cellStyle={cellStyle}
          cellPaddings={cellPaddings}
          variant={variant}
          expandToggleLocation={expandToggleLocation}
          expandToggleIcons={expandToggleIcons}
          expandToggleClassName={expandToggleClassName}
          selectCheckboxLocation={selectCheckboxLocation}
          selectCheckboxClassName={selectCheckboxClassName}
          expandAllSelectedRows={expandAllSelectedRows}
          onExpandAllSelectedRows={onExpandAllSelectedRows}
          enableRowResizing={enableRowResizing}
          handleRowResize={handleRowResize}
          expandSingleRow={expandSingleRow}
          expandSingleRowClassName={expandSingleRowClassName}
        />
      ))}
    </tbody>
  );
};
