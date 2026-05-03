import { DockIcon, Trash2Icon } from "lucide-react";
import { Fragment, type FC, type ReactNode } from "react";

import { Button } from "@/shared/components/ui/button";
import { Span } from "@/shared/components/ui/typography/span";

export type CustomDropzoneFileProps = {
  name: string;
  preview: string;
};

export type DropzoneFile = Blob & CustomDropzoneFileProps;

export type RenderFileProps = {
  file: DropzoneFile;
  index: number;
  onRemove: () => void;
};

export type Props = {
  files: DropzoneFile[];
  removeFile: (index: number) => void;
  renderFile?: (props: RenderFileProps) => ReactNode;
  disabled?: boolean;
};

export const DropzoneFiles: FC<Props> = ({
  files,
  removeFile,
  renderFile,
  disabled,
}) => {
  return (
    <>
      {files.map((file, index) => {
        if (!renderFile)
          return (
            <div
              key={index}
              className="border-gray-3 dark:border-dark-1 theme-transition inline-flex w-full max-w-[200px] rounded-md border p-1"
            >
              <div className="relative flex min-h-[3rem] w-full min-w-0 flex-col items-center gap-1 overflow-hidden">
                <div className="dark:bg-dark-2 dark:border-dark-3 flex w-full items-center gap-3 rounded-md border border-dashed border-gray-300 bg-gray-100 p-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-300 dark:bg-gray-700">
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      <DockIcon />
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm text-gray-800 dark:text-gray-200">
                      {file.name}
                    </p>
                  </div>
                </div>

                <Span className="block max-w-[150px] truncate text-center text-ellipsis">
                  {file.name}
                </Span>

                <div className="absolute top-2 right-2 flex items-center gap-2">
                  <Button
                    type="button"
                    className="cursor-pointer bg-gray-100 dark:bg-gray-900"
                    variant="outline"
                    onClick={() => removeFile(index)}
                    disabled={disabled}
                    icon={Trash2Icon}
                  />
                </div>
              </div>
            </div>
          );

        const rendered = renderFile?.({
          file,
          index,
          onRemove: () => removeFile(index),
        });

        return <Fragment key={index}>{rendered}</Fragment>;
      })}
    </>
  );
};
