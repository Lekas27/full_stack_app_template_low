import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { useMemo, type ComponentProps, type FC } from "react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";

import { CalendarDayButton } from "./components/day-button";

import { Button } from "@/shared/components/ui/button";
import { buttonVariants } from "@/shared/components/ui/button/styles/variants";
import { classNameManager } from "@/shared/lib/css";

const { joinClasses } = classNameManager;

export type Props = ComponentProps<typeof DayPicker> & {
  buttonVariant?: ComponentProps<typeof Button>["variant"];
};

export const Calendar: FC<Props> = ({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}) => {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={joinClasses(
        "group/calendar bg-gray-50 p-3 [--cell-size:--spacing(8)] dark:bg-gray-900 [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString("default", { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: joinClasses("w-fit", defaultClassNames.root),
        months: joinClasses(
          "flex gap-4 flex-col md:flex-row relative",
          defaultClassNames.months
        ),
        month: joinClasses(
          "flex flex-col w-full gap-4",
          defaultClassNames.month
        ),
        nav: joinClasses(
          "flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between",
          defaultClassNames.nav
        ),
        button_previous: joinClasses(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          defaultClassNames.button_previous
        ),
        button_next: joinClasses(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          defaultClassNames.button_next
        ),
        month_caption: joinClasses(
          "flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)",
          defaultClassNames.month_caption
        ),
        dropdowns: joinClasses(
          "w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5",
          defaultClassNames.dropdowns
        ),
        dropdown_root: joinClasses(
          "relative has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md",
          defaultClassNames.dropdown_root
        ),
        dropdown: joinClasses(
          "absolute bg-gray-50 dark:bg-gray-900 inset-0 opacity-0",
          defaultClassNames.dropdown
        ),
        caption_label: joinClasses(
          "select-none font-medium",
          captionLayout === "label"
            ? "text-sm"
            : "rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-gray-600 dark:text-gray-300 [&>svg]:size-3.5",
          defaultClassNames.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: joinClasses("flex", defaultClassNames.weekdays),
        weekday: joinClasses(
          "text-gray-600 dark:text-gray-300 rounded-md flex-1 font-normal text-[0.8rem] select-none",
          defaultClassNames.weekday
        ),
        week: joinClasses("flex w-full mt-2", defaultClassNames.week),
        week_number_header: joinClasses(
          "select-none w-(--cell-size)",
          defaultClassNames.week_number_header
        ),
        week_number: joinClasses(
          "text-[0.8rem] select-none text-gray-600 dark:text-gray-300",
          defaultClassNames.week_number
        ),
        day: joinClasses(
          "relative w-full h-full p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md group/day aspect-square select-none",
          defaultClassNames.day
        ),
        range_start: joinClasses(
          "!bg-gray-400 dark:!bg-gray-700 !text-gray-900 dark:!text-gray-300 !rounded-l-full hover:!bg-gray-400/90 dark:hover:!bg-gray-600/90 focus:!bg-gray-950/90 dark:focus:!bg-dark-600/90",
          defaultClassNames.range_start
        ),
        range_end: joinClasses(
          "!bg-gray-400 dark:!bg-gray-700 !text-gray-900 dark:!text-gray-300 hover:!bg-gray-400/90 dark:hover:!bg-gray-600/90 focus:!bg-gray-950/90 dark:focus:!bg-dark-600/90 !rounded-r-full",
          defaultClassNames.range_end
        ),
        range_middle: joinClasses(
          "rounded-none bg-gray-200 dark:bg-gray-800",
          defaultClassNames.range_middle
        ),
        today: joinClasses(
          "bg-gray-50 dark:bg-gray-500 text-gray-900 dark:text-gray-50 rounded-md data-[selected-single=true]:rounded-none",
          defaultClassNames.today
        ),
        outside: joinClasses(
          "text-gray-600 dark:text-gray-300 aria-selected:text-gray-600 dark:text-gray-300",
          defaultClassNames.outside
        ),
        disabled: joinClasses(
          "text-gray-600 dark:text-gray-300 opacity-50",
          defaultClassNames.disabled
        ),
        hidden: joinClasses("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        // eslint-disable-next-line react/prop-types
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={joinClasses(className)}
              {...props}
            />
          );
        },
        // eslint-disable-next-line react/prop-types
        Chevron: ({ className, orientation, ...props }) => {
          const Icon = useMemo(() => {
            switch (orientation) {
              case "left":
                return ChevronLeftIcon;
              case "right":
                return ChevronRightIcon;

              default:
                return ChevronDownIcon;
            }
          }, [orientation]);

          return (
            <Icon className={joinClasses("size-4", className)} {...props} />
          );
        },
        DayButton: (props) => <CalendarDayButton {...props} />,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-(--cell-size) items-center justify-center text-center">
                {children}
              </div>
            </td>
          );
        },
        ...components,
      }}
      {...props}
    />
  );
};
