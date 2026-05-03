import { X } from "lucide-react";
import type { FC } from "react";
import type { ActionMeta } from "react-select";

import { Button } from "@/shared/components/ui/button";
import type { SelectOption } from "@/shared/components/ui/select/common/types/options";

export const SelectItemsList: FC<{
  value: SelectOption[] | undefined;
  isMulti: boolean | undefined;
  displaySelectedBelow: boolean;
  onChange: (
    value: SelectOption[],
    actionMeta: ActionMeta<SelectOption>,
    option: SelectOption | undefined
  ) => void;
}> = (props) => {
  const { value, isMulti, displaySelectedBelow, onChange } = props;

  return (
    isMulti &&
    displaySelectedBelow &&
    Array.isArray(value) &&
    value?.length > 0 && (
      <div className="mt-3 space-y-2">
        {value.map((option: SelectOption) => (
          <div
            key={String(option.value)}
            className="flex items-center justify-between rounded-lg border border-blue-200 bg-blue-50 p-2 dark:border-blue-800 dark:bg-blue-900/20"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-xs font-medium text-white">
                {String(option.label).charAt(0)}
              </div>
              <span className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
                {option.label}
              </span>
            </div>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                const newValue = (value as SelectOption[]).filter(
                  (v) => v.value !== option.value
                );
                onChange(
                  newValue as unknown as SelectOption[],
                  {
                    action: "remove-value",
                    removedValue: option,
                    option,
                  } as ActionMeta<SelectOption>,
                  option
                );
              }}
              className="h-8 w-8 p-0 text-gray-600 hover:bg-blue-100 hover:text-gray-800 dark:hover:bg-blue-800/20"
              icon={X}
            />
          </div>
        ))}
      </div>
    )
  );
};
