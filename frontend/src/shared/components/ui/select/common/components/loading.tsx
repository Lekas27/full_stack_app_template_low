import { Loader } from "lucide-react";
import { type FC } from "react";
import { type LoadingIndicatorProps } from "react-select";

import {
  type SelectOption,
  type SelectGroup,
} from "@/shared/components/ui/select/common/types/options";

export const SelectLoadingIndicator: FC<
  LoadingIndicatorProps<SelectOption, boolean, SelectGroup<SelectOption>>
> = () => (
  <Loader className="h-5 w-5 animate-spin text-blue-500 dark:text-blue-700" />
);
