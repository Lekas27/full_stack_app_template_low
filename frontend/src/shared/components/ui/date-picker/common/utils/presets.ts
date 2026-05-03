import { startOfToday, subDays } from "date-fns";
import { type DateRange } from "react-day-picker";

type Preset =
  | { label: string; range: DateRange }
  | { label: string; date: Date }
  | { label: string; dates: Date[] };

export const getPresetsForMode = <TMode>(mode: TMode): Preset[] => {
  const today = startOfToday();
  const yesterday = subDays(today, 1);

  if (mode === "range") {
    return [
      {
        label: "Today",
        range: { from: today, to: today },
      },
      {
        label: "Last 7 Days",
        range: { from: subDays(today, 6), to: today },
      },
      {
        label: "Last 15 Days",
        range: { from: subDays(today, 14), to: today },
      },
      {
        label: "Last 30 Days",
        range: { from: subDays(today, 29), to: today },
      },
    ];
  }

  if (mode === "multiple") {
    return [
      { label: "Today", dates: [today] },
      { label: "Yesterday", dates: [yesterday] },
      { label: "Last 7 Days", dates: Array.from({ length: 7 }, (_, i) => subDays(today, i)) },
    ];
  }

  // single
  return [
    { label: "Today", date: today },
    { label: "Yesterday", date: yesterday },
  ];
};

export const isSameRange = (first?: DateRange, second?: DateRange) => {
  return (
    first?.from?.getTime() === second?.from?.getTime() &&
    first?.to?.getTime() === second?.to?.getTime()
  );
};
