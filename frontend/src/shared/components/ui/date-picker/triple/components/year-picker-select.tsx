import { useCallback, useMemo, type FC } from "react";

import { Select } from "@/shared/components/ui/select/basic";
import type { SelectOption } from "@/shared/components/ui/select/common/types/options";

type Props = {
  value?: number;
  onChange?: (year: number) => void;
  minYear?: number;
  maxYear?: number;
  startYear?: number;
  endYear?: number;
  className?: string;
};

export const YearPickerSelect: FC<Props> = ({
  value,
  onChange,
  minYear,
  maxYear,
  startYear,
  endYear,
  className,
}) => {
  const today = new Date();
  const currentYear = today.getFullYear();

  const minY = minYear ?? currentYear - 100;
  const maxY = maxYear ?? currentYear + 10;
  const fromYear = startYear ?? minY;
  const toYear = endYear ?? maxY;

  const yearOptions: SelectOption[] = useMemo(() => {
    const options: SelectOption[] = [];
    for (let y = toYear; y >= fromYear; y--) {
      options.push({ value: y, label: String(y) });
    }

    return options;
  }, [fromYear, toYear]);

  const selectedYearOption: SelectOption | undefined = useMemo(
    () => yearOptions.find((opt) => Number(opt.value) === value),
    [yearOptions, value]
  );

  const handleYearChange = useCallback(
    (option: SelectOption | null) => {
      if (!option || !onChange) return;
      const year = Number(option.value);
      onChange(year);
    },
    [onChange]
  );

  return (
    <div className={`flex flex-col gap-3 ${className || ""}`}>
      <span className="text-sm text-gray-700 dark:text-gray-200">Year</span>
      <Select
        options={yearOptions}
        value={selectedYearOption}
        onChange={(opt) => handleYearChange(opt as SelectOption)}
      />
    </div>
  );
};
