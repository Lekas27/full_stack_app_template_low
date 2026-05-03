import { CheckIcon, CopyIcon } from "lucide-react";
import { type FC, type ReactNode, useCallback, useState } from "react";

import { useNotifications } from "@/shared/components/ui/notifications/context";
import { Tooltip } from "@/shared/components/ui/tooltip";
import { TooltipTriggerEvent } from "@/shared/components/ui/tooltip/enums";

const copyText = "Copy";

type Props = {
  content: string;
};

export const CopyButton: FC<Props> = ({ content }) => {
  const [tooltipContent, setTooltipContent] = useState<ReactNode>(copyText);
  const { error } = useNotifications();

  const handleCopyClick = useCallback(async () => {
    try {
      setTooltipContent(
        <span className="flex items-center gap-2">
          <CheckIcon className="w-4" /> Copy
        </span>
      );
      await navigator.clipboard.writeText(content);
      setTooltipContent(
        <span className="flex items-center gap-2">
          <CheckIcon className="w-4" /> Copied
        </span>
      );

      // NOTE: Change text after copy
      setTimeout(() => {
        setTooltipContent(copyText);
      }, 3000);
    } catch {
      error("Failed to copy to clipboard");
    }
  }, [content, error]);

  return (
    <Tooltip trigger={TooltipTriggerEvent.HOVER} content={tooltipContent}>
      <button
        onClick={handleCopyClick}
        className="text-primary-1 dark:text-primary-5 hover:bg-primary-1/20 dark:hover:bg-primary-5/20 p-2"
      >
        <CopyIcon className="h-6 w-6" />
      </button>
    </Tooltip>
  );
};
