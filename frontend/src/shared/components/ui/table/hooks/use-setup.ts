import {
  getCoreRowModel,
  getExpandedRowModel,
  getGroupedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnOrderState,
  type ColumnPinningState,
  type ColumnSizingState,
  type ExpandedState,
  type GroupingState,
  type PaginationState,
  type RowSelectionState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";
import {
  useCallback,
  useMemo,
  type Dispatch,
  type SetStateAction,
} from "react";

import type { CustomColumnDef } from "@/shared/components/ui/table/types/columns";

export type UseSetupProps<Data> = {
  data?: Data[];
  totals?: Data;
  pageCount: number;
  pagination: PaginationState;
  sorting: SortingState;
  columnOrder: ColumnOrderState;
  grouping: GroupingState;
  rowSelection: RowSelectionState;
  expanded: ExpandedState;
  columnPinning: ColumnPinningState;
  columnSizing: ColumnSizingState;
  parsedColumns: CustomColumnDef<Data>[];
  columnVisibility: VisibilityState;
  setColumnVisibility: Dispatch<SetStateAction<VisibilityState>>;
  setPagination: Dispatch<SetStateAction<PaginationState>>;
  setSorting: Dispatch<SetStateAction<SortingState>>;
  setRowSelection?: Dispatch<SetStateAction<RowSelectionState>>;
  setExpanded?: Dispatch<SetStateAction<ExpandedState>>;
  setColumnOrder?: Dispatch<SetStateAction<ColumnOrderState>>;
  setColumnPinning?: Dispatch<SetStateAction<ColumnPinningState>>;
  setColumnSizing?: Dispatch<SetStateAction<ColumnSizingState>>;
  setGrouping?: Dispatch<SetStateAction<GroupingState>>;
  rowIdColumnName?: string | number | symbol | undefined;
  rowIdWithIndex?: boolean;
  isManualPagination?: boolean;
  isManualSorting?: boolean;
  onChange?: {
    selection?: (selection: RowSelectionState) => void;
    pagination?: (pagination: PaginationState) => void;
    sorting?: (sorting: SortingState) => void;
    grouping?: (grouping: GroupingState) => void;
  };
};

export const useTableSetup = <Data>({
  data,
  totals,
  pageCount,
  pagination,
  sorting,
  columnOrder,
  rowSelection,
  expanded,
  columnPinning,
  columnSizing,
  parsedColumns,
  setPagination,
  setSorting,
  setRowSelection,
  setExpanded,
  columnVisibility,
  setColumnVisibility,
  setColumnOrder,
  setColumnPinning,
  setColumnSizing,
  rowIdColumnName,
  rowIdWithIndex,
  isManualPagination,
  isManualSorting,
  onChange,
  setGrouping,
  grouping,
}: UseSetupProps<Data>) => {
  // Memo total row
  const memoTotal = useMemo(
    () => (totals ? [{ ...totals, isTotal: true }] : []),
    [totals]
  );

  const table = useReactTable<Data>({
    data: data || [],
    columns: parsedColumns,
    state: {
      pagination,
      sorting,
      columnOrder,
      columnVisibility,
      rowSelection,
      expanded,
      columnPinning,
      grouping,
      columnSizing,
    },
    enableRowSelection: Boolean(rowSelection),
    getRowId: useCallback(
      (row: Data, index: number) =>
        rowIdColumnName
          ? String(
              `${row[rowIdColumnName as keyof Data]}${
                rowIdWithIndex ? `-${index}` : ""
              }`
            )
          : String(index),
      [rowIdColumnName, rowIdWithIndex]
    ),
    onRowSelectionChange: (updater) => {
      if (!setRowSelection) return;

      setRowSelection((prev) => {
        const next = typeof updater === "function" ? updater(prev) : updater;

        if (onChange?.selection) onChange.selection(next);
        return next;
      });
    },
    onExpandedChange: setExpanded,
    onPaginationChange: (updater) => {
      setPagination((prev) => {
        const next = typeof updater === "function" ? updater(prev) : updater;
        const pageSizeChanged = prev.pageSize !== next.pageSize;
        const pageIndexChanged = prev.pageIndex !== next.pageIndex;
        const paginationChanged = pageSizeChanged || pageIndexChanged;

        // NOTE: reduces rerenders
        if (!paginationChanged) return prev;

        if (onChange?.pagination) onChange.pagination(next);
        return next;
      });
    },
    onSortingChange: (updater) => {
      setSorting((prev) => {
        const next = typeof updater === "function" ? updater(prev) : updater;

        if (onChange?.sorting) onChange.sorting(next);

        return next;
      });
    },
    onGroupingChange: (updater) => {
      if (setGrouping) {
        setGrouping((prev) => {
          const next = typeof updater === "function" ? updater(prev) : updater;
          if (onChange?.grouping) onChange.grouping(next);
          return next;
        });
      }
    },
    pageCount,
    defaultColumn: { size: undefined, minSize: undefined, maxSize: undefined },
    onColumnSizingChange: setColumnSizing,
    onColumnOrderChange: setColumnOrder,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnPinningChange: setColumnPinning,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    // Use the passed flags to determine manual mode
    manualPagination: isManualPagination ?? false,
    manualSorting: isManualSorting ?? false,
    manualFiltering: true,
    enableMultiSort: true,
    enableHiding: true,
    columnResizeMode: "onChange",
    columnResizeDirection: "ltr",
  });

  // Total row table for footer or totals row
  const totalTable = useReactTable<Data>({
    data: memoTotal,
    columns: parsedColumns,
    state: table.getState(),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    columnResizeMode: "onChange",
    columnResizeDirection: "ltr",
    onColumnOrderChange: setColumnOrder,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnPinningChange: setColumnPinning,
    onColumnSizingChange: setColumnSizing,
    manualSorting: true,
    manualFiltering: true,
    enableMultiSort: true,
    enableHiding: true,
    defaultColumn: { size: undefined, minSize: undefined, maxSize: undefined },
  });

  return { table, totalTable };
};
