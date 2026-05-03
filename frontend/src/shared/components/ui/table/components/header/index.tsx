import { useSortable } from "@dnd-kit/sortable";
import { CSS as DragAndDropCSS } from "@dnd-kit/utilities";
import { type Header, type Table, flexRender } from "@tanstack/react-table";
import { cva } from "class-variance-authority";
import {
  BoxesIcon,
  ChevronDownIcon,
  ChevronsUpDownIcon,
  ChevronUpIcon,
} from "lucide-react";
import { memo, type CSSProperties } from "react";

import { TableColumnPinner } from "./pin";
import { getCommonColumnPinningStyles } from "./pin/utils/style";
import { TableColumnResizer } from "./resize";

import { IndeterminateCheckbox } from "@/shared/components/ui/checkbox/indeterminate";
import { type Props as TableCellProps } from "@/shared/components/ui/table/components/cell";
import type { TableVariants } from "@/shared/components/ui/table/enums/table";
import { type TableColumnRecord } from "@/shared/components/ui/table/types/columns";
import { pinnedStyles } from "@/shared/components/ui/table/utils/styles";
import { Tooltip } from "@/shared/components/ui/tooltip";
import { classNameManager } from "@/shared/lib/css";

const { joinClasses } = classNameManager;

const { Translate } = DragAndDropCSS;

const Sorting = {
  asc: <ChevronUpIcon className="h-3 w-5 flex-shrink-0" />,
  desc: <ChevronDownIcon className="h-3 w-5 flex-shrink-0" />,
};

type StylePropsRecord<T> = {
  header: Header<T, unknown>;
  table: Table<T>;
};

export type HeaderClassNameRecord<T> =
  | string
  | ((args: StylePropsRecord<T>) => string);

export type HeaderStyleRecord<T> =
  | CSSProperties
  | ((args: StylePropsRecord<T>) => CSSProperties);

export type Props<Data> = {
  header: Header<Data, unknown>;
  table: Table<Data>;
  className?: HeaderClassNameRecord<Data>;
  style?: HeaderStyleRecord<Data>;
  selectCheckboxLocation?: TableCellProps<Data>["selectCheckboxLocation"];
  selectCheckboxClassName?: TableCellProps<Data>["selectCheckboxClassName"];
  variant?: TableVariants;
};

const TableHeaderComponent = <T,>({
  header,
  table,
  className,
  style,
  selectCheckboxLocation,
  selectCheckboxClassName,
  variant,
}: Props<T>) => {
  const { isPlaceholder, column, getContext } = header;
  const {
    columnDef,
    getToggleSortingHandler,
    getIsSorted,
    getIsGrouped,
    toggleGrouping,
  } = column;
  const {
    getIsAllRowsSelected,
    getIsSomeRowsSelected,
    getToggleAllRowsSelectedHandler,
  } = table;
  const {
    size,
    enableSorting,
    enableResizing,
    enablePinning,
    enableDragging,
    enableGrouping,
  } = columnDef as TableColumnRecord<T>;
  const headerParsed = isPlaceholder
    ? null
    : flexRender(columnDef.header, getContext());
  const sortDirection = getIsSorted();
  const { attributes, isDragging, listeners, setNodeRef, transform } =
    useSortable({
      id: column.id,
    });
  const isGrouped = getIsGrouped();
  const tableHeaderCva = cva(
    "theme-transition group relative text-sm font-medium",
    {
      variants: {
        variant: {
          default:
            "dark:border-dark-3 border-b border-gray-200 bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
          striped:
            "dark:border-dark-3 border-b border-gray-200 bg-gray-50 text-gray-900 transition-colors duration-300 ease-in-out dark:bg-gray-900 dark:text-gray-100",
          bordered: `border-t border-b border-gray-300 first:rounded-l-xl first:border-l last:rounded-r-xl last:border-r dark:border-gray-700`,
        },
      },
      defaultVariants: {
        variant: "default",
      },
    }
  );

  const sizeStyles: CSSProperties = {
    width: `calc(var(--col-${column.id}-size) * 1px)`,
  };
  const dragAndDropStyles: CSSProperties = {
    opacity: 0.75,
    transform: Translate.toString(transform), // translate instead of transform to avoid squishing
    transition: "width transform 0.2s ease-in-out",
    zIndex: 1,
  };
  const resizingStyles: CSSProperties = {
    overflowX: "hidden",
  };
  const computedClassName =
    typeof className === "function"
      ? className({
          header,
          table,
        })
      : className;
  const computedStyle =
    typeof style === "function"
      ? style({
          header,
          table,
        })
      : style;

  return (
    <th
      ref={setNodeRef}
      className={joinClasses(
        tableHeaderCva({ variant }),
        "first:rounded-tl-xl last:rounded-tr-xl",
        pinnedStyles(columnDef),
        computedClassName || ""
      )}
      style={{
        ...getCommonColumnPinningStyles(column),
        ...(size && sizeStyles),
        ...(isDragging && dragAndDropStyles),
        ...(enableResizing && resizingStyles),
        ...computedStyle,
      }}
    >
      <div className="relative z-[1] my-3.5 mr-3 ml-4 flex flex-nowrap items-center justify-start gap-2">
        {column.id === selectCheckboxLocation && (
          <IndeterminateCheckbox
            className={joinClasses(selectCheckboxClassName || "")}
            checked={getIsAllRowsSelected()}
            indeterminate={getIsSomeRowsSelected()}
            onChange={getToggleAllRowsSelectedHandler()}
          />
        )}
        <span
          className={joinClasses(
            enableDragging
              ? "cursor-all-scroll"
              : enableSorting
              ? "cursor-pointer"
              : "",
            "flex flex-shrink-0 items-center gap-2"
          )}
          {...(enableDragging
            ? { ...attributes, ...listeners }
            : enableSorting
            ? { onClick: getToggleSortingHandler() }
            : {})}
        >
          {headerParsed}
        </span>
        {enableGrouping && (
          <Tooltip content={`Group by ${String(column.id)}`}>
            <div
              className={joinClasses(
                "cursor-pointer",
                isGrouped
                  ? "text-blue-500 dark:text-blue-400"
                  : "text-gray-500 dark:text-gray-400"
              )}
              onClick={() => toggleGrouping()}
            >
              <BoxesIcon className="h-4 w-4 flex-shrink-0" />
            </div>
          </Tooltip>
        )}

        {enableSorting ? (
          <div className="cursor-pointer" onClick={getToggleSortingHandler()}>
            {sortDirection ? (
              Sorting[sortDirection]
            ) : (
              <ChevronsUpDownIcon className="h-5 w-5 flex-shrink-0" />
            )}
          </div>
        ) : (
          <></>
        )}
        {enablePinning && (
          <div className="cursor-pointer">
            <TableColumnPinner header={header} />
          </div>
        )}
      </div>
      {enableResizing && <TableColumnResizer header={header} />}
      {enableDragging && (
        <div
          className="absolute inset-0 cursor-all-scroll"
          {...attributes}
          {...listeners}
        />
      )}
    </th>
  );
};

export const TableHeader = memo(
  TableHeaderComponent
) as typeof TableHeaderComponent;
