import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges class names with Tailwind CSS conflict resolution
 */
export const mergeClasses = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs));
};

/**
 * Utility for managing CSS class names
 */
export const classNameManager = {
  /**
   * Merges class names with Tailwind CSS conflict resolution
   */
  mergeClasses: (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
  },
  /**
   * Joins multiple class names together
   */
  joinClasses: (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
  },
};