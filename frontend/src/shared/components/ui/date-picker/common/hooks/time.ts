import { setHours, setMinutes } from "date-fns";
import type { ChangeEventHandler } from "react";
import { useCallback, useState } from "react";

export const useTimePicker = <TValue>(
  selection: TValue,
  updateSelection: (date: TValue) => void
) => {
  const [timeValue, setTimeValue] = useState<string>("00:00");

  const isValidTime = useCallback((time: string): boolean => {
    const timeRegex = /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/;
    return timeRegex.test(time);
  }, []);

  const parseTime = useCallback(
    (time: string): { hours: number; minutes: number } | null => {
      if (!isValidTime(time)) return null;

      const [hours, minutes] = time.split(":").map(Number);
      return { hours, minutes };
    },
    [isValidTime]
  );

  const handleTimeChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      const time = event.target.value;

      if (!isValidTime(time)) {
        return;
      }

      setTimeValue(time);

      if (!(selection instanceof Date)) return;

      const parsedTime = parseTime(time);
      if (!parsedTime) return;

      const { hours, minutes } = parsedTime;
      const updated = setHours(setMinutes(selection, minutes), hours);
      updateSelection(updated as TValue);
    },
    [isValidTime, parseTime, selection, updateSelection]
  );

  return { timeValue, setTimeValue, handleTimeChange };
};
