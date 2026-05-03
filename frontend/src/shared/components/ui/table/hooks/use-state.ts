import type { OnChangeFn } from "@tanstack/react-table";
import { useState } from "react";

export const useControllableState = <T>(
  controlledState: [T, OnChangeFn<T>] | undefined,
  fallback: T
): [T, OnChangeFn<T>] => {
  const fallbackState = useState<T>(fallback);
  return controlledState ?? fallbackState;
};
