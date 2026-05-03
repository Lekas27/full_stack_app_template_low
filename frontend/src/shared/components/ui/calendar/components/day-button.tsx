import { useEffect, useRef, type ComponentProps, type FC } from "react";
import { DayButton, getDefaultClassNames } from "react-day-picker";

import { Button } from "@/shared/components/ui/button";
import { classNameManager } from "@/shared/lib/css";

const { joinClasses } = classNameManager;

type Props = ComponentProps<typeof DayButton>;

export const CalendarDayButton: FC<Props> = ({
  className,
  day,
  modifiers,
  color,
  ...props
}) => {
  const defaultClassNames = getDefaultClassNames();
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="md"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={joinClasses(
        "group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 dark:hover:text-accent-foreground flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] data-[range-end=true]:rounded-l-md data-[range-end=true]:rounded-r-md data-[range-end=true]:bg-gray-400 data-[range-end=true]:text-gray-50 data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-gray-200 data-[range-middle=true]:text-gray-900 data-[range-start=true]:rounded-md data-[range-start=true]:rounded-l-md data-[range-start=true]:bg-gray-400 data-[range-start=true]:text-gray-50 data-[selected-single=true]:bg-gray-500 data-[selected-single=true]:text-gray-50 dark:data-[range-end=true]:bg-gray-50 dark:data-[range-end=true]:text-gray-900 dark:data-[range-middle=true]:bg-gray-800 dark:data-[range-middle=true]:text-gray-50 dark:data-[range-start=true]:bg-gray-50 dark:data-[range-start=true]:text-gray-900 dark:data-[selected-single=true]:bg-gray-50 dark:data-[selected-single=true]:text-gray-900 [&>span]:text-xs [&>span]:opacity-70",
        defaultClassNames.day,
        className
      )}
      {...props}
    >
      {day.date.getDate()}
    </Button>
  );
};
