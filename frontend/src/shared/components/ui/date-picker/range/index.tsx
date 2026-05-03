import { type FC, useCallback, useEffect, useMemo, useState } from "react";
import {
  type DateRange,
  DayPicker,
  type DayPickerProps,
} from "react-day-picker";

import "react-day-picker/style.css";

import { DatePickerDayButton } from "@/shared/components/ui/date-picker/common/components/day";
import { DatePickerDropdown } from "@/shared/components/ui/date-picker/common/components/dropdown";
import { DatePickerFooter } from "@/shared/components/ui/date-picker/common/components/footer";
import { DatePickerInput } from "@/shared/components/ui/date-picker/common/components/input";
import { DatePickerQuickPresetButtons } from "@/shared/components/ui/date-picker/common/components/range-buttons";
import { DatePickerMode } from "@/shared/components/ui/date-picker/common/enums";
import {
  type DatePickerTypeRange,
  type RangeMode,
} from "@/shared/components/ui/date-picker/common/types/date-picker";
import {
  formatSelection,
  getDayPickerProps,
} from "@/shared/components/ui/date-picker/common/utils/format";
import { Popover } from "@/shared/components/ui/popover";
import { PopoverContent } from "@/shared/components/ui/popover/components/content";
import { PopoverTrigger } from "@/shared/components/ui/popover/components/trigger";
import { classNameManager } from "@/shared/lib/css";

const { joinClasses } = classNameManager;

const mode = DatePickerMode.RANGE;

export type Props = Omit<DayPickerProps, "mode"> & {
  value?: DatePickerTypeRange;
  onChange?: (date: DatePickerTypeRange) => void;
  isClearable?: boolean;
};

export const DatePickerRange: FC<Props> = (props) => {
  const { value, onChange, isClearable = true, ...dayPickerRestProps } = props;

  const [selection, setSelection] = useState<DatePickerTypeRange>(
    value ?? undefined
  );
  const [month, setMonth] = useState<Date>(new Date());
  const [open, setOpen] = useState(false);

  const DatePickerPresetsButtons =
    DatePickerQuickPresetButtons as typeof DatePickerQuickPresetButtons<
      DatePickerTypeRange,
      RangeMode
    >;

  const Footer = DatePickerFooter as typeof DatePickerFooter<
    RangeMode,
    DatePickerTypeRange
  >;

  const Input = DatePickerInput as typeof DatePickerInput<DatePickerTypeRange>;

  const updateSelection = useCallback(
    (newValue: DatePickerTypeRange) => {
      setSelection(newValue);
      onChange?.(newValue);
    },
    [onChange]
  );

  const handleResetClick = useCallback(() => {
    updateSelection(undefined);
  }, [updateSelection]);

  const toggleOpen = useCallback(() => setOpen(!open), [open]);

  const formattedValue = useMemo(
    () => formatSelection({ selection, mode }),
    [selection]
  );

  const dayPickerProps = useMemo(
    () =>
      getDayPickerProps<RangeMode, DatePickerTypeRange>({
        mode,
        selection,
        onSelect: updateSelection,
        restProps: dayPickerRestProps,
      }),
    [dayPickerRestProps, selection, updateSelection]
  );

  const handlePresetSelect = useCallback(
    (preset: DatePickerTypeRange) => {
      if (!preset || typeof preset !== "object" || !("from" in preset)) {
        updateSelection(undefined);
        return;
      }

      updateSelection(preset as DateRange);
      if (preset.from) {
        setMonth(preset.from);
      }
    },
    [updateSelection]
  );

  useEffect(() => {
    setSelection(value ?? undefined);
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="w-full">
          <Input
            value={formattedValue}
            onClick={toggleOpen}
            placeholder="Select date range"
            onReset={handleResetClick}
            onToggle={toggleOpen}
            selection={selection}
            isClearable={isClearable}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="max-w-[352px] p-0"
        align="start"
        role="dialog"
        aria-label="Date range picker calendar"
      >
        <div className="p-3">
          <DayPicker
            footer={<Footer mode={mode} selection={selection} />}
            className={joinClasses(
              "border-border border-b bg-gray-50 px-0 pb-3 text-gray-950 dark:bg-gray-900 dark:text-gray-50",
              props.className || ""
            )}
            classNames={{
              month: "space-y-2",
              chevron:
                "inline-flex w-6 h-6 ml-2 rounded-md fill-gray-950 dark:fill-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 cursor-pointer p-1",
              caption_label:
                "text-sm font-medium text-gray-950 dark:text-gray-50",
              nav: "space-x-1 flex items-center",
              nav_button:
                "h-8 w-8 p-0 opacity-50 hover:opacity-100 inline-flex items-center justify-center rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-950 dark:hover:text-gray-50",
              day: "h-6 w-6 text-sm rounded-md transition-colors text-gray-950 dark:text-gray-50 hover:bg-gray-50 dark:hover:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-500 hover:text-gray-950 dark:hover:text-gray-50 focus-visible:outline focus-visible:ring-2 focus-visible:ring-ring",
              selected:
                "!bg-gray-300 dark:!bg-gray-600 text-gray-950 dark:text-gray-50 hover:bg-gray-950/90 dark:hover:bg-gray-100/90 focus:bg-gray-950/90 dark:focus:bg-gray-100/9 !rounded-none",
              today: "text-gray-950 dark:text-gray-100 font-bold rounded-md",
              range_start:
                "!bg-gray-400 dark:!bg-gray-700 !text-gray-900 dark:!text-gray-300 !rounded-l-full hover:!bg-gray-400/90 dark:hover:!bg-gray-600/90 focus:!bg-gray-950/90 dark:focus:!bg-dark-600/90",
              range_end:
                "!bg-gray-400 dark:!bg-gray-700 !text-gray-900 dark:!text-gray-300 hover:!bg-gray-400/90 dark:hover:!bg-gray-600/90 focus:!bg-gray-950/90 dark:focus:!bg-dark-600/90 !rounded-r-full",
              ...props.classNames,
            }}
            components={{
              Dropdown: (props) => <DatePickerDropdown {...props} />,
              DayButton: (props) => <DatePickerDayButton {...props} />,
            }}
            navLayout="around"
            captionLayout="dropdown"
            animate
            month={month}
            onMonthChange={setMonth}
            {...dayPickerProps}
          />

          <DatePickerPresetsButtons
            mode={mode}
            selection={selection as DatePickerTypeRange}
            onSelect={handlePresetSelect}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};
