import { type ChangeEventHandler, type FC } from "react";

type Props = {
  timeValue: string;
  onTimeChange: ChangeEventHandler<HTMLInputElement>;
};

export const DatePickerTimePicker: FC<Props> = ({ timeValue, onTimeChange }) => {
  return (
    <div className="border-border flex items-center border-b p-3">
      <label className="text-foreground flex w-full items-center gap-3 text-sm font-medium">
        Set the time:
        <input
          type="time"
          value={timeValue}
          onChange={onTimeChange}
          className="border-input text-foreground focus:ring-ring rounded-md border bg-gray-50 px-3 py-2 text-sm placeholder:text-gray-600 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-900 dark:text-gray-300"
        />
      </label>
    </div>
  );
};
