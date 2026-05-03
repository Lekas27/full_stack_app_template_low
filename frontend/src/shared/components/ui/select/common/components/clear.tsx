import { X as XIcon } from "lucide-react";
import { type FC } from "react";
import { type ClearIndicatorProps } from "react-select";

import {
  type SelectGroup,
  type SelectOption,
} from "@/shared/components/ui/select/common/types/options";

export const SelectClearIndicator: FC<
  ClearIndicatorProps<SelectOption, boolean, SelectGroup<SelectOption>>
> = ({ clearValue }) => (
  <XIcon
    onClick={clearValue}
    className="text-secondary-1 mr-2 w-4 shrink-0 hover:cursor-pointer dark:text-white"
  />
);
