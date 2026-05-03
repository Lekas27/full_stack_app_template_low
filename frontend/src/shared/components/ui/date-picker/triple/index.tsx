import { useCallback, useEffect, useRef, useState, type FC } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

import {
  clampDate,
  stripTime,
  within,
} from "@/shared/components/ui/date-picker/common/utils/helpers";
import { DayPickerSelect } from "@/shared/components/ui/date-picker/triple/components/day-picker-select";
import { MonthPickerSelect } from "@/shared/components/ui/date-picker/triple/components/month-picker-select";
import { YearPickerSelect } from "@/shared/components/ui/date-picker/triple/components/year-picker-select";
import { classNameManager } from "@/shared/lib/css";

const { joinClasses } = classNameManager;

type Props = {
  value?: Date | undefined;
  onChange?: (value: Date | undefined) => void;
  minDate?: Date;
  maxDate?: Date;
  startYear?: number;
  endYear?: number;
  locale?: string;
  className?: string;
  /** Render calendar below selects. Default: false (for compact, triple-select only UI) */
  showCalendar?: boolean;
};

export const TripleSelectDatePicker: FC<Props> = ({
  value,
  onChange,
  minDate,
  maxDate,
  startYear,
  endYear,
  className,
  showCalendar = false,
}) => {
  const today = new Date();
  const currentYear = today.getFullYear();

  const minY = minDate ? minDate.getFullYear() : currentYear - 100;
  const maxY = maxDate ? maxDate.getFullYear() : currentYear + 10;
  const fromYear = startYear ?? minY;
  const toYear = endYear ?? maxY;

  // Internal state uses month as first-of-month for DayPicker `month` prop
  const initial = value ?? today;
  const [month, setMonth] = useState(
    new Date(initial.getFullYear(), initial.getMonth(), 1)
  );
  const [selected, setSelected] = useState<Date | undefined>(
    stripTime(initial)
  );

  // Sync down when parent controls `value`
  const valueTimestamp = value?.getTime?.();
  useEffect(() => {
    if (valueTimestamp == null) return;
    const v = new Date(valueTimestamp);
    setSelected(stripTime(v));
    setMonth(new Date(v.getFullYear(), v.getMonth(), 1));
  }, [valueTimestamp]);

  // Emit on change (avoid re-emitting when only onChange reference changes)
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);
  useEffect(() => {
    onChangeRef.current?.(selected);
  }, [selected]);

  const year = selected?.getFullYear() ?? month.getFullYear();
  const monthIndex = selected?.getMonth() ?? month.getMonth();
  const selectedDay = selected?.getDate() ?? 1;

  const handleYearChange = useCallback(
    (newYear: number) => {
      const next = clampDate(newYear, monthIndex, selectedDay);
      setSelected(next);
      setMonth(new Date(newYear, monthIndex, 1));
    },
    [monthIndex, selectedDay]
  );

  const handleMonthChange = useCallback(
    (newMonth: number) => {
      const next = clampDate(year, newMonth, selectedDay);
      setSelected(next);
      setMonth(new Date(year, newMonth, 1));
    },
    [year, selectedDay]
  );

  const handleDayChange = useCallback(
    (newDay: number) => {
      const next = clampDate(year, monthIndex, newDay);
      if (within(next, minDate, maxDate)) setSelected(next);
    },
    [year, monthIndex, minDate, maxDate]
  );

  return (
    <div className={joinClasses("flex flex-col gap-4", className || "")}>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <YearPickerSelect
          value={year}
          onChange={handleYearChange}
          minYear={minY}
          maxYear={maxY}
          startYear={fromYear}
          endYear={toYear}
        />
        <MonthPickerSelect
          value={monthIndex}
          onChange={handleMonthChange}
          year={year}
          minDate={minDate}
          maxDate={maxDate}
        />
        <DayPickerSelect
          value={selectedDay}
          onChange={handleDayChange}
          year={year}
          month={monthIndex}
          minDate={minDate}
          maxDate={maxDate}
        />
      </div>

      {showCalendar && (
        <DayPicker
          mode="single"
          selected={selected}
          onSelect={(d) =>
            d && within(d, minDate, maxDate) && setSelected(stripTime(d))
          }
          month={month}
          onMonthChange={(newMonth) =>
            setMonth(new Date(newMonth.getFullYear(), newMonth.getMonth(), 1))
          }
          startMonth={
            minDate
              ? new Date(minDate.getFullYear(), minDate.getMonth(), 1)
              : undefined
          }
          endMonth={
            maxDate
              ? new Date(maxDate.getFullYear(), maxDate.getMonth(), 1)
              : undefined
          }
          showOutsideDays
          className="dark:bg-dark-1 rounded-md border border-gray-200 bg-white p-4 shadow-sm dark:text-white"
        />
      )}
    </div>
  );
};
