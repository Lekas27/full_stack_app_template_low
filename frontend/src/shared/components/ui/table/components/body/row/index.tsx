import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { Row, Table } from "@tanstack/react-table";
import { cva } from "class-variance-authority";
import { Fragment, type JSX, type ReactNode } from "react";

import { ExpandedTableRow } from "@/shared/components/ui/table/components/body/expand/row";
import { TableRowResizer } from "@/shared/components/ui/table/components/body/resize";
import {
  TableCell,
  type Props as TableCellProps,
} from "@/shared/components/ui/table/components/cell";
import type { TableVariants } from "@/shared/components/ui/table/enums/table";
import type { CellPaddingsRecord } from "@/shared/components/ui/table/utils/size";
import { classNameManager } from "@/shared/lib/css";

const { joinClasses } = classNameManager;

type Props<Data> = {
  row: Row<Data>;
  table: Table<Data>;
  rowHeight?: number;
  expandedContent?: ReactNode;
  columnOrder: string[];
  rowClassName?: string;
  cellClassName?: TableCellProps<Data>["className"];
  cellStyle?: TableCellProps<Data>["style"];
  cellPaddings?: CellPaddingsRecord;
  variant?: TableVariants;
  expandToggleLocation?: TableCellProps<Data>["expandToggleLocation"];
  expandToggleIcons?: TableCellProps<Data>["expandToggleIcons"];
  expandToggleClassName?: TableCellProps<Data>["expandToggleClassName"];
  selectCheckboxLocation?: TableCellProps<Data>["selectCheckboxLocation"];
  selectCheckboxClassName?: TableCellProps<Data>["selectCheckboxClassName"];
  expandAllSelectedRows?: boolean;
  onExpandAllSelectedRows?: TableCellProps<Data>["onExpandAllSelectedRows"];
  enableRowResizing?: boolean;
  handleRowResize?: (rowId: string, newHeight: number) => void;
  expandSingleRow?: boolean;
  expandSingleRowClassName?: string;
};

export const baseRowStyles =
  "hover:[&>td]:bg-gray-100 dark:hover:[&>td]:!bg-gray-700";

const tableRowCva = cva(baseRowStyles, {
  variants: {
    variant: {
      default: "",
      striped: "",
      bordered: "!border-none",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const TableBodyRow = <Data,>({
  row,
  table,
  rowHeight,
  expandedContent,
  columnOrder,
  rowClassName,
  cellClassName,
  cellStyle,
  cellPaddings,
  variant,
  expandToggleLocation,
  expandToggleIcons,
  expandToggleClassName,
  selectCheckboxLocation,
  selectCheckboxClassName,
  expandAllSelectedRows,
  onExpandAllSelectedRows,
  enableRowResizing,
  handleRowResize,
  expandSingleRow,
  expandSingleRowClassName,
}: Props<Data>): JSX.Element => {
  const { getState, options } = table;
  const { id, getVisibleCells, getIsExpanded } = row;

  return (
    <Fragment key={id}>
      <tr
        className={joinClasses(tableRowCva({ variant }), rowClassName || "")}
        style={{
          height: rowHeight ? `${rowHeight}px` : undefined,
          position: "relative",
        }}
      >
        {getVisibleCells().map((cell) => (
          <SortableContext
            key={cell.id}
            items={columnOrder}
            strategy={horizontalListSortingStrategy}
          >
            <TableCell
              row={row}
              cell={cell}
              rowSelection={getState().rowSelection}
              setRowSelection={options.onRowSelectionChange}
              expanding={!!expandedContent}
              expandToggleLocation={expandToggleLocation}
              expandToggleIcons={expandToggleIcons}
              expandToggleClassName={expandToggleClassName}
              expandAllSelectedRows={expandAllSelectedRows}
              onExpandAllSelectedRows={onExpandAllSelectedRows}
              selectCheckboxLocation={selectCheckboxLocation}
              selectCheckboxClassName={selectCheckboxClassName}
              className={cellClassName}
              style={cellStyle}
              cellPaddings={cellPaddings}
              variant={variant}
            />
          </SortableContext>
        ))}
        {enableRowResizing && handleRowResize && (
          <TableRowResizer
            row={row}
            onResize={handleRowResize}
            initialHeight={rowHeight || (getIsExpanded() ? 200 : 50)}
          />
        )}
      </tr>
      {getIsExpanded() &&
        (expandSingleRow ? (
          <ExpandedTableRow
            className={expandSingleRowClassName}
            row={row}
            table={table}
            content={expandedContent}
          />
        ) : (
          expandedContent
        ))}
    </Fragment>
  );
};
