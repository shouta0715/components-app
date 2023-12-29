import {
  CompiledFile,
  ErrorMessage,
  SuccessTransformedData,
  TransformedFile,
  TransformedResult,
} from "@/scripts/ui-preview/types";
import { getExtensionToMimeType } from "@/scripts/ui-preview/utils";

export const htmlToResult = (files: CompiledFile[]): TransformedResult => {
  const resultFiles: TransformedFile[] = files.map((file) => {
    return {
      content: file.file,
      mimeType: getExtensionToMimeType(file.extension),
      extension: file.extension,
      originallyExtension: file.originallyExtension,
    };
  });

  const data: SuccessTransformedData = {
    files: resultFiles,
    componentName: null,
  };

  return {
    error: false,
    data,
  };
};

export const reactToResult = (
  componentName: string,
  files: CompiledFile[]
): TransformedResult => {
  const resultFiles: TransformedFile[] = files.map((file) => {
    return {
      content: file.file,
      mimeType: getExtensionToMimeType(file.extension),
      extension: file.extension,
      originallyExtension: file.originallyExtension,
    };
  });

  const data: SuccessTransformedData = {
    files: resultFiles,
    componentName,
  };

  return {
    error: false,
    data,
  };
};

export const errorMessageToResult = (
  message: ErrorMessage
): TransformedResult => {
  return {
    data: null,
    error: true,
    message,
  };
};
