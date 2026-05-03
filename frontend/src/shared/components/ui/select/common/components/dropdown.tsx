import { ChevronRightIcon } from "lucide-react";
import { type FC } from "react";
import { type DropdownIndicatorProps } from "react-select";

import {
  type SelectOption,
  type SelectGroup,
} from "@/shared/components/ui/select/common/types/options";
import { classNameManager } from "@/shared/lib/css";

const { joinClasses } = classNameManager;

export const SelectDropdownIndicator: FC<
  DropdownIndicatorProps<SelectOption, boolean, SelectGroup<SelectOption>>
> = ({ isFocused, selectProps }) => {
  const { menuIsOpen } = selectProps;

  return (
    <ChevronRightIcon
      className={joinClasses(
        isFocused && menuIsOpen ? "rotate-90 transform" : "",
        "text-secondary-1 mx-2 w-4 shrink-0 transition !duration-150 dark:text-white"
      )}
    />
  );
};
