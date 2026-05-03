import { RadioGroup } from "@radix-ui/react-dropdown-menu";
import type { ComponentProps, FC } from "react";

type Props = ComponentProps<typeof RadioGroup>;

export const DropdownMenuRadioGroup: FC<Props> = ({ ...props }) => {
  return <RadioGroup data-slot="dropdown-menu-radio-group" {...props} />;
};
