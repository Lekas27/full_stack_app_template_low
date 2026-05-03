import type { Cell, ColumnDef, Row } from "@tanstack/react-table";
import type { ReactNode } from "react";

import {
  ActionsColumn,
  ColumnPinPosition,
} from "@/shared/components/ui/table/enums/columns";
import type { CellPaddingsRecord } from "@/shared/components/ui/table/utils/size";

export type CustomColumnDef<Data> = ColumnDef<Data> & {
  enableDragging?: boolean;
  pin?: ColumnPinPosition;
};

/**
 * Table column object record.
 */
export type TableColumnRecord<Data> = ColumnDef<Data> & {
  name: keyof Data | ActionsColumn | string;
  header: string;
  formatter?: (value: number | string) => number | string;
  render?: (row: Row<Data>, cell: Cell<Data, unknown>) => ReactNode;
  isSortedByDefault?: { desc: boolean };
  enableDragging?: CustomColumnDef<Data>["enableDragging"];
  pin?: CustomColumnDef<Data>["pin"];
  cellPaddings?: CellPaddingsRecord;
  isVisible?: boolean;
};
