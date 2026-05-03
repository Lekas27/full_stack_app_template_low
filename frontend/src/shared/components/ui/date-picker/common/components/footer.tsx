import { useCallback } from "react";
import { type DateRange } from "react-day-picker";

type Props<TMode, TValue> = {
  mode: TMode;
  selection: TValue;
};

export const DatePickerFooter = <TMode, TValue>({ mode, selection }: Props<TMode, TValue>) => {
  const getFooterText = useCallback(() => {
    if (!selection) return "Pick a day.";
    switch (mode) {
      case "single":
        return selection instanceof Date
          ? `Selected Date: ${selection.toLocaleDateString()} ${selection.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}`
          : "Pick a day.";
      case "multiple":
        return Array.isArray(selection) && selection.length > 0
          ? `Selected Dates: ${selection.map((d) => d.toLocaleDateString()).join(", ")}`
          : "Pick one or more days.";
      case "range": {
        const from = (selection as unknown as DateRange)?.from?.toLocaleDateString() || "...";
        const to = (selection as unknown as DateRange)?.to?.toLocaleDateString() || "...";
        return `${from} - ${to}`;
      }

      default:
        return "Pick a day.";
    }
  }, [mode, selection]);

  return (
    <div className="mt-3 max-w-full text-center">
      <div className="flex flex-wrap justify-center text-sm whitespace-normal text-gray-600 dark:text-gray-300">
        {getFooterText()}
      </div>
    </div>
  );
};
