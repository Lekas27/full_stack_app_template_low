export const stripTime = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

export const daysInMonth = (year: number, monthIndex: number): number => {
  return new Date(year, monthIndex + 1, 0).getDate();
};

export const pad = (num: number): string => {
  return String(num).padStart(2, "0");
};

export const within = (date: Date, minDate?: Date, maxDate?: Date): boolean => {
  if (minDate && stripTime(date) < stripTime(minDate)) return false;
  if (maxDate && stripTime(date) > stripTime(maxDate)) return false;
  return true;
};

export const clampDate = (year: number, monthIndex: number, day: number): Date => {
  const dim = daysInMonth(year, monthIndex);
  return new Date(year, monthIndex, Math.min(day, dim));
};

export const isMonthDisabled = (
  monthIndex: number,
  year: number,
  minDate?: Date,
  maxDate?: Date
): boolean => {
  const start = new Date(year, monthIndex, 1);
  const end = new Date(year, monthIndex, daysInMonth(year, monthIndex));
  if (minDate && end < stripTime(minDate)) return true;
  if (maxDate && start > stripTime(maxDate)) return true;
  return false;
};

export const isDayDisabled = (
  year: number,
  monthIndex: number,
  day: number,
  minDate?: Date,
  maxDate?: Date
): boolean => {
  return !within(new Date(year, monthIndex, day), minDate, maxDate);
};
