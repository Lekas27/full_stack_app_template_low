import { Close, Content } from "@radix-ui/react-dialog";
import { Download, XIcon } from "lucide-react";
import type { ComponentProps, FC } from "react";

import { DialogOverlay } from "./overlay";
import { DialogPortal } from "./portal";

import { classNameManager } from "@/shared/lib/css";

const { mergeClasses } = classNameManager;

type Props = ComponentProps<typeof Content> & {
  showCloseButton?: boolean;
  showDownloadButton?: boolean;
  onDownload?: () => void;
};

export const DialogContent: FC<Props> = ({
  className,
  children,
  showCloseButton = true,
  showDownloadButton = false,
  onDownload,
  ...props
}) => {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <Content
        data-slot="dialog-content"
        className={mergeClasses(
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-gray-50 p-6 shadow-lg duration-200 sm:max-w-lg dark:bg-gray-900",
          className || ""
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <Close
            data-slot="dialog-close"
            className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:text-gray-600 dark:text-gray-300 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </Close>
        )}
        {showDownloadButton && (
          <div
            onClick={onDownload}
            data-slot="dialog-download"
            className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent absolute top-4 right-10 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:text-gray-600 dark:text-gray-300 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
          >
            <Download className="h-3 w-3" />
            <span className="sr-only">Download</span>
          </div>
        )}
      </Content>
    </DialogPortal>
  );
};
