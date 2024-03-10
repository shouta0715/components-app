import {
  FileStatus,
  FilesStatus,
  invalidHtmlStatus,
  invalidReactStatus,
  validFilesStatus,
} from "@/app/(app)/(edit)/components/[slug]/edit/_features/section/types";
import type { EditFilesInput } from "@/lib/schema/client/edit/files";

import { isBadCombination } from "@/scripts/ui-preview/utils";

type Props = {
  isBad: boolean;
  hasPreviewFile: boolean;
  type: "html" | "react";
  functionName: string | null;
  length: number;
};

const checkLength = (
  length: number
): {
  success: boolean;
  message: string;
} => {
  if (length === 0) {
    return {
      success: false,
      message: "1つ以上のファイルをアップロードしてください。",
    };
  }
  if (length > 3) {
    return {
      success: false,
      message: "ファイルの数は3つ以下にしてください。",
    };
  }

  return {
    success: true,
    message: "",
  };
};

const checkFunctionName = (
  type: "html" | "react",
  functionName: string | null
): boolean => {
  if (type === "html") {
    return functionName === null;
  }

  return !!functionName;
};

function getFilesStatus({
  type,
  functionName,
  isBad,
  hasPreviewFile,
  length,
}: Props): FilesStatus {
  if (type === "html") {
    const { success: validLength, message } = checkLength(length);
    const validFN = checkFunctionName(type, functionName);

    const valid = validLength && validFN && hasPreviewFile && !isBad;

    if (valid) return validFilesStatus;

    const numberStatus: FileStatus = validLength
      ? validFilesStatus.numbers
      : {
          ...invalidHtmlStatus.numbers,
          message,
        };

    const previewStatus: FileStatus = hasPreviewFile
      ? validFilesStatus.preview
      : invalidHtmlStatus.preview;

    const combinationStatus: FileStatus = isBad
      ? invalidHtmlStatus.combination
      : validFilesStatus.combination;

    return {
      numbers: numberStatus,
      preview: previewStatus,
      combination: combinationStatus,
      functionName: invalidHtmlStatus.functionName,
    };
  }

  const { success: validLength, message } = checkLength(length);
  const validFN = checkFunctionName(type, functionName);

  const valid = validLength && validFN && hasPreviewFile && !isBad;

  if (valid) return validFilesStatus;

  const numberStatus: FileStatus = validLength
    ? validFilesStatus.numbers
    : {
        ...invalidReactStatus.numbers,
        message,
      };

  const previewStatus: FileStatus = hasPreviewFile
    ? validFilesStatus.preview
    : invalidReactStatus.preview;

  const combinationStatus: FileStatus = isBad
    ? invalidReactStatus.combination
    : validFilesStatus.combination;

  const validFNStatus: FileStatus = validFN
    ? validFilesStatus.functionName
    : invalidReactStatus.functionName;

  return {
    numbers: numberStatus,
    preview: previewStatus,
    combination: combinationStatus,
    functionName: validFNStatus,
  };
}

export function calcStatus(
  files: EditFilesInput["files"],
  type: "html" | "react",
  functionName: string | null
): FilesStatus {
  const exs = files.map((file) => file.extension);
  const isBad = isBadCombination(exs);

  const hasPreviewFile = files.some((file) => {
    if (type === "html") {
      return file.extension === "html";
    }

    return file.extension === "tsx" || file.extension === "jsx";
  });

  return getFilesStatus({
    isBad,
    hasPreviewFile,
    type,
    functionName,
    length: files.length,
  });
}
