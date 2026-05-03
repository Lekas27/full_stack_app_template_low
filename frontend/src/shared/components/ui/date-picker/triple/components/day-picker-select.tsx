import { useCallback, useMemo, type FC } from "react";

import {
  daysInMonth,
  isDayDisabled,
} from "@/shared/components/ui/date-picker/common/utils/helpers";
import { Select } from "@/shared/components/ui/select/basic";
import type { SelectOption } from "@/shared/components/ui/select/common/types/options";

type Props = {
  value?: number;
  onChange?: (day: number) => void;
  year: number;
  month: number;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
};

export const DayPickerSelect: FC<Props> = ({
  value,
  onChange,
  year,
  month,
  minDate,
  maxDate,
  className,
}) => {
  const daysInCurrentMonth = daysInMonth(year, month);

  const dayOptions: SelectOption[] = useMemo(
    () =>
      Array.from({ length: daysInCurrentMonth }, (_, i) => i + 1).map((d) => ({
        value: d,
        label: String(d).padStart(2, "0"),
        isDisabled: isDayDisabled(year, month, d, minDate, maxDate),
      })),
    [year, month, daysInCurrentMonth, minDate, maxDate]
  );

  const selectedDayOption: SelectOption | undefined = useMemo(
    () => dayOptions.find((opt) => Number(opt.value) === value),
    [dayOptions, value]
  );

  const handleDayChange = useCallback(
    (option: SelectOption | null) => {
      if (!option || !onChange) return;
      const day = Number(option.value);
      onChange(day);
    },
    [onChange]
  );

  return (
    <div className={`flex flex-col gap-3 ${className || ""}`}>
      <span className="text-sm text-gray-700 dark:text-gray-200">Day</span>
      <Select
        options={dayOptions}
        value={selectedDayOption}
        onChange={(opt) => handleDayChange(opt as SelectOption)}
      />
    </div>
  );
};
