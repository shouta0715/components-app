/* eslint-disable react/no-array-index-key */
import { FileCode2, Siren, X } from "lucide-react";
import React, { memo } from "react";
import { DropzoneInputProps } from "react-dropzone";
import { accepts } from "@/app/(edit)/components/[slug]/edit/_features/drop-zone/utils";

import { LangIcons } from "@/components/icons/LangIcons";
import { Label } from "@/components/ui/label";
import { EditFilesInput } from "@/lib/schema/client/edit/files";
import { cn } from "@/utils";

/* eslint-disable react/no-array-index-key */

type DropZoneInfoProps = {
  type: "code" | "preview";
  getInputProps: (props?: DropzoneInputProps) => DropzoneInputProps;
  files: EditFilesInput["files"];
  isLoading: boolean;
  isDragActive: boolean;
};

type AcceptedFilesProps = {
  files: EditFilesInput["files"];
  suffix: string;

  onDeleteFile?: (id: string) => void;
};

type FileItemProps = Omit<AcceptedFilesProps, "files"> & {
  file: EditFilesInput["files"][number];
  name: string;
};

function FilesItem({ file, onDeleteFile, name }: FileItemProps) {
  const Icon = LangIcons[file.extension];

  return (
    <span className="flex items-center gap-x-1">
      <Icon aria-hidden="true" className="size-6" />
      <span>
        {name}.{file.extension}
      </span>
      {onDeleteFile && (
        <button
          className="rounded-md p-1 hover:bg-muted"
          onClick={() => onDeleteFile(file.objectId)}
          type="button"
        >
          <span className="sr-only">ファイルを削除</span>
          <X className="size-4 text-destructive" />
        </button>
      )}
    </span>
  );
}

export const AcceptedFiles = memo(
  ({ files, suffix, onDeleteFile }: AcceptedFilesProps) => {
    return (
      <div className="grid gap-2 text-sm leading-5 text-muted-foreground">
        <span className="text-xs">
          {files.length > 0
            ? "現在の入力されたファイル 一覧"
            : "現在の入力されたファイルはありません。"}
        </span>
        <div className="grid grid-cols-3 items-center gap-4">
          {files.map((file, i) => (
            <FilesItem
              key={`${i}-${file.extension}-file-info`}
              file={file}
              name={file.name}
              onDeleteFile={onDeleteFile}
              suffix={suffix}
            />
          ))}
        </div>
      </div>
    );
  }
);

export function DropZoneInfo({
  type,
  getInputProps,
  files,
  isLoading,
  isDragActive,
}: DropZoneInfoProps) {
  return (
    <>
      <Label
        className="mb-3 flex gap-x-2 text-xs leading-5 text-primary"
        htmlFor="files"
      >
        <Siren className="size-6 text-destructive" />
        <span className="self-end">
          {type === "preview"
            ? "ファイルのステータス の項目をすべて満たすと、プレビューが表示されます。"
            : "1つ以上のファイルをアップロードすると、コードが表示されます。"}
        </span>
      </Label>
      <div
        className={cn(
          "flex justify-center flex-col rounded-lg  border-dashed pt-10 pb-5 px-4 sm:px-0 transition-colors relative h-code-frame duration-150 cursor-pointer  border-2 border-border hover:border-primary",
          isLoading && "cursor-not-allowed",
          isDragActive && "border-primary"
        )}
      >
        <div className="flex flex-1 flex-col items-center justify-center">
          <FileCode2
            aria-hidden="true"
            className={cn(
              "mx-auto size-12 transition-colors duration-150",
              isDragActive ? "text-primary" : "text-muted-foreground"
            )}
          />
          {!isLoading && (
            <div className="mt-4 flex text-sm leading-6 text-muted-foreground">
              <Label
                aria-label="Upload a file"
                className={cn(
                  "flex cursor-pointer items-center font-semibold text-primary hover:underline hover:underline-offset-4"
                )}
                htmlFor="files"
              >
                <span className="">Upload a file</span>
                <input
                  aria-disabled={isLoading}
                  disabled={isLoading}
                  {...getInputProps({
                    disabled: isLoading,
                    id: "files",
                    type: "file",
                    name: "files",
                    accept: accepts.files,
                    "aria-label": "Upload a file",
                  })}
                />
              </Label>
              <p className="pl-1">or drag and drop</p>
            </div>
          )}
          {isLoading ? (
            <p className="text-xs leading-5 text-muted-foreground">
              Uploading Preview Image...
            </p>
          ) : (
            <p
              className={cn(
                "text-xs leading-5",
                isDragActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <span>HTML, CSS, JS,JSX,TS,TSX up to 3 files</span>
            </p>
          )}
        </div>
        <div className="flex px-4">
          <AcceptedFiles files={files} suffix="no-file-info" />
        </div>
      </div>
    </>
  );
}
