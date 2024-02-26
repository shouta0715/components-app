/* eslint-disable react/no-array-index-key */
import { X } from "lucide-react";
import React, { memo } from "react";
import { LangIcons } from "@/components/icons/LangIcons";
import { EditFilesInput } from "@/lib/schema/client/edit/files";

type AcceptedFilesProps = {
  files: EditFilesInput["files"];
  suffix: string;
  onDeleteFile?: (id: string) => void;
};

type FileItemProps = Omit<AcceptedFilesProps, "files"> & {
  file: EditFilesInput["files"][number];
};

function FilesItem({ file, onDeleteFile }: FileItemProps) {
  const Icon = LangIcons[file.extension];

  return (
    <span className="flex items-center gap-x-1">
      <Icon aria-hidden="true" className="size-6" />
      <span>index.{file.extension}</span>
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
              onDeleteFile={onDeleteFile}
              suffix={suffix}
            />
          ))}
        </div>
      </div>
    );
  }
);
