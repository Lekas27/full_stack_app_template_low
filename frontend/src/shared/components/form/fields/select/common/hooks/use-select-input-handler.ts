import { useCallback } from "react";
import type { InputActionMeta } from "react-select";

export const useSelectInputHandler = (
  preventInputValueOnBlur: boolean,
  onInputChange?: (val: string, meta: InputActionMeta) => void
) => {
  return useCallback(
    (val: string, meta: InputActionMeta) => {
      if (preventInputValueOnBlur && meta.action === "input-change") {
        onInputChange?.("", meta);
      } else {
        onInputChange?.(val, meta);
      }
    },
    [preventInputValueOnBlur, onInputChange]
  );
};
