import type { Table } from "@tanstack/react-table";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useMemo } from "react";

import { PaginationNavigation } from "./components/navigation";
import {
  type PaginationClassNames,
  type PaginationStyles,
} from "./types/styles";

import { DropdownMenu } from "@/shared/components/ui/dropdown-menu";
import { DropdownMenuCheckboxItem } from "@/shared/components/ui/dropdown-menu/checkbox-item";
import { DropdownMenuContent } from "@/shared/components/ui/dropdown-menu/content";
import { DropdownMenuTrigger } from "@/shared/components/ui/dropdown-menu/trigger";
import { TableVariants } from "@/shared/components/ui/table/enums/table";
import { classNameManager } from "@/shared/lib/css";

const { joinClasses } = classNameManager;

const disabledButtonClassNames = "cursor-pointer disabled:cursor-not-allowed";

export type Props<Data> = {
  table: Table<Data>;
  pageCount: number;
  paginationClassNames?: PaginationClassNames;
  paginationStyles?: PaginationStyles;
  variant?: TableVariants;
  pageSizeOptions?: number[];
};

export const Pagination = <T,>({
  table,
  pageCount,
  paginationClassNames,
  paginationStyles,
  variant,
  pageSizeOptions = [5, 10, 20, 50, 100, 200, 300, 500],
}: Props<T>) => {
  const { getState, previousPage, nextPage, setPageIndex, setPageSize } = table;
  const currentPageIndex = getState().pagination.pageIndex + 1;
  const pageSize = getState().pagination.pageSize;
  const numberOfPages = Math.ceil(pageCount / pageSize);

  const currentDisplayFrom =
    pageCount === 0
      ? 0
      : currentPageIndex === 1
      ? currentPageIndex
      : pageSize * (currentPageIndex - 1) + 1;

  const currentDisplayTo =
    pageCount < pageSize || currentPageIndex === numberOfPages
      ? pageCount
      : pageSize * currentPageIndex;

  const pageSizePicker = useMemo(
    () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className={joinClasses(
              "border-gray-3 dark:border-dark-1 dark:hover:bg-accent theme-transition rounded-md border bg-white px-3 py-2 text-sm hover:bg-gray-50 dark:bg-gray-700 dark:text-white",
              paginationClassNames?.pageSizeSelect || ""
            )}
            style={paginationStyles?.pageSizeSelect}
          >
            {pageSize} / page
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-32">
          {pageSizeOptions.map((size) => (
            <DropdownMenuCheckboxItem
              key={size}
              checked={pageSize === size}
              onCheckedChange={() => setPageSize(size)}
              className="cursor-pointer px-2 py-1.5 text-sm capitalize"
            >
              {size} / page
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    [
      pageSize,
      paginationClassNames,
      paginationStyles,
      setPageSize,
      pageSizeOptions,
    ]
  );

  return (
    <div
      className={joinClasses(
        "border-gray-3 dark:border-dark-1 dark:bg-dark-2 theme-transition flex items-center justify-between rounded-b-xl border border-t-0 bg-white px-4 py-3 sm:px-6 dark:bg-gray-900",
        paginationClassNames?.container || "",
        variant === TableVariants.BORDERED && "border-gray-3 rounded-xl !border"
      )}
      style={paginationStyles?.container}
    >
      {/* Responsive for smaller screens */}
      <div className="w-full sm:hidden">
        <div className="flex w-full justify-between">
          <button
            className={joinClasses(
              "border-gray-3 dark:hover:bg-accent hover-transition relative inline-flex items-center rounded-md border bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50 dark:border-slate-700 dark:bg-gray-700 dark:text-white",
              paginationClassNames?.pageButton || "",
              disabledButtonClassNames
            )}
            style={paginationStyles?.pageButton}
            disabled={currentPageIndex === 1}
            onClick={previousPage}
          >
            Previous
          </button>
          <button
            className={joinClasses(
              "border-gray-3 dark:bg-dark-1 dark:hover:bg-accent hover-transition relative inline-flex items-center rounded-md border bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50 dark:border-slate-700 dark:bg-gray-700 dark:text-white",
              paginationClassNames?.pageButton || "",
              disabledButtonClassNames
            )}
            style={paginationStyles?.pageButton}
            disabled={currentPageIndex === numberOfPages}
            onClick={nextPage}
          >
            Next
          </button>
        </div>
        <div className="mt-4 flex w-full justify-end">{pageSizePicker}</div>
      </div>

      {/* Desktop */}
      <div className="hidden sm:flex sm:flex-1 sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
        <p
          className={joinClasses(
            "theme-transition text-sm dark:text-white",
            paginationClassNames?.summary || ""
          )}
          style={paginationStyles?.summary}
        >
          Showing <span className="font-medium">{currentDisplayFrom}</span> to{" "}
          <span className="font-medium">{currentDisplayTo}</span> of{" "}
          <span className="font-medium">{pageCount}</span> results
        </p>

        <div className="flex items-center gap-4">
          <nav
            className={joinClasses(
              "isolate inline-flex -space-x-px rounded-md shadow-sm",
              paginationClassNames?.navContainer || ""
            )}
            style={paginationStyles?.navContainer}
            aria-label="Pagination"
          >
            <button
              className={joinClasses(
                "border-gray-3 dark:border-dark-1 dark:hover:bg-accent hover-transition relative inline-flex items-center rounded-l-md border px-2 py-2 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 dark:text-white",
                paginationClassNames?.pageButton || "",
                disabledButtonClassNames
              )}
              style={paginationStyles?.pageButton}
              disabled={currentPageIndex === 1}
              onClick={previousPage}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <PaginationNavigation
              currentPageIndex={currentPageIndex}
              numberOfPages={numberOfPages}
              onChange={setPageIndex}
              classes={paginationClassNames}
              styles={paginationStyles}
            />
            <button
              className={joinClasses(
                "border-gray-3 dark:border-dark-1 dark:hover:bg-accent hover-transition relative inline-flex items-center rounded-r-md border px-2 py-2 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 dark:text-white",
                paginationClassNames?.pageButton || "",
                disabledButtonClassNames
              )}
              style={paginationStyles?.pageButton}
              disabled={currentPageIndex === numberOfPages}
              onClick={nextPage}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
          {pageSizePicker}
        </div>
      </div>
    </div>
  );
};
