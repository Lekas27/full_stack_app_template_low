import type { ReactNode } from "react";

export type Option = {
  value: string;
  label: ReactNode;
  disabled?: boolean;
};
