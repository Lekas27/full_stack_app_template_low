import { useCallback } from "react";

export const useBulkSelect = <T>(
  enabled: boolean,
  options: readonly T[] | undefined,
  onChange: (value: T[]) => void
) => {
  return useCallback(() => {
    if (enabled && options) {
      onChange([...options]);
    }
  }, [enabled, options, onChange]);
};
