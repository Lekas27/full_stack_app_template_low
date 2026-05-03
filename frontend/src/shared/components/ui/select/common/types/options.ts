import { type MultiValue, type SingleValue } from "react-select";

export type Spacing = "default" | "sm" | "md" | "lg";
export type Size = "default" | "md" | "lg";

/**
 * Structure of a select component's option.
 */
export type SelectOption = {
  value: number | string;
  label: string;
  isDisabled?: boolean;
  description?: string;
  groupDisabled?: boolean;
};

/**
 * Structure of a select component's group.
 */
export type SelectGroup<SelectOption> = {
  label: string;
  options: SelectOption[];
  isDisabled?: boolean;
};

/**
 * Structure of a select component's option in onChange events.
 */
export type ChangeSelectOption = SingleValue<SelectOption> | MultiValue<SelectOption>;
