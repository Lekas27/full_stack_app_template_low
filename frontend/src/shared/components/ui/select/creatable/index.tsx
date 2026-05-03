import { forwardRef } from "react";
import { type ControllerRenderProps, type FieldValues } from "react-hook-form";
import { type SelectInstance } from "react-select";
import ReactCreatableSelect, {
  type CreatableProps,
} from "react-select/creatable";

import { SelectClearIndicator } from "@/shared/components/ui/select/common/components/clear";
import { SelectInput } from "@/shared/components/ui/select/common/components/input";
import { SelectLoadingIndicator } from "@/shared/components/ui/select/common/components/loading";
import { CustomOption } from "@/shared/components/ui/select/common/components/option";
import {
  type SelectGroup,
  type SelectOption,
  type Size,
  type Spacing,
} from "@/shared/components/ui/select/common/types/options";
import { preventSelectEnterKeySubmit } from "@/shared/components/ui/select/common/utils/events";
import { processSelectOptions } from "@/shared/components/ui/select/common/utils/options";
import {
  generateSelectClassNames,
  generateSelectTheme,
} from "@/shared/components/ui/select/common/utils/styles";

export type Props = Omit<
  CreatableProps<SelectOption, boolean, SelectGroup<SelectOption>>,
  "size" | "variant"
> & {
  spacing?: Spacing;
  size?: Size;
  field?: ControllerRenderProps<FieldValues, string>;
};

export const CreatableSelect = forwardRef<
  SelectInstance<SelectOption, boolean, SelectGroup<SelectOption>>,
  Props
>(
  (
    {
      spacing = "default",
      size = "default",
      classNames,
      components,
      field,
      isSearchable,
      options,
      onKeyDown,
      ...props
    },
    ref
  ) => {
    const processedOptions = processSelectOptions(options);

    return (
      <ReactCreatableSelect
        ref={ref}
        classNames={generateSelectClassNames(classNames, spacing, size)}
        theme={(theme) => generateSelectTheme(theme)}
        onKeyDown={(event) => {
          preventSelectEnterKeySubmit(event, true, [], []);

          if (onKeyDown) onKeyDown(event);
        }}
        components={{
          ClearIndicator: SelectClearIndicator,
          LoadingIndicator: SelectLoadingIndicator,
          Input: SelectInput,
          IndicatorSeparator: () => null,
          Option: (props) => <CustomOption {...props} size={size} />,
          ...components,
        }}
        isSearchable={isSearchable}
        options={processedOptions}
        {...field}
        {...props}
      />
    );
  }
);

CreatableSelect.displayName = "CreatableSelect";
