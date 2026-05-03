import { type OptionsOrGroups } from "react-select";

import {
  type SelectGroup,
  type SelectOption,
} from "@/shared/components/ui/select/common/types/options";

/**
 * Processes select options by merging disabled state of groups and options.
 *
 * @param options - The raw options or option groups.
 * @returns A new list of options or groups with inherited disabled state.
 */
export const processSelectOptions = (
  options?: OptionsOrGroups<SelectOption, SelectGroup<SelectOption>>
): OptionsOrGroups<SelectOption, SelectGroup<SelectOption>> => {
  if (!options) return [];

  return options.map((groupOrOption) => {
    if ("options" in groupOrOption) {
      const groupDisabled = groupOrOption.isDisabled ?? false;
      return {
        ...groupOrOption,
        options: groupOrOption.options.map((option) => ({
          ...option,
          isDisabled: groupDisabled || option.isDisabled,
          groupDisabled,
        })),
      };
    }

    return groupOrOption;
  });
};
