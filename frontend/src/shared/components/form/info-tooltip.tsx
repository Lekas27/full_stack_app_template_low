import { InfoIcon } from "lucide-react";
import type { FC, ReactNode } from "react";

import {
  Tooltip,
  type Props as TooltipProps,
} from "@/shared/components/ui/tooltip";
import { TooltipTriggerEvent } from "@/shared/components/ui/tooltip/enums";
import { classNameManager } from "@/shared/lib/css";

const { joinClasses } = classNameManager;

export type Props = TooltipProps & {
  className?: string;
  content: ReactNode;
};

export const InfoTooltip: FC<Props> = ({ className, content, ...props }) => (
  <Tooltip trigger={TooltipTriggerEvent.HOVER} content={content} {...props}>
    <InfoIcon
      className={joinClasses(
        "text-primary-1 dark:text-primary-5 hover-transition h-5 w-5 cursor-pointer",
        className || ""
      )}
    />
  </Tooltip>
);
