"use client";

import clsx from "clsx";
import { CheckCircle2, XCircle } from "lucide-react";
import React from "react";
import {
  FileStatus,
  FilesStatus as TFilesStatus,
} from "@/app/(edit)/components/[slug]/edit/_features/section/types";

function getLabel(key: keyof TFilesStatus) {
  switch (key) {
    case "numbers":
      return "ファイルの数";
    case "preview":
      return "プレビューの表示";
    case "combination":
      return "ファイルの拡張子の組み合わせ";

    case "functionName":
      return "関数名の入力";

    default:
      return "";
  }
}

function StatusItem({
  value,
  statusKey,
}: {
  value: FileStatus;
  statusKey: keyof TFilesStatus;
}) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <div className="-mt-1 size-12 min-w-12 self-start">
          {value.status === "success" ? (
            <CheckCircle2 className="size-full fill-green-500 text-background dark:text-primary" />
          ) : (
            <XCircle className="size-full fill-destructive text-background dark:text-primary" />
          )}
        </div>
        <p className="grid gap-1 text-sm">
          <span className="font-semibold">{getLabel(statusKey)}</span>
          {value.message && (
            <span
              className={clsx(
                "text-xs",
                value.status === "success"
                  ? "text-muted-foreground"
                  : "text-destructive"
              )}
              role="alert"
            >
              {value.message}
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

export function FilesStatus({ status }: { status: TFilesStatus }) {
  return (
    <div className="grid gap-4">
      <p className="grid gap-2">
        <span className="text-lg font-bold text-primary" id="files-status">
          ファイルのステータス
        </span>
        <span className="text-xs text-muted-foreground">
          以下の項目を確認してください。投稿するには、すべての項目を満たしている必要があります。
        </span>
      </p>
      <div className="-mx-2 grid gap-6 sm:grid-cols-2">
        {Object.entries(status).map(([k, value]) => {
          const key = k as keyof TFilesStatus;

          return <StatusItem key={key} statusKey={key} value={value} />;
        })}
      </div>
    </div>
  );
}
