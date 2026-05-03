import type { FC } from "react";
import { type DayButtonProps } from "react-day-picker";

import { classNameManager } from "@/shared/lib/css";

const { joinClasses } = classNameManager;

type Props = DayButtonProps;

export const DatePickerDayButton: FC<Props> = ({
  day,
  modifiers,
  ...props
}) => {
  const date = day.date;
  return (
    <button
      className={joinClasses(
        "!text-foreground flex h-10 w-10 items-center justify-center rounded-full p-2 transition-colors duration-200",
        "hover:!bg-accent hover:!text-accent-foreground",
        (modifiers.selected || modifiers.range_start || modifiers.range_end) &&
          "!bg-primary !text-primary-foreground font-bold",
        modifiers.range_middle && "!bg-accent !text-accent-foreground",
        modifiers.today && "!text-primary border-primary border-b font-bold"
      )}
      data-testid="day-button" // Used by Storybook play functions - do not remove
      aria-label={`Day ${date.toLocaleDateString()}`}
      type="button"
      {...props}
    >
      {date.getDate()}
    </button>
  );
};
