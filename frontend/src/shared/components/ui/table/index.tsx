import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  type ColumnOrderState,
  type ColumnPinningState,
  type ColumnSizingState,
  type ExpandedState,
  type GroupingState,
  type OnChangeFn,
  type PaginationState,
  type RowSelectionState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";
import { cva } from "class-variance-authority";
import { Loader } from "lucide-react";
import {
  forwardRef,
  useCallback,
  useMemo,
  type ReactNode,
  type Ref,
} from "react";

import { ColumnVisibilityDropdown } from "./components/column-visibility";
import { EmptyData } from "./components/empty";
import {
  Pagination,
  type Props as PaginationProps,
} from "./components/pagination";
import { TableVariants } from "./enums/table";
import { useColumnDragAndDrop } from "./hooks/use-column-drag-and-drop";
import { useTableSetup, type UseSetupProps } from "./hooks/use-setup";
import { useControllableState } from "./hooks/use-state";

import {
  TableBody,
  type Props as TableBodyProps,
} from "@/shared/components/ui/table/components/body";
import {
  TableCell,
  type Props as TableCellProps,
} from "@/shared/components/ui/table/components/cell";
import {
  TableHeader,
  type Props as TableHeaderProps,
} from "@/shared/components/ui/table/components/header";
import { generateSelectableColumn } from "@/shared/components/ui/table/components/selectable/column";
import type {
  CustomColumnDef,
  TableColumnRecord,
} from "@/shared/components/ui/table/types/columns";
import type { TableOnChange } from "@/shared/components/ui/table/types/table";
import { parseTableColumn } from "@/shared/components/ui/table/utils/column";
import { type CellPaddingsRecord } from "@/shared/components/ui/table/utils/size";
import { classNameManager } from "@/shared/lib/css";

const { joinClasses } = classNameManager;

export type Props<Data> = {
  className?: string;
  tableWrapperClassName?: string;
  tableHeadClassName?: string;
  tableBodyClassName?: TableBodyProps<Data>["tableBodyClassName"];
  rowClassName?: TableBodyProps<Data>["rowClassName"];
  totalRowClassName?: string;
  cellClassName?: TableCellProps<Data>["className"];
  cellStyle?: TableCellProps<Data>["style"];
  headerClassName?: TableHeaderProps<Data>["className"];
  headerStyle?: TableHeaderProps<Data>["style"];
  columns: TableColumnRecord<Data>[];
  columnOrderState?: [ColumnOrderState, OnChangeFn<ColumnOrderState>];
  columnVisibilityState?: [VisibilityState, OnChangeFn<VisibilityState>];
  columnSizingState?: [ColumnSizingState, OnChangeFn<ColumnSizingState>];
  columnPinningState?: [ColumnPinningState, OnChangeFn<ColumnPinningState>];
  data: UseSetupProps<Data>["data"];
  totals?: UseSetupProps<Data>["totals"];
  pageCount: UseSetupProps<Data>["pageCount"];
  hasPagination?: boolean;
  paginationState?: [PaginationState, OnChangeFn<PaginationState>];
  sortingState?: [SortingState, OnChangeFn<SortingState>];
  groupingState?: [GroupingState, OnChangeFn<GroupingState>];
  rowSelectionState?: [RowSelectionState, OnChangeFn<RowSelectionState>];
  selectCheckboxLocation?: TableCellProps<Data>["selectCheckboxLocation"];
  selectCheckboxClassName?: TableCellProps<Data>["selectCheckboxClassName"];
  expandedState?: [ExpandedState, OnChangeFn<ExpandedState>];
  expandable?: TableBodyProps<Data>["expandable"];
  expandSingleRow?: TableBodyProps<Data>["expandSingleRow"];
  expandSingleRowClassName?: TableBodyProps<Data>["expandSingleRowClassName"];
  rowIdColumnName?: keyof Data;
  /** If true, will append the row index to the rowIdColumnName key. */
  rowIdWithIndex?: boolean;
  expandAllSelectedRows?: TableBodyProps<Data>["expandAllSelectedRows"];
  onChange?: TableOnChange;
  expandToggleLocation?: TableCellProps<Data>["expandToggleLocation"];
  expandToggleIcons?: TableCellProps<Data>["expandToggleIcons"];
  expandToggleClassName?: TableCellProps<Data>["expandToggleClassName"];
  shouldCenterTotalSize?: boolean;
  cellPaddings?: CellPaddingsRecord;
  paginationClassNames?: PaginationProps<Data>["paginationClassNames"];
  paginationStyles?: PaginationProps<Data>["paginationStyles"];
  emptyDataClassName?: string;
  variant?: TableVariants;
  renderExpandedRowContent?: (rowData: Data, rowId: string) => ReactNode;
  visibilityDropdownClassName?: string;
  hasColumnVisibility?: boolean;
  enableRowResizing?: boolean;
  pageSizeOptions?: number[];
  loading?: boolean;
  loadingOverlayClassName?: string;
  loadingSpinnerClassName?: string;
};

const tableCva = cva(
  "min-w-full table-fixed border-separate border-spacing-0 divide-y divide-gray-200 rounded-t-xl transition-colors dark:divide-gray-700",
  {
    variants: {
      variant: {
        default: "",
        striped: "",
        bordered: "border-spacing-y-2 [&>tr&>td]:!border-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const TableInner = <Data,>(
  {
    className,
    tableWrapperClassName,
    tableHeadClassName,
    tableBodyClassName,
    columns,
    columnOrderState,
    columnSizingState,
    columnPinningState,
    data,
    totals,
    pageCount,
    rowClassName,
    totalRowClassName,
    cellClassName,
    cellStyle,
    headerClassName,
    headerStyle,
    hasPagination = true,
    paginationState,
    sortingState,
    rowSelectionState,
    selectCheckboxLocation,
    selectCheckboxClassName,
    expandedState,
    expandable,
    expandSingleRow,
    groupingState,
    expandSingleRowClassName,
    rowIdColumnName,
    rowIdWithIndex,
    expandAllSelectedRows,
    onChange,
    expandToggleLocation,
    expandToggleIcons,
    expandToggleClassName,
    shouldCenterTotalSize,
    cellPaddings,
    paginationClassNames,
    paginationStyles,
    emptyDataClassName = "",
    columnVisibilityState,
    variant = TableVariants.DEFAULT,
    renderExpandedRowContent,
    visibilityDropdownClassName,
    hasColumnVisibility,
    enableRowResizing,
    pageSizeOptions,
    loading = false,
    loadingOverlayClassName = "",
    loadingSpinnerClassName = "",
  }: Props<Data>,
  ref: Ref<HTMLDivElement>
) => {
  const [pagination, setPagination] = useControllableState(paginationState, {
    pageIndex: 0,
    pageSize: 10,
  });
  const defaultSorting = useMemo(() => {
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
  const defaultColumnOrder = useMemo(
    () => [
      generateSelectableColumn().id,
      ...columns.map((col) => col.name as string),
    ],
    [columns]
  );
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

  const parsedColumns = useMemo<CustomColumnDef<Data>[]>(() => {
    const selectCheckboxColumn =
      setRowSelection && !selectCheckboxLocation
        ? generateSelectableColumn<Data>()
        : null;
    const visibleColumns = columns.filter(({ isVisible = true }) => isVisible);

    return [
      ...(selectCheckboxColumn ? [selectCheckboxColumn] : []),
      ...visibleColumns.map((column) =>
        parseTableColumn({ ...column, cellPaddings })
      ),
    ];
  }, [columns, setRowSelection, selectCheckboxLocation, cellPaddings]);
  const [columnSizing, setColumnSizing] = columnSizingState || [{}, undefined];

  // As we need to make this array we need to put in in memo so rendering of useReactTable will be stable
  const { table, totalTable } = useTableSetup({
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
    columnVisibility,
    setColumnVisibility,
    setPagination,
    setSorting,
    setRowSelection,
    setExpanded,
    setColumnOrder,
    setColumnPinning,
    setColumnSizing,
    rowIdColumnName,
    rowIdWithIndex,
    isManualPagination: Boolean(paginationState),
    isManualSorting: Boolean(sortingState),
    grouping,
    setGrouping,
    onChange,
  });

  const { getFlatHeaders, getHeaderGroups, getRowModel, getCenterTotalSize } =
    table;

  const handleExpandAllSelectedRows = useCallback(
    (
      isExpanded: boolean,
      isSelected: boolean,
      toggleExpanded: (expanded?: boolean | undefined) => void
    ) => {
      if (!isSelected) {
        toggleExpanded();
        return;
      }

      const selectedRows = getRowModel().rows.filter(({ getIsSelected }) =>
        getIsSelected()
      );

      const newExpandedState: ExpandedState = { ...(expanded as object) };

      if (setExpanded && expandAllSelectedRows && isSelected) {
        selectedRows.forEach(({ id }) => {
          newExpandedState[id] = isExpanded;
        });
        setExpanded(newExpandedState);
      } else toggleExpanded();
    },
    [expandAllSelectedRows, expanded, getRowModel, setExpanded]
  );

  const expanding = useMemo(
    () => !!expandable || !!renderExpandedRowContent,
    [expandable, renderExpandedRowContent]
  );

  const { sensors, handleDragEnd } = useColumnDragAndDrop({ setColumnOrder });

  // Starts calculate column sizes once and pass them down as CSS variables
  // NOTE: Make this resizing calculations more optimized in the future
  const headers = getFlatHeaders();

  const columnSizeVars = useMemo(() => {
    const colSizes: { [key: string]: number } = {};
    for (let i = 0; i < headers.length; i++) {
      const header = headers[i];
      if (header) {
        let size = header.getSize();
        const { minSize, maxSize } = header.column.columnDef;
        if (minSize !== undefined && size < minSize) size = minSize;
        if (maxSize !== undefined && size > maxSize) size = maxSize;
        colSizes[`--header-${header.id}-size`] = size;
        colSizes[`--col-${header.column.id}-size`] = size;
      }
    }

    return colSizes;
  }, [headers]);
  // End column calculation

  return (
    <section className={joinClasses(className || "", "relative flow-root")}>
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
      {!columnVisibilityState && hasColumnVisibility && (
        <ColumnVisibilityDropdown
          table={table}
          visibilityDropdownClassName={visibilityDropdownClassName}
        />
      )}
      {getRowModel().rows.length ? (
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          sensors={sensors}
        >
          <div
            ref={ref}
            className={joinClasses(
              tableWrapperClassName || "",
              "border-gray-3 dark:border-dark-1 theme-transition max-w-full overflow-x-auto rounded-t-xl border",
              variant === TableVariants.BORDERED && "border-none"
            )}
          >
            <div className="inline-block min-w-full align-middle">
              <table
                className={joinClasses(tableCva({ variant }))}
                style={{
                  ...columnSizeVars,
                  ...(shouldCenterTotalSize && { width: getCenterTotalSize() }),
                }}
              >
                <thead className={joinClasses(tableHeadClassName || "")}>
                  {getHeaderGroups().map(({ id, headers }) => (
                    <tr key={id}>
                      <SortableContext
                        items={columnOrder}
                        strategy={horizontalListSortingStrategy}
                      >
                        {headers.map((header) => (
                          <TableHeader
                            key={header.id}
                            table={table}
                            header={header}
                            className={headerClassName}
                            style={headerStyle}
                            selectCheckboxLocation={selectCheckboxLocation}
                            selectCheckboxClassName={selectCheckboxClassName}
                            variant={variant}
                          />
                        ))}
                      </SortableContext>
                    </tr>
                  ))}
                  {totalTable.getRowModel().rows.map((row) => {
                    const { id, getVisibleCells } = row;

                    return (
                      <tr
                        key={id}
                        className={joinClasses(
                          totalRowClassName || "",
                          "font-bold"
                        )}
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
                              rowSelection={rowSelection}
                              setRowSelection={setRowSelection}
                              expanding={expanding}
                              expandToggleLocation={expandToggleLocation}
                              expandToggleIcons={expandToggleIcons}
                              expandToggleClassName={expandToggleClassName}
                              onExpandAllSelectedRows={
                                handleExpandAllSelectedRows
                              }
                              className={cellClassName}
                              style={cellStyle}
                              variant={variant}
                              cellPaddings={cellPaddings}
                              isTotal
                            />
                          </SortableContext>
                        ))}
                      </tr>
                    );
                  })}
                </thead>
                <TableBody
                  table={table}
                  tableBodyClassName={tableBodyClassName}
                  rowClassName={rowClassName}
                  expandable={expandable}
                  expandSingleRow={expandSingleRow}
                  expandSingleRowClassName={expandSingleRowClassName}
                  expandToggleLocation={expandToggleLocation}
                  expandToggleIcons={expandToggleIcons}
                  expandToggleClassName={expandToggleClassName}
                  expandAllSelectedRows={expandAllSelectedRows}
                  onExpandAllSelectedRows={handleExpandAllSelectedRows}
                  selectCheckboxLocation={selectCheckboxLocation}
                  selectCheckboxClassName={selectCheckboxClassName}
                  cellClassName={cellClassName}
                  cellStyle={cellStyle}
                  cellPaddings={cellPaddings}
                  variant={variant}
                  renderExpandedRowContent={renderExpandedRowContent}
                  enableRowResizing={enableRowResizing}
                />
              </table>
            </div>
          </div>
          {hasPagination && (
            <div className="-mx-4 sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full px-4 align-middle sm:px-6 lg:px-8">
                <Pagination<Data>
                  table={table}
                  pageCount={pageCount}
                  paginationClassNames={paginationClassNames}
                  paginationStyles={paginationStyles}
                  variant={variant}
                  pageSizeOptions={pageSizeOptions}
                />
              </div>
            </div>
          )}
        </DndContext>
      ) : (
        <EmptyData
          className={emptyDataClassName}
          iconClassName="w-24 h-24"
          text="No data found"
        />
      )}
    </section>
  );
};

export const Table = forwardRef(TableInner) as <Data>(
  props: Props<Data> & { ref?: Ref<HTMLDivElement> }
) => ReactNode;
