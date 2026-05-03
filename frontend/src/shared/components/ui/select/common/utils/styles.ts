import { type ClassNamesConfig, type Theme } from "react-select";

import {
  type SelectGroup,
  type SelectOption,
  type Size,
  type Spacing,
} from "@/shared/components/ui/select/common/types/options";
import { classNameManager } from "@/shared/lib/css";

const { joinClasses } = classNameManager;

export type SelectClassNames =
  | ClassNamesConfig<SelectOption, boolean, SelectGroup<SelectOption>>
  | undefined;

/**
 * Generates a theme object for react-select with custom colors.
 *
 * @param {Theme} theme - The default theme object from react-select.
 * @returns {Theme} Customize theme object.
 */
export const generateSelectTheme = (theme: Theme): Theme => {
  const colors = {
    ...theme.colors,
    primary: "#3490FF",
    primary25: "#489bff",
    primary50: "#73a2da",
    primary75: "#2270cd",
  };

  return {
    ...theme,
    colors,
  };
};

const spacingClasses: Record<Spacing, string> = {
  default: "",
  sm: "space-y-1",
  md: "space-y-2",
  lg: "space-y-3",
};

const sizeClasses: Record<Size, string> = {
  default: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

/**
 * Generates custom class names for react-select components.
 *
 * @returns {SelectClassNames} An object containing custom class names.
 */
export const generateSelectClassNames = (
  selectClassNames: SelectClassNames,
  spacing: Spacing,
  size: Size
): SelectClassNames => {
  const spacingClass = spacingClasses[spacing];
  const sizeClass = sizeClasses[size];

  return {
    control: ({ isDisabled }) =>
      joinClasses(
        sizeClass,
        isDisabled
          ? "bg-gray-100 dark:!bg-gray-700"
          : "bg-white dark:!bg-gray-800",
        "text-sm text-gray-500 dark:text-gray-200 border !border-gray-300 dark:!border-gray-600 outline-none primary-ring !rounded-md w-full focus:border-gray-500 [&>div:first-child]:overflow-auto !transition !duration-150 !ease-in-out"
      ),
    menu: () =>
      joinClasses(
        sizeClass,
        "!z-[50] flex text-sm dark:text-gray-300 bg-white dark:!bg-gray-800 border !border-gray-300 dark:!border-gray-600 !rounded-md shadow-sm focus:outline-none focus:border-blue-500 !overflow-hidden theme-transition p-1"
      ),
    placeholder: () => joinClasses("!text-gray-400 truncate", sizeClass),
    menuList: () => joinClasses("w-full !p-0", spacingClass),
    singleValue: () =>
      joinClasses("dark:!text-white theme-transition", sizeClass),
    multiValue: () =>
      joinClasses(
        sizeClass,
        "text-black dark:!text-white bg-gray-100 dark:!bg-gray-700 border rounded flex space-x-1 theme-transition !m-0"
      ),
    multiValueLabel: () =>
      joinClasses(
        sizeClass,
        "text-black dark:!text-white dark:!bg-gray-700 border rounded dark:border-gray-800 flex space-x-1 pl-1 !py-0 theme-transition"
      ),
    valueContainer: () =>
      joinClasses("flex gap-1 max-h-[70px] my-1 !overflow-scroll"),
    option: ({ isSelected, isFocused, isDisabled }) =>
      joinClasses(
        isSelected
          ? "!bg-blue-500 !text-white dark:!bg-blue-500"
          : isFocused && !isDisabled
          ? "!bg-blue-500/60 !text-white dark:!bg-blue-700"
          : isDisabled
          ? "!text-gray-400 !bg-gray-300 dark:!bg-gray-500 pointer-not-allowed"
          : "",
        "hover-transition"
      ),
    input: () =>
      joinClasses(
        sizeClass,
        "dark:!text-white [&>input:focus]:primary-ring [&>input:focus]:!pl-0.5 !m-0"
      ),
    noOptionsMessage: () => "text-center",
    ...selectClassNames,
  };
};
