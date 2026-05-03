import { forwardRef, type ReactNode, useState } from "react";
import { type DropzoneOptions, useDropzone } from "react-dropzone";

import {
  type DropzoneFile,
  DropzoneFiles,
  type Props as DropzoneFilesProps,
} from "./thumbnails";

import { useNotifications } from "@/shared/components/ui/notifications/context";
import { Spinner } from "@/shared/components/ui/spinner";
import { Paragraph } from "@/shared/components/ui/typography/paragraph";
import { classNameManager } from "@/shared/lib/css";

const { joinClasses } = classNameManager;

export type Props = {
  id?: string;
  className?: string;
  innerClassName?: string;
  options: DropzoneOptions;
  loading?: boolean;
  renderFile?: DropzoneFilesProps["renderFile"];
  textPlaceholder?: ReactNode;
  multiple?: boolean;
  onChange?: (files: DropzoneFile[]) => void;
  value?: DropzoneFile[];
  showDropzoneFiles?: boolean;
};

export const FileInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      id,
      className,
      innerClassName,
      options,
      loading,
      onChange,
      renderFile,
      textPlaceholder,
      multiple = false,
      value,
      showDropzoneFiles = true,
    },
    ref
  ) => {
    const { warning } = useNotifications();
    // Use passed value (controlled) or internal state (uncontrolled)
    const [internalFiles, setInternalFiles] = useState<DropzoneFile[]>([]);
    const files = value ?? internalFiles;
    const setFiles = onChange ?? setInternalFiles;

    const { inputRef, getRootProps, isDragActive, getInputProps } = useDropzone(
      {
        onDrop: async (acceptedFiles) => {
          const mappedFiles = acceptedFiles.map((file) =>
            Object.assign(file, { preview: URL.createObjectURL(file) })
          );
          const maxFiles = options?.maxFiles ?? Infinity;

          if (files.length + mappedFiles.length > maxFiles) {
            warning(
              `You can upload up to ${maxFiles} file${maxFiles > 1 ? "s" : ""}.`
            );
            return;
          }

          if (multiple) {
            const newFiles = [...files, ...mappedFiles];
            setFiles(newFiles);
          } else {
            setFiles(mappedFiles);
          }
        },
        onError: () => setFiles([]),
        multiple,
        ...options,
      }
    );

    const removeFile = (index: number) => {
      const fileToRemove = files[index];
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }

      setFiles(files.filter((_, i) => i !== index));
    };

    const fileTextPlaceholder = options?.maxFiles === 1 ? "file" : "files";

    return (
      <section
        ref={ref}
        className={joinClasses(
          className ??
            "border-gray-3 dark:border-dark-1 theme-transition max-w-[400px] rounded-md border p-4"
        )}
      >
        <div
          ref={inputRef}
          className={joinClasses(
            "theme-transition rounded-md p-4",
            options?.disabled ? "cursor-not-allowed" : "cursor-pointer",
            innerClassName
          )}
          {...getRootProps()}
        >
          <input id={id} {...getInputProps()} />
          <Paragraph className="text-center">
            {textPlaceholder ||
              (isDragActive
                ? `Drop the ${fileTextPlaceholder} here ...`
                : `Drag and drop some ${fileTextPlaceholder} here, or click to select ${fileTextPlaceholder}`)}
          </Paragraph>
        </div>
        {loading && (
          <Spinner className="!text-primary-1 dark:!text-primary-5 theme-transition mt-3 h-5 w-5" />
        )}
        {showDropzoneFiles && (
          <aside
            className={joinClasses(
              files?.length ? "mt-3" : "",
              "flex max-h-[300px] flex-col items-center gap-4 overflow-y-auto"
            )}
          >
            <DropzoneFiles
              files={files}
              removeFile={removeFile}
              disabled={options?.disabled}
              renderFile={renderFile}
            />
          </aside>
        )}
      </section>
    );
  }
);

FileInput.displayName = "FileInput";
