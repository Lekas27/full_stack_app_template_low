import type {
  ColumnOrderState,
  ColumnPinningState,
  ColumnSizingState,
  ExpandedState,
  GroupingState,
  OnChangeFn,
  PaginationState,
  RowSelectionState,
  SortingState,
  Table,
  VisibilityState,
} from "@tanstack/react-table";
import { Loader } from "lucide-react";
import { useMemo, type ReactNode } from "react";

import type { Props as TableProps } from "@/shared/components/ui/table";
import { EmptyData } from "@/shared/components/ui/table/components/empty";
import { Pagination } from "@/shared/components/ui/table/components/pagination";
import { generateSelectableColumn } from "@/shared/components/ui/table/components/selectable/column";
import { useTableSetup } from "@/shared/components/ui/table/hooks/use-setup";
import { useControllableState } from "@/shared/components/ui/table/hooks/use-state";
import type {
  CustomColumnDef,
  TableColumnRecord,
} from "@/shared/components/ui/table/types/columns";
import type { TableOnChange } from "@/shared/components/ui/table/types/table";
import { parseTableColumn } from "@/shared/components/ui/table/utils/column";
import { classNameManager } from "@/shared/lib/css";

const { joinClasses } = classNameManager;

export type Props<TData> = {
  data: TData[];
  renderCard: (item: TData, index: number) => ReactNode;
  gridClassName?: string;
  cardClassName?: string;
  emptyMessage?: string;
  emptyIconClassName?: string;
  loading?: boolean;
  loadingOverlayClassName?: string;
  loadingSpinnerClassName?: string;
  className?: string;
  // Pagination props from table
  hasPagination?: boolean;
  pageCount: number;
  table?: Table<TData>;
  paginationClassNames?: TableProps<TData>["paginationClassNames"];
  paginationStyles?: TableProps<TData>["paginationStyles"];
  variant?: TableProps<TData>["variant"];
  pageSizeOptions?: TableProps<TData>["pageSizeOptions"];
  // Table setup props
  columns?: TableColumnRecord<TData>[];
  columnOrderState?: [ColumnOrderState, OnChangeFn<ColumnOrderState>];
  columnVisibilityState?: [VisibilityState, OnChangeFn<VisibilityState>];
  columnSizingState?: [ColumnSizingState, OnChangeFn<ColumnSizingState>];
  columnPinningState?: [ColumnPinningState, OnChangeFn<ColumnPinningState>];
  paginationState?: [PaginationState, OnChangeFn<PaginationState>];
  sortingState?: [SortingState, OnChangeFn<SortingState>];
  groupingState?: [GroupingState, OnChangeFn<GroupingState>];
  rowSelectionState?: [RowSelectionState, OnChangeFn<RowSelectionState>];
  expandedState?: [ExpandedState, OnChangeFn<ExpandedState>];
  rowIdColumnName?: keyof TData;
  rowIdWithIndex?: boolean;
  onChange?: TableOnChange;
};

export const GridView = <TData,>({
  data,
  renderCard,
  gridClassName = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4",
  cardClassName,
  emptyMessage = "No data found",
  emptyIconClassName = "w-24 h-24",
  loading = false,
  loadingOverlayClassName = "",
  loadingSpinnerClassName = "",
  className,
  hasPagination = true,
  pageCount,
  table: externalTable,
  paginationClassNames,
  paginationStyles,
  variant,
  pageSizeOptions,
  // Table setup props
  columns,
  columnOrderState,
  columnVisibilityState,
  columnSizingState,
  columnPinningState,
  paginationState,
  sortingState,
  groupingState,
  rowSelectionState,
  expandedState,
  rowIdColumnName,
  rowIdWithIndex,
  onChange,
}: Props<TData>) => {
  // Setup table instance if columns are provided and no external table is passed
  const [pagination, setPagination] = useControllableState(paginationState, {
    pageIndex: 0,
    pageSize: 10,
  });
  const defaultSorting = useMemo(() => {
    if (!columns) return [];
    return columns
      .filter(({ isSortedByDefault }) => isSortedByDefault)
      .map(({ name: id, isSortedByDefault }) => ({
        id: id as string,
        desc: !!isSortedByDefault?.desc,
      }));
  }, [columns]);
  const [sorting, setSorting] = useControllableState(
    sortingState,
    defaultSorting
  );
  const defaultColumnOrder = useMemo(() => {
    if (!columns) return [];
    return [
      generateSelectableColumn().id,
      ...columns.map((col) => col.name as string),
    ];
  }, [columns]);
  const [columnOrder, setColumnOrder] = useControllableState(
    columnOrderState,
    defaultColumnOrder
  );
  const [columnVisibility, setColumnVisibility] = useControllableState(
    columnVisibilityState,
    {}
  );
  const [grouping, setGrouping] = useControllableState(groupingState, []);
  const [rowSelection, setRowSelection] = rowSelectionState || [{}, undefined];
  const [expanded, setExpanded] = expandedState || [{}, undefined];
  const [columnPinning, setColumnPinning] = columnPinningState || [
    { left: [], right: [] },
    undefined,
  ];

  const parsedColumns = useMemo<CustomColumnDef<TData>[]>(() => {
    if (!columns) return [];
    const selectCheckboxColumn =
      setRowSelection && !rowSelection
        ? generateSelectableColumn<TData>()
        : null;
    const visibleColumns = columns.filter(({ isVisible = true }) => isVisible);

    return [
      ...(selectCheckboxColumn ? [selectCheckboxColumn] : []),
      ...visibleColumns.map((column) => parseTableColumn({ ...column })),
    ];
  }, [columns, setRowSelection, rowSelection]);
  const [columnSizing, setColumnSizing] = columnSizingState || [{}, undefined];

  // Always call useTableSetup, but only use the result when needed
  const { table: internalTable } = useTableSetup({
    data: data || [],
    pageCount,
    pagination,
    sorting,
    columnOrder,
    rowSelection,
    expanded,
    columnPinning,
    columnSizing,
    parsedColumns,
    columnVisibility,
    setColumnVisibility,
    setPagination,
    setSorting,
    setRowSelection,
    setExpanded,
    setColumnOrder,
    setColumnPinning,
    setColumnSizing,
    rowIdColumnName: rowIdColumnName as string | number | symbol | undefined,
    rowIdWithIndex,
    isManualPagination: Boolean(paginationState),
    isManualSorting: Boolean(sortingState),
    grouping,
    setGrouping,
    onChange,
  });

  // Use external table if provided, otherwise use internal table, but only if we have columns
  const table = externalTable || (columns ? internalTable : null);

  return (
    <section className={joinClasses("relative flow-root", className || "")}>
      {loading && (
        <div
          className={joinClasses(
            "absolute inset-0 z-10 flex items-center justify-center",
            "bg-white/60 backdrop-blur-sm transition-opacity dark:bg-gray-900/70",
            loadingOverlayClassName
          )}
        >
          <Loader
            className={joinClasses(
              "h-10 w-10 animate-[spin_1.2s_linear_infinite] text-gray-600 dark:text-gray-300",
              loadingSpinnerClassName
            )}
          />
        </div>
      )}

      {data.length ? (
        <>
          <div className={gridClassName}>
            {data.map((item, index) => (
              <div key={index} className={cardClassName}>
                {renderCard(item, index)}
              </div>
            ))}
          </div>

          {hasPagination && table && (
            <div className="-mx-4 mt-2 sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full px-4 align-middle sm:px-6 lg:px-8">
                <Pagination<TData>
                  table={table}
                  pageCount={pageCount}
                  paginationClassNames={{
                    container:
                      "!bg-transparent !border-0 !rounded-none !shadow-none px-0",
                    ...paginationClassNames,
                  }}
                  paginationStyles={paginationStyles}
                  variant={variant}
                  pageSizeOptions={pageSizeOptions}
                />
              </div>
            </div>
          )}
        </>
      ) : (
        <EmptyData iconClassName={emptyIconClassName} text={emptyMessage} />
      )}
    </section>
  );
};
