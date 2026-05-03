import { useCallback, type ReactNode } from "react";

import { GridView, type Props as GridViewProps } from "./grid-view";
import { type ViewLayout } from "./view-switcher";

import { Table, type Props as TableProps } from "@/shared/components/ui/table";
import { classNameManager } from "@/shared/lib/css";

const { joinClasses } = classNameManager;

type GridProps<TData> = {
  renderCard: GridViewProps<TData>["renderCard"];
  gridClassName?: GridViewProps<TData>["gridClassName"];
  cardClassName?: GridViewProps<TData>["cardClassName"];
  emptyMessage?: GridViewProps<TData>["emptyMessage"];
  emptyIconClassName?: GridViewProps<TData>["emptyIconClassName"];
};

type Props<TData> = {
  view: ViewLayout;
  tableProps: Omit<TableProps<TData>, "data" | "pageCount">;
  gridProps: GridProps<TData>;
  data: TData[];
  pageCount: number;
  loading?: boolean;
  className?: string;
  children?: ReactNode;
};

export const DataView = <TData,>({
  view,
  tableProps,
  gridProps,
  data,
  pageCount,
  loading = false,
  className,
  children,
}: Props<TData>) => {
  const renderView = useCallback(() => {
    switch (view) {
      case "table":
        return (
          <Table<TData>
            {...tableProps}
            data={data}
            pageCount={pageCount}
            loading={loading}
          />
        );
      case "cards":
        return (
          <GridView<TData>
            data={data}
            pageCount={pageCount}
            loading={loading}
            hasPagination={tableProps.hasPagination}
            variant={tableProps.variant}
            pageSizeOptions={tableProps.pageSizeOptions}
            paginationClassNames={tableProps.paginationClassNames}
            paginationStyles={tableProps.paginationStyles}
            columns={tableProps.columns}
            paginationState={tableProps.paginationState}
            sortingState={tableProps.sortingState}
            columnVisibilityState={tableProps.columnVisibilityState}
            columnOrderState={tableProps.columnOrderState}
            columnPinningState={tableProps.columnPinningState}
            columnSizingState={tableProps.columnSizingState}
            rowSelectionState={tableProps.rowSelectionState}
            expandedState={tableProps.expandedState}
            groupingState={tableProps.groupingState}
            rowIdColumnName={tableProps.rowIdColumnName}
            rowIdWithIndex={tableProps.rowIdWithIndex}
            onChange={tableProps.onChange}
            {...gridProps}
          />
        );
      default:
        return (
          <Table<TData>
            {...tableProps}
            data={data}
            pageCount={pageCount}
            loading={loading}
          />
        );
    }
  }, [data, gridProps, loading, pageCount, tableProps, view]);

  return (
    <div className={joinClasses("space-y-4", className || "")}>
      {children}
      {renderView()}
    </div>
  );
};
