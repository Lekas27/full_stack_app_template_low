import {
  Content as DropdownMenuContent,
  Item as DropdownMenuItem,
  Portal as DropdownMenuPortal,
  Root as DropdownMenuRoot,
  Trigger as DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { type Header } from "@tanstack/react-table";
import { PinIcon } from "lucide-react";
import { useState } from "react";

import { TableColumnPinActions } from "./enums/actions";

import { Button } from "@/shared/components/ui/button";
import { classNameManager } from "@/shared/lib/css";

const { joinClasses } = classNameManager;

type Props<T> = {
  header: Header<T, unknown>;
};

export const TableColumnPinner = <T,>({ header }: Props<T>) => {
  const { pin, getIsPinned } = header.column;
  const isPinned = getIsPinned();

  const [open, setOpen] = useState(false);

  const pinnerActions = [
    {
      action: TableColumnPinActions.PIN_RIGHT,
      label: "Pin Right",
      handler: () => pin("right"),
      isActive: isPinned === "right",
    },
    {
      action: TableColumnPinActions.PIN_LEFT,
      label: "Pin Left",
      handler: () => pin("left"),
      isActive: isPinned === "left",
    },
    {
      action: TableColumnPinActions.NO_PIN,
      label: "No Pin",
      handler: () => pin(false),
      isActive: isPinned === false,
    },
  ];

  return (
    <DropdownMenuRoot onOpenChange={setOpen} open={open} modal={false}>
      {/* ───── Trigger ───── */}
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="md"
          icon={PinIcon}
          iconClassName={joinClasses(
            isPinned
              ? "fill-blue-500 stroke-blue-500"
              : "fill-secondary-2 stroke-secondary-2 dark:fill-white dark:stroke-white",
            "w-5 h-5 rotate-45"
          )}
          className="px-2 py-1"
        />
      </DropdownMenuTrigger>

      {/* ───── Menu content ───── */}
      <DropdownMenuPortal
        /* Pin the portal under #table-root to respect table stacking-context */
        container={document.getElementById("table-root") as HTMLElement}
      >
        <DropdownMenuContent
          side="right"
          align="start"
          sideOffset={20}
          className="dark:bg-dark-1 border-gray-3 dark:border-dark-3 animate-fadeIn !z-[100] w-20 overflow-hidden rounded-md border bg-white shadow-md"
        >
          {pinnerActions.map(({ action, label, handler, isActive }, index) => (
            <DropdownMenuItem
              key={action}
              disabled={isActive}
              onSelect={(e) => {
                e.preventDefault(); // keep focus where it was
                handler();
                setOpen(false);
              }}
              className={joinClasses(
                index ? "!border-t" : "",
                isActive
                  ? "cursor-not-allowed"
                  : "cursor-pointer hover:bg-blue-500/80 dark:hover:bg-blue-900/80",
                "w-full rounded-none border-0 px-3 py-2 text-xs font-normal hover:text-white focus:outline-none data-[disabled]:opacity-60 dark:bg-gray-900"
              )}
            >
              {label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenuRoot>
  );
};
