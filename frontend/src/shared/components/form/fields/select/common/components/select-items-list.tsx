import {
  useController,
  type Control,
  type FieldPath,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import type { ActionMeta } from "react-select";

import { type Props as SelectProps } from "@/shared/components/ui/select/basic";
import { SelectItemsList as SelectItemsPrimitveList } from "@/shared/components/ui/select/common/components/select-items-list";
import type { SelectOption } from "@/shared/components/ui/select/common/types/options";

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TContext = unknown,
  TTransformed = unknown
> = Omit<UseControllerProps<TFieldValues, TName>, "control"> &
  Omit<SelectProps, "value" | "field" | "onChange"> & {
    /** Accept the exact Control, including context and transformed output types */
    control: Control<TFieldValues, TContext, TTransformed>;
    name: string;
    isMulti: boolean | undefined;
    displaySelectedBelow: boolean;
    onChange: (
      value: SelectOption[],
      actionMeta: ActionMeta<SelectOption>,
      option?: SelectOption | undefined
    ) => void;
  };

export const SelectItemsList = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TContext = unknown,
  TTransformed = unknown
>({
  name,
  isMulti,
  displaySelectedBelow,
  onChange,
  control,
}: Props<TFieldValues, TName, TContext, TTransformed>) => {
  const {
    field: { value },
  } = useController<TFieldValues, TName, TTransformed>({ name, control });

  return (
    <SelectItemsPrimitveList
      value={value}
      isMulti={isMulti}
      displaySelectedBelow={displaySelectedBelow}
      onChange={onChange}
    />
  );
};
