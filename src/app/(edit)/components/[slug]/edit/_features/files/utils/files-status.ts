import {
  FileStatus,
  FilesStatus,
  invalidHtmlStatus,
  invalidReactStatus,
  validFilesStatus,
} from "@/app/(edit)/components/[slug]/edit/_features/section/types";

type Props = {
  isBad: boolean;
  hasPreviewFile: boolean;
  type: "html" | "react";
  functionName?: string;
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
  functionName?: string
): boolean => {
  if (type === "html") {
    return functionName === undefined;
  }

  return functionName !== undefined;
};

export function getFilesStatus({
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
