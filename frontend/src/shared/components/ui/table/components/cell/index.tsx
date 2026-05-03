import { type Data } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import {
  type Cell,
  type Column,
  type OnChangeFn,
  type Row,
  type RowSelectionState,
  flexRender,
} from "@tanstack/react-table";
import { cva } from "class-variance-authority";
import { MinusCircleIcon, PlusCircleIcon } from "lucide-react";
import {
  type CSSProperties,
  type ForwardRefExoticComponent,
  type SVGProps,
  memo,
} from "react";

import { IndeterminateCheckbox } from "@/shared/components/ui/checkbox/indeterminate";
import { getCommonColumnPinningStyles } from "@/shared/components/ui/table/components/header/pin/utils/style";
import { ActionsColumn } from "@/shared/components/ui/table/enums/columns";
import type { TableVariants } from "@/shared/components/ui/table/enums/table";
import { type TableColumnRecord } from "@/shared/components/ui/table/types/columns";
import {
  type CellPaddingsRecord,
  tableCellPaddings,
} from "@/shared/components/ui/table/utils/size";
import { pinnedStyles } from "@/shared/components/ui/table/utils/styles";
import { classNameManager } from "@/shared/lib/css";

const { joinClasses } = classNameManager;

type StylePropsRecord<T> = {
  row: Row<T>;
  cell: Cell<T, unknown>;
  column: Column<T, unknown>;
  isTotal?: boolean;
};

type ClassNameRecord<T> = string | ((args: StylePropsRecord<T>) => string);

type StyleRecord<T> =
  | CSSProperties
  | ((args: StylePropsRecord<T>) => CSSProperties);

export type Props<T> = {
  row: Row<T>;
  cell: Cell<T, unknown>;
  rowSelection?: RowSelectionState | undefined;
  setRowSelection?: OnChangeFn<RowSelectionState> | undefined;
  expanding?: boolean;
  expandToggleLocation?: keyof Data | ActionsColumn;
  expandToggleIcons?: {
    open: ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, "ref">>;
    closed: ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, "ref">>;
  };
  expandToggleClassName?: string;
  selectCheckboxLocation?: keyof Data | ActionsColumn;
  selectCheckboxClassName?: string;
  expandAllSelectedRows?: boolean;
  onExpandAllSelectedRows?: (
    isExpanded: boolean,
    isSelected: boolean,
    toggleExpanded: (expanded?: boolean | undefined) => void
  ) => void;
  isTotal?: boolean;
  className?: ClassNameRecord<T>;
  style?: StyleRecord<T>;
  cellPaddings?: CellPaddingsRecord;
  variant?: TableVariants;
};

const tableCellCva = cva(
  "dark:bg-dark border-gray-3 dark:border-dark-1 theme-transition border-t bg-white text-sm whitespace-nowrap",
  {
    variants: {
      variant: {
        default:
          "!dark:text-gray-300 border border-transparent !text-gray-800 transition-colors duration-300 ease-in-out dark:bg-gray-800 dark:!text-white",
        striped:
          "!dark:text-gray-100 !text-gray-900 transition-colors duration-300 ease-in-out dark:bg-gray-800 dark:!text-white",
        bordered: `border-t border-b border-gray-300 first:rounded-l-xl first:border-l last:rounded-r-xl last:border-r dark:border-gray-700 dark:bg-gray-800`,
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const TableCellInner = <T,>({
  row,
  cell,
  rowSelection,
  setRowSelection,
  expanding,
  expandToggleLocation,
  expandToggleIcons = {
    open: PlusCircleIcon,
    closed: MinusCircleIcon,
  },
  expandToggleClassName,
  selectCheckboxLocation,
  selectCheckboxClassName,
  expandAllSelectedRows,
  onExpandAllSelectedRows,
  isTotal,
  className,
  style,
  cellPaddings,
  variant,
}: Props<T>) => {
  const {
    toggleExpanded,
    getIsExpanded,
    getCanSelect,
    getIsSelected,
    getIsSomeSelected,
    getToggleSelectedHandler,
  } = row;
  const { id, column, getContext } = cell;
  const { size, enableResizing } = column.columnDef as TableColumnRecord<T>;
  const { setNodeRef } = useSortable({
    id: column.id,
  });

  const sizeStyles: CSSProperties = {
    width: `calc(var(--col-${column.id}-size) * 1px)`,
  };
  const resizingStyles: CSSProperties = {
    overflowX: "hidden",
  };

  const computedClassName =
    typeof className === "function"
      ? className({ row, cell, column, isTotal })
      : className;
  const computedStyle =
    typeof style === "function" ? style({ row, cell, column, isTotal }) : style;

  return (
    <td
      key={id}
      className={joinClasses(
        tableCellCva({ variant }),
        isTotal
          ? "!text-primary-foreground dark:!text-primary-foreground !bg-blue-500 dark:!bg-blue-600"
          : rowSelection && getCanSelect() && getIsSelected()
          ? "text-primary bg-accent dark:bg-accent"
          : "text-foreground dark:text-foreground",
        pinnedStyles(
          column.columnDef,
          isTotal,
          rowSelection && getCanSelect() && getIsSelected()
        )
      )}
      style={{
        ...getCommonColumnPinningStyles(column),
        ...(size && sizeStyles),
        ...(enableResizing && resizingStyles),
        paddingTop: (cellPaddings || tableCellPaddings).top,
        paddingBottom: (cellPaddings || tableCellPaddings).bottom,
        paddingLeft: (cellPaddings || tableCellPaddings).left,
        paddingRight: (cellPaddings || tableCellPaddings).right,
      }}
      ref={setNodeRef}
    >
      <div
        className={joinClasses(computedClassName || "")}
        style={computedStyle}
      >
        {!isTotal && column.columnDef.id === selectCheckboxLocation && (
          <IndeterminateCheckbox
            className={joinClasses(selectCheckboxClassName || "")}
            checked={getIsSelected()}
            disabled={!getCanSelect()}
            indeterminate={getIsSomeSelected()}
            onChange={getToggleSelectedHandler()}
          />
        )}
        {!isTotal &&
          expanding &&
          column.columnDef.id === expandToggleLocation && (
            <button
              onClick={() =>
                expandAllSelectedRows
                  ? onExpandAllSelectedRows &&
                    onExpandAllSelectedRows(
                      !getIsExpanded(),
                      !!(rowSelection && setRowSelection) && getIsSelected(),
                      toggleExpanded
                    )
                  : toggleExpanded()
              }
              className="cursor-pointer"
            >
              {getIsExpanded() ? (
                <expandToggleIcons.closed
                  className={joinClasses(
                    expandToggleClassName || "",
                    "h-5 w-5 shrink-0"
                  )}
                />
              ) : (
                <expandToggleIcons.open
                  className={joinClasses(
                    expandToggleClassName || "",
                    "h-5 w-5 shrink-0"
                  )}
                />
              )}
            </button>
          )}
        {flexRender(column.columnDef.cell, getContext())}
      </div>
    </td>
  );
};

export const TableCell = memo(TableCellInner) as typeof TableCellInner;
