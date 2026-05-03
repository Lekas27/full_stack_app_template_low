import { type Table } from "@tanstack/react-table";
import { EyeIcon } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { DropdownMenu } from "@/shared/components/ui/dropdown-menu";
import { DropdownMenuCheckboxItem } from "@/shared/components/ui/dropdown-menu/checkbox-item";
import { DropdownMenuContent } from "@/shared/components/ui/dropdown-menu/content";
import { DropdownMenuTrigger } from "@/shared/components/ui/dropdown-menu/trigger";
import { classNameManager } from "@/shared/lib/css";

const { joinClasses } = classNameManager;

type Props<RowData> = {
  table: Table<RowData>;
  visibilityDropdownClassName?: string;
};

export const ColumnVisibilityDropdown = <RowData,>({
  table,
  visibilityDropdownClassName,
}: Props<RowData>) => {
  return (
    <div
      className={joinClasses(
        "relative -top-1 flex w-full items-center",
        visibilityDropdownClassName || ""
      )}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-7" icon={EyeIcon}>
            Show/hide columns
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {(() => {
            const columns = table
              .getAllLeafColumns()
              .filter((col) => col.getCanHide());
            const allHidden = columns.every((col) => !col.getIsVisible());

            return (
              <DropdownMenuCheckboxItem
                checked={allHidden}
                onCheckedChange={(value) => {
                  const show = !!value === false;
                  columns.forEach((col) => col.toggleVisibility(show));
                }}
                onSelect={(e) => e.preventDefault()}
                className="cursor-pointer rounded-sm px-2 py-1.5 font-semibold capitalize transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                {allHidden ? "Show All" : "Hide All"}
              </DropdownMenuCheckboxItem>
            );
          })()}

          {/* Divider */}
          <div className="my-1 h-px bg-gray-200 dark:bg-gray-700" />

          {/* Individual columns */}
          {table
            .getAllLeafColumns()
            .filter((col) => col.getCanHide())
            .map((column) => {
              const headerName =
                typeof column.columnDef.header === "string"
                  ? column.columnDef.header
                  : column.id;

              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={!column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!value)}
                  onSelect={(e) => e.preventDefault()}
                  className={joinClasses(
                    "cursor-pointer rounded-sm px-2 py-1.5 capitalize transition-colors",
                    "data-[state=checked]:text-gray-600 data-[state=checked]:line-through dark:text-gray-300",
                    "hover:bg-gray-50 dark:hover:bg-gray-700"
                  )}
                >
                  {headerName}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
