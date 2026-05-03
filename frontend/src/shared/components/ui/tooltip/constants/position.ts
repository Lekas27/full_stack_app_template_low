import { TooltipPosition } from "@/shared/components/ui/tooltip/enums";

export const tooltipSideMap: Record<
  TooltipPosition,
  "top" | "right" | "bottom" | "left"
> = {
  [TooltipPosition.TOP]: "top",
  [TooltipPosition.RIGHT]: "right",
  [TooltipPosition.BOTTOM]: "bottom",
  [TooltipPosition.LEFT]: "left",
};
