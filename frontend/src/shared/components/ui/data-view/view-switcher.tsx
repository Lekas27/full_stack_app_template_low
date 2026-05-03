import { Grid3X3, List } from "lucide-react";
import type { FC } from "react";

import { Button } from "@/shared/components/ui/button";
import { classNameManager } from "@/shared/lib/css";

const { mergeClasses } = classNameManager;

export type ViewLayout = "table" | "cards";

type Props = {
  view: ViewLayout;
  onViewChange: (view: ViewLayout) => void;
  className?: string;
  size?: "sm" | "md";
  showLabels?: boolean;
};

const viewOptions = [
  { value: "table" as const, icon: List, label: "Table View" },
  { value: "cards" as const, icon: Grid3X3, label: "Card View" },
] as const;

export const ViewSwitcher: FC<Props> = ({
  view,
  onViewChange,
  className,
  size = "sm",
  showLabels = false,
}) => {
  return (
    <div
      role="tablist"
      aria-label="View switcher"
      className={mergeClasses(
        "inline-flex items-center gap-0.5 rounded-lg border border-gray-200 bg-gray-50 p-0.5 dark:border-gray-700 dark:bg-gray-800",
        size === "md" && "p-1.5",
        className
      )}
    >
      {viewOptions.map(({ value, icon: Icon, label }) => {
        const isSelected = view === value;
        return (
          <Button
            key={value}
            role="tab"
            aria-selected={isSelected}
            aria-label={label}
            variant={isSelected ? "gradient" : "ghost"}
            color={isSelected ? "primary" : "default"}
            size={size}
            onClick={() => onViewChange(value)}
            className={mergeClasses(
              "shrink-0 transition-all !transition-none duration-200",
              size === "sm" ? "h-7 min-w-7" : "h-8 min-w-8",
              showLabels ? "px-3" : "px-2",
              isSelected && "shadow-sm"
            )}
            icon={Icon}
            iconClassName={size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4"}
          >
            {showLabels ? label : null}
          </Button>
        );
      })}
    </div>
  );
};
