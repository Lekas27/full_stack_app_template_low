import { type DateRange, type DayPickerProps } from "react-day-picker";

import { formatDate } from "@/shared/lib/date";

type GetDayPickerPropsParams<TMode, TValue> = {
  mode: TMode;
  selection: TValue;
  onSelect: (date: TValue) => void;
  handleDaySelect?: (date: Date | undefined) => void;
  restProps: Omit<DayPickerProps, "mode" | "selected" | "onSelect">;
};

type FormatSelectionParams<TMode, TValue> = {
  selection: TValue;
  mode: TMode;
  showTime?: boolean;
};

/**
 * Get corresponding props depending on Mode
 */
export const getDayPickerProps = <TMode, TValue>({
  mode,
  selection,
  onSelect,
  handleDaySelect,
  restProps,
}: GetDayPickerPropsParams<TMode, TValue>) => {
  switch (mode) {
    case "single":
      return {
        mode: "single" as const,
        selected: selection as Date | undefined,
        onSelect:
          handleDaySelect ?? (onSelect as (date: Date | undefined) => void),
        ...restProps,
      };

    case "multiple":
      return {
        mode: "multiple" as const,
        selected: selection as Date[] | undefined,
        onSelect: onSelect as (dates: Date[] | undefined) => void,
        ...restProps,
      };

    case "range":
      return {
        mode: "range" as const,
        selected: selection as DateRange | undefined,
        onSelect: onSelect as (range: DateRange | undefined) => void,
        ...restProps,
      };

    default:
      return {
        mode: "single" as const,
        selected: undefined,
        onSelect: () => {},
        ...restProps,
      };
  }
};

/** Update date selection from DatePicker into input field */
export const formatSelection = <TMode, TValue>({
  selection,
  mode,
  showTime = false,
}: FormatSelectionParams<TMode, TValue>): string => {
  if (!selection) return "";

  switch (mode) {
    case "single":
      if (selection instanceof Date) {
        const dateString = formatDate(selection);
        if (showTime) {
          const timeStr = selection.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
          return `${dateString} ${timeStr}`;
        }

        return dateString;
      }

      return "";

    case "multiple":
      if (Array.isArray(selection) && selection.length > 0) {
        return selection.map((d) => formatDate(d)).join(", ");
      }

      return "";

    case "range": {
      const from = (selection as unknown as DateRange)?.from;
      const to = (selection as unknown as DateRange)?.to;
      const fromStr = from ? formatDate(from) : "";
      const toStr = to ? formatDate(to) : "";
      if (fromStr || toStr) {
        return `${fromStr} - ${toStr}`;
      }

      return "";
    }

    default:
      return "";
  }
};
