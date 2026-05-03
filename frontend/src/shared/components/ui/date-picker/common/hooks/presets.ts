import { useCallback } from "react";

export const usePresetSelect = <TValue>(
  updateSelection: (date: TValue | undefined) => void,
  setMonth: (month: Date) => void
) => {
  const handlePresetSelect = useCallback(
    (preset: TValue) => {
      if (!preset) {
        updateSelection(undefined);
        return;
      }

      updateSelection(preset as TValue);
      if (preset instanceof Date) {
        setMonth(preset);
      }
    },
    [updateSelection, setMonth]
  );

  return { handlePresetSelect };
};
