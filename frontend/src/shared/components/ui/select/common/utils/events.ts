import { type KeyboardEvent } from "react";
import { type OptionsOrGroups, type PropsValue } from "react-select";

import {
  type SelectGroup,
  type SelectOption,
} from "@/shared/components/ui/select/common/types/options";

/**
 * Prevents form submission when the Enter key is pressed on a searchable select input.
 *
 * @param {KeyboardEvent<HTMLDivElement>} event - The keyboard event.
 * @param {boolean} isSearchable - Indicates if the select component is searchable.
 * @param {PropsValue<SelectOption>} [value] - The current value(s) of the select component.
 * @param {OptionsOrGroups<SelectOption, SelectGroup<SelectOption>>} [options] - The options or groups of options of the select component.
 */
export const preventSelectEnterKeySubmit = (
  event: KeyboardEvent<HTMLDivElement>,
  isSearchable: boolean,
  value?: PropsValue<SelectOption>,
  options?: OptionsOrGroups<SelectOption, SelectGroup<SelectOption>>
) => {
  if (
    isSearchable &&
    event.code === "Enter" &&
    Array.isArray(value) &&
    value?.length === options?.length
  )
    event.preventDefault();
};
