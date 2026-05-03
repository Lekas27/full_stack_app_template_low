import {
  Arrow as PopoverArrow,
  Content as PopoverContent,
  Portal as PopoverPortal,
  Root as PopoverRoot,
  Trigger as PopoverTrigger,
} from "@radix-ui/react-popover";
import {
  Arrow as TooltipArrow,
  Content as TooltipContent,
  Portal as TooltipPortal,
  Provider as TooltipProvider,
  Root as TooltipRoot,
  Trigger as TooltipTrigger,
} from "@radix-ui/react-tooltip";
import type { FC, ReactNode } from "react";

import { tooltipSideMap } from "./constants/position";
import { TooltipPosition, TooltipTriggerEvent } from "./enums";

import { classNameManager } from "@/shared/lib/css";

const { joinClasses } = classNameManager;

export type Props = {
  className?: string;
  content: string | ReactNode;
  position?: TooltipPosition;
  children?: ReactNode;
  trigger?: TooltipTriggerEvent;
  /** Extra classes for the trigger wrapper */
  childrenClassName?: string;
};

const baseClasses =
  "w-max max-w-[250px] px-2 py-1.5 text-xs text-black-1 dark:text-white bg-white dark:bg-gray-800 border dark:border-dark-1 rounded-md shadow-lg";

export const Tooltip: FC<Props> = ({
  content,
  className,
  position = TooltipPosition.TOP,
  children,
  trigger = TooltipTriggerEvent.HOVER,
  childrenClassName,
}) => {
  switch (trigger) {
    case TooltipTriggerEvent.CLICK:
      return (
        <PopoverRoot>
          <PopoverTrigger asChild>
            <span
              className={joinClasses(
                "relative inline-flex items-center",
                className || "",
                childrenClassName || ""
              )}
            >
              {children}
            </span>
          </PopoverTrigger>

          <PopoverPortal
            container={document.getElementById("tooltip-root") ?? undefined}
          >
            <PopoverContent
              side={tooltipSideMap[position]}
              sideOffset={10}
              className={baseClasses}
              collisionPadding={8}
            >
              {content}
              <PopoverArrow className="fill-current text-white dark:text-gray-800" />
            </PopoverContent>
          </PopoverPortal>
        </PopoverRoot>
      );

    case TooltipTriggerEvent.HOVER:
      return (
        <TooltipProvider delayDuration={100}>
          <TooltipRoot>
            <TooltipTrigger asChild>
              <span
                className={joinClasses(
                  "relative inline-flex items-center",
                  className || "",
                  childrenClassName || ""
                )}
              >
                {children}
              </span>
            </TooltipTrigger>

            <TooltipPortal
              container={document.getElementById("tooltip-root") ?? undefined}
            >
              <TooltipContent
                side={tooltipSideMap[position]}
                sideOffset={10}
                className={baseClasses}
                collisionPadding={8}
              >
                {content}
                <TooltipArrow className="fill-current text-white dark:text-gray-800" />
              </TooltipContent>
            </TooltipPortal>
          </TooltipRoot>
        </TooltipProvider>
      );
  }
};
