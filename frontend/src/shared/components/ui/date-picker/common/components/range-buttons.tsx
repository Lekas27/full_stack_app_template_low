import { useCallback } from "react";

import { getPresetsForMode } from "@/shared/components/ui/date-picker/common/utils/presets";
import { classNameManager } from "@/shared/lib/css";

const { joinClasses } = classNameManager;

type Props<TValue, TMode> = {
  mode: TMode;
  selection: TValue;
  onSelect: (value: TValue) => void;
};

export const DatePickerQuickPresetButtons = <TValue, TMode>({
  mode,
  selection,
  onSelect,
}: Props<TValue, TMode>) => {
  const presets = getPresetsForMode<TMode>(mode);

  const isEqual = useCallback(
    (selectionValue: TValue, presetValue: TValue): boolean => {
      if (!selectionValue || !presetValue) return false;

      if (mode === "single") {
        if (selectionValue instanceof Date && presetValue instanceof Date) {
          return selectionValue.getTime() === presetValue.getTime();
        }
      }

      if (mode === "multiple") {
        if (
          Array.isArray(selectionValue) &&
          Array.isArray(presetValue) &&
          selectionValue.every((d) => d instanceof Date) &&
          presetValue.every((d) => d instanceof Date)
        ) {
          if (selectionValue.length !== presetValue.length) return false;

          return selectionValue.every(
            (date, index) => date.getTime() === presetValue[index].getTime()
          );
        }
      }

      if (mode === "range") {
        const isValidRange = (
          value: Partial<{ from: Date; to: Date }>
        ): value is { from?: Date; to?: Date } => {
          return typeof value === "object" && value !== null && "from" in value;
        };

        if (isValidRange(selectionValue) && isValidRange(presetValue)) {
          const selectionRange = selectionValue;
          const presetRange = presetValue;

          const isFromEqual =
            selectionRange.from instanceof Date &&
            presetRange.from instanceof Date &&
            selectionRange.from.getTime() === presetRange.from.getTime();

          const isToEqual =
            (!selectionRange.to && !presetRange.to) ||
            (selectionRange.to instanceof Date &&
              presetRange.to instanceof Date &&
              selectionRange.to.getTime() === presetRange.to.getTime());

          return isFromEqual && isToEqual;
        }
      }

      return false;
    },
    [mode]
  );

  return (
    <div className="mt-4 mb-1 flex flex-col flex-wrap gap-2">
      {presets.map((preset) => {
        const presetValue =
          "range" in preset
            ? (preset.range as TValue)
            : "date" in preset
            ? (preset.date as TValue)
            : (preset.dates as TValue);

        const isActive = isEqual(selection, presetValue);

        return (
          <button
            key={preset.label}
            data-testid="preset-button"
            onClick={() => onSelect(presetValue)}
            className={joinClasses(
              "cursor-pointer rounded-md border px-3 py-1.5 text-sm font-medium transition-colors",
              isActive
                ? "border-primary bg-gray-800 text-gray-100 dark:bg-gray-200 dark:text-gray-900"
                : "border-input hover:bg-gray-200 dark:hover:bg-gray-700"
            )}
          >
            {preset.label}
          </button>
        );
      })}
    </div>
  );
};
