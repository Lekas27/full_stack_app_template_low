/**
 * Formats a Date object into "dd.MM.yyyy" format.
 * @param date - The date to format
 * @returns Formatted date string in "dd.MM.yyyy" format
 */
export const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};
