import { type ClipboardEvent, type FC, useCallback } from "react";
import { components, type InputProps } from "react-select";

import {
  type SelectOption,
  type SelectGroup,
} from "@/shared/components/ui/select/common/types/options";

const { Input } = components;

export const SelectInput: FC<
  InputProps<SelectOption, boolean, SelectGroup<SelectOption>>
> = (props) => {
  const { selectProps, value } = props;
  const { onInputChange } = selectProps;

  const handlePaste = useCallback(
    (event: ClipboardEvent<HTMLDivElement>) => {
      event.preventDefault();
      const clipboardData = event.clipboardData;
      if (!clipboardData) return;

      const pastedText = clipboardData.getData("text");

      // Replace newlines with ', '
      const processedText = pastedText.replace(/\r?\n|\r/g, ", ");

      // Get current input value
      const currentInputValue = value || "";

      // Determine new input value with a separator if needed
      const separator = currentInputValue ? ", " : "";
      const newInputValue = `${currentInputValue}${separator}${processedText}`;

      // Update the input value
      if (onInputChange)
        onInputChange(newInputValue, {
          action: "input-change",
          prevInputValue: currentInputValue as string,
        });
    },
    [onInputChange, value]
  );

  return <Input {...props} onPaste={handlePaste} />;
};
