import { useCallback, useMemo, type FC } from "react";

import { isMonthDisabled } from "@/shared/components/ui/date-picker/common/utils/helpers";
import { Select } from "@/shared/components/ui/select/basic";
import type { SelectOption } from "@/shared/components/ui/select/common/types/options";

type Props = {
  value?: number;
  onChange?: (month: number) => void;
  year: number;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
};

export const MonthPickerSelect: FC<Props> = ({
  value,
  onChange,
  year,
  minDate,
  maxDate,
  className,
}) => {
  const monthOptions: SelectOption[] = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        value: i,
        label: String(i + 1).padStart(2, "0"),
        isDisabled: isMonthDisabled(i, year, minDate, maxDate),
      })),
    [year, minDate, maxDate]
  );

  const selectedMonthOption: SelectOption | undefined = useMemo(
    () => monthOptions.find((opt) => Number(opt.value) === value),
    [monthOptions, value]
  );

  const handleMonthChange = useCallback(
    (option: SelectOption | null) => {
      if (!option || !onChange) return;
      const month = Number(option.value);
      onChange(month);
    },
    [onChange]
  );

  return (
    <div className={`flex flex-col gap-3 ${className || ""}`}>
      <span className="text-sm text-gray-700 dark:text-gray-200">Month</span>
      <Select
        options={monthOptions}
        value={selectedMonthOption}
        onChange={(opt) => handleMonthChange(opt as SelectOption)}
      />
    </div>
  );
};
