import { Check } from "lucide-react";
import { memo, useMemo } from "react";
import { type OptionProps } from "react-select";

import {
  type SelectOption,
  type SelectGroup,
  type Size,
} from "@/shared/components/ui/select/common/types/options";
import { classNameManager } from "@/shared/lib/css";

const { joinClasses } = classNameManager;

const fontSizeMap: Record<Size, string> = {
  default: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

type CustomOptionProps = OptionProps<
  SelectOption,
  boolean,
  SelectGroup<SelectOption>
> & {
  size?: Size;
};

export const CustomOption = memo(
  ({
    innerRef,
    innerProps,
    isSelected,
    isFocused,
    isDisabled,
    isMulti,
    data,
    children,
    size = "default",
  }: CustomOptionProps) => {
    const { className, ...restInnerProps } = innerProps;

    const fontSize = fontSizeMap[size] ?? fontSizeMap.default;

    const stateClasses = useMemo(() => {
      if (isDisabled) {
        return "!cursor-not-allowed !text-gray-400 !bg-gray-200 dark:!bg-gray-700 dark:!text-gray-300";
      }

      if (isSelected) {
        return isFocused
          ? "bg-blue-900 text-white"
          : "bg-transparent text-black dark:text-white";
      }

      return isFocused
        ? "bg-blue-900 text-white"
        : "text-black dark:text-white";
    }, [isDisabled, isSelected, isFocused]);

    const borderRadiusClass = (data as SelectOption)?.groupDisabled
      ? "first:rounded-t-md last:rounded-b-md"
      : "rounded-md";

    return (
      <div
        ref={innerRef}
        className={joinClasses(
          "flex cursor-pointer items-center px-3 py-2 transition-colors duration-200",
          borderRadiusClass,
          fontSize,
          stateClasses
        )}
        {...restInnerProps}
      >
        <div className="flex items-center space-x-2">
          {!isMulti && (
            <div className="flex h-4 w-4 items-center justify-center">
              {isSelected && (
                <Check
                  className={`h-4 w-4 ${
                    isFocused ? "text-white" : "text-black dark:text-gray-300"
                  }`}
                />
              )}
            </div>
          )}
          <div className="flex flex-col">
            <span>{children}</span>
            {data.description && (
              <span
                className={joinClasses(
                  "text-xs dark:text-gray-400",
                  isFocused ? "text-gray-300" : "text-gray-500"
                )}
              >
                {data.description}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }
);

CustomOption.displayName = "CustomOption";
