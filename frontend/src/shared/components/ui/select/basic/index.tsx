import { forwardRef } from "react";
import { type ControllerRenderProps, type FieldValues } from "react-hook-form";
import ReactSelect, {
  type SelectInstance,
  type Props as SelectProps,
} from "react-select";

import { SelectClearIndicator } from "@/shared/components/ui/select/common/components/clear";
import { SelectDropdownIndicator } from "@/shared/components/ui/select/common/components/dropdown";
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
  SelectProps<SelectOption, boolean, SelectGroup<SelectOption>>,
  "size" | "variant"
> & {
  spacing?: Spacing;
  size?: Size;
  field?: ControllerRenderProps<FieldValues, string>;
};

// TODO(META-59): Make multi-select resizable
export const Select = forwardRef<
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
      options,
      value,
      isSearchable,
      isMulti,
      ...props
    },
    ref
  ) => {
    const processedOptions = processSelectOptions(options);

    return (
      <ReactSelect
        ref={ref}
        theme={(theme) => generateSelectTheme(theme)}
        isSearchable={isSearchable || false}
        isMulti={isMulti}
        closeMenuOnSelect={!isMulti}
        classNames={generateSelectClassNames(classNames, spacing, size)}
        options={processedOptions}
        value={value}
        onKeyDown={(event) =>
          preventSelectEnterKeySubmit(
            event,
            isSearchable || false,
            value,
            options
          )
        }
        components={{
          ClearIndicator: SelectClearIndicator,
          DropdownIndicator: SelectDropdownIndicator,
          LoadingIndicator: SelectLoadingIndicator,
          IndicatorSeparator: () => null,
          Option: (props) => <CustomOption {...props} size={size} />,
          ...components,
        }}
        {...field}
        {...props}
      />
    );
  }
);

Select.displayName = "Select";
